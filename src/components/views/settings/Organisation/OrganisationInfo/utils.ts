import { Item } from "@/components/molecules/Select"

export type Info = {
  avatar: string | null
  name: string
  email: string
  industry: string
  size: string
  members: number
}

export const ORGANISATION_SIZES: Item[] = [
  { key: "1-10", label: "1 - 10" },
  { key: "11-50", label: "11 - 50" },
  { key: "51+", label: "51+" },
]

export const INDUSTRIES: Item[] = [
  { key: "tech", label: "Technology" },
  { key: "arts", label: "Arts & Lifestyle" },
]
