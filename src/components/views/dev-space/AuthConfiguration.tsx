"use client"

import { FC } from "@/utils/types"
import React from "react"
import { useAuthConfig } from "@/hooks/devSpaceHooks"
import DevSpaceEmptyState from "./_components/DevSpaceEmptyState"
import { DevspaceTabs } from "./utils"
import AuthConfigModal from "./_components/AuthConfigModal"
import DeleteAuthConfigModal from "./_components/DeleteAuthConfigModal"
import AuthConfigCard from "./_components/AuthConfigCard"
import { PopupKeys } from "@/utils/enums"

const AuthConfiguration: FC = () => {
  const { config, isLoading, isFetching } = useAuthConfig()

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
      {!config && !isFetching && <DevSpaceEmptyState tab={DevspaceTabs.AUTH} />}
      {!!config && <AuthConfigCard config={config} />}
      <AuthConfigModal />
      <AuthConfigModal id={PopupKeys.EDIT_AUTH_CONFIG_MODAL} config={config} />
      {config && <DeleteAuthConfigModal id={config?.id} />}
    </>
  )
}

export default AuthConfiguration
