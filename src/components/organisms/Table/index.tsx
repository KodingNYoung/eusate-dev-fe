import { FC, TableColumn } from "@/utils/types"
import React from "react"
import TableHeadCell from "./TableHeadCell"
import TableDataCell from "./TableDataCell"
import { cls } from "@/utils/helpers"
import Pagination from "./Pagination"
import TableRow from "./TableRow"

type Props = {
  pagination?: {}
  columns: TableColumn[]
  data: unknown[]
  onRowClick?: (row: unknown) => void
}

const Table: FC<Props> = ({ pagination, columns, data, onRowClick }) => {
  return (
    <section className="sm:rounded-x20 sm:border border-gray-50 overflow-x-auto overflow-visible w-full">
      <table
        data-pagination={Boolean(pagination)}
        className="group/table rounded-[inherit] w-full"
      >
        <thead className="hidden sm:table-header-group">
          <tr className="py-3 sm:px-6 group/tr">
            {columns.map(({ title, id, classNames, align, tooltip }) => {
              return (
                <TableHeadCell
                  key={id}
                  className={cls(
                    "whitespace-nowrap",
                    classNames?.cell,
                    classNames?.th
                  )}
                  align={align}
                  {...(tooltip
                    ? {
                        tooltip: {
                          ...tooltip,
                          icon: "icon-help",
                        },
                      }
                    : {})}
                >
                  {title}
                </TableHeadCell>
              )
            })}
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
            />
          ))}
        </tbody>
      </table>
      {pagination && <Pagination />}
    </section>
  )
}

export default Table
