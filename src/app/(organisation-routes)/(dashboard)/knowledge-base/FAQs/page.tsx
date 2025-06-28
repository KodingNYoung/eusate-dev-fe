import FAQs from "@/components/views/faqs"
import { getKnowledgeSources } from "@/lib/data/knowledge-base"
import { KnowledgeSourceTags } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import React from "react"

const PAGE_SIZE = 8

const FAQsPage: PageFC = async ({ searchParams }) => {
  const { page } = searchParams || {}
  const data = await getKnowledgeSources({
    tags: KnowledgeSourceTags.FAQ,
    page_size: PAGE_SIZE,
    page: Number(page) || 1,
  })

  return (
    <FAQs
      data={data.data?.results}
      total={data.data?.count || 0}
      page={data.data?.page || 1}
      pageSize={PAGE_SIZE}
    />
  )
}

export default FAQsPage
