import KnowledgeBase from "@/components/views/knowledge-base"
import {
  KB_QUERY_KEYS,
  KNOWLEDGE_BASE_TABS,
} from "@/components/views/knowledge-base/utils"
import { getKnowledgeSources } from "@/lib/data/knowledge-base"
import { KnowledgeSourceTags } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Knowledge base",
}

const PAGE_SIZE = 6

const KnowledgeBasePage: PageFC = async ({ searchParams }) => {
  const sort_by = searchParams?.[KB_QUERY_KEYS.SORT_BY] as string,
    tags = searchParams?.[KB_QUERY_KEYS.TAGS] as KnowledgeSourceTags,
    page = Number(searchParams?.[KB_QUERY_KEYS.PAGE] ?? 1),
    search = searchParams?.[KB_QUERY_KEYS.SEARCH] as string,
    published =
      searchParams?.[KB_QUERY_KEYS.TAB] === KNOWLEDGE_BASE_TABS.Draft
        ? false
        : searchParams?.[KB_QUERY_KEYS.TAB] === KNOWLEDGE_BASE_TABS.Published
          ? true
          : undefined,
    external =
      searchParams?.[KB_QUERY_KEYS.PRIVACY] === "internal" ? false : undefined

  const data = await getKnowledgeSources({
    sort_by,
    tags,
    page,
    page_size: PAGE_SIZE,
    search,
    external,
    published: published,
  })

  return (
    <KnowledgeBase
      hasFetchError={"error" in data}
      data={data.data?.results}
      isSearched={Boolean(
        search ||
          published !== undefined ||
          tags ||
          external !== undefined ||
          page > 1
      )}
      total={data.data?.count || 0}
      publishedTotal={0}
      unpublishedTotal={0}
      pageSize={data.data?.page_size || 0}
      page={data.data?.page || 1}
    />
  )
}

export default KnowledgeBasePage
