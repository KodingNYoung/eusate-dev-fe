import { FC, FormState, UserMessage } from "@/utils/types"
import React, { useEffect, useState } from "react"
import EditMsgForm from "./EditMsgForm"
import UserTextBox from "./UserTextBox"
import { usePlayground } from "@/hooks/playground"
import { useFormState } from "react-dom"
import { SendMessageResponse } from "@/lib/services/playground"
import { createMessage } from "@/app/(dashboard)/playground/actions"
import { EditMessageReturnType } from "@/providers/playgroundProvider"

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
  const [ids, setIds] = useState<EditMessageReturnType>()

  const { updateResponse, settings } = usePlayground()

  const [state, action] = useFormState<
    FormState<SendMessageResponse>,
    FormData
  >(async (state, formdata) => {
    const message = formdata.get("message") as string
    return await createMessage(state, {
      message,
      userMessageId: msg.id,
      msgHistoryCode: msgHistoryCode,
      ...settings,
    })
  }, {})

  useEffect(() => {
    if ("success" in state) {
      updateResponse(
        state.payload as SendMessageResponse,
        msgHistoryCode,
        ids?.userMessage || "",
        ids?.sateResponse || ""
      )
    }
  }, [state, ids, msgHistoryCode, updateResponse])

  return (
    <div className="ml-auto">
      {editMode ? (
        <EditMsgForm
          msgHistoryCode={msgHistoryCode}
          msg={msg.message}
          closeEdit={() => {
            setEditMode(false)
          }}
          formAction={action}
          setIds={setIds}
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
