import Icon from "@/components/atoms/Icon"
import { FC } from "@/utils/types"
import React from "react"

const HeaderActions: FC = () => {
  return (
    <>
      <button className="flex items-center justify-center size-8 sm:size-10 border border-gray-50 rounded-full text-gray-500">
        <Icon
          name="icon-notification"
          className="text-regular-xl sm:!text-regular-2xl"
        />
      </button>
    </>
  )
}

export default HeaderActions
