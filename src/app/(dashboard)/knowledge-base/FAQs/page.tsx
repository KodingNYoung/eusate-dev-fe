import FAQs from "@/components/views/faqs"
import { getKnowledgeSources } from "@/lib/data/knowledge-base"
import { KnowledgeSourceTags } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import React from "react"

const FAQsPage: PageFC = async () => {
  const data = await getKnowledgeSources({
    tags: KnowledgeSourceTags.FAQ,
  })

  console.log({ data })
  return <FAQs />
}

export default FAQsPage
