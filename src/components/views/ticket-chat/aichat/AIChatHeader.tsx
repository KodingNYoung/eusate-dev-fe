import React, { FC } from "react"
import Icon from "@/components/atoms/Icon"
import Avatar from "@/components/atoms/Avatar"
import Typography from "@/components/atoms/Typography"
import avatar from "@/assets/images/eusate-avatar.svg"
import { useModal } from "@/hooks/popupHooks"

const Header: FC = () => {
  const { close } = useModal()
  return (
    <div className="sticky top-0 flex z-1 fixed bg-white items-center justify-between w-full px-6 py-2  border-gray-50 border-b-2">
      <div className="flex items-center gap-x-4">
        <Icon
          onClick={() => close()}
          name="icon-arrow-left"
          className="block sm:hidden !text-regular-base sm:!text-regular-xl text-gray-400 cursor-pointer"
        />
        <div className="flex items-center gap-x-4">
          <Avatar className="!size-12 !min-w-12 !min-h-12" src={avatar} />
          <Typography className="text-semibold-sm font-[600] text-gray-900">
            AI Copilot
          </Typography>
        </div>
      </div>

      <div className="rounded-full px-2 py-[.25rem] border border-gray-300 cursor-pointer rotate-[90deg]">
        <Icon
          name="icon-more"
          className="!text-regular-base sm:!text-regular-xl text-gray-400"
        />
      </div>
    </div>
  )
}

export default Header
