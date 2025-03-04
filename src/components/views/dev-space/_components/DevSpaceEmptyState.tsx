import { FC } from "@/utils/types"
import React from "react"
import { DevspaceTabs } from "../utils"
import EmptyState from "@/components/organisms/EmptyState"
import authEmptyState from "@/assets/images/auth-config-empty-state.svg"
import functionEmptyState from "@/assets/images/functions-empty-state.svg"
import { PopupKeys } from "@/utils/enums"

type Props = {
  tab: DevspaceTabs
}

const img = {
  [DevspaceTabs.AUTH]: authEmptyState,
  [DevspaceTabs.FUNCTIONS]: functionEmptyState,
}
const title = {
  [DevspaceTabs.AUTH]: "Start by creating an auth config",
  [DevspaceTabs.FUNCTIONS]: "Start by creating a function",
}
const subtitle = {
  [DevspaceTabs.AUTH]:
    "You need auth configs to get those authenticated functions up and running!",
  [DevspaceTabs.FUNCTIONS]:
    "Functions gives AI the power to do more from you our platform. Functions created will be available here.",
}
const modalKey = {
  [DevspaceTabs.AUTH]: PopupKeys.ADD_AUTH_CONFIG_MODAL,
  [DevspaceTabs.FUNCTIONS]: PopupKeys.ADD_FUNCTION_MODAL,
}
const buttonLabel = {
  [DevspaceTabs.AUTH]: "Add auth configuration",
  [DevspaceTabs.FUNCTIONS]: "Add new function",
}

const DevSpaceEmptyState: FC<Props> = ({ tab }) => {
  return (
    <EmptyState
      img={img[tab]}
      title={title[tab]}
      subtitle={subtitle[tab]}
      modalKey={modalKey[tab]}
      buttonLabel={buttonLabel[tab]}
    />
  )
}

export default DevSpaceEmptyState
