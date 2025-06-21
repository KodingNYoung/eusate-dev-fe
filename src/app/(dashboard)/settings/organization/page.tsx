import {
  ORAGANIZATION_TABS,
  ORGANIZATION_QUERY_KEYS,
  OrganizationTabsType,
} from "@/components/views/settings/Organization/utils"
import { PageFC } from "@/utils/types"
import Organization from "@/components/views/settings/Organization"

const OrganizationPage: PageFC = ({ searchParams }) => {
  const tab =
    (searchParams?.[ORGANIZATION_QUERY_KEYS.TAB] as OrganizationTabsType) ||
    ORAGANIZATION_TABS[0].key
  return <Organization tab={tab} />
}

export default OrganizationPage
