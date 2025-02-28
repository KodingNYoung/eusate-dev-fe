"use client"

import { FC } from "@/utils/types"
import React, { ReactNode } from "react"
import AppModal, { AppModalProps } from "./Modal"
import { PopupKeys } from "@/utils/enums"
import Typography from "../atoms/Typography"
import Button, { ButtonProps } from "../molecules/Buttons"
import SubmitButton from "../molecules/Buttons/SubmitButton"
import { useModal } from "@/hooks/popupHooks"

type Props = Omit<AppModalProps, "id" | "children" | "content"> & {
  modalId: PopupKeys
  content: ReactNode
  icon?: ReactNode
  hasCloseBtn?: boolean
  closeBtnText?: ReactNode
  okBtnText: ReactNode
  okBtnVariant?: ButtonProps["variant"]
  okAction: (payload: FormData) => void
}

const ConfirmationModal: FC<Props> = ({
  modalId,
  title,
  okAction,
  content,
  icon,
  hasCloseBtn = true,
  closeBtnText,
  okBtnText,
  okBtnVariant = "error",
  ...props
}) => {
  const { close } = useModal()

  return (
    <AppModal
      id={modalId}
      classNames={{ wrapper: "px-2", base: "w-full max-w-[600px] rounded-x20" }}
      {...props}
    >
      <main className="flex flex-col items-center p-5 gap-5">
        {icon}
        <div className="grid w-full gap-2 items-center text-center">
          {title && <Typography className="text-bold-2xl">{title}</Typography>}
          <Typography className="text-regular-sm text-black-50 max-w-[446px] mx-auto">
            {content}
          </Typography>
        </div>
        <form action={okAction}>
          <footer className="py-5 flex items-center justify-center gap-5">
            {hasCloseBtn && (
              <Button
                variant="tetiary"
                classNames={{ root: "!py-3.5 px-5", label: "text-medium-sm" }}
                onClick={close}
              >
                {closeBtnText || "No, Cancel"}
              </Button>
            )}
            <SubmitButton
              variant={okBtnVariant}
              classNames={{ root: "!py-3.5 px-5", label: "text-medium-sm" }}
              className="py-3 px-4"
            >
              {okBtnText}
            </SubmitButton>
          </footer>
        </form>
      </main>
    </AppModal>
  )
}

export default ConfirmationModal
