import KnowledgeBase from "@/components/views/knowledge-base"
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
  const { q, page, sortby, tags, pub, ext } = searchParams || {}
  const data = await getKnowledgeSources({
    sort_by: String(sortby),
    tags: String(tags) as KnowledgeSourceTags,
    page: Number(page),
    page_size: PAGE_SIZE,
    search: String(q),
    external: Boolean(ext),
    published: Boolean(pub),
  })

  return (
    <KnowledgeBase
      hasFetchError={"error" in data}
      data={data.data?.results}
      isSearched={Boolean(q)}
      total={data.data?.count || 0}
      pageSize={data.data?.page_size || 0}
    />
  )
}

export default KnowledgeBasePage
