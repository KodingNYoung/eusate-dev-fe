export type Member = {
  id: number
  avatar: string
  name: string
  email: string
  last_seen: string
  date_added: string
}

export type ColumnType = { name: string; uid: string; sortable?: boolean }
