import { FC } from "react"
import { OrganizationTabsType } from "./utils"
import OrganizationTabsAction from "./_components/OrganizationTabsAction"

type Props = {
  tab: OrganizationTabsType
}

const Organization: FC<Props> = ({ tab }) => {
  return <OrganizationTabsAction tab={tab} />
}

export default Organization
