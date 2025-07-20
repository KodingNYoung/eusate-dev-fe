"server only"

import { KnowledgeSource } from "@/utils/types"
import { getSession } from "../sessions"
import { sendAuthRequest } from "../request"
import { KnowledgeSourceTags } from "@/utils/enums"

type EditSourcePayloadType = Partial<
  Pick<
    KnowledgeSource,
    "organisation_id" | "title" | "published" | "external" | "question"
  >
>
type EditSourceResponseType = { success: true }
export const editSource = async (
  payload: EditSourcePayloadType,
  id: string,
  tag: KnowledgeSourceTags
) => {
  const session = await getSession()

  const response = await sendAuthRequest<EditSourceResponseType>(
    `/api/v1/library/${tag}/${id}/edit/`,
    { ...payload, organisation_id: session?.currentOrganisationId },
    { method: "PATCH" }
  )

  if ("shouldAuthenticate" in response)
    throw new Error("Session expired, log in again")

  return response
}

type DeleteSourceResponseType = { success: true }
export const deleteSource = async (id: string, tag: KnowledgeSourceTags) => {
  const session = await getSession()
  const response = await sendAuthRequest<DeleteSourceResponseType>(
    `/api/v1/library/${tag}/${id}/delete/`,
    { organisation_id: session?.currentOrganisationId },
    { method: "DELETE" }
  )

  if ("shouldAuthenticate" in response)
    throw new Error("Session expired, log in again")

  return response
}

type UploadChunkResponseType = { process_id: string } | { success: boolean }
export const uploadChunk = async (
  chunk: Blob,
  streamOptions?: { streamKey: string; idx: number }
) => {
  const session = await getSession()
  const formdata = new FormData()

  formdata.append("organisation_id", session?.currentOrganisationId || "")
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
export const initiateDocumentStream = async (noOfChunks: number) => {
  const session = await getSession()

  const response = await sendAuthRequest<InitiateDocumentStreamResponseType>(
    "/api/v1/library/document/init-stream/",
    {
      organisation_id: session?.currentOrganisationId,
      num_chunks: noOfChunks,
    },
    { method: "POST" }
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("Session expired, log in again")
  }

  return response.init_stream_key
}

// TODO: add an appropriate type. Check response type manually and fill it up.
type AddLinkResponseType = { success: true }
export const addLink = async (url: string) => {
  const session = await getSession()

  const response = await sendAuthRequest<AddLinkResponseType>(
    "/api/v1/library/link/add/",
    { organisation_id: session?.currentOrganisationId, url },
    { method: "POST" }
  )

  if ("shouldAuthenticate" in response)
    throw new Error("Session expired, log in again")

  return response
}
