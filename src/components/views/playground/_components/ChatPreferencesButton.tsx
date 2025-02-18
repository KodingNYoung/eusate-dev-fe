import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"

const ChatPreferencesButton: FC = () => {
  const { open } = useModal(PopupKeys.PLAYGROUND_PREFERENCES_MODAL)
  return (
    <Button
      variant="tetiary"
      classNames={{
        root: "gap-2 text-gray-500 border-gray-50 bg-white py-1.5 px-3",
        label: "text-medium-base hidden sm:block",
      }}
      startContent={<Icon name="icon-setting-4" size={20} />}
      onClick={() => open()}
    >
      Set Preferences
    </Button>
  )
}

export default ChatPreferencesButton
