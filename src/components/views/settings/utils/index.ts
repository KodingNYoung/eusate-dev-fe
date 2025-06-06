import { Info } from "../Organization/Info/utils"
import { Member } from "../Organization/Members/utils"

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

// types
export type Profile = {
  avatar: string | null
  fullname: string
  email: string
  role: string
}
export type Organization = {
  info: Info
  members: Member[]
}
