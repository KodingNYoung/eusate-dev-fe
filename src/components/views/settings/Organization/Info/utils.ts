import { Item } from "@/components/molecules/Select"

export type Info = {
  avatar: string | null
  name: string
  email: string
  industry: string
  size: string
  members: number
}

export const ORGANIZATION_SIZES: Item[] = [
  { key: "1-10", label: "1-10" },
  { key: "11-50", label: "11-50" },
  { key: "50+", label: "50+" },
]

export const INDUSTRIES: Item[] = [
  { key: "tech", label: "Technology" },
  { key: "arts", label: "Arts & Lifestyle" },
]
