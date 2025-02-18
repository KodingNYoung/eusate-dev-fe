import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  totalMsgs: number
  currentIdx: number
  goToMsg: (idx: number) => void
  loading?: boolean
}

const MsgPageIndicator: FC<Props> = ({
  totalMsgs,
  currentIdx,
  goToMsg,
  loading,
}) => {
  return totalMsgs > 1 ? (
    <div className="flex justify-end items-center gap-2">
      <Typography className="text-gray-400 text-medium-sm sm:text-medium-base border-r px-2 border-gray-100">
        <span className="text-gray-900">{currentIdx + 1}</span> of {totalMsgs}
      </Typography>
      <button
        className="text-black disabled:text-gray-300 leading-none"
        disabled={currentIdx < 1 || loading}
        onClick={() => goToMsg(currentIdx - 1)}
      >
        <Icon name="icon-chevron-left" size={20} />
      </button>
      <button
        className="text-black disabled:text-gray-300 leading-none"
        disabled={currentIdx + 1 >= totalMsgs || loading}
        onClick={() => goToMsg(currentIdx + 1)}
      >
        <Icon name="icon-chevron-right" size={20} />
      </button>
    </div>
  ) : null
}

export default MsgPageIndicator
