import { KnowledgeSourceTags } from "@/utils/enums"
import { IconNames } from "@/utils/iconNames"

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

export const MODAL_RESOURCE_TAGS: {
  value: KnowledgeSourceTags
  icon: IconNames
  title: string
  subtitle: string
}[] = [
  {
    value: KnowledgeSourceTags.DOCUMENT,
    icon: "icon-document-text",
    title: "Upload Document",
    subtitle: "Import PDFs, Word docs, and more to enrich your knowledge base.",
  },
  {
    value: KnowledgeSourceTags.ARTICLE,
    icon: "icon-article-text",
    title: "Add an article",
    subtitle:
      "Create custom content directly in our built-in text editor or import using links.",
  },
  {
    value: KnowledgeSourceTags.WEBISTE,
    icon: "icon-link",
    title: "Add website",
    subtitle:
      "Capture online content by entering URLs or using our web clipper.",
  },
  {
    value: KnowledgeSourceTags.FAQ,
    icon: "icon-message-question",
    title: "Create FAQs",
    subtitle: "Build a repository of common questions and expert answers.",
  },
]
