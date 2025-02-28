// enums
export enum DevspaceTabs {
  AUTH = "auth",
  FUNCTIONS = "functions",
}
export enum AuthType {
  TOKEN = "token",
  BEARER = "bearer",
  BASIC = "basic",
  API_KEY = "apikey",
}
export enum AuthLocation {
  QUERY = "query",
  HEADER = "header",
}

export enum AuthConfigFields {
  LOGIN_URL = "login_url",
  AUTH_LOCATION = "auth_location",
  AUTH_TYPE = "auth_type",
  QUERY_NAME = "query_name",
  HEADER_NAME = "header_name",
  HEADER_VALUE = "header_value",
}

// constants
export const DEVSPACE_QUERY_KEYS = {
  TAB: "tab",
}
export const DEVSPACE_TABS = [
  {
    key: DevspaceTabs.AUTH,
    label: "Auth Configuration",
  },
  {
    key: DevspaceTabs.FUNCTIONS,
    label: "Function",
  },
]
export const AUTH_CONFIG_STEPS = [
  "Login configuration",
  "Authorization config",
] as const

export const AUTH_LOCATION_OPTIONS = [
  { label: "Header", key: AuthLocation.HEADER },
  { label: "Query", key: AuthLocation.QUERY },
]

export const AUTH_TYPES_OPTIONS = {
  [AuthLocation.QUERY]: [{ label: "API Key", key: AuthType.API_KEY }],
  [AuthLocation.HEADER]: [
    { label: "API Key", key: AuthType.API_KEY },
    { label: "Token", key: AuthType.TOKEN },
    { label: "Bearer", key: AuthType.BEARER },
    { label: "Basic", key: AuthType.BASIC },
  ],
}
