"use client"
import { FC, KnowledgeSource, TableColumn } from "@/utils/types"
import React from "react"
import TableTop from "./_components/TableTop"
import Table from "@/components/organisms/Table"
import Checkbox from "@/components/molecules/Checkbox"
import ResourceTypeTag from "./_components/ResourceTypeTag"
import ResourceRowAction from "./_components/ResourceRowAction"
import Icon from "@/components/atoms/Icon"
import EmptyState from "./_components/EmptyState"
import AddSourceModal from "./_components/AddSourceModal"
import AddwebsiteModal from "./_components/AddWebsiteModal"
import dayjs from "dayjs"

type Props = {
  hasFetchError?: boolean
  data?: KnowledgeSource[]
  isSearched: boolean
  total: number
  pageSize: number
}

const columns: TableColumn<KnowledgeSource>[] = [
  {
    id: 1,
    title: <Checkbox name="select-all" />,
    render: () => <Checkbox name="select-" />,
    classNames: {
      cell: "w-[1%] whitespace-nowrap",
    },
  },
  {
    id: 2,
    title: "Title",
    classNames: { td: "text-black-90 !text-medium-sm" },
    render: (row) => row.title,
  },
  {
    id: 3,
    title: "Content type",
    showFor: "not-mobile",
    render: (row) => <ResourceTypeTag type={row.tag} />,
  },
  {
    id: 4,
    title: "Last updated",
    showFor: "not-mobile",
    render: (row) => dayjs(row.date_created).format("DD MMM, YYYY. H:MMA"),
  },
  {
    id: 5,
    title: "Date added",
    showFor: "not-mobile",
    render: (row) => dayjs(row.date_created).format("DD MMM, YYYY. H:MMA"),
  },
  {
    id: 6,
    title: "Internal only",
    showFor: "not-mobile",
    align: "center",
    tooltip: {
      title: "Internal source",
      subtitle:
        "Confidential information for internal use only. AI uses this only when interacting with customer representatives and business owners, never with customers.",
      classNames: { tooltip: "min-w-[210px]" },
    },
    render: () => (
      <Checkbox name="select-" classNames={{ root: "mx-auto w-fit" }} />
    ),
  },
  {
    id: "accordion-trigger",
    title: "",
    showFor: "mobile-only",
    align: "center",
    classNames: {
      cell: "w-[1%] whitespace-nowrap bg-white",
    },
    render: () => <Icon name="icon-chevron-down" className="text-regular-xl" />,
  },
  {
    id: 7,
    title: "Action",
    classNames: {
      cell: "w-[1%] whitespace-nowrap bg-white",
    },
    align: "center",
    render: (row) => <ResourceRowAction row={row} />,
  },
]

const KnowledgeBase: FC<Props> = ({
  //   hasFetchError,
  data,
  //   isSearched,
  total,
  //   pageSize,
}) => {
  return (
    <div className="grid gap-2">
      {/* empty without search */}
      {!total && <EmptyState />}
      {/* empty with search */}
      {/* has an error */}
      {/* data available */}
      {!!data && !!data.length && (
        <>
          <TableTop />
          <Table
            columns={columns}
            data={data}
            onRowClick={(row) => {
              console.log(row)
            }}
          />
        </>
      )}
      <AddSourceModal />
      <AddwebsiteModal />
    </div>
  )
}

export default KnowledgeBase
