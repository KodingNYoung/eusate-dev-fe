import AppModal from "@/components/organisms/Modal"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"
import FeedbackForm from "./FeedbackForm"
import { FeedbackType } from "../utils"

type Props = {
  feedback: FeedbackType
}
const feedbackIdMap = {
  [FeedbackType.LIKE]: PopupKeys.PLAYGROUND_LIKE_MODAL,
  [FeedbackType.DISLIKE]: PopupKeys.PLAYGROUND_DISLIKE_MODAL,
}

const FeedbackModal: FC<Props> = ({ feedback }) => {
  return (
    <AppModal
      id={feedbackIdMap[feedback]}
      classNames={{
        wrapper: "px-2",
        base: "w-full max-w-[600px] rounded-x20",
      }}
      header={{ title: "Share your thoughts" }}
    >
      <FeedbackForm feedbackType={feedback} />
    </AppModal>
  )
}

export default FeedbackModal
