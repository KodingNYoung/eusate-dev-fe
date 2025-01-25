"use client"

import { FC } from "@/utils/types"
import React from "react"
import Button from "@/components/molecules/Buttons"
import Icon from "@/components/atoms/Icon"

const ProcessesActionButton: FC = () => {
  return (
    <div>
      <Button
        variant="primary"
        classNames={{
          root: "px-3 py-1.5 gap-2",
          label: "text-semibold-base",
        }}
        startContent={
          <Icon
            name="icon-layer-bold"
            className="text-regular-xl sm:text-regular-2xl"
          />
        }
      >
        5
      </Button>
    </div>
  )
}

export default ProcessesActionButton
