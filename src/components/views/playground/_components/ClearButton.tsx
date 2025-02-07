import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"

const ClearButton: FC = () => {
  const { open } = useModal(PopupKeys.PLAYGROUND_CLEAR_CONVO_MODAL)
  return (
    <Button
      variant="tetiary"
      classNames={{
        root: "flex-col rounded-lg gap-2 py-3.5 px-6 text-gray-900 border-gray-50 self-end",
        label: "text-semibold-lg",
      }}
      startContent={<Icon name="icon-brush" size={24} className="rotate-180" />}
      onClick={() => open()}
    >
      Clear
    </Button>
  )
}

export default ClearButton
