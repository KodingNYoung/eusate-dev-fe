import Icon from "@/components/atoms/Icon"
import AppDropdown, {
  ItemType,
} from "@/components/molecules/Popups/AppDropdown"
import { useAuth } from "@/providers/authProvider"
import { FC, OrganisationUser } from "@/utils/types"
import React from "react"

type Props = {
  row: OrganisationUser
  onManage: () => void
  onDelete: () => void
}

const MemberRowAction: FC<Props> = ({ row, onManage, onDelete }) => {
  const { user } = useAuth()
  const items: ItemType[] = [
    {
      key: 0,
      label: "Manage access",
      icon: "icon-security-user",
      action: onManage,
    },
  ]

  if (user?.userId !== row?.user?.id) {
    items.push({
      key: 1,
      label: "Remove agent",
      icon: "icon-trash",
      className:
        "!text-error-500 group-hover/item:text-error-600 group-active/item:text-error-700 group-disabled/item:text-error-100",
      action: onDelete,
    })
  }

  return row.owner ? null : (
    <AppDropdown
      triggerEl={<Icon name="icon-more" className="!text-regular-xl" />}
      triggerType="listbox"
      sections={[{ items }]}
      triggerBtnProps={{ isIconOnly: true, radius: "full" }}
    />
  )
}

export default MemberRowAction
