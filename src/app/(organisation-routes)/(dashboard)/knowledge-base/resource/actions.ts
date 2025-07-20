"use server"

import { sendAuthRequest } from "@/lib/request"
import { editSource } from "@/lib/services/knowledge-base"
import { getSession } from "@/lib/sessions"
import { ROUTES } from "@/utils/constants"
import { KnowledgeSourceTags } from "@/utils/enums"
import { formStateResponse } from "@/utils/helpers"
import { FormState, KnowledgeSource } from "@/utils/types"

export const toggleSourcePublished = async () => {}

type CreateArticleResponse = { process_id: string }
// create article and revalidate the knowledge base url
export const createArticle = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { title, content, resourceState } = Object.fromEntries(formdata)
  const message = "Article record creation in progress"
  const route = ROUTES.KNOWLEDGE_BASE

  try {
    const session = await getSession()
    const response = await sendAuthRequest<CreateArticleResponse>(
      "/api/v1/library/article/add/",
      {
        title,
        content,
        published: resourceState !== "unpublished",
        organisation_id: session?.currentOrganisationId,
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

  return successResponse(message, route)
}
// create article and revalidate the knowledge base url
export const updateResourceContent = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { title, content, id, tag, resourceState } =
    Object.fromEntries(formdata)
  const message = "Resource record updated"
  const route = ROUTES.KNOWLEDGE_BASE

  try {
    const response = await editSource(
      { title, content, published: resourceState !== "unpublished" } as Pick<
        KnowledgeSource,
        "title" | "content" | "published"
      >,
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

  return successResponse(message, route)
}
