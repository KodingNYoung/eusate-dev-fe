import { SendMessageResponse } from "@/lib/services/playground"
import { AiTones, ResourceSources } from "@/utils/enums"
import { copyObject } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import {
  Conversation,
  PlaygroundSettings,
  SateMessage,
  UserMessage,
} from "@/utils/types"
import dayjs from "dayjs"

// enums
export enum FeedbackKind {
  LIKE = "like",
  DISLIKE = "dislike",
}

// constants
export const PREFERENCES_DEFAULT_VALUES: PlaygroundSettings = {
  source: ResourceSources.EXTERNAL,
  tone: AiTones.NORMAL,
  temperature: 0,
  top_p: 1,
}
export const FEEDBACK_SUGGESTIONS = {
  [FeedbackKind.LIKE]: [
    "Totally accurate",
    "Super easy to get",
    "Really informative",
    "Fun and creative",
    "Looks great",
    "Something different",
  ],
  [FeedbackKind.DISLIKE]: [
    "Not quite right",
    "A bit tricky to navigate",
    "Could use more details",
    "Not very engaging",
    "Could look better",
    "Nothing special",
  ],
}

// functions

export const generateUserMessageEntry = (
  message: string,
  id: string,
  historyCode: string,
  chatId: string
): UserMessage => {
  return {
    id: id,
    date_created: dayjs().format(),
    date_updated: dayjs().format(),
    message,
    message_history_code: historyCode,
    user: "",
    organisation: "",
    playground_chat: chatId,
  }
}

export const generateSateResponse = (
  chatId: string,
  userMessageId: string,
  optionals: Partial<
    Pick<SateMessage, "id" | "response" | "shouldAnimate" | "isLoading">
  >
): SateMessage => {
  const { id, response, shouldAnimate, isLoading } = optionals
  return {
    id: id || "",
    date_created: dayjs().format(),
    date_updated: dayjs().format(),
    liked: null,
    response: response || "",
    user: "",
    organisation: "",
    playground_chat: chatId,
    playground_user_message: userMessageId,
    shouldAnimate: shouldAnimate || undefined,
    isLoading: isLoading || false,
  }
}

export const fetchConversationEntities = (
  conversations: Conversation[],
  historyCode: string,
  userMessageId: string,
  responseId: string
) => {
  const conversation = conversations.find(
    (c) => c.message_history_code === historyCode
  )
  if (!conversation)
    return { conversation: undefined, message: undefined, response: undefined }
  const message = conversation.messages.find(
    (msg) => msg.user_message.id === userMessageId
  )
  if (!message) return { conversation, message: undefined, response: undefined }
  return {
    conversation,
    message,
    responseIdx: message.sate_responses.findIndex(
      (res) => res.id === responseId
    ),
  }
}

export const updateSateResponse = (
  prevConversations: Conversation[],
  response: SendMessageResponse,
  oldHistoryCode: string,
  oldUserMessageId: string,
  oldResponseId: string
) => {
  // Clone conversations
  const newConversations = copyObject(prevConversations)

  // Find conversation entities (conversation, message, response)
  const { conversation, message, responseIdx } = fetchConversationEntities(
    newConversations,
    oldHistoryCode,
    oldUserMessageId,
    oldResponseId
  )

  if (!conversation || !message || responseIdx === -1) return prevConversations

  // Update response
  message.sate_responses[responseIdx] = generateSateResponse(
    response.playground_sate_response_id,
    response.playground_user_message_id,
    {
      id: response.playground_sate_response_id,
      response: response.response,
      shouldAnimate: true,
      isLoading: false,
    }
  )

  // Update user message ID if needed
  if (response.playground_user_message_id) {
    message.user_message.id = response.playground_user_message_id
  }

  // Update history code if needed
  if (response.history_code) {
    conversation.message_history_code = response.history_code
    message.user_message.message_history_code = response.history_code
  }

  return newConversations
}

export const getFeedbackIcon = (
  kind: FeedbackKind,
  isLiked: boolean | null
): IconNames => {
  if (kind === FeedbackKind.LIKE) {
    return isLiked === true ? "icon-like-bold" : "icon-like"
  } else {
    return isLiked === false ? "icon-dislike-bold" : "icon-dislike"
  }
}

export const getFeedbackIconColor = (
  kind: FeedbackKind,
  isLiked: boolean | null
) => {
  if (kind === FeedbackKind.LIKE && isLiked === true) {
    return "text-gold-500"
  } else if (kind === FeedbackKind.DISLIKE && isLiked === false) {
    return "text-red-500"
  } else {
    return "text-gray-500"
  }
}
