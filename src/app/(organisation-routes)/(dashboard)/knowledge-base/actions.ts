"use server"

import { sendAuthRequest } from "@/lib/request"
import {
  addWebsite,
  deleteSource,
  editSource,
  initiateDocumentStream,
  uploadChunk,
} from "@/lib/services/knowledge-base"
import { getSession } from "@/lib/sessions"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { KnowledgeSourceTags } from "@/utils/enums"
import { chunkFile, formStateResponse, mbToByte } from "@/utils/helpers"
import { FormState, KnowledgeSource } from "@/utils/types"
import { QueryClient } from "@tanstack/react-query"

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

type CreateArticleByLinkResponse = { process_id: string }
// create article and revalidate the knowledge base url
export const createArticleByLink = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const queryClient = new QueryClient()
  const { successResponse, errorResponse } = formStateResponse(state)
  const { url } = Object.fromEntries(formdata)
  const message = "Article record creation in progress"
  const session = await getSession()

  try {
    const response = await sendAuthRequest<CreateArticleByLinkResponse>(
      "/api/v1/library/article/add-link/",
      { url, organisation_id: session?.currentOrganisationId },
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
  queryClient.invalidateQueries({
    queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
  })
  return successResponse(message)
}

const MAX_TRANSFERRABLE_DOCUMENT_SIZE_IN_MB = 100
const FILE_CHUNK_SIZE_IN_MB = 8

/**
 * Uploads documents by either chunking them if they exceed a certain size or uploading them directly.
 *
 * @param {FormState} state - The current state of the form.
 * @param {FormData} formdata - The form data containing the documents to be uploaded.
 *
 * @returns {Promise<void>} - A promise that resolves when the documents have been uploaded.
 *
 * @throws {Error} - Throws an error if the upload process fails.
 *
 * The function performs the following steps:
 * 1. Retrieves the documents from the form data.
 * 2. For each document, checks its size.
 * 3. If the document size is 100MB or more, it chunks the file into 8MB pieces and uploads each chunk.
 * 4. If the document size is less than 100MB, it uploads the file directly.
 * 5. Handles errors and returns appropriate responses.
 * 6. Revalidates the knowledge base path upon successful upload.
 */
export const uploadDocuments = async (state: FormState, formdata: FormData) => {
  const queryClient = new QueryClient()
  const { successResponse, errorResponse } = formStateResponse(state)
  const message = "Document uploaded, processing in progress"
  const documents = formdata.getAll("documents") as File[]

  try {
    await Promise.all(
      documents.map(async (document) => {
        const size = document.size
        const chunkSize = mbToByte(FILE_CHUNK_SIZE_IN_MB)

        if (size >= mbToByte(MAX_TRANSFERRABLE_DOCUMENT_SIZE_IN_MB)) {
          const chunks = chunkFile(document, chunkSize)
          const streamKey = await initiateDocumentStream(chunks.length)

          const responses = await Promise.all(
            chunks.map(async (chunk, idx) => {
              return await uploadChunk(chunk, { streamKey, idx })
            })
          )

          return responses.find((response) => "process_id" in response)
        } else {
          return await uploadChunk(document)
        }
      })
    )
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }

  queryClient.invalidateQueries({
    queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
  })
  return successResponse(message)
}

/**
 *
 */
export const addWebsites = async (state: FormState, formdata: FormData) => {
  const queryClient = new QueryClient()
  const { successResponse, errorResponse } = formStateResponse(state)
  const message = "Websites added successfully."
  const domain = formdata.get("main_website") as string
  const subdomains = formdata.getAll("subdomains") as string[]

  try {
    await Promise.all(
      [domain, ...subdomains].map(async (url, idx) => {
        // upload the url
        // if it's the first url, then it's the domain - origin param: true .
        return await addWebsite(url, idx === 0)
      })
    )
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }

  queryClient.invalidateQueries({
    queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
  })
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
  const queryClient = new QueryClient()
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

  queryClient.invalidateQueries({
    queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
  })
  return successResponse(message)
}

export const toggleSourcePublished = async (
  state: FormState,
  formdata: FormData
) => {
  const queryClient = new QueryClient()
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

  queryClient.invalidateQueries({
    queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
  })
  return successResponse(message)
}
export const bulkToggleSourcePublished = async (
  sources: KnowledgeSource[],
  published: boolean
) => {
  const queryClient = new QueryClient()
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

  queryClient.invalidateQueries({
    queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
  })
  return successResponse(message)
}

export const removeSource = async (state: FormState, formdata: FormData) => {
  const queryClient = new QueryClient()
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

  queryClient.invalidateQueries({
    queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
  })
  return successResponse(message)
}
export const bulkRemoveSourcePublished = async (sources: KnowledgeSource[]) => {
  const queryClient = new QueryClient()
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

  queryClient.invalidateQueries({
    queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
  })
  return successResponse(message)
}
