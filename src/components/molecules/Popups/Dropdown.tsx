"use client"

import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { useEffect, useRef, useState } from "react"

type AnchorPosition = {
  left?: number
  top?: number
  width?: number
  height?: number
}
type Slots = "root" | "triggerBtn" | "menu" | "menuContent" | "backdrop"
type Props = {
  classNames?: { [slot in Slots]?: string }
  menuClasses?: { open: TWClassNames; close: TWClassNames }
  anchorEl: HTMLElement | null
  isOpen: boolean
  close: () => void
}

const Dropdown: FC<Props> = ({
  children,
  classNames,
  menuClasses,
  anchorEl,
  isOpen,
  close,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef<NodeJS.Timeout>()
  const [anchorPos, setAnchorPos] = useState<AnchorPosition>()

  //   effects
  useEffect(() => {
    clearTimeout(timer.current)
    if (!isOpen) {
      timer.current = setTimeout(() => {
        setAnchorPos(undefined)
        ref.current?.classList.add(menuClasses?.close || "-top-[100vh]")
        ref.current?.classList.remove(menuClasses?.open || "top-full")
      }, 300)
    } else {
      setAnchorPos({
        top: anchorEl?.getBoundingClientRect().top,
        left: anchorEl?.getBoundingClientRect().left,
        width: anchorEl?.offsetWidth,
        height: anchorEl?.offsetHeight,
      })
      ref.current?.classList.remove(menuClasses?.close || "-top-[100vh]")
      ref.current?.classList.add(menuClasses?.open || "top-full")
    }
  }, [isOpen, anchorEl, menuClasses])

  return (
    <div className={cls("fixed z-1", classNames?.root)} style={anchorPos}>
      <div
        ref={ref}
        role="menu"
        className={cls("menu-container absolute right-0 ", classNames?.menu)}
      >
        <div
          data-opened={isOpen}
          className={cls(
            "fixed z-[3] top-0 left-0 w-full h-full hidden data-[opened=true]:block",
            classNames?.backdrop
          )}
          onClick={close}
        />
        <div
          data-opened={isOpen}
          className={cls(
            "relative z-[4] data-[opened=true]:opacity-100 data-[opened=true]:scale-100 data-[opened=false]:opacity-0 data-[opened=false]:scale-75 transition-all duration-300 origin-top-right shadow-soft-medium border border-gray-50 rounded-xl bg-white",
            classNames?.menuContent
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Dropdown
