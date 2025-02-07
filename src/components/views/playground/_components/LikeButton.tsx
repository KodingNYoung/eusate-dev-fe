import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"

const LikeButton: FC = () => {
  const { open } = useModal(PopupKeys.PLAYGROUND_LIKE_MODAL)
  return (
    <Button
      variant="tetiaryText"
      size="mini"
      classNames={{
        root: "!border-0 focus:border-0 active:border-0",
        label: "!leading-none",
      }}
      onClick={() => open()}
    >
      <Icon name="icon-like" size={20} />
    </Button>
  )
}

export default LikeButton
