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
import ArticleModal from "./_components/ArticleModal"
import DocumentModal from "./_components/DocumentModal"
import Typography from "@/components/atoms/Typography"
import { useQueryParams } from "@/hooks/utilityHooks"

type Props = {
  hasFetchError?: boolean
  data?: KnowledgeSource[]
  isSearched: boolean
  total: number
  pageSize: number
  page: number
}

const columns: TableColumn<KnowledgeSource>[] = [
  {
    id: 1,
    title: <Checkbox name="select-all" />,
    render: () => <Checkbox name="select-" />,
    classNames: {
      cell: "w-[1%] whitespace-nowrap sm:sticky sm:left-0 sm:z-[11] bg-white",
    },
  },
  {
    id: 2,
    title: "Title",
    classNames: {
      td: "text-black-90 !text-medium-sm max-w-[300px] min-w-[250px]",
    },
    render: (row) => <span className="truncate w-full">{row.title}</span>,
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
    render: (row) => {
      return dayjs(row.date_updated).format("DD MMM, YYYY. HH:mmA")
    },
  },
  {
    id: 5,
    title: "Date added",
    showFor: "not-mobile",
    render: (row) => dayjs(row.date_created).format("DD MMM, YYYY. HH:mmA"),
  },
  {
    id: 6,
    title: "Internal only",
    showFor: "not-mobile",
    align: "center",
    tooltip: {
      content: (
        <main className="flex flex-col gap-1 text-white max-w-[210px]">
          <Typography as="h3" variant="semibold-base">
            Internal source
          </Typography>
          <Typography as="span" variant="regular-sm" className="text-gray-500">
            Confidential information for internal use only. AI uses this only
            when interacting with customer representatives and business owners,
            never with customers.
          </Typography>
        </main>
      ),

      classNames: { content: "min-w-[210px]" },
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
      cell: "w-[1%] whitespace-nowrap bg-white sm:sticky sm:right-0 bg-white z-[11]",
    },
    align: "center",
    render: (row) => <ResourceRowAction row={row} />,
  },
]

const QUERY_KEYS = {
  PAGE: "page",
} as const

const KnowledgeBase: FC<Props> = ({ data, total, pageSize, page }) => {
  const { set } = useQueryParams()

  return (
    <div className="grid gap-2 content-start flex-1">
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
            pagination={{
              total: Math.ceil(total / pageSize),
              page,
              onChange: (page) => set(QUERY_KEYS.PAGE, page),
            }}
          />
        </>
      )}
      <AddSourceModal />
      <AddwebsiteModal />
      <ArticleModal />
      <DocumentModal />
    </div>
  )
}

export default KnowledgeBase
