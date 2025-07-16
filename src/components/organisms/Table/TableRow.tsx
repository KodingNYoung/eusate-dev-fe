"use client"
import { cls } from "@/utils/helpers"
import { TableColumn, TWClassNames } from "@/utils/types"
import React, { useMemo, useState } from "react"
import TableDataCell from "./TableDataCell"
import { screensizeDisplayClasses } from "."
import RowAccordion from "./RowAccordion"
import { SHOW_FOR, TEXT_ALIGN_TO_FLEX_MAP } from "@/utils/constants"

type TableRowSlots = "root" | "td" | "cell"

type Props<T> = {
  idx: number
  columns: TableColumn<T>[]
  onClick?: (row: T) => void
  row: T
  isLast?: boolean
  classNames?: { [slot in TableRowSlots]?: TWClassNames }
  loading?: boolean
}

const TableRow = <T,>({
  idx,
  onClick,
  columns,
  row,
  isLast,
  classNames,
  loading,
}: Props<T>) => {
  const [openAccordion, setOpenAccordion] = useState(false)
  const hasAccordion = useMemo(
    () => columns.some((column) => column.showFor === SHOW_FOR.NOT_MOBILE),
    [columns]
  )
  const hasResult = useMemo(
    () => "result" in (row as { result: unknown }),
    [row]
  )
  return (
    <React.Fragment>
      <tr
        className={cls(
          "py-3 sm:px-6 group/tr w-full",
          classNames?.root,
          onClick && "cursor-pointer"
        )}
        onClick={() => onClick && onClick(row)}
      >
        {columns.map(
          ({ id, render, align, classNames: clsnames, showFor, clickable }) => (
            <TableDataCell
              key={`table-row-${idx}-col-${id}`}
              align={align}
              className={cls(
                showFor && screensizeDisplayClasses[showFor],
                hasAccordion && "!border-0 sm:!border-b",
                hasResult && "!border-0",
                isLast &&
                  "group-[:not([data-pagination=true])]/table:!border-b-0",
                clsnames?.cell,
                clsnames?.td,
                classNames?.td,
                classNames?.cell
              )}
              clickable={clickable}
            >
              {id === "accordion-trigger" ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenAccordion((curr) => !curr)
                  }}
                  className={cls(
                    "whitespace-nowrap transition-transform duration-300",
                    openAccordion ? "-rotate-180" : "rotate-0"
                  )}
                >
                  {render(row, loading)}
                </button>
              ) : (
                <span
                  className={cls(
                    "whitespace-nowrap flex",
                    TEXT_ALIGN_TO_FLEX_MAP[align || "left"]
                  )}
                >
                  {render(row, loading)}
                </span>
              )}
            </TableDataCell>
          )
        )}
      </tr>
      {hasAccordion && (
        <RowAccordion
          columns={columns}
          row={row}
          isOpen={openAccordion}
          loading={loading}
        />
      )}
      {hasResult && (
        <tr>
          <TableDataCell
            className="!p-0"
            colSpan={
              columns.filter((column) => column.showFor !== "mobile-only")
                .length
            }
          >
            result
          </TableDataCell>
        </tr>
      )}
    </React.Fragment>
  )
}

export default TableRow
