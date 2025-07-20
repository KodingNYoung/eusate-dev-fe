import TextEditor from "@/components/templates/text-editor"
import { KB_QUERY_KEYS } from "@/components/views/knowledge-base/utils"
import { KnowledgeSourceTags } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import React from "react"

type SearchParams = {
  [KB_QUERY_KEYS.ID]: string
  [KB_QUERY_KEYS.TAGS]: KnowledgeSourceTags
}

const EditResourcePage: PageFC<unknown, SearchParams> = async ({
  searchParams,
}) => {
  return (
    <TextEditor
      id={searchParams?.[KB_QUERY_KEYS.ID]}
      tag={searchParams?.[KB_QUERY_KEYS.TAGS]}
    />
  )
}

export default EditResourcePage
