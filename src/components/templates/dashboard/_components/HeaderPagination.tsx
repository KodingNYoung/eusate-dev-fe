"use client"

import React from "react"
import { ROUTES } from "@/utils/constants"
import { usePathname } from "next/navigation"
import { FC, PageLayers } from "@/utils/types"
import PaginationItem from "@/components/molecules/PaginationItem"

const PAGE_LAYERS: PageLayers = {
  [ROUTES.OVERVIEW]: [
    { label: "Overview", icon: "icon-speedometer-bold", id: 1 },
  ],
  [ROUTES.KNOWLEDGE_BASE]: [
    { label: "Knowledge base", icon: "icon-layer", id: 2 },
  ],
  [ROUTES.FAQS]: [
    {
      label: "Knowledge base",
      icon: "icon-layer",
      link: ROUTES.KNOWLEDGE_BASE,
      id: 1,
    },
    { label: "FAQs", id: 2 },
  ],
  [ROUTES.NEW_ARTICLE]: [
    {
      label: "Knowledge base",
      icon: "icon-layer",
      link: ROUTES.KNOWLEDGE_BASE,
      id: 1,
    },
    { label: "New Article", id: 2 },
  ],
  [ROUTES.RESOURCE]: [
    {
      label: "Knowledge base",
      icon: "icon-layer",
      link: ROUTES.KNOWLEDGE_BASE,
      id: 1,
    },
    { label: "Resource", id: 2 },
  ],
  [ROUTES.HELP_DESK]: [{ label: "Helpdesk", icon: "icon-ticket", id: 3 }],
  [ROUTES.REPORTS]: [{ label: "Reports", icon: "icon-chart", id: 4 }],
  [ROUTES.SETTINGS]: [{ label: "Settings", icon: "icon-setting", id: 5 }],
  [ROUTES.PROFILE]: [
    { label: "Settings", icon: "icon-setting", id: 1 },
    { label: "Profile", id: 2 },
  ],
  [ROUTES.ORGANISATION]: [
    { label: "Settings", icon: "icon-setting", id: 1 },
    { label: "Organisation", id: 2 },
  ],
  [ROUTES.SATE_AI]: [
    { label: "Settings", icon: "icon-setting", id: 1 },
    { label: "Sate AI", id: 2 },
  ],
  [ROUTES.INTEGRATIONS]: [
    { label: "Settings", icon: "icon-setting", id: 1 },
    { label: "Integrations", id: 2 },
  ],
  [ROUTES.USAGE_AND_BILLING]: [
    { label: "Settings", icon: "icon-setting", id: 1 },
    { label: "Usage & Billing", id: 2 },
  ],
  [ROUTES.NOTIFICATIONS]: [
    { label: "Settings", icon: "icon-setting", id: 1 },
    { label: "Notifications", id: 2 },
  ],
  [ROUTES.SECURITY]: [
    { label: "Settings", icon: "icon-setting", id: 1 },
    { label: "Security", id: 2 },
  ],
  [ROUTES.SUPPORT]: [
    { label: "Settings", icon: "icon-setting", id: 1 },
    { label: "Support", id: 2 },
  ],
  [ROUTES.RESOURCES]: [
    { label: "Settings", icon: "icon-setting", id: 1 },
    { label: "Resources", id: 2 },
  ],
  [ROUTES.HELP_AND_SUPPORT]: [
    { label: "Help & Support", icon: "icon-health", id: 6 },
  ],
  [ROUTES.DEV_SPACE]: [{ label: "Developer Space", icon: "icon-code", id: 1 }],
  [ROUTES.PLAYGROUND]: [{ label: "Playground", icon: "icon-eusate", id: 1 }],
}

const HeaderPagination: FC = () => {
  const pathname = usePathname()
  const pages = PAGE_LAYERS[pathname] || []

  return (
    <section className="flex items-center gap-2 text-gray-400">
      {pages.map((page, idx) => (
        <PaginationItem
          key={page.id}
          label={page.label}
          icon={page.icon}
          link={page.link}
          hasMultipleLayers={pages.length > 1}
          isLast={pages.length - 1 === idx}
        />
      ))}
    </section>
  )
}

export default HeaderPagination
