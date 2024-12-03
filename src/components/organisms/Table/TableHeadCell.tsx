"use client"

import Icon from "@/components/atoms/Icon"
import Tooltip, {
  TooltipAlignment,
  TooltipPosition,
  TooltipProps,
} from "@/components/molecules/Tooltip"
import { useVisible } from "@/hooks/popupHooks"
import { TEXT_ALIGN_TO_FLEX_MAP } from "@/utils/constants"
import { cls } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import React, { ReactNode, ThHTMLAttributes } from "react"

export type TableHeadTooltip = {
  content: ReactNode
  icon: IconNames
  position?: TooltipPosition
  alignment?: TooltipAlignment
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
  const { toggle, close, visible } = useVisible()
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
          <Tooltip
            content={tooltip.content}
            position={tooltip?.position || "bottom"}
            alignment={tooltip?.alignment || "center"}
            visible={visible}
            close={close}
            classNames={{
              ...tooltip.classNames,
              tooltip: cls(
                "rounded-xl p-3 text-gray-500 text-left",
                tooltip.classNames?.tooltip
              ),
            }}
          >
            <button
              onClick={toggle}
              className="flex items-center justify-center"
            >
              <Icon name={tooltip.icon} />
            </button>
          </Tooltip>
        </div>
      )}
    </th>
  )
}

export default TableHeadCell
