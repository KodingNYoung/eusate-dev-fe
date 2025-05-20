import { FC } from "@/utils/types"
import React from "react"
import { SettingsTabsType } from "../utlis"
import SettingsTabs from "./SettingsTabs"
import OpenModalButton from "@/components/molecules/Buttons/OpenModalButton"
import { PopupKeys } from "@/utils/enums"

type Props = {
  tab: SettingsTabsType
}

const SettingsActionBar: FC<Props> = ({ tab }) => {
  return (
    <section className="p-2 flex justify-between items-center gap-1 sm:gap-2.5">
      <SettingsTabs />
      <div className="flex-1"></div>
      {tab === SettingsTabsType.API_KEYS && (
        <OpenModalButton
          modalKey={PopupKeys.GENERATE_API_KEY}
          classNames={{
            root: "ml-12 sm:ml-0 py-1 sm:py-2.5 px-3 sm-gradient",
            label: "text-medium-xs sm:text-medium-sm ",
          }}
        >
          Generate API Key
        </OpenModalButton>
      )}
    </section>
  )
}

export default SettingsActionBar
