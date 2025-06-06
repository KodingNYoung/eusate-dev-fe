import Remarks from "../Remarks"
import { FC } from "@/utils/types"
import SateAiTabs from "./SateAiTabs"
import { SateAiTabsType } from "../utils"

type Props = {
  tab: SateAiTabsType
}
const SateAiTabActions: FC<Props> = ({ tab }) => {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <SateAiTabs />
      <main>
        {tab === "remarks" && <Remarks />}
        {tab === "priority" && <div>Priority</div>}
        {tab === "feedback" && <div>Feedback</div>}
      </main>
    </div>
  )
}

export default SateAiTabActions
