import { FC } from "react"
import { OrganizationTabsType } from "../utils"
import OrganizationTabs from "./OrganizationTabs"
import Info from "../Info"
import Members from "../Members"

type Props = {
  tab: OrganizationTabsType
}

const OrganizationTabsAction: FC<Props> = ({ tab }) => {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <OrganizationTabs />
      <main className="overflow-auto h-full max-h-[60vh]">
        {tab === "info" && <Info />}
        {tab === "members" && <Members />}
      </main>
    </div>
  )
}

export default OrganizationTabsAction
