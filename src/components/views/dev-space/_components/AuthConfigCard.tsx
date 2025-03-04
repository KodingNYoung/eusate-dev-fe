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
    <section className="border border-gray-100 w-full rounded-xl grid gap-6">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_450px))] gap-8 p-6">
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
          <AuthConfigItem label="Query name:" value={config.query_name} />
        )}
        <AuthConfigItem
          label="Created at:"
          value={dayjs(config.date_created).format("DD/MM/YYYY. hh:mmA")}
        />
      </div>
      <footer className="flex items-center justify-between gap-4 border-t border-gray-100 px-6 py-4">
        <div className="flex items-center gap-4">
          <OpenModalButton
            variant="tetiary"
            classNames={{ label: "!leading-none", root: "py-2.5 px-3" }}
            startContent={<Icon name="icon-edit-2" size={20} />}
            modalKey={PopupKeys.EDIT_AUTH_CONFIG_MODAL}
          >
            Edit
          </OpenModalButton>
          <OpenModalButton
            variant="tetiary"
            classNames={{ label: "!leading-none", root: "py-2.5 px-3" }}
            startContent={<Icon name="icon-trash" size={20} />}
            modalKey={PopupKeys.DELETE_AUTH_CONFIG_MODAL}
          >
            Delete
          </OpenModalButton>
        </div>
        <Badge color="info" type="accent" size="md" className="text-regular-sm">
          Default
        </Badge>
      </footer>
    </section>
  )
}

export default AuthConfigCard
