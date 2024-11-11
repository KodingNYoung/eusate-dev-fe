"use client"

import { FC } from "@/utils/types"
import React from "react"
import NavItem from "./NavItem"
import { ROUTES } from "@/utils/constants"
import { IconNames } from "@/utils/iconNames"
import { usePathname } from "next/navigation"

type Route = {
  icon: IconNames
  label: string
  link: string
  id: number
}

const SIDEBAR_ROUTES: Route[] = [
  {
    icon: "icon-speedometer-bold",
    label: "Overview",
    link: ROUTES.OVERVIEW,
    id: 1,
  },
  {
    icon: "icon-layer",
    label: "Knowledge base",
    link: ROUTES.KNOWLEDGE_BASE,
    id: 2,
  },
  { icon: "icon-ticket", label: "Helpdesk", link: ROUTES.HELP_DESK, id: 3 },
  { icon: "icon-chart", label: "Reports", link: ROUTES.REPORTS, id: 4 },
  { icon: "icon-setting", label: "Settings", link: ROUTES.SETTINGS, id: 5 },
  {
    icon: "icon-health",
    label: "Help & Support",
    link: ROUTES.HELP_AND_SUPPORT,
    id: 6,
  },
]

const SidebarNav: FC = () => {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-2">
      {SIDEBAR_ROUTES.map(({ id, ...route }) => {
        return (
          <NavItem {...route} key={id} active={pathname.includes(route.link)} />
        )
      })}
    </nav>
  )
}

export default SidebarNav
