import React, { useMemo, useState } from "react"
import TableDataCell from "./TableDataCell"
import { FC, TableColumn } from "@/utils/types"
import { cls } from "@/utils/helpers"
import { SHOW_FOR } from "@/utils/constants"
import RowAccordionItem from "./RowAccordionItem"

type Props = {
  columns: TableColumn[]
  isOpen: boolean
  row: unknown
}

const RowAccordion: FC<Props> = ({ columns, isOpen, row }) => {
  const noOfMobileColumns = useMemo(
    () =>
      columns.filter((column) => column.showFor !== SHOW_FOR.NOT_MOBILE).length,
    [row]
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
                  value={render(row)}
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
