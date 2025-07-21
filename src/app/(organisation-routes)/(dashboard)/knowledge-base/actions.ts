"use server"

import { sendAuthRequest } from "@/lib/request"
import {
  addLink,
  deleteSource,
  editSource,
  uploadChunk,
} from "@/lib/services/knowledge-base"
import { getSession } from "@/lib/sessions"
import { KnowledgeSourceTags } from "@/utils/enums"
import { formStateResponse } from "@/utils/helpers"
import { FormState, KnowledgeSource } from "@/utils/types"

export type ValidateUrlResponse = { valid: boolean }

export const validateUrl = async (
  formdata: FormData
): Promise<FormState<ValidateUrlResponse>> => {
  const { successResponse, errorResponse } = formStateResponse()
  const { url } = Object.fromEntries(formdata)

  try {
    const session = await getSession()
    const response = await sendAuthRequest<ValidateUrlResponse>(
      "/api/v1/library/validate-url/",
      {
        organisation_id: session?.currentOrganisationId,
        url,
      },
      { method: "POST" }
    )
    // handle auth check
    if ("shouldAuthenticate" in response) {
      throw new Error("Session expired, log in again")
    }

    return successResponse("", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}

/**
 *
 */
export const uploadDocuments = async (state: FormState, formdata: FormData) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const message = "Document uploaded, processing in progress"
  const documents = formdata.getAll("documents") as File[]

  try {
    await Promise.all(
      documents.map(async (document) => {
        return await uploadChunk(document)
      })
    )
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }

  return successResponse(message)
}

/**
 *
 */
export const addLinks = async (state: FormState, formdata: FormData) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const message = "Links added successfully."
  const links = formdata.getAll("url") as string[]

  try {
    await Promise.all(links.map(async (url) => await addLink(url)))
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }

  return successResponse(message)
}

// TABLE ACTIONS -------

export const toggleSourcePrivacy = async (
  state: FormState,
  formdata: FormData
) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const message = "You have successfully changed the privacy of a resource."
  const { privacy, id, tag } = Object.fromEntries(formdata)

  try {
    await editSource(
      { external: privacy !== "internal" },
      id as string,
      tag as KnowledgeSourceTags
    )
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }

  return successResponse(message)
}
export const bulkToggleSourcePrivacy = async (
  sources: KnowledgeSource[],
  external: boolean
) => {
  const { successResponse, errorResponse } = formStateResponse()
  const message =
    "You have successfully changed the privacy of the selected resources."

  try {
    await Promise.all(
      sources.map(async (source) => {
        return await editSource({ external }, source.id, source.tag)
      })
    )
  } catch (err) {
    return errorResponse({
      type: "request",
      message:
        err instanceof Error
          ? err.message
          : "Something went wrong, some resources were not updated",
    })
  }

  return successResponse(message)
}

export const toggleSourcePublished = async (
  state: FormState,
  formdata: FormData
) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { published, id, tag } = Object.fromEntries(formdata)
  const message =
    published === "true"
      ? "You have successfully published a content to the knowledge base"
      : "You have successfully unpublished a content."

  try {
    await editSource(
      { published: published === "true" },
      id as string,
      tag as KnowledgeSourceTags
    )
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }

  return successResponse(message)
}
export const bulkToggleSourcePublished = async (
  sources: KnowledgeSource[],
  published: boolean
) => {
  const { successResponse, errorResponse } = formStateResponse()
  const message = `You have successfully ${published ? "published" : "unpublished"}  the selected resources.`

  try {
    await Promise.all(
      sources.map(async (source) => {
        return await editSource({ published }, source.id, source.tag)
      })
    )
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }

  return successResponse(message)
}

export const removeSource = async (state: FormState, formdata: FormData) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const message = "You have successfully deleted a source."
  const { id, tag } = Object.fromEntries(formdata)

  try {
    await deleteSource(id as string, tag as KnowledgeSourceTags)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }

  return successResponse(message)
}
export const bulkRemoveSourcePublished = async (sources: KnowledgeSource[]) => {
  const { successResponse, errorResponse } = formStateResponse()
  const message = `You have successfully deleted the selected resources.`

  try {
    await Promise.all(
      sources.map(async (source) => {
        return await deleteSource(source.id, source.tag)
      })
    )
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }

  return successResponse(message)
}
