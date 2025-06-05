import { ColumnType } from "."

export const COLUMNS: ColumnType[] = [
  { name: "Member name", uid: "name", sortable: true },
  { name: "Email", uid: "email", sortable: true },
  { name: "Last seen", uid: "last_seen", sortable: true },
  { name: "Date added", uid: "date_added", sortable: true },
  { name: "Actions", uid: "action" },
] as const

export const ROWS_PER_PAGE = 6
