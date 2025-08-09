import HelpDesk from "@/components/views/help-desk"
import { HD_TABS, HelpDeskTabs } from "@/components/views/help-desk/utils"
import { DATE_FILTER } from "@/components/views/overview/utils"
import { PageFC } from "@/utils/types"
import React from "react"

export const metadata = {
  title: "Helpdesk",
}

type SearchParamsPage = {
  date: string
  tab: HelpDeskTabs
}

const HelpdeskPage: PageFC<unknown, SearchParamsPage> = ({ searchParams }) => {
  const tab = searchParams?.tab || HD_TABS[0].key
  const date = searchParams?.date || DATE_FILTER.PAST_WEEK
  return <HelpDesk tab={tab} date={date} />
}

export default HelpdeskPage
