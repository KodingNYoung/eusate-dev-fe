"use client"

import Apps from "./Apps"
import Data from "./Data"
import ApiKeys from "./ApiKeys"
import { FC } from "@/utils/types"
import { IntegrationTab } from "./utils"
import IntegrationActions from "./_components/IntegrationActions"

type Props = {
  tab: IntegrationTab
}
const Integrations: FC<Props> = ({ tab }) => {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <IntegrationActions />
      <main className="overflow-auto h-full max-h-[63vh]">
        {tab === "api_keys" && <ApiKeys />}
        {tab === "apps" && <Apps />}
        {tab === "data" && <Data />}
      </main>
    </div>
  )
}
export default Integrations
