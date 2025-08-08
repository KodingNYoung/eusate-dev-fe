import { ROUTES } from "@/utils/constants"
import { IconNames } from "@/utils/iconNames"

//  TYPES
export type SettingsNavLink =
  | "usage-billing"
  | "notifications"
  | "organisation"
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
  ORGANISATION = "organisation",
  INTEGRATIONS = "integrations",
  RESOURCES = "resources",
  SECURITY = "security",
  SUPPORT = "support",
  PROFILE = "profile",
  SATE_AI = "sate-ai",
}

// CONSTANTS
export const SETTINGS_NAV_LINKS: SettingsNavLink[] = [
  "usage-billing",
  "notifications",
  "organisation",
  "integrations",
  "resources",
  "security",
  "support",
  "sate-ai",
  "profile",
] as const
export const SETTINGS_TABS: {
  id: number
  icon: IconNames
  link: string
  label: string
}[] = [
  {
    id: 1,
    link: ROUTES.PROFILE,
    label: "Profile",
    icon: "icon-user",
  },
  {
    id: 2,
    link: ROUTES.ORGANISATION,
    label: "Organisation",
    icon: "icon-building",
  },
  {
    id: 3,
    link: ROUTES.SATE_AI,
    label: "Sate AI",
    icon: "icon-eusate",
  },
  {
    id: 4,
    link: ROUTES.INTEGRATIONS,
    label: "Integrations",
    icon: "icon-integration",
  },
  {
    id: 5,
    link: ROUTES.USAGE_AND_BILLING,
    label: "Usage & Billing",
    icon: "icon-bill",
  },
  {
    id: 6,
    link: ROUTES.NOTIFICATIONS,
    label: "Notifications",
    icon: "icon-notification",
  },
  {
    id: 7,
    link: ROUTES.SECURITY,
    label: "Security",
    icon: "icon-security-user",
  },
  {
    id: 8,
    link: ROUTES.SUPPORT,
    label: "Support",
    icon: "icon-support",
  },
  {
    id: 9,
    link: ROUTES.RESOURCES,
    label: "Resources",
    icon: "icon-layer",
  },
] as const
