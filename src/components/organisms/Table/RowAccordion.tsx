import React, { useMemo } from "react"
import TableDataCell from "./TableDataCell"
import { TableColumn } from "@/utils/types"
import { cls } from "@/utils/helpers"
import { SHOW_FOR } from "@/utils/constants"
import RowAccordionItem from "./RowAccordionItem"

type Props<T> = {
  columns: TableColumn<T>[]
  isOpen: boolean
  row: T
  loading?: boolean
}

const RowAccordion = <T,>({ columns, isOpen, row, loading }: Props<T>) => {
  const noOfMobileColumns = useMemo(
    () =>
      columns.filter((column) => column.showFor !== SHOW_FOR.NOT_MOBILE).length,
    [columns]
  )

  return (
    <tr className="group/accordion sm:hidden table-row">
      <TableDataCell colSpan={noOfMobileColumns} className={cls("!p-0")}>
        <div
          className={cls("grid overflow-hidden transition-all duration-300")}
          style={{
            maxHeight: isOpen ? (columns.length - noOfMobileColumns) * 48 : 0,
          }}
        >
          {columns
            .filter((column) => column.showFor === SHOW_FOR.NOT_MOBILE)
            .map(({ title, render, id, tooltip }) => {
              return (
                <RowAccordionItem
                  key={id}
                  title={title}
                  value={render(row, loading)}
                  tooltip={tooltip}
                />
              )
            })}
        </div>
      </TableDataCell>
    </tr>
  )
}

export default RowAccordion
