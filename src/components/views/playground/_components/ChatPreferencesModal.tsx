import AppModal from "@/components/organisms/Modal"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"
import ChatPreferencesForm from "./ChatPreferencesForm"

const ChatPreferencesModal: FC = () => {
  return (
    <AppModal
      id={PopupKeys.PLAYGROUND_PREFERENCES_MODAL}
      classNames={{ wrapper: "px-2", base: "w-full max-w-[460px] rounded-x20" }}
      header={{ title: "Set AI preferences" }}
      isDismissable={false}
    >
      <ChatPreferencesForm />
    </AppModal>
  )
}

export default ChatPreferencesModal
