import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { KnowledgeSourceTags } from "@/utils/enums"
import { cls } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import { FC, TWClassNames } from "@/utils/types"
import React from "react"

type Slots = "root" | "icon" | "label"
type Props = {
  type: KnowledgeSourceTags
  classNames?: { [slot in Slots]?: TWClassNames }
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

const ResourceTypeTag: FC<Props> = ({ type, className, classNames }) => {
  return (
    <div
      className={cls(
        "flex items-center justify-start gap-3",
        className,
        classNames?.root
      )}
    >
      <Icon
        name={resourceIcon[type]}
        className={cls("text-regular-xl", classNames?.icon)}
      />
      <Typography
        as="span"
        className={cls("text-regular-sm text-gray-500", classNames?.label)}
      >
        {resourceLabel[type]}
      </Typography>
    </div>
  )
}

export default ResourceTypeTag
