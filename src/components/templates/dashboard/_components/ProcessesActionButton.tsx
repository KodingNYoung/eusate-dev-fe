"use client"

import { FC } from "@/utils/types"
import React, { useState } from "react"
import Button from "@/components/molecules/Buttons"
import Icon from "@/components/atoms/Icon"
import AppPopover from "@/components/molecules/Popups/AppPopover"
import Typography from "@/components/atoms/Typography"
import { useProcessWithSocket } from "@/hooks/processesHooks"

const ProcessesActionButton: FC = () => {
  const [open, setOpen] = useState(false)

  const processes = useProcessWithSocket()
  return (
    <AppPopover
      trigger={
        <Button
          variant="primary"
          classNames={{
            root: "px-2.5 py-1.5 gap-2 h-10",
            label: "text-semibold-base",
          }}
          startContent={
            <Icon
              name="icon-layer-bold"
              className="text-regular-xl sm:text-regular-2xl"
            />
          }
        >
          {processes.data?.count || null}
        </Button>
      }
      classNames={{
        content:
          "bg-black mr-3 mt-2 min-w-[270px] max-h-[350px] overflow-auto p-3",
      }}
      isOpen={open}
      onOpenChange={setOpen}
    >
      <header className="flex items-center justify-between gap-2 text-gray-300 w-full">
        <Icon name="icon-layer-bold" size={16} />
        <Typography className="flex-1 text-medium-xs">
          Knowledge base
        </Typography>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-500 !leading-none"
        >
          <Icon name="icon-minus-circle" size={16} className="!leading-none" />
        </button>
      </header>
      <section className="flex flex-col "></section>
    </AppPopover>
  )
}

export default ProcessesActionButton
