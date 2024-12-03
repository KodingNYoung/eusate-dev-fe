"use client"

import { FC, TableColumn } from "@/utils/types"
import React from "react"
import TableTop from "./_components/TableTop"
import Table from "@/components/organisms/Table"
import Checkbox from "@/components/molecules/Checkbox"
import Typography from "@/components/atoms/Typography"
import ResourceTypeTag from "./_components/ResourceTypeTag"
import ResourceRowAction from "./_components/ResourceRowAction"
import Icon from "@/components/atoms/Icon"

const columns: TableColumn[] = [
  {
    id: 1,
    title: <Checkbox name="select-all" />,
    render: (row) => <Checkbox name="select-" />,
    classNames: {
      cell: "w-[1%] whitespace-nowrap",
    },
  },
  {
    id: 2,
    title: "Title",
    classNames: { td: "text-black-90 !text-medium-sm" },
    render: (row) => "GTM Strategy for eusate",
  },
  {
    id: 3,
    title: "Content type",
    render: (row) => <ResourceTypeTag type="website" />,
  },
  { id: 4, title: "Last updated", render: (row) => "12 Mar, 2024. 7:00PM" },
  { id: 5, title: "Date added", render: (row) => "12 Mar, 2024. 7:00PM" },
  {
    id: 6,
    title: "Internal only",
    align: "center",
    tooltip: {
      content: (
        <main className="flex flex-col gap-1">
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
      classNames: { tooltip: "min-w-[210px]" },
    },
    render: (row) => (
      <Checkbox name="select-" classNames={{ root: "mx-auto w-fit" }} />
    ),
  },
  {
    id: "collapse-trigger",
    title: "",
    render: (row) => <Icon name="icon-arrow-up-down" />,
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

const KnowledgeBase: FC = () => {
  return (
    <div className="grid gap-2">
      <TableTop />
      <Table
        columns={columns}
        data={[{}, {}, {}, {}, {}, {}, {}, {}, {}]}
        onRowClick={(row) => {
          console.log(row)
        }}
      />
    </div>
  )
}

export default KnowledgeBase
