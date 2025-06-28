"use server"

import { getSession, refreshAccessToken } from "@/lib/sessions"
import { API_BASEURL } from "@/utils/constants"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { cache } from "react"

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
  async (endpoint: string, payload?: unknown, options: FetcherOptions = {}) => {
    if (!API_BASEURL) {
      throw new Error("API URL is not defined")
    }

    const { method = "GET", headers = {} } = options

    const requestOptions: AxiosRequestConfig = {
      url: API_BASEURL + endpoint,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data: payload,
    }

    try {
      return await axios(requestOptions)
    } catch (err) {
      throw err
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

      if (response.status < 200 && response.status >= 300) {
        throw new Error(response.data.detail)
      }

      return response.data as T
    } catch (err) {
      throw err instanceof AxiosError && err.isAxiosError
        ? new Error(
            err.response?.data.detail || "An unexpected error occurred."
          )
        : err
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

      return response.data as T
    } catch (err) {
      if (err instanceof AxiosError) {
        // Handle 401 - token refresh
        if (err.response?.status === 401) {
          // refresh access token
          const refreshResult = await refreshAccessToken()

          // if success resend request
          if (refreshResult.success) {
            // retry original request
            return sendAuthRequest<T>(endpoint, payload, options)
          } else {
            return { shouldAuthenticate: true }
          }
        }

        // Handle 500
        if (err.response?.status === 500) {
          throw new Error("Something went wrong.")
        }
        console.log({ err })
        const message =
          err?.response?.data?.detail || "An unexpected error occurred."
        throw Error(message)
      }
      throw err
    }
  }
)
