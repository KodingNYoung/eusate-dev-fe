import { ItemType } from "@/components/organisms/Table/TableActionItem"
import TableRowAction from "@/components/organisms/Table/TableRowAction"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  row: unknown
}

const items: (ItemType & { action?: (row: unknown) => void })[] = [
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
  { key: 2, label: "Unpublish", icon: "icon-slash" },
  { key: 3, divider: true },
  {
    key: 4,
    label: "Delete",
    icon: "icon-trash",
    button: { variant: "errorText" },
  },
]

const ResourceRowAction: FC<Props> = ({ row }) => {
  return <TableRowAction items={items} row={row} />
}

export default ResourceRowAction
