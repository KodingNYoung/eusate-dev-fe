import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import { FC } from "@/utils/types"
import React from "react"

const Pagination: FC = () => {
  return (
    <div className="px-6 pt-5 pb-4 flex justify-between">
      <Button
        classNames={{ root: "text-gray-900 px-3 py-2.5 pr-4.5 gap-2" }}
        variant="tetiary"
        startContent={
          <Icon name="icon-arrow-left" className="text-regular-xl" />
        }
      >
        Previous
      </Button>
      <Button
        classNames={{ root: "text-gray-900 px-3 py-2.5 pl-4.5 gap-2" }}
        variant="tetiary"
        endContent={
          <Icon name="icon-arrow-right" className="text-regular-xl" />
        }
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination
