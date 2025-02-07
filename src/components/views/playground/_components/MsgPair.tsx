import { Conversation, FC } from "@/utils/types"
import React, { useState } from "react"
import SateResponseBox from "./SateResponseBox"
import UserMessageBox from "./UserMessageBox"

type Props = {
  msgs: Conversation["messages"]
  msgHistoryCode: string
}

const MsgPair: FC<Props> = ({ msgs, msgHistoryCode }) => {
  const [currMsgIdx, setCurrMsgIdx] = useState(() => msgs.length - 1)
  return (
    <section className="grid gap-6">
      <UserMessageBox
        msg={msgs[currMsgIdx].user_message}
        currMsgIdx={currMsgIdx}
        totalMsgs={msgs.length}
        toggleMsgToShow={setCurrMsgIdx}
        msgHistoryCode={msgHistoryCode}
      />
      <SateResponseBox
        responses={msgs[currMsgIdx].sate_responses}
        msgHistoryCode={msgHistoryCode}
      />
    </section>
  )
}

export default MsgPair
