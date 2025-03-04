// import { paramFieldSchema } from "@/lib/schemas/dev-space"
import { DevSpaceFunctionParam } from "@/utils/types"
import { z, ZodObject, ZodTypeAny } from "zod"

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

export enum FunctionParamType {
  STRING = "string",
  BOOLEAN = "boolean",
  NUMBER = "number",
}
export enum FunctionStatus {
  LIVE = "live",
  DEV = "dev",
}
export enum FunctionMethods {
  GET = "GET",
}
export enum DSFunctionFields {
  METHOD = "method",
  NAME = "name",
  DESC = "description",
  ENDPOINT = "endpoint_url",
  URL_PARAMS = "url_params",
  QUERY_PARAMS = "query_params",
}
export enum ParamsProvidedBy {
  EUSATE = "eusate",
  SATE = "sate",
  ORGANISATION = "organisation",
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
    label: "Functions",
  },
]
export const AUTH_CONFIG_STEPS = [
  "Login configuration",
  "Authorization configuration",
]

export const DS_FUNCTION_STEPS = [
  "General information",
  "Set Parameters",
  "Usage of function",
]

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

export const FUNCTION_METHODS_OPTIONS = [
  { label: "GET", key: FunctionMethods.GET },
]

export const PARAMS_CONFIG_TABS = [
  { label: "URL", key: DSFunctionFields.URL_PARAMS },
  { label: "Query", key: DSFunctionFields.QUERY_PARAMS },
]
export const PARAMS_TYPE_OPTIONS = [
  { label: "String", key: FunctionParamType.STRING },
  { label: "Number", key: FunctionParamType.NUMBER },
  { label: "Boolean", key: FunctionParamType.BOOLEAN },
]
export const PARAMS_PROVIDED_BY_OPTIONS = [
  { label: "Eusate (We)", key: ParamsProvidedBy.EUSATE },
  { label: "Sate (AI)", key: ParamsProvidedBy.SATE },
  { label: "Organisation (You)", key: ParamsProvidedBy.ORGANISATION },
]
export const FUNCTION_USAGE_STATUS_OPTIONS = [
  {
    value: FunctionStatus.DEV,
    title: "Use on playground",
    subtitle:
      "This setting means that the function is only available on the playground for testing. The AI can't use this function when chatting with your users.",
  },
  {
    value: FunctionStatus.LIVE,
    title: "Use on LIVE",
    subtitle:
      "This setting indicates that the function will be available for immediate use by the AI when interacting with users. However, it's recommended to test functions in the playground before going live.",
  },
]
export const FUNCTION_AUTH_OPTIONS = [
  {
    title: "No-auth function",
    subtitle:
      "This setting means that the function does not require the user to be authenticated to be used.",
  },
  {
    title: "Auth function",
    subtitle:
      "This setting means that the function can only be used when the user is authenticated  ",
  },
]

// functions
export const extractParams = (url: string) => {
  // Initialize arrays to store URL and query parameters
  const urlParams: DevSpaceFunctionParam[] = []
  const queryParams: DevSpaceFunctionParam[] = []

  // Regex to match parameters enclosed in curly brackets {param}
  const paramRegex = /\{([^}]+)\}/g

  // Extract parameters from the URL and query string in one pass
  url.replace(paramRegex, (match, paramName, offset, fullUrl) => {
    // Determine if the parameter belongs to the path or query string
    if (fullUrl.indexOf("/?") > -1 && offset > fullUrl.indexOf("/?")) {
      queryParams.push({
        param: paramName,
        description: "",
        provided_by: ParamsProvidedBy.ORGANISATION,
        type: FunctionParamType.STRING,
        value: "",
      })
    } else {
      urlParams.push({
        param: paramName,
        description: "",
        provided_by: ParamsProvidedBy.ORGANISATION,
        type: FunctionParamType.STRING,
        value: "",
      })
    }
    return match
  })

  // Return both categorized arrays
  return { urlParams, queryParams }
}

export const generateParamSchema = (
  schema: ZodTypeAny,
  fields: Record<string, number>
) => {
  const formattedSchema: Record<string, ZodTypeAny> = {}

  if (!(schema instanceof ZodObject)) return z.object({})

  const schemaShape = schema.shape

  Object.entries(fields).forEach(([parentName, arrCount]) => {
    // loops through each parent (original) fields
    new Array(arrCount).fill(null).forEach((_, idx) => {
      // for each entry of the parent field
      Object.entries(schemaShape).map(([field, schema]) => {
        // for through the children (new) fields
        const name = `${parentName}.${idx}.${field}`
        formattedSchema[name] = schema as ZodTypeAny
      })
    })
  })

  return z.object(formattedSchema)
}

export const extractFieldName = (composedName: string) =>
  composedName.split(".").pop() as string
