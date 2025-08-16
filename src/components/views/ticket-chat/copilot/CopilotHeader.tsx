import React, { FC } from "react"
import Icon from "@/components/atoms/Icon"
import Avatar from "@/components/atoms/Avatar"
import Typography from "@/components/atoms/Typography"
import avatar from "@/assets/images/eusate-avatar.svg"
import { useModal } from "@/hooks/popupHooks"

const Header: FC = () => {
  const { close } = useModal()
  return (
    <div className="sticky top-0 left-0 flex z-1 bg-white items-center justify-between w-full px-6 py-2  border-gray-50 border-b min-h-[68px]">
      <div className="flex items-center gap-x-4">
        <Icon
          onClick={() => close()}
          name="icon-arrow-left"
          className="block lg:hidden !text-regular-base lg:!text-regular-xl text-gray-400 cursor-pointer"
        />
        <div className="flex items-center gap-3">
          <Avatar src={avatar} />
          <Typography className="text-semibold-sm font-[600] text-gray-900">
            AI Copilot
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Header
