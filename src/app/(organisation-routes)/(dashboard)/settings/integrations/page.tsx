import { PageFC } from "@/utils/types"
import Integration from "@/components/views/settings/Integrations"
import { IntegrationTabType } from "@/components/views/settings/Integrations/utils"
import {
  INTEGRATION_QUERY_KEYS,
  INTEGRATION_TABS,
} from "@/components/views/settings/Integrations/utils"

const IntegrationPage: PageFC = ({ searchParams }) => {
  const tab =
    (searchParams?.[INTEGRATION_QUERY_KEYS.TAB] as IntegrationTabType) ||
    INTEGRATION_TABS[0].key
  return <Integration tab={tab} />
}

export default IntegrationPage
