import { IconNames } from "@/utils/iconNames"

export enum HelpDeskTabs {
  SUMMARY = "summary",
  ALL = "all",
  ASSIGNED_TO_ME = "assigned-to-me",
  AI_TICKETS = "ai-tickets",
}
export enum TicketStatus {
  OPEN = "open",
  TAKEN = "taken",
  RELEASED_AND_OPEN = "released-and-open",
  RESOLVED_AND_CLOSED = "resolved-and-closed",
  CLOSED = "closed",
}
export enum TicketPriority {
  CRITICAL = "critical",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}
export enum TicketFilters {
  PRIORITY = "priority",
  ASSIGNEE = "assignee",
  DATE_CREATED = "date_created",
  LAST_UPDATED = "last_updated",
  TEMPERAMENT = "temperament",
}

// constants
export const HD_QUERY_KEYS = {
  TAB: "tab",
  SEARCH: "q",
}
export const HD_TABS: { icon: IconNames; key: HelpDeskTabs; label: string }[] =
  [
    {
      icon: "icon-chart-2",
      key: HelpDeskTabs.SUMMARY,
      label: "Summary",
    },
    {
      icon: "icon-ticket",
      key: HelpDeskTabs.ALL,
      label: "All tickets",
    },
    {
      icon: "icon-user",
      key: HelpDeskTabs.ASSIGNED_TO_ME,
      label: "Assigned to me",
    },
    {
      icon: "icon-eusate",
      key: HelpDeskTabs.AI_TICKETS,
      label: "AI tickets",
    },
  ]
