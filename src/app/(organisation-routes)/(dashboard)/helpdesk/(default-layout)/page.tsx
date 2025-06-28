import HelpDesk from "@/components/views/help-desk"
import {
  HD_QUERY_KEYS,
  HD_TABS,
  HelpDeskTabs,
} from "@/components/views/help-desk/utils"
import { PageFC } from "@/utils/types"
import React from "react"

export const metadata = {
  title: "Helpdesk",
}

const HelpdeskPage: PageFC = ({ searchParams }) => {
  const tab =
    (searchParams?.[HD_QUERY_KEYS.TAB] as HelpDeskTabs) || HD_TABS[0].key
  return <HelpDesk tab={tab} />
}

export default HelpdeskPage
