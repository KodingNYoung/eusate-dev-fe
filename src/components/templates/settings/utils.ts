import { IconNames } from "@/utils/iconNames"

//  TYPES
export type SettingsNavLink =
  | "usage&Billing"
  | "notifications"
  | "organization"
  | "integrations"
  | "resources"
  | "security"
  | "support"
  | "sate-ai"
  | "profile"

// ENUMS
export enum SettingsTabsType {
  USAGE_AND_BILLING = "usage-and-billing",
  NOTIFICATIONS = "notifications",
  ORGANIZATION = "organization",
  INTEGRATIONS = "integrations",
  RESOURCES = "resources",
  SECURITY = "security",
  SUPPORT = "support",
  PROFILE = "profile",
  SATE_AI = "sate-ai",
}

// CONSTANTS
export const SETTINGS_NAV_LINKS: SettingsNavLink[] = [
  "usage&Billing",
  "notifications",
  "organization",
  "integrations",
  "resources",
  "security",
  "support",
  "sate-ai",
  "profile",
] as const
export const SETTINGS_ROUTES = {
  USAGE_AND_BILLING: "/settings/usage&billing",
  NOTIFICATIONS: "/settings/notifications",
  INTEGRATIONS: "/settings/integrations",
  ORGANIZATION: "/settings/organization",
  RESOURCES: "/settings/resources",
  SECURITY: "/settings/security",
  SUPPORT: "/settings/support",
  PROFILE: "/settings/profile",
  SATE_AI: "/settings/sate-ai",
} as const
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
] as const
