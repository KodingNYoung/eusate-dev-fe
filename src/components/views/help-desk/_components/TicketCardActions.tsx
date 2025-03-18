"use client"
import Icon from "@/components/atoms/Icon"
import AppDropdown from "@/components/molecules/Popups/AppDropdown"
import { FC } from "@/utils/types"
import React from "react"

const TicketCardActions: FC = () => {
  const sections = [
    {
      items: [
        {
          key: 0,
          label: "View details",
          // action: () => console.log("view"),
        },
        {
          key: 1,
          label: "Update status",
          // action: () => console.log("update"),
        },
        {
          key: 2,
          label: "Add notes",
          // action: () => console.log("add notes"),
        },
        {
          key: 3,
          label: "Send a reply",
          // action: () => console.log("send reply"),
        },
        {
          key: 4,
          label: "Join call",
          // action: () => console.log("join call"),
        },
      ],
    },
  ]

  return (
    <AppDropdown
      triggerEl={<Icon name="icon-more" className="text-gray-300" size={20} />}
      triggerType="listbox"
      sections={sections}
      triggerBtnProps={{
        isIconOnly: true,
        radius: "full",
        size: "sm",
        className: "min-w-6 h-6 w-6",
      }}
      menuProps={{
        itemClasses: {
          title: "text-[14px] font-app font-medium text-gray-600",
        },
      }}
    />
  )
}
export default TicketCardActions
