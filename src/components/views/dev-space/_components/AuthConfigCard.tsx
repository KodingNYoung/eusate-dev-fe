import Badge from "@/components/atoms/Badge"
import Icon from "@/components/atoms/Icon"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"
import AuthConfigItem from "./AuthConfigItem"
import { AuthLocation } from "../utils"
import dayjs from "dayjs"
import { AuthConfigurationResponse } from "@/lib/data/dev-space"
import OpenModalButton from "@/components/molecules/Buttons/OpenModalButton"

type Props = {
  config: AuthConfigurationResponse
}

const AuthConfigCard: FC<Props> = ({ config }) => {
  return (
    <section className="border border-gray-100 p-4 w-full max-w-[641px] rounded-xl grid gap-6">
      <header className="flex items-center justify-between gap-4">
        <Badge color="info" type="accent" size="md" className="text-regular-sm">
          Default
        </Badge>
        <div className="flex items-center gap-4">
          <OpenModalButton
            variant="tetiaryText"
            classNames={{
              root: "!border-0 focus:border-0",
              label: "!leading-none",
            }}
            modalKey={PopupKeys.EDIT_AUTH_CONFIG_MODAL}
          >
            <Icon name="icon-edit-2" size={20} />
          </OpenModalButton>
          <OpenModalButton
            variant="tetiaryText"
            classNames={{
              root: "!border-0 focus:border-0",
              label: "!leading-none",
            }}
            modalKey={PopupKeys.DELETE_AUTH_CONFIG_MODAL}
          >
            <Icon name="icon-trash" size={20} />
          </OpenModalButton>
        </div>
      </header>
      <AuthConfigItem label="Login endpoint:" value={config.login_url} />
      <AuthConfigItem
        label="Authorization location:"
        value={config.auth_location}
      />
      <AuthConfigItem label="Authorization type:" value={config.auth_type} />
      {config.auth_location === AuthLocation.HEADER && (
        <>
          <AuthConfigItem label="Header name:" value={config.header_name} />
          <AuthConfigItem label="Header value:" value={config.header_value} />
        </>
      )}
      {config.auth_location === AuthLocation.QUERY && (
        <AuthConfigItem label="Query name:" value={config.header_name} />
      )}
      <AuthConfigItem
        label="Created at:"
        value={dayjs(config.date_created).format("DD/MM/YYYY. hh:mmA")}
      />
    </section>
  )
}

export default AuthConfigCard
