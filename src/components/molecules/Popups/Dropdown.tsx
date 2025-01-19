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

type Props = Omit<PopoverProps, "children"> & {
  classNames?: { [slot in PopoverSlots | "triggerContainer"]?: string }
  trigger: ReactElement
}

const Dropdown: FC<Props> = ({
  children,
  trigger,
  classNames: { triggerContainer, ...classNames } = {},
}) => {
  return (
    <Popover
      placement="bottom-end"
      classNames={{
        ...classNames,
        content: cls(
          "shadow-soft-medium border border-gray-50 rounded-xl p-0",
          classNames?.content
        ),
      }}
    >
      <PopoverTrigger>
        <div className={triggerContainer}>{trigger}</div>
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  )
}

export default Dropdown
