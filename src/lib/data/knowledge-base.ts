"use server"

import { KnowledgeSource } from "@/utils/types"
import { sendAuthRequest } from "../request"
import { ERROR_CAUSES } from "@/utils/constants"
import { getSession } from "../sessions"
import { KnowledgeSourceTags } from "@/utils/enums"
import axios from "axios"

type GetKnowledgeSourcesResponse = {
  count: number
  published_count: number
  unpublished_count: number
  results: KnowledgeSource[]
  page: number
  page_size: number
}
export type GetKnowledgeSourcesOptions = {
  sort_by?: string
  tags?: KnowledgeSourceTags
  page?: number
  page_size?: number
  search?: string
  external?: boolean
  published?: boolean
}

export const getKnowledgeSources = async (
  options: GetKnowledgeSourcesOptions = {}
) => {
  try {
    const query = new URLSearchParams()
    Object.keys(options).forEach((key) => {
      const value = options[key as keyof typeof options]
      if (value !== undefined && value !== "") {
        query.set(key, value.toString())
      }
    })
    const session = await getSession()

    if (!session) throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })

    const response = await sendAuthRequest<GetKnowledgeSourcesResponse>(
      `/api/v1/library/${session.organisationId}/?${query}`
    )

    if ("shouldAuthenticate" in response)
      throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })

    return { success: { message: "" }, data: response }
  } catch (err) {
    return {
      error: {
        message: err instanceof Error ? err.message : "Something went wrong",
      },
      shouldAuthenticate:
        err instanceof Error && err.cause === ERROR_CAUSES.SESSION_EXPIRED,
    }
  }
}

export const getKnowledgeSource = async (
  id: string,
  tag: KnowledgeSourceTags
) => {
  try {
    const response = await sendAuthRequest<KnowledgeSource>(
      `/api/v1/library/${tag}/${id}`
    )

    if ("shouldAuthenticate" in response)
      throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })

    const content = await getFileContent(response.file)

    return { success: { message: "" }, data: { ...response, content } }
  } catch (err) {
    return {
      error: {
        message: err instanceof Error ? err.message : "Something went wrong",
      },
      shouldAuthenticate:
        err instanceof Error && err.cause === ERROR_CAUSES.SESSION_EXPIRED,
    }
  }
}

export const getFileContent = async (url?: string) => {
  if (!url) throw new Error("No URL for file")

  const response = await axios.get(url)

  return response.data as string
}

type GetProcessResponse = {
  count: number
  results: KnowledgeSource[]
  next: number
  previous: number
}

export const getProcesses = async () => {
  try {
    const session = await getSession()

    if (!session) throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })

    const response = await sendAuthRequest<GetProcessResponse>(
      `/api/v1/library/${session.organisationId}/processing-resources/?status=ingesting,updating`
    )

    // console.log({ response })

    if ("shouldAuthenticate" in response)
      throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })

    return response
  } catch (err) {
    console.log("gp", { err })
    throw err
  }
}

export const getClientSession = async () => await getSession()
