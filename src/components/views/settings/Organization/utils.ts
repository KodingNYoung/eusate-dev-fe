export enum OrganizationTabsType {
  INFO = "info",
  MEMBERS = "members",
}

// CONSTANTS
export const ORAGANIZATION_TABS: {
  key: OrganizationTabsType
  label: string
}[] = [
  {
    key: OrganizationTabsType.INFO,
    label: "Organizaiton Info",
  },
  {
    key: OrganizationTabsType.MEMBERS,
    label: "Members",
  },
] as const
export const ORGANIZATION_QUERY_KEYS = {
  TAB: "tab",
} as const
