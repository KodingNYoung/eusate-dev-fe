import { clearChatWall } from "@/app/(organisation-routes)/(dashboard)/playground/actions"
import Icon from "@/components/atoms/Icon"
import ConfirmationModal from "@/components/organisms/ConfirmationModal"
import { useFormToast } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

const ClearConvoModal: FC = () => {
  const { close } = useModal()

  const [state, action] = useFormState(clearChatWall, {})

  useFormToast(state, true)

  useEffect(() => {
    if ("success" in state) close()
  }, [state, close])

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
      okAction={action}
      okBtnVariant="primary"
      hasCloseBtn={false}
      hideCloseButton
    />
  )
}

export default ClearConvoModal
