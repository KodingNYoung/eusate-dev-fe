"use client"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { ROUTES } from "@/utils/constants"
import { cls } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const PAGE_LAYERS: {
  [path: string]: {
    label: string
    icon?: IconNames
    link?: string
    id: number
  }[]
} = {
  [ROUTES.OVERVIEW]: [
    { label: "Overview", icon: "icon-speedometer-bold", id: 1 },
  ],
  [ROUTES.KNOWLEDGE_BASE]: [
    { label: "Knowledge base", icon: "icon-layer", id: 2 },
  ],
  [ROUTES.HELP_DESK]: [{ label: "Helpdesk", icon: "icon-ticket", id: 3 }],
  [ROUTES.REPORTS]: [{ label: "Reports", icon: "icon-chart", id: 4 }],
  [ROUTES.SETTINGS]: [{ label: "Settings", icon: "icon-setting", id: 5 }],
  [ROUTES.HELP_AND_SUPPORT]: [
    { label: "Help & Support", icon: "icon-health", id: 6 },
  ],
  [ROUTES.PLAYGROUND]: [{ label: "Playground", icon: "icon-eusate", id: 1 }],
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
  [ROUTES.FAQS]: [
    {
      label: "Knowledge base",
      icon: "icon-layer",
      link: ROUTES.KNOWLEDGE_BASE,
      id: 1,
    },
    { label: "FAQs", id: 2 },
  ],
  [ROUTES.DEV_SPACE]: [{ label: "Developer Space", icon: "icon-code", id: 1 }],
}

const HeaderPagination: FC = () => {
  const pathname = usePathname()
  const pages = PAGE_LAYERS[pathname] || []

  return (
    <section className="flex items-center gap-2 text-gray-400">
      {pages.map((page, idx) => {
        const content = (
          <Typography
            as="span"
            className={cls(
              "flex items-center gap-2 text-medium-xs sm:text-medium-sm",
              pages.length > 1 && !page.link && "text-gray-900"
            )}
          >
            {page.icon && (
              <Icon
                name={page.icon}
                className="!text-regular-base sm:!text-regular-xl"
              />
            )}
            {page.label}
          </Typography>
        )

        return (
          <div className="flex items-center gap-2" key={page.id}>
            {page.link ? <Link href={page.link}>{content}</Link> : content}
            {pages.length - 1 !== idx && <Icon name="icon-chevron-right" />}
          </div>
        )
      })}
    </section>
  )
}

export default HeaderPagination
