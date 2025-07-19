"use client"

import { FC, TWClassNames } from "@/utils/types"
import { Pagination } from "@nextui-org/react"
import React from "react"
import Button, { ButtonProps } from "../molecules/Buttons"
import Icon from "../atoms/Icon"
import { cls } from "@/utils/helpers"

export type AppPaginationProps = {
  page: number
  total: number
  className?: TWClassNames
  btnSize?: ButtonProps["size"]
  onChange: (page: number) => void
}

const AppPagination: FC<AppPaginationProps> = ({
  page,
  total,
  btnSize,
  onChange,
  className,
}) => {
  return (
    <>
      <div
        className={cls(
          "hidden md:flex pt-5 pb-4 md:p-0 items-center mx-auto w-fit md:w-full justify-between",
          className
        )}
      >
        <Button
          size={btnSize}
          disabled={page === 1}
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
          size={btnSize}
          classNames={{
            root: "text-gray-900 px-3 py-2.5 md:pl-4.5 gap-2",
            label: "hidden md:block",
          }}
          variant="tetiary"
          disabled={total <= page}
          endContent={
            <Icon name="icon-arrow-right" className="text-regular-xl" />
          }
          onClick={() => onChange(page < total ? page + 1 : page)}
        >
          Next
        </Button>
      </div>
      <div className="flex justify-center md:hidden">
        <Pagination
          showControls
          isCompact
          size="lg"
          variant="light"
          total={total}
          page={page}
          onChange={onChange}
          classNames={{
            base: "border border-gray-100 p-0 block m-0 rounded-lg",
            cursor:
              "bg-gray-50 border-none right-0 shadow-none rounded-none !text-gray-900 text-medium-sm w-[39px] min-w-[39px]",
            item: "!text-gray-500 text-medium-sm border-r ",
            prev: "border-r",
          }}
        />
      </div>
    </>
  )
}

export default AppPagination
