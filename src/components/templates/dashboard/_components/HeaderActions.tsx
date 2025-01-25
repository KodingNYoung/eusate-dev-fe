import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import { FC } from "@/utils/types"
import React from "react"
import ProcessesActionButton from "./ProcessesActionButton"

const HeaderActions: FC = () => {
  return (
    <>
      <ProcessesActionButton />
      <Button
        variant="tetiary"
        classNames={{
          root: "flex items-center justify-center size-8 sm:size-10 border border-gray-50 rounded-full",
          label: "text-gray-500",
        }}
        startContent={
          <Icon
            name="icon-notification"
            className="text-regular-xl sm:text-regular-2xl"
          />
        }
      />
    </>
  )
}

export default HeaderActions
