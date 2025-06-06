import { IconNames } from "@/utils/iconNames"

export const SETTINGS_NAV_LINKS = [
  "profile",
  "organization",
  "sate-ai",
  "integrations",
  "usage&Billing",
  "notifications",
  "security",
  "support",
  "resources",
]

export const SETTINGS_ROUTES = {
  PROFILE: "/settings/profile",
  ORGANIZATION: "/settings/organization",
  SATE_AI: "/settings/sate-ai",
  INTEGRATIONS: "/settings/integrations",
  USAGE_AND_BILLING: "/settings/usage&billing",
  NOTIFICATIONS: "/settings/notifications",
  SECURITY: "/settings/security",
  SUPPORT: "/settings/support",
  RESOURCES: "/settings/resources",
}

export const SETTINGS_TABS: {
  id: number
  icon: IconNames
  link: string
  label: string
}[] = [
  {
    id: 1,
    link: SETTINGS_ROUTES.PROFILE,
    label: "Profile",
    icon: "icon-user",
  },
  {
    id: 2,
    link: SETTINGS_ROUTES.ORGANIZATION,
    label: "Organization",
    icon: "icon-building",
  },
  {
    id: 3,
    link: SETTINGS_ROUTES.SATE_AI,
    label: "Sate AI",
    icon: "icon-eusate",
  },
  {
    id: 4,
    link: SETTINGS_ROUTES.INTEGRATIONS,
    label: "Integrations",
    icon: "icon-integration",
  },
  {
    id: 5,
    link: SETTINGS_ROUTES.USAGE_AND_BILLING,
    label: "Usage & Billing",
    icon: "icon-bill",
  },
  {
    id: 6,
    link: SETTINGS_ROUTES.NOTIFICATIONS,
    label: "Notifications",
    icon: "icon-notification",
  },
  {
    id: 7,
    link: SETTINGS_ROUTES.SECURITY,
    label: "Security",
    icon: "icon-security-user",
  },
  {
    id: 8,
    link: SETTINGS_ROUTES.SUPPORT,
    label: "Support",
    icon: "icon-support",
  },
  {
    id: 9,
    link: SETTINGS_ROUTES.RESOURCES,
    label: "Resources",
    icon: "icon-layer",
  },
]
