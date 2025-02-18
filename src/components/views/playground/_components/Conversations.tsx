import { Conversation } from "@/utils/types"
import React, { FC } from "react"
import MsgPair from "./MsgPair"

type Props = {
  conversations: Conversation[]
}

const Conversations: FC<Props> = ({ conversations }) => {
  return (
    <div className="grid gap-6 pb-10">
      {conversations.map((conversations) => {
        return (
          <React.Fragment key={conversations.message_history_code}>
            <MsgPair
              msgs={conversations.messages}
              msgHistoryCode={conversations.message_history_code}
            />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Conversations
