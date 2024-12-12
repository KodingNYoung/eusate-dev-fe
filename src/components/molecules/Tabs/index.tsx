"use client"

import { FC, TWClassNames } from "@/utils/types"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import Tab from "./Tab"
import { cls } from "@/utils/helpers"

export type TabVariant = "line"
type Tab = {
  label: string
  key: string | number
  startContent?: ReactNode
  endContent?: ReactNode
  badge?: number
  disabled?: boolean
}

type Props = {
  tabs: Tab[]
  variant?: TabVariant
  onChange?: (tab: Tab) => void
}

const variantStyle: { [variant in TabVariant]: TWClassNames } = {
  line: "h-0.5 bg-gray-900 rounded-sm",
}

const Tabs: FC<Props> = ({ tabs, variant = "line", onChange }) => {
  const tabRefs = useRef<HTMLDivElement[]>([])
  const [active, setActive] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number
    width: number
  }>()

  useEffect(() => {
    const activeTab = tabRefs.current[active]

    if (activeTab) {
      const { offsetLeft, offsetWidth } = activeTab
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth })
    }
  }, [active, tabRefs])

  return (
    <div className="relative w-fit">
      <div className="flex items-center gap-5">
        {tabs.map(({ key, ...tab }, idx) => {
          return (
            <div
              key={key}
              ref={(el) => {
                if (el) tabRefs.current[idx] = el
              }}
            >
              <Tab
                active={idx === active}
                onClick={() => {
                  setActive(idx)
                  if (onChange) {
                    onChange({ key, ...tab })
                  }
                }}
                variant={variant}
                {...tab}
              />
            </div>
          )
        })}
      </div>
      <div
        className={cls(
          "absolute bottom-0 transition-all duration-500",
          variantStyle[variant]
        )}
        style={indicatorStyle}
      />
    </div>
  )
}

export default Tabs
