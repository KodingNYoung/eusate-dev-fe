import { ItemType } from "@/components/organisms/Table/TableActionItem"
import TableRowAction from "@/components/organisms/Table/TableRowAction"
import { FC, KnowledgeSource } from "@/utils/types"
import React from "react"

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
  const items: (ItemType & { action?: () => void })[] = [
    {
      key: 0,
      label: "Open",
      icon: "icon-arrow-right",
    },
    {
      key: 1,
      label: "Edit",
      icon: "icon-edit-2",
    },
    {
      key: 2,
      label: row.published ? "Unpublish" : "Publish",
      icon: row.published ? "icon-slash" : "icon-send-2",
      action: publishToggleAction,
    },
    { key: 3, divider: true },
    {
      key: 4,
      label: "Delete",
      icon: "icon-trash",
      button: { variant: "errorText" },
      action: onDelete,
    },
  ]
  return <TableRowAction items={items} />
}

export default ResourceRowAction
