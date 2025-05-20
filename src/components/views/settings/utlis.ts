// enums
export enum SettingsTabsType {
  API_KEYS = "api-keys",
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
export const SETTINGS_TABS = [
  {
    key: SettingsTabsType.API_KEYS,
    label: "API Keys",
  },
]
