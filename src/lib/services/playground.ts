"server only"

import { sendAuthRequest } from "@/lib/request"
import { getSession } from "@/lib/sessions"
import { PlaygroundSettings } from "@/utils/types"

export type SendMessageResponse = {
  response: string
  playground_user_message_id: string
  playground_sate_response_id: string
  history_code?: string
}
export const sendMessage = async (
  message: string,
  settings: PlaygroundSettings,
  playground_user_message_id?: string,
  regenerate?: boolean,
  msgHistoryCode?: string
) => {
  const session = await getSession()

  const payload = {
    message,
    organisation_id: session?.organisationId,
    tone: settings.tone,
    temperature: settings.temperature,
    top_p: settings.top_p, //optional
    source: settings.source,
    playground_user_message_id,
    regenerate,
    history_code: msgHistoryCode,
  }

  const response = await sendAuthRequest<SendMessageResponse>(
    "/api/v1/playground/send-message/",
    payload,
    { method: "POST" }
  )

  if ("shouldAuthenticate" in response)
    throw new Error("Session expired, log in again")

  return response
}

type ClearMessageResponse = { success: true }
export const clearMessages = async () => {
  const session = await getSession()
  const response = await sendAuthRequest<ClearMessageResponse>(
    "/api/v1/playground/clear-messages/",
    {
      organisation_id: session?.organisationId,
    },
    { method: "DELETE" }
  )

  if ("shouldAuthenticate" in response)
    throw new Error("Session expired, log in again")

  return response
}

type SendFeedbackResponse = { success: true }
export const sendFeeback = async (
  liked: boolean,
  playground_sate_response_id: string,
  user_feedback?: string
) => {
  const session = await getSession()

  const response = await sendAuthRequest<SendFeedbackResponse>(
    "/api/v1/playground/sate-feedback/",
    {
      organisation_id: session?.organisationId,
      liked,
      user_feedback: user_feedback || undefined,
      playground_sate_response_id,
    },
    { method: "PATCH" }
  )

  if ("shouldAuthenticate" in response)
    throw new Error("Session expired, log in again")

  return response
}
