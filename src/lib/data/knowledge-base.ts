"use server"

import { KnowledgeSource } from "@/utils/types"
import { sendAuthRequest } from "../request"
import { ERROR_CAUSES } from "@/utils/constants"
import { getSession } from "../sessions"
import { KnowledgeSourceTags } from "@/utils/enums"

type GetKnowledgeSourcesResponse = {
  count: number
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
  options?: GetKnowledgeSourcesOptions
) => {
  try {
    console.log(options)
    const session = await getSession()

    if (!session) throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })

    const response = await sendAuthRequest<GetKnowledgeSourcesResponse>(
      `/api/v1/library/${session.organisationId}`
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
