import KnowledgeBase from "@/components/views/knowledge-base"
import { KB_QUERY_KEYS } from "@/components/views/knowledge-base/utils"
import { KnowledgeSourceTags } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Knowledge base",
}

const PAGE_SIZE = 6

type SearchParamsProps = {
  [KB_QUERY_KEYS.SORT_BY]: string
  [KB_QUERY_KEYS.TAGS]: KnowledgeSourceTags
  [KB_QUERY_KEYS.PAGE]: number
  [KB_QUERY_KEYS.SEARCH]: string
  [KB_QUERY_KEYS.PRIVACY]?: "internal"
}

const KnowledgeBasePage: PageFC<unknown, SearchParamsProps> = async ({
  searchParams,
}) => {
  const sort_by = searchParams?.[KB_QUERY_KEYS.SORT_BY],
    tags = searchParams?.[KB_QUERY_KEYS.TAGS] as KnowledgeSourceTags,
    page = Number(searchParams?.[KB_QUERY_KEYS.PAGE] ?? 1),
    search = searchParams?.[KB_QUERY_KEYS.SEARCH] as string,
    external =
      searchParams?.[KB_QUERY_KEYS.PRIVACY] === "internal" ? false : undefined

  return (
    <KnowledgeBase
      options={{
        sort_by,
        tags,
        page,
        page_size: PAGE_SIZE,
        search,
        external,
      }}
    />
  )
}

export default KnowledgeBasePage
