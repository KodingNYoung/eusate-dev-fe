import {
  SATE_AI_TABS,
  SateAiTabsType,
  SATE_AI_QUERY_KEYS,
} from "@/components/views/settings/Sate-ai/utils"
import { PageFC } from "@/utils/types"
import SateAi from "@/components/views/settings/Sate-ai"

const SateAiPage: PageFC = ({ searchParams }) => {
  const tab =
    (searchParams?.[SATE_AI_QUERY_KEYS.TAB] as SateAiTabsType) ||
    SATE_AI_TABS[0].key
  return <SateAi tab={tab} />
}

export default SateAiPage
