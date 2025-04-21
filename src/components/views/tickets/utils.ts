export enum MobileTicketChatTabs {
  CONVERSATION = "conversation",
  DETAILS = "details",
}

export const MOBILE_TICKET_CHAT_HB_TABS: {
  key: MobileTicketChatTabs
  label: string
}[] = [
  {
    key: MobileTicketChatTabs.CONVERSATION,
    label: "Conversation",
  },
  {
    key: MobileTicketChatTabs.DETAILS,
    label: "Details",
  },
]
