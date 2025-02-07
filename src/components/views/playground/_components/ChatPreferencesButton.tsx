import Icon from "@/components/atoms/Icon"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"

const ChatPreferencesButton: FC = () => {
  const { open } = useModal(PopupKeys.PLAYGROUND_PREFERENCES_MODAL)
  return (
    <button onClick={() => open()}>
      <Icon name="icon-setting-4" size={24} className="text-gray-900" />
    </button>
  )
}

export default ChatPreferencesButton
