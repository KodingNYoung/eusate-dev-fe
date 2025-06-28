"use client"

import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import {
  Popover,
  PopoverContent,
  PopoverProps,
  PopoverSlots,
  PopoverTrigger,
  Tooltip,
} from "@heroui/react"
import React, { ReactNode } from "react"

export type TooltipProps = Omit<PopoverProps, "content" | "children"> & {
  content?: ReactNode
  trigger?: "hover" | "click"
  classNames?: { [slot in PopoverSlots]?: TWClassNames }
}

const AppTooltip: FC<TooltipProps> = ({
  content,
  children,
  trigger = "hover",
  classNames,
  ...props
}) => {
  const _classNames = {
    ...classNames,
    content: cls(
      "bg-black text-white text-regular-sm whitespace-normal rounded-xl",
      classNames?.content
    ),
    base: cls("before:bg-black"),
  }

  return trigger === "hover" ? (
    <Tooltip content={content} showArrow classNames={_classNames} {...props}>
      {children}
    </Tooltip>
  ) : trigger === "click" ? (
    <Popover showArrow classNames={_classNames} {...props}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  ) : null
}

export default AppTooltip
