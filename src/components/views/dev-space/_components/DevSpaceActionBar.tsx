import { FC } from "@/utils/types"
import React from "react"
import DevSpaceActionTabs from "./DevSpaceActionTabs"
import DevSpaceActionButton from "./DevSpaceActionButton"

const DevSpaceActionBar: FC = () => {
  return (
    <header className="flex items-center justify-between gap-1 sm:gap-2.5">
      <DevSpaceActionTabs />
      <DevSpaceActionButton />
    </header>
  )
}

export default DevSpaceActionBar
