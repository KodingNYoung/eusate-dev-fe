import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"
import AuthConfigForm from "./AuthConfigForm"
import { AuthConfigurationResponse } from "@/lib/data/dev-space"
import AppDrawer from "@/components/organisms/AppDrawer"

type Props = {
  config?: AuthConfigurationResponse
  id?: PopupKeys
}

const AuthConfigDrawer: FC<Props> = ({
  config = {} as AuthConfigurationResponse,
  id = PopupKeys.ADD_AUTH_CONFIG_MODAL,
}) => {
  const isAdd = id === PopupKeys.ADD_AUTH_CONFIG_MODAL

  return (
    <AppDrawer
      id={id}
      header={{
        title: isAdd
          ? "Create auth configuration"
          : "Update auth configuration",
      }}
      classNames={{ wrapper: "px-2", base: "w-full max-w-[504px]" }}
    >
      <AuthConfigForm isAdd={isAdd} config={config} />
    </AppDrawer>
  )
}

export default AuthConfigDrawer
