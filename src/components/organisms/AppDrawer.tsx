"use client"

import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerProps,
} from "@heroui/react"
import React from "react"
import Button from "../molecules/Buttons"
import Icon from "../atoms/Icon"
import Typography from "../atoms/Typography"

type Props = Omit<DrawerProps, "isOpen" | "onClose"> & {
  header?: {
    title?: string
    subtitle?: string
    closeIcon?: IconNames | false
  }
  id: PopupKeys
}

const AppDrawer: FC<Props> = ({
  children,
  classNames,
  header,
  id,
  ...props
}) => {
  const { isOpen, close } = useModal(id)

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={close}
      classNames={{
        ...classNames,
        base: ["!m-5 rounded-r-x20 rounded-l-x20", classNames?.base],
        body: ["p-0 gap-5", classNames?.body],
        backdrop: ["bg-black-50", classNames?.backdrop],
        closeButton: ["mt-5 mr-8 top-0 end-0", classNames?.closeButton],
        header: [
          "flex items-center justify-between px-8 py-[27px] border-b border-gray-50",
          classNames?.backdrop,
        ],
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
      <DrawerContent>
        {header && (
          <DrawerHeader>
            <header className="">
              {(header?.title || header.subtitle) && (
                <div className="grid gap-1.5">
                  {header.title && (
                    <Typography
                      as="h2"
                      variant="regular-lg"
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
          </DrawerHeader>
        )}
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default AppDrawer
