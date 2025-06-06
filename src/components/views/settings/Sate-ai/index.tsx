import { FC } from "@/utils/types"
import { SateAiTabsType } from "./utils"
import SateAiTabActions from "./_components/SateAiTabActions"

type Props = {
  tab: SateAiTabsType
}

const SateAi: FC<Props> = ({ tab }) => {
  return <SateAiTabActions tab={tab} />
}

export default SateAi
