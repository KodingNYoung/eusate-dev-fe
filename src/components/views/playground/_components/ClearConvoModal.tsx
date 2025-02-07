import Icon from "@/components/atoms/Icon"
import ConfirmationModal from "@/components/organisms/ConfirmationModal"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"

const ClearConvoModal: FC = () => {
  return (
    <ConfirmationModal
      modalId={PopupKeys.PLAYGROUND_CLEAR_CONVO_MODAL}
      title="Clear all conversations"
      content="Are you sure you want to clear all your previous conversations with EusateAI? This action cannot be undone."
      okBtnText="Yes, clear"
      icon={
        <Icon
          name="icon-information-bold"
          size={64}
          className="text-warning-500"
        />
      }
      okAction={() => console.log("hello")}
      okBtnVariant="primary"
      hasCloseBtn={false}
      hideCloseButton
    />
  )
}

export default ClearConvoModal
