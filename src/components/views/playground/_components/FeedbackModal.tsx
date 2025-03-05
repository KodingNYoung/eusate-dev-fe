import AppModal from "@/components/organisms/Modal"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"
import FeedbackForm from "./FeedbackForm"
import { FeedbackKind } from "../utils"

type Props = {
  kind: FeedbackKind
}
const feedbackIdMap = {
  [FeedbackKind.LIKE]: PopupKeys.PLAYGROUND_LIKE_MODAL,
  [FeedbackKind.DISLIKE]: PopupKeys.PLAYGROUND_DISLIKE_MODAL,
}

const FeedbackModal: FC<Props> = ({ kind }) => {
  return (
    <AppModal
      id={feedbackIdMap[kind]}
      classNames={{
        wrapper: "px-2",
        base: "w-full max-w-[600px] rounded-x20",
      }}
      header={{ title: "Share your thoughts" }}
    >
      <FeedbackForm kind={kind} />
    </AppModal>
  )
}

export default FeedbackModal
