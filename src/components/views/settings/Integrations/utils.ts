export enum IntegrationTab {
  API_KEYS = "api_keys",
  APPS = "apps",
  DATA = "data",
}

// CONSTANTS
export const INTEGRATION_TABS: { key: IntegrationTab; label: string }[] = [
  {
    key: IntegrationTab.API_KEYS,
    label: "API Keys",
  },
  {
    key: IntegrationTab.APPS,
    label: "Apps",
  },
  {
    key: IntegrationTab.DATA,
    label: "Data",
  },
] as const
export const INTEGRATION_QUERY_KEYS = {
  TAB: "tab",
} as const
