import { Member } from "../Organisation/Members/utils"
import { Info } from "../Organisation/OrganisationInfo/utils"

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
export type Organisation = {
  members: Member[]
  info: Info
}
