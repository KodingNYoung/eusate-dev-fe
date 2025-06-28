import {
  TicketPriority,
  TicketStatus,
  UserTemperament,
} from "../help-desk/utils"

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

export type Activity = {
  avatarUrl: string
  name: string
  activityType: "status" | "comment"
  status?: TicketStatus
  comment?: string
  createdAt: Date
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

export const getFileFromPublicAssets = async (path: string): Promise<File> => {
  const response = await fetch(path)
  const blob = await response.blob()
  const filename = path.split("/").pop() || "file"
  return new File([blob], filename, { type: blob.type })
}

export const formatDateTimeParts = (input: Date | string): [string, string] => {
  const date = typeof input === "string" ? new Date(input) : input
  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "short" })
  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12 || 12
  const datePart = `${day} ${month}`
  const timePart = `${hours}:${minutes}${ampm}`
  return [datePart, timePart]
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
