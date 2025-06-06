type SelectItem = {
  key: string
  label: string
}
export type Info = {
  avatar: string | null
  name: string
  email: string
  industry: string | undefined
  size: string | undefined
  members: number
}

export const ORGANIZATION_SIZES: SelectItem[] = [
  { key: "default", label: "1-10" },
  { key: "1-10", label: "1-10" },
  { key: "11-50", label: "11-50" },
  { key: "50+", label: "50+" },
]
export const DEFAULT_INDUSTY_KEY = { key: "default", label: "Technology" }
export const INDUSTRIES: SelectItem[] = [
  { key: "default", label: "Technology" },
  { key: "Technology", label: "Technology" },
  { key: "Arts & Lifestyle", label: "Arts & Lifestyle" },
]
