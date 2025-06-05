import { FC } from "@/utils/types"
import React from "react"
import { SettingsTabsType } from "../utils"
import SettingsTabs from "./SettingsTabs"
import OpenModalButton from "@/components/molecules/Buttons/OpenModalButton"
import Profile from "../Profile"
import { PopupKeys } from "@/utils/enums"
import Organization from "../Organization"
import { OrganizationTabsType } from "../Organization/utils"

type Props = {
  tab: SettingsTabsType & OrganizationTabsType
}

const SettingsActionBar: FC<Props> = ({ tab }) => {
  return (
    <section className="flex justify-between items-start gap-32">
      <SettingsTabs />
      <div className="flex-1">
        {tab === SettingsTabsType.INTEGRATIONS && (
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
        {tab === SettingsTabsType.PROFILE && <Profile />}
        {tab === SettingsTabsType.ORGANIZATION && <Organization tab={tab} />}
      </div>
    </section>
  )
}

export default SettingsActionBar
