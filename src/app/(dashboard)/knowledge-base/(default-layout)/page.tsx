import KnowledgeBase from "@/components/views/knowledge-base"
import { KNOWLEDGE_BASE_TABS } from "@/components/views/knowledge-base/utils"
import { getKnowledgeSources } from "@/lib/data/knowledge-base"
// import { KnowledgeSourceTags } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Knowledge base",
}

// const PAGE_SIZE = 6

const KnowledgeBasePage: PageFC = async ({ searchParams }) => {
  const {
    q,
    // page, sortby, tags,
    tab,
    // ext
  } = searchParams || {}

  const published = tab === KNOWLEDGE_BASE_TABS.Draft ? false : undefined
  const data = await getKnowledgeSources({
    // sort_by: String(sortby ?? ""),
    // tags: tags as KnowledgeSourceTags,
    // page: Number(page ?? 0),
    // page_size: PAGE_SIZE,
    // search: String(q ?? ""),
    // external: ext ? Boolean(ext) : undefined,
    // published: published,
  })

  return (
    <KnowledgeBase
      hasFetchError={"error" in data}
      data={data.data?.results}
      isSearched={Boolean(q || published !== undefined)}
      total={data.data?.count || 0}
      pageSize={data.data?.page_size || 0}
      page={data.data?.page || 1}
    />
  )
}

export default KnowledgeBasePage
