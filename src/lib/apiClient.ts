"use client"

import { useAuth } from "@/providers/authProvider"
import { API_BASEURL } from "@/utils/constants"

export function useApiClient() {
  const { accessToken, refreshAccessToken } = useAuth()

  const request = async (endpoint: string, options: RequestInit = {}) => {
    if (!accessToken) {
      throw new Error("No access token available. Please authenticate first.")
    }

    const makeRequest = async (authToken: string | null) => {
      const config: RequestInit = {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
          ...options.headers,
        },
      }

      return fetch(`${API_BASEURL}${endpoint}`, config)
    }

    let response = await makeRequest(accessToken)

    // Handle token refresh on 401
    if (response.status === 401 && accessToken) {
      const refreshSuccess = await refreshAccessToken()

      if (refreshSuccess) {
        // Use the updated token from context
        response = await makeRequest(accessToken)
      }
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  return { request }
}
