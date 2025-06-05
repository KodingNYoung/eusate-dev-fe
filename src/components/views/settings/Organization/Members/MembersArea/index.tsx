import {
  Table,
  TableRow,
  TableBody,
  Selection,
  TableCell,
  TableHeader,
  TableColumn,
} from "@nextui-org/react"
import { Member } from "./utils"
import { FC } from "@/utils/types"
import Cell from "./_components/Cell"
import { useQueryParams } from "@/hooks/utilityHooks"
import { COLUMNS, ROWS_PER_PAGE } from "./utils/const"
import { MEMBER_QUERY_KEYS, Ord, Sortby } from "../utils"
import { useSettings } from "@/providers/settingsProvider"
import AppPagination from "@/components/organisms/AppPagination"
import { useCallback, useMemo, useState, useEffect } from "react"
import { filterItems, setPageContent, sortItems } from "./utils/helpers"

type Props = {
  page: number
  filterQuery: string | null
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const Area: FC<Props> = ({ page, setPage, filterQuery }) => {
  const {
    organization: { members },
  } = useSettings()
  const { get, set } = useQueryParams()
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))

  useEffect(() => {
    set(MEMBER_QUERY_KEYS.PAGE, page)
  }, [page, set])

  const filteredMembers = useMemo(
    () => filterItems(members, filterQuery),
    [members, filterQuery]
  )
  const pages = Math.ceil(filteredMembers.length / ROWS_PER_PAGE) || 1
  const currentPageMembers = useMemo(
    () => setPageContent(page, filteredMembers),
    [page, filteredMembers]
  )
  const sortMembers = useMemo(
    () =>
      sortItems(
        currentPageMembers,
        get(MEMBER_QUERY_KEYS.SORT_BY) as Sortby,
        get(MEMBER_QUERY_KEYS.ORD) as Ord
      ),
    [currentPageMembers, get]
  )
  const renderCell = useCallback((member: Member, columnKey: unknown) => {
    return Cell(member, columnKey)
  }, [])

  const bottomContent = useMemo(() => {
    return (
      <div className="px-8 py-2 pb-4 w-full">
        <AppPagination
          btnSize="sm"
          total={pages}
          page={page}
          onChange={setPage}
        />
      </div>
    )
  }, [page, pages, setPage])
  return (
    <Table
      isCompact
      removeWrapper
      selectionMode="multiple"
      aria-label="Members Table"
      selectedKeys={selectedKeys}
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      className="border border-gray-50 rounded-x20"
      classNames={{
        th: "bg-white border-b border-b-gray-50 text-gray-600",
        tr: "border-b border-b-gray-50",
      }}
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
    >
      <TableHeader columns={COLUMNS}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "action" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No data found" items={sortMembers}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnkey) => (
              <TableCell>{renderCell(item, columnkey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default Area
