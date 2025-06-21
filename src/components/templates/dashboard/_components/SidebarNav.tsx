import { FC } from "@/utils/types"
import React from "react"
import NavItem from "./NavItem"
import { ROUTES } from "@/utils/constants"
import { IconNames } from "@/utils/iconNames"

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
  {
    icon: "icon-code",
    label: "Developer Space",
    link: ROUTES.DEV_SPACE,
    id: 7,
  },
]

const SidebarNav: FC = () => {
  return (
    <nav className="flex flex-col gap-2">
      {SIDEBAR_ROUTES.map(({ id, ...route }) => {
        return (
          <NavItem
            use="dashboard"
            {...route}
            key={id}
            badge={id === 2 ? 2 : 0}
          />
        )
      })}
      <div className="w-full h-px bg-gray-900 my-[22px]" />
      <NavItem
        icon="icon-eusate"
        label="Playground"
        link={ROUTES.PLAYGROUND}
        classNames={{ root: "justify-center bg-white-10", label: "!w-fit" }}
      />
    </nav>
  )
}

export default SidebarNav
