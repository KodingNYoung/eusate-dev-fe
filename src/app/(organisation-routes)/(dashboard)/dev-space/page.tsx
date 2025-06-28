import DevSpace from "@/components/views/dev-space"
import {
  DEVSPACE_QUERY_KEYS,
  DEVSPACE_TABS,
  DevspaceTabs,
} from "@/components/views/dev-space/utils"
import { PageFC } from "@/utils/types"
import React from "react"

export const metadata = {
  title: "Dev Space",
}

const DevSpacePage: PageFC = ({ searchParams }) => {
  const tab =
    (searchParams?.[DEVSPACE_QUERY_KEYS.TAB] as DevspaceTabs) ||
    DEVSPACE_TABS[0].key
  return <DevSpace tab={tab} />
}

export default DevSpacePage
