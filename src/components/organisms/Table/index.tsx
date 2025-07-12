import { TableColumn, TWClassNames } from "@/utils/types"
import React from "react"
import TableHeadCell from "./TableHeadCell"
import { cls } from "@/utils/helpers"
import AppPagination, { AppPaginationProps } from "../AppPagination"
import TableRow from "./TableRow"

type TableSlots =
  | "root"
  | "table"
  | "thead"
  | "thr"
  | "th"
  | "tbody"
  | "tdr"
  | "td"
  | "cell"

type Props<T> = {
  pagination?: AppPaginationProps
  columns: TableColumn<T>[]
  data: T[]
  onRowClick?: (row: unknown) => void
  classNames?: { [slots in TableSlots]?: TWClassNames }
  loading?: boolean
  defaultRows?: number
}

export const screensizeDisplayClasses = {
  "mobile-only": "sm:hidden",
  "not-mobile": "hidden sm:table-cell",
  "all": "",
} as const

const Table = <T = "unknown",>({
  pagination,
  columns,
  data,
  onRowClick,
  classNames,
  loading,
  defaultRows = 6,
}: Props<T>) => {
  return (
    <section
      className={cls(
        "sm:rounded-x20 sm:border border-gray-50 overflow-x-auto overflow-visible w-full custom-scrollbar",
        classNames?.root
      )}
    >
      <table
        data-pagination={Boolean(pagination)}
        className={cls(
          "group/table rounded-[inherit] w-full",
          classNames?.table
        )}
      >
        <thead
          className={cls("hidden sm:table-header-group", classNames?.thead)}
        >
          <tr className={cls("py-3 sm:px-6 group/tr", classNames?.thr)}>
            {columns.map(
              ({
                title,
                id,
                classNames: clsnames,
                align,
                tooltip,
                showFor,
              }) => {
                return (
                  <TableHeadCell
                    key={id}
                    className={cls(
                      "whitespace-nowrap",
                      showFor && screensizeDisplayClasses[showFor],
                      clsnames?.cell,
                      clsnames?.th,
                      classNames?.th,
                      classNames?.cell
                    )}
                    align={align}
                    {...(tooltip
                      ? {
                          tooltip: {
                            ...tooltip,
                            icon: "icon-help",
                            content: tooltip.content,
                          },
                        }
                      : {})}
                  >
                    {title}
                  </TableHeadCell>
                )
              }
            )}
          </tr>
        </thead>
        <tbody className={cls(classNames?.tbody)}>
          {((data && data.length) || loading) &&
            (data.length ? data : new Array(defaultRows).fill({})).map(
              (row, idx) => (
                <TableRow
                  key={`table-row-${idx}`}
                  row={row}
                  onClick={onRowClick}
                  columns={columns}
                  idx={idx}
                  isLast={data.length - 1 === idx}
                  classNames={{
                    root: classNames?.tdr,
                    cell: classNames?.cell,
                    td: classNames?.td,
                  }}
                  loading={loading}
                />
              )
            )}
        </tbody>
      </table>
      {pagination ? (
        <div className="py-3 sm:py-4 md:px-6 sticky left-0">
          <AppPagination
            total={pagination.total}
            page={pagination.page}
            onChange={pagination.onChange}
          />
        </div>
      ) : null}
    </section>
  )
}

export default Table
