"use client"

import Icon from "@/components/atoms/Icon"
import Userinfo from "@/components/molecules/Userinfo"
import { useUserProfile } from "@/hooks/api/settingsHooks"
import { FC } from "@/utils/types"
import React from "react"
import userAvatar from "@/assets/images/user-avatar.svg"

const SidebarUserInfo: FC = () => {
  const { data, isLoading } = useUserProfile()
  return (
    <button className="text-left w-full flex justify-between items-center gap-2">
      <Userinfo
        src={data?.profile_picture || userAvatar}
        title={data?.username}
        subtitle={data?.email}
        classNames={{
          root: "w-full gap-0 group-hover:gap-3 group-hover:justify-start flex-1",
          info: "w-0 group-hover:w-full overflow-hidden",
        }}
        loading={isLoading}
      />
      <span className="ml-auto w-0 opacity-0 group-hover:w-7 h-7 rounded-full group-hover:opacity-100 overflow-hidden flex items-center justify-center text-white bg-white-15">
        <Icon name="icon-arrow-up-down" />
      </span>
    </button>
  )
}

export default SidebarUserInfo
