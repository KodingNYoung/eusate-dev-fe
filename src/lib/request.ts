"use server"

import { getSession } from "@/lib/sessions"
import { API_BASEURL } from "@/utils/constants"
import { cache } from "react"
import { refreshAccessToken } from "./data/auth"

type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

type NextFetchRequestConfig = {
  revalidate?: number | false
  tags?: string[]
}

const requestHandler = cache(
  async (
    endpoint: string,
    payload?: unknown,
    options: FetcherOptions = {}
  ): Promise<Response> => {
    if (!API_BASEURL) {
      throw new Error("API URL is not defined")
    }

    const { method = "GET", headers = {} } = options

    const requestOptions: RequestInit & { next?: NextFetchRequestConfig } = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    }

    if (payload) {
      requestOptions.body = JSON.stringify(payload)
    }

    try {
      return await fetch(API_BASEURL + endpoint, requestOptions)
    } catch (error) {
      throw error
    }
  }
)

export const sendRequest = cache(
  async <T = unknown>(
    endpoint: string,
    payload?: unknown,
    options: FetcherOptions = {}
  ): Promise<T> => {
    try {
      const response = await requestHandler(endpoint, payload, options)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.detail)
      }

      return result as T
    } catch (error) {
      throw error
    }
  }
)

export const sendAuthRequest = cache(
  async <T = unknown>(
    endpoint: string,
    payload?: unknown,
    options: FetcherOptions = {}
  ): Promise<T | { shouldAuthenticate: true }> => {
    const session = await getSession()

    if (!session?.refreshToken) {
      return { shouldAuthenticate: true }
    }

    try {
      const response = await requestHandler(endpoint, payload, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })

      if (response.status === 401) {
        // refresh access token
        const refresh = await refreshAccessToken()

        // if success resend request
        if (refresh.success) {
          return sendAuthRequest<T>(endpoint, payload, options)
        } else {
          return { shouldAuthenticate: true }
        }
      } else if (response.status === 500) {
        throw new Error("Something went wrong.")
      } else {
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.detail)
        }

        return result as T
      }
    } catch (err) {
      throw err
    }
  }
)
