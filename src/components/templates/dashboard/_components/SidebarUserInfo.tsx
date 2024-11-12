import Icon from "@/components/atoms/Icon"
import Userinfo from "@/components/molecules/Userinfo"
import { FC } from "@/utils/types"
import React from "react"

const SidebarUserInfo: FC = () => {
  return (
    <button className="text-left w-full flex justify-between items-center gap-2">
      <Userinfo
        src="https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg"
        title="Abiodun Adebambo"
        subtitle="abiodun@eusate.com"
        classNames={{
          root: "w-full gap-0 group-hover:gap-3 group-hover:justify-start flex-1",
          info: "w-0 group-hover:w-full overflow-hidden",
        }}
      />
      <span className="ml-auto w-0 opacity-0 group-hover:w-7 h-7 rounded-full group-hover:opacity-100 overflow-hidden flex items-center justify-center text-white bg-white-15">
        <Icon name="icon-arrow-up-down" />
      </span>
    </button>
  )
}

export default SidebarUserInfo
