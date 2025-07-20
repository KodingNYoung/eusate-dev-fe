import { ROUTES } from "@/utils/constants"
import { KnowledgeSourceTags } from "@/utils/enums"
import { IconNames } from "@/utils/iconNames"

// TYPES
export type SortOrder = "asc" | "desc"

// CONSTANTS
export const KB_QUERY_KEYS = {
  SORT_BY: "sortby",
  TAGS: "tags",
  PAGE: "page",
  SEARCH: "q",
  PRIVACY: "prv",
  TAB: "tab",
  SELECTED_ROWS: "sr",
  ID: "id",
} as const
export const KNOWLEDGE_BASE_TABS = {
  All: "all",
  Published: "published",
  Draft: "drafts",
} as const

export const KNOWLEDGE_BASE_SORT_COLUMNS = [
  { value: "title", label: "Title" },
  { value: "date_created", label: "Date created" },
]
export const SORT_ORDERS = [
  {
    value: "asc",
    key: "ascending",
    label: "Ascending",
    icon: "icon-arrow-circle-up",
  },
  {
    value: "desc",
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
  link?: string
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
    title: "Write an article",
    subtitle:
      "Create custom content directly in our built-in text editor or import using links.",
    link: ROUTES.NEW_ARTICLE,
  },
  {
    value: KnowledgeSourceTags.LINK,
    icon: "icon-link",
    title: "Add a link",
    subtitle:
      "Capture online content by entering URLs and we use our web clipper.",
  },
  {
    value: KnowledgeSourceTags.FAQ,
    icon: "icon-message-question",
    title: "Create FAQs",
    subtitle: "Build a repository of common questions and expert answers.",
  },
]
export const ACCEPTABLE_DOCUMENT_EXTENSIONS = new Set([
  "docx",
  "doc",
  "pdf",
  "txt",
])

export const INIT_PAGE_PARAMS = { key: KB_QUERY_KEYS.PAGE, value: null }
export const INIT_PARAMS = {
  PAGE: { key: KB_QUERY_KEYS.PAGE, value: null },
  SEARCH: { key: KB_QUERY_KEYS.SEARCH, value: null },
  TAGS: { key: KB_QUERY_KEYS.TAGS, value: null },
  PUBLISHED: { key: KB_QUERY_KEYS.TAB, value: KNOWLEDGE_BASE_TABS.All },
  PRIVACY: { key: KB_QUERY_KEYS.PRIVACY, value: null },
} as const
