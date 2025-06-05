import { IconNames } from "@/utils/iconNames"
import { Member } from "../Organization/Members/MembersArea/utils"

// enums
export enum SettingsTabsType {
  PROFILE = "profile",
  ORGANIZATION = "organization",
  SATE_AI = "sate-ai",
  INTEGRATIONS = "integrations",
  USAGE_AND_BILLING = "usage-and-billing",
  NOTIFICATIONS = "notifications",
  SECURITY = "security",
  SUPPORT = "support",
  RESOURCES = "resources",
}
export enum ApiKeyStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  REVOKED = "revoked",
}

// constants
export const SETTINGS_QUERY_KEYS = {
  TAB: "tab",
}
export const SETTINGS_TABS: {
  icon: IconNames
  key: SettingsTabsType
  label: string
}[] = [
  {
    key: SettingsTabsType.PROFILE,
    label: "Profile",
    icon: "icon-user",
  },
  {
    key: SettingsTabsType.ORGANIZATION,
    label: "Organization",
    icon: "icon-building",
  },
  {
    key: SettingsTabsType.SATE_AI,
    label: "Sate AI",
    icon: "icon-eusate",
  },
  {
    key: SettingsTabsType.INTEGRATIONS,
    label: "Integrations",
    icon: "icon-integration",
  },
  {
    key: SettingsTabsType.USAGE_AND_BILLING,
    label: "Usage & Billing",
    icon: "icon-bill",
  },
  {
    key: SettingsTabsType.NOTIFICATIONS,
    label: "Notifications",
    icon: "icon-notification",
  },
  {
    key: SettingsTabsType.SECURITY,
    label: "Security",
    icon: "icon-security-user",
  },
  {
    key: SettingsTabsType.SUPPORT,
    label: "Support",
    icon: "icon-support",
  },
  {
    key: SettingsTabsType.RESOURCES,
    label: "Resources",
    icon: "icon-layer",
  },
]

// types

export type Profile = {
  src: string | null
  fullname: string
  email: string
  role: string
}

export type Info = {
  img_url: string | null
  name: string
  email: string
  industry: string | undefined
  size: string | undefined
  members: number
}

export type Organization = {
  info: Info
  members: Member[]
}
