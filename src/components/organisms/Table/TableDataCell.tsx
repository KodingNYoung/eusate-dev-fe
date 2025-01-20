import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React, { TdHTMLAttributes } from "react"

type Props = TdHTMLAttributes<HTMLTableCellElement> & {}

const TableDataCell: FC<Props> = ({ children, className, ...props }) => {
  return (
    <td
      className={cls(
        "border-b border-gray-50 py-4 sm:py-6 px-4 sm:first-of-type:pl-6 sm:last-of-type:pr-6 text-regular-sm text-gray-600",
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}

export default TableDataCell
