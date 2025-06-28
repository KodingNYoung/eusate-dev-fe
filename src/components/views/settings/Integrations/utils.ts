export type IntegrationTabType = "api_keys" | "apps" | "data"

export enum IntegrationTabs {
  API_KEYS = "api_keys",
  APPS = "apps",
  DATA = "data",
}

// CONSTANTS
export const INTEGRATION_TABS: { key: IntegrationTabType; label: string }[] = [
  {
    key: IntegrationTabs.API_KEYS,
    label: "API Keys",
  },
  {
    key: IntegrationTabs.APPS,
    label: "Apps",
  },
  {
    key: IntegrationTabs.DATA,
    label: "Data",
  },
] as const
export const INTEGRATION_QUERY_KEYS = {
  TAB: "tab",
} as const
