"use client"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@heroui/react"
import React from "react"
import Icon from "../atoms/Icon"
import { cls } from "@/utils/helpers"
import { useModal } from "@/hooks/popupHooks"
import { FC, TWClassNames } from "@/utils/types"
import Typography from "../atoms/Typography"
import Button from "../molecules/Buttons"
import { IconNames } from "@/utils/iconNames"
import { PopupKeys } from "@/utils/enums"

export type AppModalProps = Omit<ModalProps, "isOpen" | "onClose"> & {
  //   classNames?: { [slot in ModalSlots]?: TWClassNames }
  header?: {
    title?: string
    subtitle?: string
    closeIcon?: IconNames | false
  }
  headerStyle?: {
    title?: TWClassNames
    subtitle?: TWClassNames
    closeIcon?: TWClassNames
  }
  id: PopupKeys
}

const AppModal: FC<AppModalProps> = ({
  children,
  headerStyle,
  classNames,
  header,
  id,
  ...props
}) => {
  const { isOpen, close } = useModal(id)

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onClose={close}
      classNames={{
        ...classNames,
        backdrop: ["bg-black-50", classNames?.backdrop],
        base: ["shadow-none", classNames?.base],
        closeButton: ["mt-5 mr-5 top-0 end-0", classNames?.closeButton],
        header: [
          cls(
            "flex items-center justify-between p-5 border-b border-gray-50",
            classNames?.header as string
          ),
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
                      className={cls("text-gray-900", headerStyle?.title)}
                    >
                      {header.title}
                    </Typography>
                  )}
                  {header.subtitle && (
                    <Typography
                      as="span"
                      variant="regular-xs"
                      className={cls("text-gray-500", headerStyle?.subtitle)}
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
