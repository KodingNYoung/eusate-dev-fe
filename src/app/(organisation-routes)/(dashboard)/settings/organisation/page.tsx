import { PageFC } from "@/utils/types"
import Organisation from "@/components/views/settings/Organisation"
import {
  ORAGANISATION_TABS,
  ORGANISATION_QUERY_KEYS,
  OrganisationTabsType,
} from "@/components/views/settings/utils"

const OrganisationPage: PageFC = ({ searchParams }) => {
  const tab =
    (searchParams?.[ORGANISATION_QUERY_KEYS.TAB] as OrganisationTabsType) ||
    ORAGANISATION_TABS[0].key
  return <Organisation tab={tab} />
}

export default OrganisationPage
