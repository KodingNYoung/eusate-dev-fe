import React, { FC } from "react"
import { TEMPERAMENT_COLOR_MAP, UserTemperament } from "../../help-desk/utils"
import Icon from "@/components/atoms/Icon"
import Userinfo from "@/components/molecules/Userinfo"
import Badge from "@/components/atoms/Badge"

type Props = {
  avatarUrl: string
  temperament: UserTemperament
  customerId: string
}

const Header: FC<Props> = ({ avatarUrl, temperament, customerId }) => {
  return (
    <div className="sticky top-0 left-0 flex z-1 bg-white items-center justify-between w-full px-4 sm:px-6 py sm:py-2 border-gray-50 border-b min-h-[68px]">
      <div className="flex items-center gap-x-8 my-3 sm:my-0">
        <Icon
          name="icon-arrow-left"
          className="hidden md:block !text-regular-base sm:!text-regular-xl text-gray-400 cursor-pointer"
        />
        <Userinfo
          src={avatarUrl}
          title={customerId}
          subtitle={
            <Badge
              size="sm"
              type="outline"
              color={TEMPERAMENT_COLOR_MAP[temperament]}
            >
              {temperament}
            </Badge>
          }
          classNames={{
            root: "!py-0",
            avatar: "!size-12 !min-w-12 !min-h-12",
            title: "!text-semibold-sm font-[500] !text-gray-900",
          }}
        />
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
