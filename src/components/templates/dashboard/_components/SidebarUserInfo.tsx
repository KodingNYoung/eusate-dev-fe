"use client"

import Icon from "@/components/atoms/Icon"
import Userinfo from "@/components/molecules/Userinfo"
import { useUserProfile } from "@/hooks/api/settingsHooks"
import { FC } from "@/utils/types"
import React from "react"
import userAvatar from "@/assets/images/user-avatar.svg"
import AppPopover from "@/components/molecules/Popups/AppPopover"
import LogoutButton from "./LogoutButton"
import OrganisationSwitcher from "./OrganisationSwitcher"

const SidebarUserInfo: FC = () => {
  const { data, isLoading } = useUserProfile()
  return (
    <AppPopover
      placement="right-start"
      offset={33}
      trigger={
        <button className="text-left w-full flex justify-between items-center gap-2">
          <Userinfo
            src={data?.profile_picture || userAvatar}
            title={data?.username}
            subtitle={data?.email}
            classNames={{
              root: "w-full gap-0 group-hover:gap-3 group-hover:justify-start flex-1",
              title: "text-white",
              info: "w-0 group-hover:w-full overflow-hidden",
            }}
            loading={isLoading}
          />
          <span className="ml-auto w-0 opacity-0 group-hover:w-7 h-7 rounded-full group-hover:opacity-100 overflow-hidden flex items-center justify-center text-white bg-white-15">
            <Icon name="icon-arrow-up-down" />
          </span>
        </button>
      }
      classNames={{
        content:
          "border border-[#E4E7EC] shadow-[0px_4px_6px_-2px_#10192808,_0px_16px_24px_-4px_#10192814] w-[390px] max-w-full p-4 rounded-lg",
      }}
    >
      <div className="flex flex-col gap-6 w-full">
        <OrganisationSwitcher />
        <LogoutButton />
      </div>
    </AppPopover>
  )
}

export default SidebarUserInfo
