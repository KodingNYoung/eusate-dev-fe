import { ROUTES } from "@/utils/constants"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import React from "react"
import NavItem from "./_components/NavItem"

type Route = {
  icon: IconNames
  link: string
  id: number
}

const SIDEBAR_ROUTES: Route[] = [
  {
    icon: "icon-speedometer-bold",
    link: ROUTES.OVERVIEW,
    id: 1,
  },
  {
    icon: "icon-layer",
    link: ROUTES.KNOWLEDGE_BASE,
    id: 2,
  },
  { icon: "icon-ticket", link: ROUTES.HELP_DESK, id: 3 },
  {
    icon: "icon-health",
    link: ROUTES.HELP_AND_SUPPORT,
    id: 6,
  },
  { icon: "icon-chart", link: ROUTES.REPORTS, id: 4 },
]

const BottomNav: FC = () => {
  return (
    <footer className="flex sm:hidden fixed -bottom-px left-0 w-screen bg-black-100 text-gray-500 py-2 pb-[9px] px-4  items-center justify-between z-1">
      {SIDEBAR_ROUTES.map(({ id, ...route }) => (
        <NavItem key={id} {...route} badge={id === 2 ? 2 : 0} />
      ))}
      <button>
        <NavItem icon="icon-menu" link="" />
      </button>
    </footer>
  )
}

export default BottomNav
