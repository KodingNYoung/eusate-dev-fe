import { HD_QUERY_KEYS } from "@/components/views/help-desk/utils"
import TicketChat from "@/components/views/ticket-chat"
import {
  MOBILE_TICKET_CHAT_HB_TABS,
  MobileTicketChatTabs,
} from "@/components/views/ticket-chat/utils"
import { PageFC } from "@/utils/types"
import React from "react"

export const metadata = {
  title: "Ticket chat",
}

const TicketChatPage: PageFC<{ ticketId: string }> = ({
  params,
  searchParams,
}) => {
  const ticketId = params?.ticketId
  const tab =
    (searchParams?.[HD_QUERY_KEYS.TAB] as MobileTicketChatTabs) ||
    MOBILE_TICKET_CHAT_HB_TABS[0].key

  return <TicketChat ticketId={ticketId} tab={tab} />
}

export default TicketChatPage
