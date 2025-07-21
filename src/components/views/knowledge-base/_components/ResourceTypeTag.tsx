import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { KnowledgeSourceTags } from "@/utils/enums"
import { cls } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  type: KnowledgeSourceTags
}

export const resourceIcon: { [type in KnowledgeSourceTags]: IconNames } = {
  document: "icon-document-text",
  link: "icon-link",
  article: "icon-article-text",
  faq: "icon-message-question",
}
const resourceLabel: { [type in KnowledgeSourceTags]: string } = {
  document: "File",
  link: "Link",
  article: "Article",
  faq: "FAQs",
}

const ResourceTypeTag: FC<Props> = ({ type, className }) => {
  return (
    <div className={cls("flex items-center justify-start gap-3", className)}>
      <Icon name={resourceIcon[type]} className="text-regular-xl" />
      <Typography as="span" className="text-regular-sm text-gray-500">
        {resourceLabel[type]}
      </Typography>
    </div>
  )
}

export default ResourceTypeTag
