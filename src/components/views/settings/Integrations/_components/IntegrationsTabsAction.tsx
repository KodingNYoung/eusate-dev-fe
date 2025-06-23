"use client"

import Apps from "../Apps"
import Data from "../Data"
import ApiKeys from "../ApiKeys"
import { FC } from "@/utils/types"
import { IntegrationTabType } from "../utils"
import IntegrationTabs from "./IntegrationTabs"

type Props = {
  tab: IntegrationTabType
}
const IntegrationTabsAction: FC<Props> = ({ tab }) => {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <IntegrationTabs />
      <main className="overflow-auto h-full max-h-[63vh]">
        {tab === "api_keys" && <ApiKeys />}
        {tab === "apps" && <Apps />}
        {tab === "data" && <Data />}
      </main>
    </div>
  )
}
export default IntegrationTabsAction
