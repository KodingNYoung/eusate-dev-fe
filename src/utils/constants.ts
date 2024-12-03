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
  REPORTS: "/reports",
  SETTINGS: "/settings",
  HELP_AND_SUPPORT: "/help-and-support",
  NEW_ARTICLE: "/knowledge-base/new-article",
  FAQS: "/knowledge-base/FAQs",
  PLAYGROUND: "/playground",
}

export const EMAIL_REGEX_PATTERNS =
  /^[^@]+@(?!gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|aol\.com|icloud\.com|mail\.com|yandex\.com|zoho\.com|protonmail\.com|gmx\.com|me\.com|live\.com$).+$/i

export const COOKIES_KEYS = {
  SESSION: "@eusate-dev-session",
  TWOFA_AUTH_CRED: "@2fa-auth-credentials",
} as const

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
