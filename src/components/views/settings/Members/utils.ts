import { SortOrder } from "@/utils/enums"

// CONSTANTS
export const MEMBER_QUERY_KEYS = {
  PAGE: "p",
  ORD: "ord",
  QUERY: "q",
  SORT_BY: "sortby",
} as const
export const SORT_BY_OPTIONS = [
  {
    label: "Date added",
    key: "date_created",
    name: "date_created",
    value: "date_created",
    query_key: MEMBER_QUERY_KEYS.SORT_BY,
  },
]

/**
 * Convert `${sortVlaue} ${order}` to `+/-${sortValue}`
 */
export const formatSortBy = (sortby?: string) => {
  if (!sortby) return
  const [value, order] = sortby.split(" ") as [string, SortOrder]
  if (order === SortOrder.ASCEND) {
    return value
  } else {
    return "-" + value
  }
}
