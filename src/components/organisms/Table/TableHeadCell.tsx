"use client"

import Icon from "@/components/atoms/Icon"
import AppTooltip, { TooltipProps } from "@/components/molecules/Tooltip"
import { TEXT_ALIGN_TO_FLEX_MAP } from "@/utils/constants"
import { cls } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import React, { ReactNode, ThHTMLAttributes } from "react"

export type TableHeadTooltip = {
  content: ReactNode
  icon: IconNames
  classNames?: TooltipProps["classNames"]
}
export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement> & {
  tooltip?: TableHeadTooltip
}

const TableHeadCell: FC<TableHeadProps> = ({
  children,
  tooltip,
  className,
  align,
  ...props
}) => {
  return (
    <th
      align={align || "left"}
      className={cls(
        "text-gray-600 text-medium-xs py-3 sm:first-of-type:pl-6 sm:last-of-type:pr-6 border-b border-gray-50 px-1",
        className
      )}
      {...props}
    >
      {!tooltip && children}
      {tooltip && (
        <div
          className={cls(
            "flex gap-1 items-center",
            TEXT_ALIGN_TO_FLEX_MAP[align || "left"]
          )}
        >
          <span>{children}</span>
          <AppTooltip
            placement="bottom"
            trigger="click"
            content={tooltip.content}
            classNames={{
              ...tooltip.classNames,
              content: cls("p-3", tooltip.classNames?.content),
            }}
          >
            <button className="flex items-center justify-center">
              <Icon name={tooltip.icon} size={16} />
            </button>
          </AppTooltip>
        </div>
      )}
    </th>
  )
}

export default TableHeadCell
