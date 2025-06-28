import { FC } from "@/utils/types"
import React from "react"
import HDTabs from "./_components/HDTabs"
import { HelpDeskTabs } from "./utils"
import Tickets from "./Tickets"

type Props = {
  tab: HelpDeskTabs
}

const HelpDesk: FC<Props> = ({ tab }) => {
  return (
    <div className="grid gap-5 content-start flex-1 w-full">
      {/* actions */}
      <HDTabs />

      {/* tab content */}
      {tab === HelpDeskTabs.SUMMARY ? "Summary" : <Tickets tab={tab} />}
    </div>
  )
}

export default HelpDesk
