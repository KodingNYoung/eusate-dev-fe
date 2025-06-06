"use client"

import React from "react"
import Link from "next/link"
import Badge from "@/components/atoms/Badge"
import Icon from "@/components/atoms/Icon"
import NotificationBadge from "@/components/atoms/NotificationBadge"
import Typography from "@/components/atoms/Typography"
import { cls, hasSameBasePath } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import { FC, TWClassNames } from "@/utils/types"
import { usePathname } from "next/navigation"

type Slots = "root" | "notificationBadge" | "badge" | "icon" | "label"
type Props = {
  use?: "dashboard" | "settings"
  icon: IconNames
  label?: string
  link: string
  badge?: number
  classNames?: { [slot in Slots]?: TWClassNames }
}

const NavItem: FC<Props> = ({ icon, label, use, link, badge, classNames }) => {
  const pathname = usePathname()

  return (
    <Link
      href={link}
      prefetch
      data-active={
        (link && pathname.includes(link)) ||
        (use === "dashboard" && hasSameBasePath(pathname, link))
      }
      className={cls(
        "group-hover:gap-3 group group/navitem",
        "flex items-center justify-start gap-0 p-3 rounded-[1000px] text-gray-500",
        `${use === "dashboard" && "data-[active=true]:bg-brand-gradient data-[active=true]:text-white hover:text-white"}`,
        classNames?.root
      )}
    >
      <NotificationBadge
        className={cls(
          "group-hover:after:scale-0",
          !badge && "after:!scale-0",
          classNames?.notificationBadge
        )}
      >
        <Icon
          name={icon}
          className={cls("text-regular-xl", classNames?.icon)}
        />
      </NotificationBadge>
      {label && (
        <Typography
          variant="medium-sm"
          className={cls(
            "w-0 group-hover:w-full whitespace-nowrap overflow-hidden",
            classNames?.label
          )}
        >
          {label}
        </Typography>
      )}
      {!!badge && (
        <Badge
          size="sm"
          type="filled"
          color="error"
          className={cls(
            "!px-0 size-0 group-hover:size-5 group-hover:min-w-5 group-hover:min-h-5 flex items-center justify-center scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 overflow-hidden",
            classNames?.badge
          )}
        >
          {badge}
        </Badge>
      )}
    </Link>
  )
}

export default NavItem
