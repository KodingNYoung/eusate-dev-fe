"use client"

import EmptyState from "@/components/organisms/EmptyState"
import { FC, TableColumn } from "@/utils/types"
import React, { useState } from "react"
import emptyStateimg from "@/assets/images/apikeys-empty-state.svg"
import { PopupKeys } from "@/utils/enums"
import GenerateAPIKeyModal from "./_components/GenerateAPIKeyModal"
import Table from "@/components/organisms/Table"
import { useApiKeys } from "@/hooks/api/settingsHooks"
import dayjs from "dayjs"
import { ApiKeyResponse } from "@/lib/data/settings"
import ApiKeyTag from "./ApiKeyTag"
import ApiKeyTableActions from "./_components/ApiKeyTableActions"
import { useModal } from "@/hooks/popupHooks"
import DeleteApiKeyModal from "./_components/DeleteApiKeyModal"
import RevokeApiKeyModal from "./_components/RevokeApiKeyModal"

const ApiKeys: FC = () => {
  const { apiKeys, isLoading, isFetching } = useApiKeys()
  const { open } = useModal()

  const [apiKey, setApiKey] = useState<ApiKeyResponse>()

  const openModal = (id: PopupKeys, apiKey: ApiKeyResponse) => {
    open(id)
    setApiKey(apiKey)
  }

  const columns: TableColumn<ApiKeyResponse>[] = [
    {
      id: 1,
      title: "Name",
      classNames: {
        td: "!text-black-90 !text-medium-sm",
      },
      render: (row) => <span className="truncate w-full">{row.name}</span>,
    },
    {
      id: 2,
      title: "Status",
      classNames: {
        td: " !text-medium-sm",
      },
      render: (row) => <ApiKeyTag status={row.status} />,
    },
    {
      id: 3,
      title: "Created by",
      classNames: { td: "!text-black" },
      render: (row) => row.user.username,
    },
    {
      id: 4,
      title: "Expiry date",
      classNames: { td: "!text-black" },
      render: (row) =>
        !row.expires_at
          ? "-"
          : dayjs(row.expires_at).format("DD MMM, YYYY. hh:mmA"),
    },
    {
      id: 5,
      title: "Date created",
      classNames: { td: "!text-black" },
      render: (row) => dayjs(row.date_created).format("DD MMM, YYYY. hh:mmA"),
    },
    {
      id: 6,
      title: "Actions",
      align: "center",
      render: (row) => (
        <ApiKeyTableActions
          row={row}
          onDelete={() => openModal(PopupKeys.DELETE_API_KEY, row)}
          onRevoke={() => openModal(PopupKeys.REVOKE_API_KEY, row)}
        />
      ),
    },
  ]

  return (
    <>
      {isLoading && <>Loading...</>}
      {isFetching && !isLoading && <>Fetching...</>}
      {!apiKeys?.length && !isFetching && (
        <EmptyState
          img={emptyStateimg}
          title="Generate API keys"
          subtitle="Begin the process of creating your API keys. Make sure to store them securely for future use."
          modalKey={PopupKeys.GENERATE_API_KEY}
          buttonLabel="Generate API Key"
        />
      )}
      {!!apiKeys?.length && <Table columns={columns} data={apiKeys} />}
      <GenerateAPIKeyModal />
      {apiKey && <DeleteApiKeyModal apiKey={apiKey} />}
      {apiKey && <RevokeApiKeyModal apiKey={apiKey} />}
    </>
  )
}

export default ApiKeys
