import { FC, UserMessage } from "@/utils/types"
import React, { useState } from "react"
import EditMsgForm from "./EditMsgForm"
import UserTextBox from "./UserTextBox"
import { usePlayground } from "@/providers/playgroundProvider"

type Props = {
  msg: UserMessage
  currMsgIdx: number
  totalMsgs: number
  toggleMsgToShow: (idx: number) => void
  msgHistoryCode: string
}

const UserMessageBox: FC<Props> = ({
  msg,
  currMsgIdx,
  totalMsgs,
  toggleMsgToShow,
  msgHistoryCode,
}) => {
  const [editMode, setEditMode] = useState(false)
  const { editMessage } = usePlayground()

  return (
    <div className="ml-auto">
      {editMode ? (
        <EditMsgForm
          msgHistoryCode={msgHistoryCode}
          msg={msg.message}
          closeEdit={() => {
            setEditMode(false)
          }}
          formAction={(formdata) => {
            editMessage(formdata)
            return setEditMode(false)
          }}
        />
      ) : (
        <UserTextBox
          onEdit={() => setEditMode(true)}
          msg={msg.message}
          currMsgIdx={currMsgIdx}
          totalMsgs={totalMsgs}
          toggleMsgToShow={toggleMsgToShow}
        />
      )}
    </div>
  )
}

export default UserMessageBox
