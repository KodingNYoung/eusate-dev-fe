import { AiTones, ResourceSources } from "./enums"
import doc from "@/assets/images/file-doc.svg"
import gif from "@/assets/images/file-gif.svg"
import jpg from "@/assets/images/file-jpg.svg"
import mp3 from "@/assets/images/file-mp3.svg"
import pdf from "@/assets/images/file-pdf.svg"
import png from "@/assets/images/file-png.svg"
import txt from "@/assets/images/file-txt.svg"
import xls from "@/assets/images/file-xls.svg"

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
  SETTINGS: "/settings/profile",
  REPORT: "/report",
  HELP_AND_SUPPORT: "/help-and-support",
  NEW_ARTICLE: "/knowledge-base/new-article",
  RESOURCE: "/knowledge-base/resource",
  FAQS: "/knowledge-base/FAQs",
  PLAYGROUND: "/playground",
  DEV_SPACE: "/dev-space",
  PROFILE: "/settings/profile",
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
