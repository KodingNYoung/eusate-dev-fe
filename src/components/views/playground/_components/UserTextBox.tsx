import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import React from "react"
import MsgPageIndicator from "./MsgPageIndicator"

type Props = {
  onEdit: () => void
  msg: string
  currMsgIdx: number
  totalMsgs: number
  toggleMsgToShow: (idx: number) => void
}

const UserTextBox: FC<Props> = ({
  onEdit,
  msg,
  totalMsgs,
  currMsgIdx,
  toggleMsgToShow,
}) => {
  return (
    <div className="grid justify-items-end gap-2.5">
      <div className="flex items-center justify-end gap-2.5 group/userText">
        <button
          className="opacity-0 group-hover/userText:opacity-100 transition-opacity duration-200"
          onClick={onEdit}
        >
          <Icon name="icon-edit-alt" size={16} />
        </button>
        <Typography className="bg-gray-25 py-3 px-6 rounded-x20 text-medium-sm sm:text-medium-base whitespace-break-spaces">
          {msg}
        </Typography>
      </div>
      <MsgPageIndicator
        totalMsgs={totalMsgs}
        currentIdx={currMsgIdx}
        goToMsg={toggleMsgToShow}
      />
    </div>
  )
}

export default UserTextBox
