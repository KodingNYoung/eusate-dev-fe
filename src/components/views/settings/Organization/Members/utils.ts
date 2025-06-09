// TYPES
export type Permission = {
  reset_user_passwords: boolean
  import_user_profile_data: boolean
  read_access_to_documents: boolean
  create_new_user_profiles: boolean
  export_user_profiles_data: boolean
  view_access_to_user_profiles: boolean
  edit_access_to_user_profiles: boolean
  delete_access_to_user_profiles: boolean
  admin_rights_for_project_management: boolean
  write_permissions_for_shared_folders: boolean
  view_only_access_to_financial_reports: boolean
}
export type Sortby = "last_seen" | "date_added" | "none"
export type QueryKeys = "ord" | "sortby" | "q" | "p"
export type Ord = "ascending" | "descending"
export type Member = {
  id: number
  avatar: string
  name: string
  email: string
  last_seen: string
  date_added: string
}

// CONSTANTS
export const MEMBER_QUERY_KEYS: { [k: string]: QueryKeys } = {
  PAGE: "p",
  ORD: "ord",
  QUERY: "q",
  SORT_BY: "sortby",
} as const
export const SORT_BY_VALUES: { [k: string]: Sortby } = {
  LAST_SEEN: "last_seen",
  DATE_ADDED: "date_added",
} as const
export const ORD_VALUES: { [k: string]: Ord } = {
  ASC: "ascending",
  DES: "descending",
} as const
export const ORDER_OPTIONS = [
  {
    name: "up",
    key: ORD_VALUES.ASC,
    query_key: MEMBER_QUERY_KEYS.ORD,
  },
  {
    query_key: MEMBER_QUERY_KEYS.ORD,
    key: ORD_VALUES.DES,
    name: "down",
  },
] as const
export const SORT_BY_OPTIONS = [
  // name and value are just there to fufill all righteousness for Radio comp
  {
    label: "Last seen",
    key: SORT_BY_VALUES.LAST_SEEN,
    name: SORT_BY_VALUES.LAST_SEEN,
    value: SORT_BY_VALUES.LAST_SEEN,
    query_key: MEMBER_QUERY_KEYS.SORT_BY,
  },
  {
    label: "Date added",
    key: SORT_BY_VALUES.DATE_ADDED,
    name: SORT_BY_VALUES.DATE_ADDED,
    value: SORT_BY_VALUES.DATE_ADDED,
    query_key: MEMBER_QUERY_KEYS.SORT_BY,
  },
]

// HELPERS
export const formatPermissionKey = (key: string): string => {
  const withoutUnderscores = key.replace(/_/g, " ")
  const capitalized =
    withoutUnderscores.charAt(0).toUpperCase() + withoutUnderscores.slice(1)
  return capitalized
}
