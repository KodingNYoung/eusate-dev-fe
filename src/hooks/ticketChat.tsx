import { TicketChatContext } from "@/providers/ticketChatProvider"
import { useContext } from "react"

export const useTicketChat = () => {
  const context = useContext(TicketChatContext)
  if (!context) {
    throw new Error("useTicketChat must be used inside a TicketChatProvider")
  }
  return context
}
