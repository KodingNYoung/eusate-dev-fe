import { FC, TableColumn } from "@/utils/types"
import React from "react"
import TableHeadCell from "./TableHeadCell"
import { cls } from "@/utils/helpers"
import Pagination from "./Pagination"
import TableRow from "./TableRow"
import Typography from "@/components/atoms/Typography"

type Props = {
  pagination?: unknown
  columns: TableColumn<any>[]
  data: unknown[]
  onRowClick?: (row: unknown) => void
}

export const screensizeDisplayClasses = {
  "mobile-only": "sm:hidden",
  "not-mobile": "hidden sm:table-cell",
  "all": "",
} as const

const Table: FC<Props> = ({ pagination, columns, data, onRowClick }) => {
  return (
    <section className="sm:rounded-x20 sm:border border-gray-50 overflow-x-auto overflow-visible w-full">
      <table
        data-pagination={Boolean(pagination)}
        className="group/table rounded-[inherit] w-full"
      >
        <thead className="hidden sm:table-header-group">
          <tr className="py-3 sm:px-6 group/tr">
            {columns.map(
              ({ title, id, classNames, align, tooltip, showFor }) => {
                return (
                  <TableHeadCell
                    key={id}
                    className={cls(
                      "whitespace-nowrap",
                      showFor && screensizeDisplayClasses[showFor],
                      classNames?.cell,
                      classNames?.th
                    )}
                    align={align}
                    {...(tooltip
                      ? {
                          tooltip: {
                            ...tooltip,
                            icon: "icon-help",
                            content: (
                              <main className="flex flex-col gap-1">
                                <Typography as="h3" variant="semibold-base">
                                  {tooltip.title}
                                </Typography>
                                <Typography
                                  as="span"
                                  variant="regular-sm"
                                  className="text-gray-500"
                                >
                                  {tooltip.subtitle}
                                </Typography>
                              </main>
                            ),
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
        <tbody>
          {data.map((row, idx) => (
            <TableRow
              key={`table-row-${idx}`}
              row={row}
              onClick={onRowClick}
              columns={columns}
              idx={idx}
              isLast={data.length - 1 === idx}
            />
          ))}
        </tbody>
      </table>
      {!!pagination && <Pagination />}
    </section>
  )
}

export default Table
