import { FC } from "@/utils/types"
import React from "react"
import { SettingsTabsType } from "./utlis"
import Typography from "@/components/atoms/Typography"
import SettingsActionBar from "./_components/SettingsActionBar"
import ApiKeys from "./ApiKeys"

type Props = {
  tab: SettingsTabsType
}

const Settings: FC<Props> = ({ tab }) => {
  return (
    <div className="bg-white sm:rounded-x20 px-4 sm:px-5 py-3 sm:py-4.5 h-full flex flex-col gap-4 sm:gap-5 relative">
      <header className="grid gap-2">
        <Typography className="text-bold-base sm:text-bold-2xl text-gray-900">
          Settings
        </Typography>
        <Typography className="text-regular-xs sm:text-regular-sm text-black-50">
          Empower your AI with curated knowledge.
        </Typography>
      </header>
      <div className="grid gap-5 content-start flex-1 w-full">
        <SettingsActionBar tab={tab} />
        {tab === SettingsTabsType.API_KEYS && <ApiKeys />}
      </div>
    </div>
  )
}

export default Settings
