"use client"

import { FC } from "@/utils/types"
import React from "react"
import { useAuthConfig } from "@/hooks/apiHooks/devSpaceHooks"
import DevSpaceEmptyState from "./_components/DevSpaceEmptyState"
import { DevspaceTabs } from "./utils"
import AuthConfigDrawer from "./_components/AuthConfigDrawer"
import DeleteAuthConfigModal from "./_components/DeleteAuthConfigModal"
import AuthConfigCard from "./_components/AuthConfigCard"
import { PopupKeys } from "@/utils/enums"

const AuthConfiguration: FC = () => {
  const { configs, isLoading, isFetching } = useAuthConfig()

  return (
    <>
      {isLoading && (
        <>
          {/* first time loading */}
          Loading...
        </>
      )}
      {/* every other loading time */}
      {isFetching && !isLoading && <>Fetching...</>}
      {!configs?.length && !isFetching && (
        <DevSpaceEmptyState tab={DevspaceTabs.AUTH} />
      )}
      {!!configs?.length && <AuthConfigCard config={configs[0]} />}
      <AuthConfigDrawer />
      <AuthConfigDrawer
        id={PopupKeys.EDIT_AUTH_CONFIG_MODAL}
        config={configs?.[0]}
      />
      {!!configs?.length && <DeleteAuthConfigModal id={configs[0]?.id} />}
    </>
  )
}

export default AuthConfiguration
