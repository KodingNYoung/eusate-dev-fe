import { Conversation, FC } from "@/utils/types"
import React, { useEffect, useState } from "react"
import SateResponseBox from "./SateResponseBox"
import UserMessageBox from "./UserMessageBox"

type Props = {
  msgs: Conversation["messages"]
  msgHistoryCode: string
}

const MsgPair: FC<Props> = ({ msgs, msgHistoryCode }) => {
  const [currMsgIdx, setCurrMsgIdx] = useState(msgs.length - 1)
  const [canGoToLast, setCanGoToLast] = useState(true) // this boolean flag is used to determine if the msg can automatically go to the last one.

  useEffect(() => {
    if (canGoToLast) {
      setCurrMsgIdx(msgs.length - 1)
    }
  }, [msgs])

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
        userMessageText={msgs[currMsgIdx].user_message.message}
        setCanGoToLast={setCanGoToLast}
      />
    </section>
  )
}

export default MsgPair
