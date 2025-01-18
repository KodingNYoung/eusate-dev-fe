"use server"

import { sendAuthRequest } from "@/lib/request"
import { getSession } from "@/lib/sessions"
import { ROUTES } from "@/utils/constants"
import { chunkFile, formStateResponse, mbToByte } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { revalidatePath } from "next/cache"

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
        organisation_id: session?.organisationId,
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
  const { successResponse, errorResponse } = formStateResponse(state)
  const { url } = Object.fromEntries(formdata)
  const message = "Article record creation in progress"
  const session = await getSession()

  try {
    const response = await sendAuthRequest<CreateArticleByLinkResponse>(
      "/api/v1/library/article/add-link/",
      { url, organisation_id: session?.organisationId },
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
  revalidatePath(ROUTES.KNOWLEDGE_BASE)
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

  revalidatePath(ROUTES.KNOWLEDGE_BASE)
  return successResponse(message)
}

type UploadChunkResponseType = { process_id: string } | { success: boolean }
const uploadChunk = async (
  chunk: Blob,
  streamOptions?: { streamKey: string; idx: number }
) => {
  const session = await getSession()
  const formdata = new FormData()

  formdata.append("organisation_id", session?.organisationId || "")
  if (streamOptions) {
    formdata.append("init_stream_key", streamOptions.streamKey)
    formdata.append("chunk_index", streamOptions.idx.toString())
    formdata.append("chunk", chunk)
  } else {
    formdata.append("file", chunk)
  }

  const response = await sendAuthRequest<UploadChunkResponseType>(
    `/api/v1/library/document/${streamOptions ? "stream" : "add"}/`,
    formdata,
    {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
    }
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("Session expired, log in again")
  }

  return response
}

type InitiateDocumentStreamResponseType = { init_stream_key: string }
const initiateDocumentStream = async (noOfChunks: number) => {
  const session = await getSession()

  const response = await sendAuthRequest<InitiateDocumentStreamResponseType>(
    "/api/v1/library/document/init-stream/",
    {
      organisation_id: session?.organisationId,
      num_chunks: noOfChunks,
    },
    { method: "POST" }
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("Session expired, log in again")
  }

  return response.init_stream_key
}
