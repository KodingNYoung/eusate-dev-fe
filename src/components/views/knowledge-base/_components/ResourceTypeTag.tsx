import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import React from "react"

type ResourceType = "file" | "website" | "article" | "faqs"
type Props = {
  type: ResourceType
}

const resourceIcon: { [type in ResourceType]: IconNames } = {
  file: "icon-document-text",
  website: "icon-link",
  article: "icon-article-text",
  faqs: "icon-message-question",
}
const resourceLabel: { [type in ResourceType]: string } = {
  file: "File",
  website: "Website",
  article: "Article",
  faqs: "FAQs",
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
