"use client"

import { FC, TWClassNames } from "@/utils/types"
import { Tab, Tabs, TabsProps, TabsSlots } from "@heroui/react"
import React, { ReactNode } from "react"
import AppTab, { AppTabSlots } from "./Tab"
import { BadgeColor } from "@/components/atoms/Badge"
import { cls } from "@/utils/helpers"

type Tab = {
  label: string
  key: string | number
  startContent?: ReactNode
  endContent?: ReactNode
  badge?: number
  badgeColor?: BadgeColor
  disabled?: boolean
  classNames?: { [slot in AppTabSlots]?: TWClassNames }
}

type Props = TabsProps & {
  tabs: Tab[]
  classNames?: { [slot in TabsSlots]?: TWClassNames }
}

const AppTabs: FC<Props> = ({ tabs, variant, classNames, ...props }) => {
  return (
    <Tabs
      classNames={{
        tabList: cls("items-end gap-2.5 sm:gap-5", classNames?.tabList),
        tab: cls("px-3 pb-1.5 h-[unset]", classNames?.tab),
        cursor: cls("rounded", classNames?.cursor),
        ...classNames,
      }}
      variant={variant || "underlined"}
      {...props}
    >
      {tabs.map(({ key, ...tab }) => {
        return <Tab key={key} title={<AppTab {...tab} />} />
      })}
    </Tabs>
  )
}

export default AppTabs
