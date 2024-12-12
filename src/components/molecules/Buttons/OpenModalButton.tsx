"use client"

import { FC } from "@/utils/types"
import React from "react"
import Button, { ButtonProps } from "."
import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"

type Props = Omit<ButtonProps, "onClick"> & {
  modalKey: PopupKeys
}

const OpenModalButton: FC<Props> = ({ modalKey, ...props }) => {
  const { open } = useModal(modalKey)
  return <Button {...props} onClick={open} />
}

export default OpenModalButton
