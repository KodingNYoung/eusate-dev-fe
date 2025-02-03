import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { KnowledgeSourceTags } from "@/utils/enums"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  type: KnowledgeSourceTags
}

const resourceIcon: { [type in KnowledgeSourceTags]: IconNames } = {
  document: "icon-document-text",
  website: "icon-link",
  article: "icon-article-text",
  faq: "icon-message-question",
}
const resourceLabel: { [type in KnowledgeSourceTags]: string } = {
  document: "File",
  website: "Website",
  article: "Article",
  faq: "FAQs",
}

const ResourceTypeTag: FC<Props> = ({ type }) => {
  return (
    <div className="flex items-center justify-start gap-3">
      <Icon name={resourceIcon[type]} className="text-regular-xl" />
      <Typography as="span" className="text-regular-sm text-gray-500">
        {resourceLabel[type]}
      </Typography>
    </div>
  )
}

export default ResourceTypeTag
