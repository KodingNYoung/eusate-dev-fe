/* AI Modal is only available on  mobile */
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import AppModal from "@/components/organisms/Modal"
import { PopupKeys } from "@/utils/enums"
import React from "react"
import AIChat from "../aichat"
import { useModal } from "@/hooks/popupHooks"

const AIModal = () => {
  return (
    <div>
      <AppModal size="full" id={PopupKeys.OPEN_CHAT_WITH_AI}>
        <AIChat />
      </AppModal>
    </div>
  )
}

export default AIModal

export const AIModalTrigger = () => {
  const { open } = useModal()
  return (
    <div
      className="flex sm:hidden my-3 w-full"
      onClick={() => open(PopupKeys.OPEN_CHAT_WITH_AI)}
    >
      <div className="w-full bg-brand-gradient flex justify-between items-center rounded-full p-3">
        <div className="flex items-center gap-x-4">
          <Icon size={18} name="icon-eusate" className="text-white" />
          <Typography className="text-white text-semibold-sm font-[600]">
            Chat with AI copilot
          </Typography>
        </div>
        <Icon name="icon-arrow-circle-right" className="text-white" />
      </div>
    </div>
  )
}
