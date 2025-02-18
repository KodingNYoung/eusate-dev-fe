"use client"

import {
  fetchConversationEntities,
  generateSateResponse,
  generateUserMessageEntry,
  PREFERENCES_DEFAULT_VALUES,
  updateSateResponse,
} from "@/components/views/playground/utils"
import { GetChatHistoryResponse } from "@/lib/data/playground"
import { SendMessageResponse } from "@/lib/services/playground"
import { copyObject } from "@/utils/helpers"
import {
  Conversation,
  FC,
  PlaygroundSettings,
  SateMessage,
  UserMessage,
} from "@/utils/types"
import React, {
  createContext,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

export type SettingsKey = keyof PlaygroundSettings
export type AddMessageReturnType = Record<
  "historyCode" | "userMessage" | "sateResponse",
  string
>
export type EditMessageReturnType = Pick<
  AddMessageReturnType,
  "userMessage" | "sateResponse"
>

type PlaygroundContextType = {
  textBoxValue: string
  settings: PlaygroundSettings
  conversations: Conversation[]
  id: GetChatHistoryResponse["id"]
  scrollRef?: RefObject<HTMLDivElement>
  selectedResponseId?: string
  setTextBoxValue: (value: string) => void
  setPreferences: (settings: PlaygroundSettings) => void
  //   setSelectedResponseId: (id: string) => void
  addNewMessage: (message: string) => AddMessageReturnType //returns id of the new conversation
  editMessage: (message: string, historyCode: string) => EditMessageReturnType //returns id the generated user_message
  createResponseEntry: (historyCode: string, userMessage: string) => string // return the response
  updateNewMessageResponse: (
    response: SendMessageResponse,
    oldHistoryCode: string,
    oldUserMessageId: string,
    oldResponseId: string
  ) => boolean
  updateResponse: (
    response: SendMessageResponse,
    oldHistoryCode: string,
    oldUserMessageId: string,
    oldResponseId: string
  ) => boolean //pops the last response, updates it and put it back.
  likeOrDislikeResponse: (
    liked: boolean,
    oldHistoryCode: string,
    oldUserMessageId: string,
    oldResponseId: string
  ) => boolean //pops the last response, updates it and put it back.
}

export const PlaygroundContext = createContext<PlaygroundContextType>({
  textBoxValue: "",
  settings: PREFERENCES_DEFAULT_VALUES,
  conversations: [],
  id: "",
  setTextBoxValue: () => {},
  setPreferences: () => {},
  //   setSelectedResponseId: () => {},
  editMessage: () => ({}) as EditMessageReturnType,
  addNewMessage: () => ({}) as AddMessageReturnType,
  createResponseEntry: () => "",
  updateResponse: () => false,
  updateNewMessageResponse: () => false,
  likeOrDislikeResponse: () => false,
})

type Props = {
  chatHistory?: GetChatHistoryResponse
}

const PlaygroundProvider: FC<Props> = ({ children, chatHistory }) => {
  const chatScrollRef = useRef<HTMLDivElement>(null)

  const [textBoxValue, setTextBoxValue] = useState("")
  const [settings, setSettings] = useState<PlaygroundSettings>(
    PREFERENCES_DEFAULT_VALUES
  )
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedResponseId, setSelectedResponseId] = useState<string>()

  const id = useMemo(() => chatHistory?.id || "", [chatHistory?.id])

  const setPreferences = (settings: PlaygroundSettings) => {
    setSettings(settings)
  }

  const addNewMessage = (message: string) => {
    const historyCode = conversations.length.toString() // get the
    // generate UserMessage obj
    const user_message: UserMessage = generateUserMessageEntry(
      message,
      "0",
      historyCode,
      id
    )
    // generate SateMessage obj
    const sate_response: SateMessage = generateSateResponse(id, "0", {
      isLoading: true,
      id: "0",
    })
    // create conversation block
    const conversation: Conversation = {
      message_history_code: historyCode,
      messages: [{ user_message, sate_responses: [sate_response] }],
    }
    setConversations((curr) => [...curr, conversation])
    setTextBoxValue("")
    setTimeout(scrollToBottom, 100)
    return {
      historyCode,
      userMessage: user_message.id,
      sateResponse: sate_response.id,
    }
  }

  const editMessage = (message: string, historyCode: string) => {
    const generatedUserMessageId = "0",
      generatedResponseId = "0"

    const newConversations = copyObject(conversations)
    const conversation = newConversations.find(
      (c) => c.message_history_code === historyCode
    )
    if (!conversation) return {} as EditMessageReturnType
    // generate UserMessage obj
    const user_message: UserMessage = generateUserMessageEntry(
      message,
      generatedUserMessageId,
      historyCode,
      id
    )
    // generate SateMessage obj
    const sate_response: SateMessage = generateSateResponse(
      id,
      generatedUserMessageId,
      {
        isLoading: true,
        id: generatedResponseId,
      }
    )

    conversation.messages = [
      ...conversation.messages,
      { user_message, sate_responses: [sate_response] },
    ]
    setConversations(newConversations)

    return {
      userMessage: generatedUserMessageId,
      sateResponse: generatedResponseId,
    }
  }

  const createResponseEntry = (historyCode: string, userMessageId: string) => {
    const generatedResponseId = "0"
    const newConversations = copyObject(conversations)
    const conversation = newConversations.find(
      (c) => c.message_history_code === historyCode
    )
    if (!conversation) return ""
    const message = conversation.messages.find(
      (msg) => msg.user_message.id === userMessageId
    )
    if (!message) return ""
    const response = generateSateResponse(id, userMessageId, {
      id: generatedResponseId,
      isLoading: true,
    })
    message.sate_responses = [...message.sate_responses, response]

    // message.sate_responses.push(response)
    setConversations(newConversations)
    return generatedResponseId
  }

  const updateNewMessageResponse = (
    response: SendMessageResponse,
    oldHistoryCode: string,
    oldUserMessageId: string,
    oldResponseId: string
  ) => {
    updateResponse(response, oldHistoryCode, oldUserMessageId, oldResponseId)
    // Scroll to bottom after update
    setTimeout(scrollToBottom, 100)
    return true
  }

  const updateResponse = (
    response: SendMessageResponse,
    oldHistoryCode: string,
    oldUserMessageId: string,
    oldResponseId: string
  ) => {
    setConversations((prevConversations) => {
      return updateSateResponse(
        prevConversations,
        response,
        oldHistoryCode,
        oldUserMessageId,
        oldResponseId
      )
    })
    return true
  }

  const scrollToBottom = () => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }
  const likeOrDislikeResponse = (
    liked: boolean,
    historyCode: string,
    userMessageId: string,
    responseId: string
  ) => {
    // Clone conversations
    const newConversations = copyObject(conversations)

    // Find conversation entities (conversation, message, response)
    const { conversation, message, responseIdx } = fetchConversationEntities(
      newConversations,
      historyCode,
      userMessageId,
      responseId
    )

    if (!conversation || !message || responseIdx === -1) return false

    message.sate_responses[responseIdx].liked = liked

    setConversations(newConversations)
    setSelectedResponseId(responseId)

    return true
  }

  useEffect(() => {
    setTimeout(scrollToBottom, 100)
  }, [])

  useEffect(() => {
    setConversations(chatHistory?.conversations || [])
  }, [chatHistory])

  return (
    <PlaygroundContext.Provider
      value={{
        textBoxValue,
        settings,
        conversations,
        id,
        scrollRef: chatScrollRef,
        selectedResponseId,
        setTextBoxValue,
        setPreferences,
        // setSelectedResponseId,
        editMessage,
        addNewMessage,
        createResponseEntry,
        updateNewMessageResponse,
        updateResponse,
        likeOrDislikeResponse,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}

export default PlaygroundProvider
