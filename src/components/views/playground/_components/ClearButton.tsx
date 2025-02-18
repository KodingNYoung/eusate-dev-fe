import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import { usePlayground } from "@/hooks/playground"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"

const ClearButton: FC = () => {
  const { open } = useModal(PopupKeys.PLAYGROUND_CLEAR_CONVO_MODAL)
  const { conversations } = usePlayground()
  return (
    <Button
      variant="tetiary"
      classNames={{
        root: "gap-2 text-gray-500 border-gray-50 bg-white py-1.5 px-3",
        label: "text-medium-base",
      }}
      startContent={<Icon name="icon-brush" size={20} className="rotate-180" />}
      onClick={() => open()}
      disabled={conversations.length === 0}
    >
      Clear
    </Button>
  )
}

export default ClearButton
