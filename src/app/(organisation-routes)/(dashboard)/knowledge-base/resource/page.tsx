import TextEditor from "@/components/templates/text-editor"
import { KB_QUERY_KEYS } from "@/components/views/knowledge-base/utils"
import { getKnowledgeSource } from "@/lib/data/knowledge-base"
import { KnowledgeSourceTags } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import React from "react"

const EditResourcePage: PageFC = async ({ searchParams }) => {
  const id = searchParams?.[KB_QUERY_KEYS.ID] as string,
    tag = searchParams?.[KB_QUERY_KEYS.TAGS] as KnowledgeSourceTags
  const data = await getKnowledgeSource(id, tag)

  return <TextEditor resource={data.data} />
}

export default EditResourcePage
