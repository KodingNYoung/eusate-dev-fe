"use client"
import { FC, KnowledgeSource, TableColumn } from "@/utils/types"
import React, { useEffect, useMemo, useState } from "react"
import TableTop from "./_components/TableTop"
import Table from "@/components/organisms/Table"
import Checkbox from "@/components/molecules/Checkbox"
import ResourceTypeTag from "./_components/ResourceTypeTag"
import ResourceRowAction from "./_components/ResourceRowAction"
import Icon from "@/components/atoms/Icon"
import AddSourceModal from "./_components/AddSourceModal"
import dayjs from "dayjs"
import LinkModal from "./_components/LinkModal"
import DocumentModal from "./_components/DocumentModal"
import Typography from "@/components/atoms/Typography"
import { useQueryParams } from "@/hooks/utilityHooks"
import { KB_QUERY_KEYS } from "./utils"
import SourcePrivacyCheckbox from "./_components/SourcePrivacyCheckbox"
import DeleteSourceModal from "./_components/DeleteSourceModal"
import UnpublishSourceModal from "./_components/UnpublishSourceModal"
import { useModal } from "@/hooks/popupHooks"
import { KnowledgeSourceTags, PopupKeys } from "@/utils/enums"
import EmptySearchState from "./_components/EmptySearchState"
import SelectedRowsBanner from "./_components/SelectedRowsBanner"
import Badge from "@/components/atoms/Badge"
import { GetKnowledgeSourcesOptions } from "@/lib/data/knowledge-base"
import EmptyState from "@/components/organisms/EmptyState"
import knowledgeBaseEmptyState from "@/assets/images/knowledge-base-empty-state.svg"
import { useKnowledgeBaseResources } from "@/hooks/api/knowledgeBaseHooks"
import { Skeleton } from "@nextui-org/react"
import { cls, formatFileSize, kbToByte } from "@/utils/helpers"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/utils/constants"
import FAQModal from "../faqs/_components/FAQModal"
import Userinfo from "@/components/molecules/Userinfo"

type Props = {
  options: GetKnowledgeSourcesOptions & { page: number }
}

const PAGE_SIZE = 6

