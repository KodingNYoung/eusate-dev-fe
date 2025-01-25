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
import React, { ReactElement, useState } from "react"

type Props = Omit<PopoverProps, "children"> & {
  classNames?: { [slot in PopoverSlots | "triggerContainer"]?: string }
  trigger: ReactElement
}

const Dropdown: FC<Props> = ({
  children,
  trigger,
  classNames: { triggerContainer, ...classNames } = {},
  ...props
}) => {
  const [open, setOpen] = useState(false)

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
      isOpen={open}
      onOpenChange={(open) => setOpen(open)}
      {...props}
    >
      <PopoverTrigger>
        <div className={triggerContainer}>{trigger}</div>
      </PopoverTrigger>
      <PopoverContent onClickCapture={() => setOpen(false)}>
        {children}
      </PopoverContent>
    </Popover>
  )
}

export default Dropdown
