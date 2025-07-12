"use client"

import { FC } from "react"
import AppTabs from "@/components/molecules/Tabs"
import { useQueryParams } from "@/hooks/utilityHooks"
import {
  ORAGANISATION_TABS,
  ORGANISATION_QUERY_KEYS,
  OrganisationTabsType,
} from "./utils"
import OrganisationInfo from "./OrganisationInfo"
import Members from "./Members"

type Props = {
  tab: OrganisationTabsType
}

const Organisation: FC<Props> = ({ tab }) => {
  const { get, set } = useQueryParams()

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <AppTabs
        radius="full"
        variant="solid"
        tabs={ORAGANISATION_TABS}
        classNames={{
          cursor: "rounded-full",
          tab: "py-3 px-4",
          tabList: "gap-0",
        }}
        onSelectionChange={(tab) => set(ORGANISATION_QUERY_KEYS.TAB, tab)}
        selectedKey={
          get(ORGANISATION_QUERY_KEYS.TAB) || ORAGANISATION_TABS[0].key
        }
      />
      <main>
        {tab === OrganisationTabsType.ORGANISATION_INFO && <OrganisationInfo />}
        {tab === OrganisationTabsType.MEMBERS && <Members />}
      </main>
    </div>
  )
}

export default Organisation
