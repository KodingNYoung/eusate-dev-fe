import FAQs from "@/components/views/faqs"
import { getKnowledgeSources } from "@/lib/data/knowledge-base"
import { KnowledgeSourceTags } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import React from "react"

const FAQsPage: PageFC = async () => {
  const data = await getKnowledgeSources({
    tags: KnowledgeSourceTags.FAQ,
  })

  return <FAQs data={data.data?.results} total={data.data?.count || 0} />
}

export default FAQsPage
