// TYPES
export type SortOrder = "" | "-"

// CONSTANTS
export const KNOWLEDGE_BASE_SORT_COLUMNS = [
  { value: "title", label: "Title" },
  { value: "date", label: "Date" },
] as const
export const SORT_ORDERS = [
  {
    value: "",
    key: "ascending",
    label: "Ascending",
    icon: "icon-arrow-circle-up",
  },
  {
    value: "-",
    key: "descending",
    label: "Descending",
    icon: "icon-arrow-circle-down",
  },
] as const
