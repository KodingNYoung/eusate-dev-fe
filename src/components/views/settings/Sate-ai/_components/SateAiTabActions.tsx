import Remarks from "../Remarks"
import Priority from "../Priority"
import { FC } from "@/utils/types"
import Feedback from "../Feedback"
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
        {tab === "priority" && <Priority />}
        {tab === "feedback" && <Feedback />}
      </main>
    </div>
  )
}

export default SateAiTabActions
