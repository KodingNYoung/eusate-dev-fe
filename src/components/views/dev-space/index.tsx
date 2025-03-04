import { FC } from "@/utils/types"
import React from "react"
import DevSpaceActionBar from "./_components/DevSpaceActionBar"
import { DevspaceTabs } from "./utils"
import AuthConfiguration from "./AuthConfiguration"
import DevSpaceFunctions from "./DevSpaceFunctions"

type Props = {
  tab: DevspaceTabs
}

const DevSpace: FC<Props> = ({ tab }) => {
  return (
    <div className="grid gap-5 content-start flex-1">
      {/* actions */}
      <DevSpaceActionBar />
      {/* tab content */}
      {tab === DevspaceTabs.AUTH && <AuthConfiguration />}
      {tab === DevspaceTabs.FUNCTIONS && <DevSpaceFunctions />}
    </div>
  )
}

export default DevSpace
