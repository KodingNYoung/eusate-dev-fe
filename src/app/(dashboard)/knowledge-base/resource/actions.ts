"use server"

import { sendAuthRequest } from "@/lib/request"
import { editSource } from "@/lib/services/knowledge-base"
import { getSession } from "@/lib/sessions"
import { ROUTES } from "@/utils/constants"
import { KnowledgeSourceTags } from "@/utils/enums"
import { formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { revalidatePath } from "next/cache"

export const toggleSourcePublished = async () => {}

type CreateArticleResponse = { process_id: string }
// create article and revalidate the knowledge base url
export const createArticle = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { title, content, unpublished } = Object.fromEntries(formdata)
  const message = "Article record creation in progress"
  const route = ROUTES.KNOWLEDGE_BASE

  try {
    console.log(title, content, unpublished)
    const session = await getSession()
    const response = await sendAuthRequest<CreateArticleResponse>(
      "/api/v1/library/article/add/",
      {
        title,
        content,
        published: !unpublished,
        organisation_id: session?.organisationId,
      },
      { method: "POST" }
    )

    // handle auth check
    if ("shouldAuthenticate" in response) {
      throw new Error("Session expired, log in again")
    }
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
  //   revalidatePath(ROUTES.KNOWLEDGE_BASE)
  return successResponse(message, route)
}
// create article and revalidate the knowledge base url
export const updateResourceContent = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { title, content, id, tag } = Object.fromEntries(formdata)
  const message = "Article record update in progress"
  const route = ROUTES.KNOWLEDGE_BASE

  try {
    const response = await editSource(
      { title, content } as Record<"title" | "content", string>,
      id as string,
      tag as KnowledgeSourceTags
    )
    // handle auth check
    if ("shouldAuthenticate" in response) {
      throw new Error("Session expired, log in again")
    }
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
  revalidatePath(ROUTES.KNOWLEDGE_BASE)
  return successResponse(message, route)
}
