export enum OrganizationTabsType {
  INFO = "info",
  MEMBERS = "members",
}

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
]

export const ORGANIZATION_QUERY_KEYS = {
  TAB: "tab",
}
