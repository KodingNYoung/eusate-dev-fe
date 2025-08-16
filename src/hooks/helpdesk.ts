import {
  ChatContext,
  CopilotContext,
  TicketContext,
} from "@/providers/ticketProviders"
import { useContext } from "react"

export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat should be called inside a ChatContextProvider")
  }
  return context
}

export const useTicketContext = () => {
  const context = useContext(TicketContext)
  if (!context) {
    throw new Error("useTicket should be called inside a TicketContextProvider")
  }
  return context
}

export const useCopilot = () => {
  const context = useContext(CopilotContext)
  if (!context) {
    throw new Error("useTicket should be called inside a TicketContextProvider")
  }
  return context
}
