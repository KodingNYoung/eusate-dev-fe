"use client"

import { FC } from "@/utils/types"
import React, { useState } from "react"
import Button from "@/components/molecules/Buttons"
import Icon from "@/components/atoms/Icon"
import AppPopover from "@/components/molecules/Popups/AppPopover"
import Typography from "@/components/atoms/Typography"
import { useProcesses } from "@/hooks/processHooks"
import { resourceIcon } from "@/components/views/knowledge-base/_components/ResourceTypeTag"
import Spinner from "@/components/atoms/Spinner"

const ProcessesActionButton: FC = () => {
  const [open, setOpen] = useState(false)

  const { processes, count } = useProcesses()

  return count && processes?.length ? (
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
          {count || null}
        </Button>
      }
      classNames={{
        content:
          "bg-black border-0 mr-0 mt-2 min-w-[270px] w-[300px] max-w-full max-h-[350px] overflow-auto p-3",
      }}
      isOpen={open}
      onOpenChange={setOpen}
    >
      <header className="flex items-center justify-between gap-2 text-gray-300 w-full mb-5">
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
      <section className="flex flex-col gap-5 w-full">
        {processes.map((process, idx) => {
          return (
            <div className="flex items-center gap-2 w-full" key={idx}>
              <div className="w-6 h-6 min-w-6 min-h-6 bg-gray-900 rounded-full flex items-center justify-center">
                <Icon
                  name={resourceIcon[process.tag]}
                  size={14}
                  className="text-gray-300"
                />
              </div>
              <Typography
                as="span"
                className="flex-1 text-medium-xs text-gray-100 truncate"
              >
                {process.resource_title}
              </Typography>

              <Spinner className="text-white" />
            </div>
          )
        })}
      </section>
    </AppPopover>
  ) : null
}

export default ProcessesActionButton
