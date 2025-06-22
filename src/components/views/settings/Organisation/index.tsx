import { FC } from "react"
import { OrganisationTabsType } from "./utils"
import OrganisationTabs from "./_components/OrganisationTabs"
import OrganisationInfo from "./OrganisationInfo"
import Members from "./Members"

type Props = {
  tab: OrganisationTabsType
}

const Organisation: FC<Props> = ({ tab }) => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <OrganisationTabs />
      <main>
        {tab === OrganisationTabsType.ORGANISATION_INFO && <OrganisationInfo />}
        {tab === OrganisationTabsType.MEMBERS && <Members />}
      </main>
    </div>
  )
}

export default Organisation
