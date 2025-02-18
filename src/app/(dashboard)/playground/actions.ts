"use server"

import {
  clearMessages,
  sendFeeback,
  sendMessage,
} from "@/lib/services/playground"
import { ROUTES } from "@/utils/constants"
import { formStateResponse } from "@/utils/helpers"
import { FormState, PlaygroundSettings } from "@/utils/types"
import { revalidatePath } from "next/cache"

type SendMessagePayload = {
  message: string
  userMessageId?: string
  msgHistoryCode?: string
  regenerate?: boolean
} & PlaygroundSettings
export const createMessage = async (
  state: FormState,
  payload: SendMessagePayload
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { message, userMessageId, msgHistoryCode, regenerate, ...settings } =
    payload
  try {
    const response = await sendMessage(
      message,
      settings,
      userMessageId,
      Boolean(regenerate),
      msgHistoryCode
    )
    return successResponse("", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}

export const clearChatWall = async (state: FormState) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  try {
    await clearMessages()
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
  revalidatePath(ROUTES.PLAYGROUND)
  return successResponse("")
}

export const sendResponseFeedback = async (
  state: FormState,
  formdata: FormData
) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { liked, feedback, responseId } = Object.fromEntries(formdata)

  try {
    await sendFeeback(Boolean(liked), responseId as string, feedback as string)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
  revalidatePath(ROUTES.PLAYGROUND)
  return successResponse("")
}
