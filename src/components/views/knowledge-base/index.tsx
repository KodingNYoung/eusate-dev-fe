"use client"
import { FC, KnowledgeSource, TableColumn } from "@/utils/types"
import React, { useEffect, useState } from "react"
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
import { KB_QUERY_KEYS } from "./utils"
import SourcePrivacyCheckbox from "./_components/SourcePrivacyCheckbox"
import DeleteSourceModal from "./_components/DeleteSourceModal"
import UnpublishSourceModal from "./_components/UnpublishSourceModal"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import EmptySearchState from "./_components/EmptySearchState"
import SelectedRowsBanner from "./_components/SelectedRowsBanner"
import Badge from "@/components/atoms/Badge"

type Props = {
  hasFetchError?: boolean
  data?: KnowledgeSource[]
  isSearched: boolean
  total: number
  publishedTotal: number
  unpublishedTotal: number
  pageSize: number
  page: number
}

const KnowledgeBase: FC<Props> = ({
  data,
  isSearched,
  total,
  publishedTotal,
  unpublishedTotal,
  pageSize,
  page,
}) => {
  const { set } = useQueryParams()
  const { open } = useModal()

  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [source, setSource] = useState<KnowledgeSource>({} as KnowledgeSource)

  const openModal = (id: PopupKeys, source: KnowledgeSource) => {
    open(id)
    setSource(source)
  }

  const columns: TableColumn<KnowledgeSource>[] = [
    {
      id: 1,
      clickable: true,
      title: (
        <Checkbox
          name="select-all"
          checked={Boolean(selectedRows.size)}
          indeterminate={selectedRows?.size !== pageSize}
          onChange={(e) => {
            const check = e.currentTarget.checked
            let rows: Set<string>
            if (check && data) {
              rows = new Set([...data?.map((row) => row.id)])
            } else {
              rows = new Set()
            }
            setSelectedRows(rows)
          }}
        />
      ),
      render: (row) => (
        <Checkbox
          name={row.id}
          checked={selectedRows?.has(row.id)}
          onChange={(e) => {
            const rows = new Set(selectedRows)
            if (e.currentTarget.checked) {
              rows.add(row.id)
            } else {
              rows.delete(row.id)
            }
            setSelectedRows(rows)
          }}
        />
      ),
      classNames: {
        cell: "w-[1%] whitespace-nowrap sm:sticky sm:left-0 sm:z-[11] bg-white",
      },
    },
    {
      id: 2,
      title: "Title",
      classNames: {
        td: "text-black-90 !text-medium-sm max-w-[150px] sm:max-w-[300px] sm:min-w-[250px]",
      },
      render: (row) => <span className="truncate w-full">{row.title}</span>,
    },
    {
      id: 8,
      title: "Status",
      showFor: "not-mobile",
      render: (row) => (
        <Badge
          type="accent"
          color={row.published ? "success" : "neutral"}
          size="sm"
          className="py-0.5"
        >
          {row.published ? "Published" : "Drafts"}
        </Badge>
      ),
    },
    {
      id: 3,
      title: "Content type",
      showFor: "not-mobile",
      render: (row) => <ResourceTypeTag type={row.tag} />,
    },
    {
      id: 4,
      title: "Date added",
      showFor: "not-mobile",
      classNames: { td: "!text-gray-500" },
      render: (row) => dayjs(row.date_created).format("DD MMM, YYYY. hh:mmA"),
    },
    {
      id: 5,
      title: "Last updated",
      showFor: "not-mobile",
      classNames: { td: "!text-gray-500" },
      render: (row) => dayjs(row.date_updated).format("DD MMM, YYYY. hh:mmA"),
    },
    {
      id: 6,
      title: "Internal only",
      showFor: "not-mobile",
      align: "center",
      clickable: true,
      tooltip: {
        content: (
          <main className="flex flex-col gap-1 text-white max-w-[210px]">
            <Typography as="h3" variant="semibold-base">
              Internal source
            </Typography>
            <Typography
              as="span"
              variant="regular-sm"
              className="text-gray-500"
            >
              Confidential information for internal use only. AI uses this only
              when interacting with customer representatives and business
              owners, never with customers.
            </Typography>
          </main>
        ),

        classNames: { content: "min-w-[210px]" },
      },
      render: (row) => <SourcePrivacyCheckbox row={row} />,
    },
    {
      id: "accordion-trigger",
      title: "",
      showFor: "mobile-only",
      align: "center",
      clickable: true,
      classNames: {
        cell: "w-[1%] whitespace-nowrap bg-white",
      },
      render: () => (
        <Icon name="icon-chevron-down" className="text-regular-xl" />
      ),
    },
    {
      id: 7,
      title: "Action",
      classNames: {
        cell: "w-[1%] whitespace-nowrap bg-white sm:sticky sm:right-0 bg-white z-[11]",
      },
      clickable: true,
      align: "center",
      render: (row) => (
        <ResourceRowAction
          row={row}
          publishToggleAction={() =>
            openModal(PopupKeys.TOGGLE_PUBLISH_SOURCE_MODAL, row)
          }
          onDelete={() => {
            openModal(PopupKeys.DELETE_SOURCE_MODAL, row)
          }}
        />
      ),
    },
  ]

  useEffect(() => {
    if (data) {
      setSelectedRows(new Set())
    }
  }, [data])

  return (
    <div className="grid gap-3 content-start flex-1">
      {/* empty without search */}
      {!total && !isSearched && <EmptyState />}
      {/* has an error */}
      {/* data available  or empty with search */}
      {((!!data && !!data.length) || isSearched) && (
        <TableTop
          counts={{
            all: publishedTotal + unpublishedTotal,
            published: publishedTotal,
            drafts: unpublishedTotal,
          }}
        />
      )}
      {/* empty with search */}
      {!total && isSearched && <EmptySearchState />}
      {/* data available */}
      {!!data && !!data.length && (
        <>
          {/* rows are selected */}
          <SelectedRowsBanner
            rows={data.filter((source) => selectedRows.has(source.id))}
          />
          <Table
            columns={columns}
            data={data}
            onRowClick={(row) => {
              console.log(row)
            }}
            pagination={{
              total: Math.ceil(total / pageSize),
              page,
              onChange: (page) => set(KB_QUERY_KEYS.PAGE, page),
            }}
          />
        </>
      )}
      <AddSourceModal />
      <AddwebsiteModal />
      <ArticleModal />
      <DocumentModal />
      <DeleteSourceModal source={source} />
      <UnpublishSourceModal source={source} />
    </div>
  )
}

export default KnowledgeBase
