import { Member } from "../Organization/Members/utils"
import { Info } from "../Organization/Info/utils"

export enum ApiKeyStatus {
  REVOKED = "revoked",
  EXPIRED = "expired",
  ACTIVE = "active",
}

// TYPES
export type Profile = {
  avatar: string | null
  fullname: string
  email: string
  role: string
}
export type Organization = {
  members: Member[]
  info: Info
}
