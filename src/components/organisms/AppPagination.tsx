"use client"

import { FC } from "@/utils/types"
import { Pagination } from "@nextui-org/react"
import React from "react"
import Button from "../molecules/Buttons"
import Icon from "../atoms/Icon"
import { cls } from "@/utils/helpers"

type Props = {
  total: number
  page: number
  onChange: (page: number) => void
}

const AppPagination: FC<Props> = ({ onChange, page, total }) => {
  return (
    <div
      className={cls(
        "pt-5 pb-4 md:p-0 flex items-center mx-auto w-fit md:w-full justify-between"
      )}
    >
      <Button
        classNames={{
          root: "text-gray-900 px-3 py-2.5 md:pr-4.5 gap-2",
          label: "hidden md:block",
        }}
        variant="tetiary"
        startContent={
          <Icon name="icon-arrow-left" className="text-regular-xl" />
        }
        onClick={() => onChange(page > 1 ? page - 1 : page)}
      >
        Previous
      </Button>
      <Pagination
        size="lg"
        variant="light"
        total={total}
        page={page}
        onChange={onChange}
        classNames={{
          wrapper: "gap-0",
          cursor:
            "bg-gray-25 border border-gray-100 rounded-lg !text-gray-500 text-medium-sm",
          item: "!text-gray-400 text-medium-sm",
        }}
      />
      <Button
        classNames={{
          root: "text-gray-900 px-3 py-2.5 md:pl-4.5 gap-2",
          label: "hidden md:block",
        }}
        variant="tetiary"
        endContent={
          <Icon name="icon-arrow-right" className="text-regular-xl" />
        }
        onClick={() => onChange(page < total ? page + 1 : page)}
      >
        Next
      </Button>
    </div>
  )
}

export default AppPagination
