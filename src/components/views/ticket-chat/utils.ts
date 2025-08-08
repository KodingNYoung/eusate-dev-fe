import {
  TicketPriority,
  TicketStatus,
  UserTemperament,
} from "../help-desk/utils"
import { TICKET_EVENTS } from "@/utils/constants"

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

export type TicketDetails = {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  lastUpdated: Date
  createdAt: Date
  assignedTo: string
  customerId: string
  temperament: UserTemperament
}

export enum ChannelList {
  TWITTER = "twitter",
}
export enum TicketDetailsTabs {
  ATTACHMENTS = "attachments",
  ACTIVITY = "activity",
  COMMENTS = "comments",
  USERINFO = "userinfo",
}

export const TICKET_DETAILS_TABS_LIST: {
  key: TicketDetailsTabs
  label: string
}[] = [
  {
    key: TicketDetailsTabs.ATTACHMENTS,
    label: "Attachments",
  },
  {
    key: TicketDetailsTabs.USERINFO,
    label: "User info",
  },
  {
    key: TicketDetailsTabs.COMMENTS,
    label: "Comments",
  },
  {
    key: TicketDetailsTabs.ACTIVITY,
    label: "Activity",
  },
]
export const ACTIVITY_DESCRIPTIONS = {
  [TICKET_EVENTS.PRIORITY_CHANGE]: "changed ticket priority to",
  [TICKET_EVENTS.STATUS_CHANGE]: "changed ticket status to",
  [TICKET_EVENTS.CALL_JOIN]: "joined ongoing call",
  [TICKET_EVENTS.CALL_START]: "started a call",
  [TICKET_EVENTS.CALL_END]: "call lasted for",
  [TICKET_EVENTS.COMMENT]: "commented on this ticket",
} as const

export const getFileFromPublicAssets = async (path: string): Promise<File> => {
  const response = await fetch(path)
  const blob = await response.blob()
  const filename = path.split("/").pop() || "file"
  return new File([blob], filename, { type: blob.type })
}

export const formatTime12Hr = (input: Date | string): string => {
  const date = typeof input === "string" ? new Date(input) : input
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const period = hours >= 12 ? "PM" : "AM"
  const hour12 = hours % 12 || 12
  const paddedMinutes = minutes.toString().padStart(2, "0")
  return `${hour12}:${paddedMinutes}${period}`
}
