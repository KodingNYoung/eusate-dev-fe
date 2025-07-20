"use client"

import { useQueryParams } from "@/hooks/utilityHooks"
import { FC } from "@/utils/types"
import React, { useMemo } from "react"
import { DEVSPACE_QUERY_KEYS, DEVSPACE_TABS, DevspaceTabs } from "../utils"
import { PopupKeys } from "@/utils/enums"
import OpenModalButton from "@/components/molecules/Buttons/OpenModalButton"
import { useAuthConfig } from "@/hooks/api/devSpaceHooks"

const buttonLabel = {
  [DevspaceTabs.AUTH]: "Add auth configuration",
  [DevspaceTabs.FUNCTIONS]: "Add new function",
}
const buttonModalId = {
  [DevspaceTabs.AUTH]: PopupKeys.ADD_AUTH_CONFIG_MODAL,
  [DevspaceTabs.FUNCTIONS]: PopupKeys.ADD_FUNCTION_MODAL,
}

const DevSpaceActionButton: FC = () => {
  const { get } = useQueryParams()
  const { configs, isLoading } = useAuthConfig()

  const tab = useMemo(
    () =>
      (get(DEVSPACE_QUERY_KEYS.TAB) as DevspaceTabs) || DEVSPACE_TABS[0].key,
    [get]
  )

  return configs?.length && tab === DevspaceTabs.AUTH ? null : (
    <OpenModalButton
      modalKey={buttonModalId[tab]}
      size="sm"
      classNames={{ root: "px-4.5 py-2.5" }}
      disabled={isLoading}
    >
      {buttonLabel[tab]}
    </OpenModalButton>
  )
}

export default DevSpaceActionButton
