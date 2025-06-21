export enum OrganizationTabsType {
  ORGANIZATION_INFO = "organization_info",
  MEMBERS = "members",
}

// CONSTANTS
export const ORAGANIZATION_TABS: {
  key: OrganizationTabsType
  label: string
}[] = [
  {
    key: OrganizationTabsType.ORGANIZATION_INFO,
    label: "Organization Info",
  },
  {
    key: OrganizationTabsType.MEMBERS,
    label: "Members",
  },
] as const
export const ORGANIZATION_QUERY_KEYS = {
  TAB: "tab",
} as const
