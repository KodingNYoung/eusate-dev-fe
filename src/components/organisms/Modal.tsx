"use client"
import { useModal } from "@/hooks/popupHooks"
import { FC } from "@/utils/types"
import React from "react"
import Typography from "../atoms/Typography"
import Button from "../molecules/Buttons"
import Icon from "../atoms/Icon"
import { IconNames } from "@/utils/iconNames"
import { PopupKeys } from "@/utils/enums"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react"

export type AppModalProps = Omit<ModalProps, "isOpen" | "onClose"> & {
  //   classNames?: { [slot in ModalSlots]?: TWClassNames }
  header?: {
    title?: string
    subtitle?: string
    closeIcon?: IconNames | false
  }
  size?: Sizes
  id: PopupKeys
}

type Sizes = "full"

const AppModal: FC<AppModalProps> = ({
  children,
  classNames,
  header,
  id,
  size,
  ...props
}) => {
  const { isOpen, close } = useModal(id)

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      size={size}
      onClose={close}
      classNames={{
        ...classNames,
        backdrop: ["bg-black-50", classNames?.backdrop],
        base: ["shadow-none", classNames?.base],
        closeButton: ["mt-5 mr-5 top-0 end-0", classNames?.closeButton],
        header: [
          "flex items-center justify-between p-5 border-b border-gray-50",
          classNames?.backdrop,
        ],
        body: ["p-0", classNames?.body],
      }}
      closeButton={
        <Button
          variant="tetiary"
          className="w-10 h-10 flex items-center"
          onClick={close}
          startContent={
            <Icon
              name={header?.closeIcon || "icon-close"}
              className="text-regular-xl leading-none"
            />
          }
        />
      }
      {...props}
    >
      <ModalContent>
        {header && (
          <ModalHeader>
            <header className="">
              {(header?.title || header.subtitle) && (
                <div className="grid gap-1.5">
                  {header.title && (
                    <Typography
                      as="h2"
                      variant="semibold-xl"
                      className="text-gray-900"
                    >
                      {header.title}
                    </Typography>
                  )}
                  {header.subtitle && (
                    <Typography
                      as="span"
                      variant="regular-xs"
                      className="text-gray-500"
                    >
                      {header.subtitle}
                    </Typography>
                  )}
                </div>
              )}
            </header>
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AppModal
