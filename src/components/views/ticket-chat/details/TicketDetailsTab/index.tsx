import AppTabs from "@/components/molecules/Tabs"
import React, { FC, useEffect, useState } from "react"
import UserInfo from "./UserInfo"
import { UserTemperament } from "@/components/views/help-desk/utils"
import Attachments from "./Attachments"
import Comments from "./Comments"
import Activities from "./Activity"

type Props = {
  tab: string
  customerId: string
  temperament: UserTemperament
}

enum TicketDetailsTabs {
  ATTACHMENTS = "attachments",
  ACTIVITY = "activity",
  COMMENTS = "comments",
  USERINFO = "userinfo",
}

export const TICKET_DETAILS_TABS_LIST: {
  key: TicketDetailsTabs
  label: string
}[] = [
  {
    key: TicketDetailsTabs.ATTACHMENTS,
    label: "Attachments",
  },
  {
    key: TicketDetailsTabs.USERINFO,
    label: "User info",
  },
  {
    key: TicketDetailsTabs.COMMENTS,
    label: "Comments",
  },
  {
    key: TicketDetailsTabs.ACTIVITY,
    label: "Activity",
  },
]

const TicketDetailsTab: FC<Props> = ({ customerId, temperament }) => {
  const [currentTabContent, setCurrentTabContent] = useState<React.ReactNode>(
    <Attachments />
  )
  const [tab, setTab] = useState<number | string>()

  useEffect(() => {
    switch (tab) {
      case "userinfo":
        setCurrentTabContent(
          <UserInfo customerId={customerId} temperament={temperament} />
        )
        break
      case "attachments":
        setCurrentTabContent(<Attachments />)
        break
      case "comments":
        setCurrentTabContent(<Comments />)
        break
      case "activity":
        setCurrentTabContent(<Activities />)
        break
    }
  }, [tab])

  return (
    <div className="w-full">
      <AppTabs
        tabs={TICKET_DETAILS_TABS_LIST.map(({ ...tab }) => ({
          ...tab,
        }))}
        classNames={{
          base: "flex w-full",
          tabList:
            "gap-2.5 border-b border-gray-50 px-0 pb-0 flex-1 items-center overflow-x-auto w-full",
          cursor: "w-full rounded-md",
          tab: "pb-2 w-[unset] w-full justify-center",
        }}
        onSelectionChange={(tab) => setTab(tab)}
        selectedKey={tab}
      />

      {currentTabContent}
    </div>
  )
}

export default TicketDetailsTab
