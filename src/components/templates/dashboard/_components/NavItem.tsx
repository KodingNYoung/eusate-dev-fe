import Badge from "@/components/atoms/Badge"
import Icon from "@/components/atoms/Icon"
import NotificationBadge from "@/components/atoms/NotificationBadge"
import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import Link from "next/link"
import React from "react"

type Props = {
  icon: IconNames
  label: string
  link: string
  badge?: number
  active?: boolean
}

const NavItem: FC<Props> = ({ icon, label, link, badge, active }) => {
  return (
    <Link
      href={link}
      data-active={active}
      className="flex items-center justify-start gap-0 group-hover:gap-3 p-3 rounded-[1000px] group/navitem text-gray-500 hover:text-white data-[active=true]:text-white data-[active=true]:bg-brand-gradient"
    >
      <NotificationBadge
        className={cls("group-hover:after:scale-0", !badge && "after:!scale-0")}
      >
        <Icon name={icon} className="text-regular-xl" />
      </NotificationBadge>
      <Typography
        variant="medium-sm"
        className="w-0 group-hover:w-full whitespace-nowrap overflow-hidden"
      >
        {label}
      </Typography>
      {badge && (
        <Badge
          size="sm"
          type="filled"
          color="error"
          className="!px-0 size-0 group-hover:size-5 group-hover:min-w-5 group-hover:min-h-5 flex items-center justify-center scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 overflow-hidden"
        >
          {badge}
        </Badge>
      )}
    </Link>
  )
}

export default NavItem
