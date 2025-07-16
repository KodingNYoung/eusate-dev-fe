export enum ApiKeyStatus {
  REVOKED = "revoked",
  EXPIRED = "expired",
  ACTIVE = "active",
}
export enum OrganisationTabsType {
  ORGANISATION_INFO = "organisation_info",
  MEMBERS = "members",
}

// CONSTANTS
export const ORAGANISATION_TABS: {
  key: OrganisationTabsType
  label: string
}[] = [
  {
    key: OrganisationTabsType.ORGANISATION_INFO,
    label: "Organisation Info",
  },
  {
    key: OrganisationTabsType.MEMBERS,
    label: "Members",
  },
] as const
export const ORGANISATION_QUERY_KEYS = {
  TAB: "tab",
  SORT_BY: "sort_by",
  SEARCH: "q",
} as const