const KnowledgeBase: FC<Props> = ({ options }) => {
  const { push } = useRouter()
  const { data, isLoading } = useKnowledgeBaseResources({
    ...options,
    page_size: PAGE_SIZE,
  })

  const { set } = useQueryParams()
  const { open } = useModal()

  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [source, setSource] = useState<KnowledgeSource>({} as KnowledgeSource)
  const [resources, setResources] = useState<KnowledgeSource[]>([])
  const [total, setTotal] = useState(0)

  // memos
  const { isSearched, page } = useMemo(() => {
    return {
      isSearched: Boolean(
        options.search || options.external === false || (options.page || 0) > 1
      ),
      page: options?.page,
    }
  }, [data, options])

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
          indeterminate={selectedRows?.size !== PAGE_SIZE}
          onChange={(e) => {
            const check = e.currentTarget.checked
            let rows: Set<string>
            if (check && resources) {
              rows = new Set([...resources?.map((row) => row.id)])
            } else {
              rows = new Set()
            }
            setSelectedRows(rows)
          }}
        />
      ),
      render: (row, loading) => (
        <Checkbox
          name={row.id}
          disabled={loading}
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
        td: "max-w-[150px] sm:max-w-[300px] sm:min-w-[250px]",
      },
      render: (row, loading) => (
        <Userinfo
          title={row.title}
          subtitle={formatFileSize(kbToByte(row?.file_size_kb || 0))}
          classNames={{
            root: "!py-0",
            avatar: "hidden",
            info: "gap-0.5",
            title: "w-[unset] min-w-36",
            subtitle: loading ? "w-16" : "w-fit",
          }}
          loading={loading}
        />
      ),
    },
    {
      id: 8,
      title: "Status",
      showFor: "not-mobile",
      render: (row, loading) => (
        <Badge
          type="accent"
          color={row.published ? "success" : "neutral"}
          size="sm"
          className={cls("py-0.5 max-w-[75px]", loading && "border-0")}
          loading={loading}
        >
          {row.published ? "Published" : "Drafts"}
        </Badge>
      ),
    },
    {
      id: 3,
      title: "Content type",
      showFor: "not-mobile",
      render: (row, loading) => (
        <Skeleton className="rounded-sm" isLoaded={!loading}>
          <ResourceTypeTag type={row.tag} className="min-w-20 min-h-5" />
        </Skeleton>
      ),
    },
    {
      id: 4,
      title: "Date added",
      showFor: "not-mobile",
      classNames: { td: "!text-gray-500" },
      render: (row, loading) => (
        <Skeleton isLoaded={!loading} className="rounded-sm">
          {dayjs(row.date_created).format("DD MMM, YYYY. hh:mmA")}
        </Skeleton>
      ),
    },
    {
      id: 5,
      title: "Last updated",
      showFor: "not-mobile",
      classNames: { td: "!text-gray-500" },
      render: (row, loading) => (
        <Skeleton isLoaded={!loading} className="rounded-sm">
          {dayjs(row.date_updated).format("DD MMM, YYYY. hh:mmA")}
        </Skeleton>
      ),
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
      render: (row, loading) => (
        <SourcePrivacyCheckbox row={row} loading={loading} />
      ),
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
      render: (row, loading) => (
        <ResourceRowAction
          row={row}
          loading={loading}
          publishToggleAction={() =>
            openModal(PopupKeys.TOGGLE_PUBLISH_SOURCE_MODAL, row)
          }
          onDelete={() => {
            openModal(PopupKeys.DELETE_SOURCE_MODAL, row)
          }}
          onFaqOpen={() => openModal(PopupKeys.EDIT_FAQS_MODAL, row)}
        />
      ),
    },
  ]

  useEffect(() => {
    if (!data?.data) return
    setResources(data?.data?.results || [])
    setTotal(data?.data?.count || 0)
  }, [data, options])
  useEffect(() => {
    if (resources) {
      setSelectedRows(new Set())
    }
  }, [resources])

  return (
    <div className="grid gap-3 content-start flex-1">
      {/* empty without search */}
      {!total && !isSearched && !isLoading && (
        <EmptyState
          img={knowledgeBaseEmptyState}
          title="Start by uploading a resource"
          subtitle="Any resource uploaded will be available here. Manage resources that
            educated your AI."
          modalKey={PopupKeys.SOURCE_MODAL}
          buttonLabel="Add a resource"
        />
      )}
      {/* has an error */}
      {/* data available  or empty with search */}
      {(!!resources.length || isSearched || isLoading) && <TableTop />}
      {/* empty with search */}
      {!total && isSearched && !isLoading && <EmptySearchState />}
      {/* data available */}
      {resources.length || isLoading ? (
        <>
          {/* rows are selected */}
          <SelectedRowsBanner
            rows={resources.filter((source) => selectedRows.has(source.id))}
          />
          <Table
            columns={columns}
            data={resources}
            onRowClick={(row) => {
              if (row.tag === KnowledgeSourceTags.FAQ) {
                openModal(PopupKeys.EDIT_FAQS_MODAL, row)
              } else {
                push(
                  `${ROUTES.RESOURCE}/?${KB_QUERY_KEYS.ID}=${row.id}&${KB_QUERY_KEYS.TAGS}=${row.tag}`
                )
              }
            }}
            pagination={{
              total: Math.ceil(total / PAGE_SIZE),
              page,
              onChange: (page) => set(KB_QUERY_KEYS.PAGE, page),
            }}
            loading={isLoading}
            defaultRows={6}
            classNames={{ td: "py-1 sm:!py-4" }}
          />
        </>
      ) : null}
      <AddSourceModal />
      <LinkModal />
      <DocumentModal />
      <FAQModal id={PopupKeys.EDIT_FAQS_MODAL} faq={source} />
      <DeleteSourceModal source={source} />
      <UnpublishSourceModal source={source} />
      <FAQModal id={PopupKeys.EDIT_FAQS_MODAL} faq={source} />
    </div>
  )
}

export default KnowledgeBase
