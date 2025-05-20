"use client"

import Icon from "@/components/atoms/Icon"
import AppDropdown, {
  SectionsType,
} from "@/components/molecules/Popups/AppDropdown"
import { ROUTES } from "@/utils/constants"
import { FC, KnowledgeSource } from "@/utils/types"
import React from "react"
import { KB_QUERY_KEYS } from "../utils"

type Props = {
  row: KnowledgeSource
  publishToggleAction: () => void
  onDelete: () => void
}

const ResourceRowAction: FC<Props> = ({
  row,
  publishToggleAction,
  onDelete,
}) => {
  const sections: SectionsType = [
    {
      items: [
        {
          key: 0,
          label: "Open",
          icon: "icon-arrow-right",
          link: `${ROUTES.RESOURCE}/?${KB_QUERY_KEYS.ID}=${row.id}&${KB_QUERY_KEYS.TAGS}=${row.tag}`,
        },
        // {
        //   key: 1,
        //   label: "Edit",
        //   icon: "icon-edit-2",
        //   link: `${ROUTES.RESOURCE}/?${KB_QUERY_KEYS.ID}=${row.id}&${KB_QUERY_KEYS.TAGS}=${row.tag}`,
        // },
        {
          key: 2,
          label: row.published ? "Unpublish" : "Publish",
          icon: row.published ? "icon-slash" : "icon-send-2",
          action: publishToggleAction,
        },
      ],
      key: 1,
      props: { showDivider: true },
    },
    {
      items: [
        {
          key: 4,
          label: "Delete",
          icon: "icon-trash",
          className:
            "!text-error-500 group-hover/item:text-error-600 group-active/item:text-error-700 group-disabled/item:text-error-100",
          action: onDelete,
        },
      ],
      key: 2,
    },
  ]
  return (
    <AppDropdown
      triggerEl={<Icon name="icon-more" className="!text-regular-xl" />}
      triggerType="listbox"
      sections={sections}
      triggerBtnProps={{ isIconOnly: true, radius: "full" }}
      menuProps={{ disabledKeys: [4] }}
    />
  )
}

export default ResourceRowAction
