import { FC } from "@/utils/types"
import { IntegrationTabType } from "./utils"
import IntegrationTabsAction from "./_components/IntegrationsTabsAction"

type Props = {
  tab: IntegrationTabType
}

const Integration: FC<Props> = ({ tab }) => {
  return <IntegrationTabsAction tab={tab} />
}

export default Integration
