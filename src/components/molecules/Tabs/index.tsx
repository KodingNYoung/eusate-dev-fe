"use client"

import { FC } from "@/utils/types"
import { Tab, Tabs, TabsProps } from "@nextui-org/react"
import React, { ReactNode } from "react"
import AppTab from "./Tab"

type Tab = {
  label: string
  key: string | number
  startContent?: ReactNode
  endContent?: ReactNode
  badge?: number
  disabled?: boolean
}

type Props = TabsProps & {
  tabs: Tab[]
}

const AppTabs: FC<Props> = ({ tabs, variant, ...props }) => {
  return (
    <Tabs
      classNames={{
        base: "",
        tabList: "items-end gap-5",
        tab: "px-1 h-[unset]",
        tabContent: "",
        cursor: "",
        panel: "",
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
