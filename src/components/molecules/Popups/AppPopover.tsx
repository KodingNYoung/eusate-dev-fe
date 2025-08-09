"use client"

import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import {
  Popover,
  PopoverContent,
  PopoverProps,
  PopoverSlots,
  PopoverTrigger,
} from "@nextui-org/react"
import React, { ReactElement } from "react"

export type AppPopoverProps = Omit<PopoverProps, "children"> & {
  classNames?: { [slot in PopoverSlots]?: string }
  trigger?: ReactElement
}

const AppPopover: FC<AppPopoverProps> = ({
  children,
  trigger,
  placement,
  classNames,
  ...props
}) => {
  return (
    <Popover
      placement={placement || "bottom-end"}
      classNames={{
        ...classNames,
        content: cls(
          "shadow-soft-medium border border-gray-50 rounded-xl p-0",
          classNames?.content
        ),
      }}
      {...props}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  )
}

export default AppPopover
