import { AiTones, ResourceSources, SortOrder } from "./enums"
import doc from "@/assets/images/file-doc.svg"
import gif from "@/assets/images/file-gif.svg"
import jpg from "@/assets/images/file-jpg.svg"
import mp3 from "@/assets/images/file-mp3.svg"
import pdf from "@/assets/images/file-pdf.svg"
import png from "@/assets/images/file-png.svg"
import txt from "@/assets/images/file-txt.svg"
import xls from "@/assets/images/file-xls.svg"
import { TicketPriority } from "@/components/views/help-desk/utils"

export const API_BASEURL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  LOGIN_2FA: "/login/finalize",
  SIGN_UP: "/sign-up",
  TWOFA_SETUP: "/setup-2fa",
  TWOFA_METHOD: "/setup-2fa/method",
  TWOFA_COMPLETED: "/setup-2fa/completed",
  ONOBOARDING_SETUP: "/onboarding-setup",
  OVERVIEW: "/overview",
  KNOWLEDGE_BASE: "/knowledge-base",
  HELP_DESK: "/helpdesk",
  TICKET: "/helpdesk/ticket",
  REPORTS: "/reports",
  REPORT: "/report",
  HELP_AND_SUPPORT: "/help-and-support",
  NEW_ARTICLE: "/knowledge-base/new-article",
  RESOURCE: "/knowledge-base/resource",
  FAQS: "/knowledge-base/FAQs",
  PLAYGROUND: "/playground",
  DEV_SPACE: "/dev-space",
  INVITE: "/invite",
  SETTINGS: "/settings/profile",
  USAGE_AND_BILLING: "/settings/usage-billing",
  NOTIFICATIONS: "/settings/notifications",
  INTEGRATIONS: "/settings/integrations",
  ORGANISATION: "/settings/organisation",
  RESOURCES: "/settings/resources",
  SECURITY: "/settings/security",
  SUPPORT: "/settings/support",
  PROFILE: "/settings/profile",
  SATE_AI: "/settings/sate-ai",
  COMPONENT_TEST: "/component-test",
}

export const EMAIL_REGEX_PATTERNS =
  /^[^@]+@(?!gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|aol\.com|icloud\.com|mail\.com|yandex\.com|zoho\.com|protonmail\.com|gmx\.com|me\.com|live\.com$).+$/i

export const COOKIES_KEYS = {
  SESSION: "@eusate-dev-session",
  TWOFA_AUTH_CRED: "@2fa-auth-credentials",
} as const

export const STORAGE_KEYS = {} as const

export const ERROR_CAUSES = {
  SESSION_EXPIRED: "SESSION_EXPIRED",
} as const

export const TEXT_ALIGN_TO_FLEX_MAP = {
  center: "justify-center",
  left: "justify-start",
  right: "justify-end",
  char: "justify-start",
  justify: "justify-start",
} as const

export const SHOW_FOR = {
  MOBILE_ONLY: "mobile-only",
  NOT_MOBILE: "not-mobile",
} as const

export const RESOURCE_SOURCES = [
  { key: ResourceSources.INTERNAL, label: "Internal only" },
  { key: ResourceSources.EXTERNAL, label: "External only" },
]

export const AI_TONES = [
  { key: AiTones.NORMAL, label: "Normal tone" },
  { key: AiTones.PROFESSIONAL, label: "Professional tone" },
  { key: AiTones.FRIENDLY, label: "Friendly tone" },
]

export const QUERY_FN_KEYS = {
  KNOWLEDGE_BASE_RESOURCES: ["knowledge-base-resources"],
  AUTH_CONFIG: ["auth-config"],
  DEV_SPACE_FUNCTIONS: ["dev-space-fuctions"],
  CODENAMES: ["codenames"],
  API_KEYS: ["api-keys"],
  TICKETS: ["tickets"],
  TICKET: ["ticket"],
  TICKET_COMMENTS: ["ticket-comments"],
  TICKET_CHAT: ["ticket-chat"],
  USER_PROFILE: ["user-profile"],
  OWNED_ORGANISATION: ["owned-organisation"],
  ORGANISATION: ["organisation"],
  ORGANISATION_USERS: ["organisation-users"],
  PERMISSIONS: ["permissions"],
  INVITE: ["invite"],
  OVERVIEW: ["overview"],
}

export const FILE_ICON_MAP = {
  ".doc": doc,
  ".docx": doc,
  ".gif": gif,
  ".jpg": jpg,
  ".mp3": mp3,
  ".pdf": pdf,
  ".png": png,
  ".svg": png,
  ".txt": txt,
  ".xls": xls,
  "": txt,
} as const

export const ACCEPTABLE_IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif"]

export const SORT_ORDERS = [
  {
    value: SortOrder.ASCEND,
    label: "Ascending",
    icon: "icon-arrow-circle-up",
  },
  {
    value: SortOrder.DESCEND,
    label: "Descending",
    icon: "icon-arrow-circle-down",
  },
] as const

export const TICKET_EVENTS = {
  PRIORITY_CHANGE: "priority_change",
  STATUS_CHANGE: "status_change",
  CALL_JOIN: "call_join",
  CALL_START: "call_start",
  CALL_END: "call_end",
  COMMENT: "comment",
} as const

export const COMPARISON_CARD_UNITS = {
  TIME: "time",
  PERCENT: "percentage",
  COUNT: "count",
  CSAT: "csat",
  SCORE: "score",
}
export const TICKET_PRIORITY_DATA = {
  [TicketPriority.CRITICAL]: { bg: "bg-error-500" },
  [TicketPriority.HIGH]: { bg: "bg-warning-500" },
  [TicketPriority.MEDIUM]: { bg: "bg-info-700" },
  [TicketPriority.LOW]: { bg: "bg-gray-900" },
}
export const TICKET_CHANNELS_DATA = {
  DISCORD: { color: "#2E90FA", bg: "bg-info-500", name: "Discord" },
  WHATSAPP: { color: "#667085", bg: "bg-gray-500", name: "Whatsapp" },
  X: { color: "#D7AB07", bg: "bg-warning-500", name: "X" },
  FACEBOOK: { color: "", bg: "", name: "Facebook" },
  INSTAGRAM: { color: "", bg: "", name: "Instagram" },
  EUSATE_API: { color: "#E86555", bg: "bg-red-500", name: "Eusate API" },
} as const
