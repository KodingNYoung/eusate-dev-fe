import { ColumnType } from "."

export const ROWS_PER_PAGE = 6
export const COLUMNS: ColumnType[] = [
  { name: "Member name", id: "name", sortable: true },
  { name: "Email", id: "email", sortable: true },
  { name: "Last seen", id: "last_seen", sortable: true },
  { name: "Date added", id: "date_added", sortable: true },
  { name: "Actions", id: "action" },
] as const
