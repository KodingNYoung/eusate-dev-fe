import { FC } from "react"
import { OrganizationTabsType } from "./utils"
import OrganizationTabs from "./_components/OrganizationTabs"
import OrganizationInfo from "./OrganizationInfo"
import Members from "./Members"

type Props = {
  tab: OrganizationTabsType
}

const Organization: FC<Props> = ({ tab }) => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <OrganizationTabs />
      <main>
        {tab === OrganizationTabsType.ORGANIZATION_INFO && <OrganizationInfo />}
        {tab === OrganizationTabsType.MEMBERS && <Members />}
      </main>
    </div>
  )
}

export default Organization
