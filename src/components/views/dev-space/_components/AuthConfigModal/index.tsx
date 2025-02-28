import AppModal from "@/components/organisms/Modal"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"
import AuthConfigForm from "./AuthConfigForm"
import { AuthConfigurationResponse } from "@/lib/data/dev-space"

type Props = {
  config?: AuthConfigurationResponse
  id?: PopupKeys
}

const AuthConfigModal: FC<Props> = ({
  config = {} as AuthConfigurationResponse,
  id = PopupKeys.ADD_AUTH_CONFIG_MODAL,
}) => {
  const isAdd = id === PopupKeys.ADD_AUTH_CONFIG_MODAL

  return (
    <AppModal
      id={id}
      header={{
        title: isAdd
          ? "Create auth configuration"
          : "Update auth configuration",
        subtitle:
          "You need auth configs to get those authenticated functions up and running!",
      }}
      classNames={{ wrapper: "px-2", base: "w-full max-w-[920px] rounded-x20" }}
    >
      <AuthConfigForm isAdd={isAdd} config={config} />
    </AppModal>
  )
}

export default AuthConfigModal
