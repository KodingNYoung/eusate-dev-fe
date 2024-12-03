import { cls } from "@/utils/helpers"
import { FC, TableColumn } from "@/utils/types"
import React from "react"
import TableDataCell from "./TableDataCell"

type Props = {
  idx: number
  columns: TableColumn[]
  onClick?: (row: unknown) => void
  row: unknown
}

const TableRow: FC<Props> = ({ idx, onClick, columns, row }) => {
  return (
    <React.Fragment>
      <tr
        className={cls(
          "py-3 sm:px-6 group/tr w-full",
          onClick && "cursor-pointer"
        )}
        onClick={() => onClick && onClick(row)}
      >
        {columns.map(({ id, render, align, classNames }) => (
          <TableDataCell
            key={`table-row-${idx}-col-${id}`}
            align={align}
            className={cls(classNames?.cell, classNames?.td)}
          >
            <span className="whitespace-nowrap">{render(row)}</span>
          </TableDataCell>
        ))}
      </tr>
    </React.Fragment>
  )
}

export default TableRow
