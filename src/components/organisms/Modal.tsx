"use client"
import { useModal } from "@/hooks/popupHooks"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
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
  ModalSlots,
} from "@nextui-org/react"

type Props = Omit<ModalProps, "isOpen" | "onClose"> & {
  classNames?: { [slot in ModalSlots]?: TWClassNames }
  header?: {
    title?: string
    subtitle?: string
    closeIcon?: IconNames | false
  }
  id: PopupKeys
}

const AppModal: FC<Props> = ({ children, classNames, header, id }) => {
  const { isOpen, close } = useModal(id)

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onClose={close}
      classNames={{
        backdrop: cls("bg-black-50", classNames?.backdrop),
        base: cls("shadow-none", classNames?.base),
        closeButton: cls("mt-5 mr-6", classNames?.closeButton),
        header: cls(
          "flex items-center justify-between p-5 border-b border-gray-50",
          classNames?.backdrop
        ),
        body: cls("p-0", classNames?.body),
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
    // <div
    //   ref={ref}
    //   data-open={isOpen}
    //   className={cls(
    //     "fixed top-0 left-0 w-full h-full z-4 flex justify-center items-center group/modal",
    //     classNames?.root
    //   )}
    // >
    //   <div
    //     className={cls(
    //       "absolute top-0 left-0 z-10 w-full h-full bg-black-100 bg-opacity-0 group-data-[open=true]/modal:bg-opacity-50 transition-colors duration-500",
    //       classNames?.backdrop
    //     )}
    //     onClick={close}
    //   />
    //   <main
    //     className={cls(
    //       "bg-white relative z-10 transition-all duration-500",
    //       "group-data-[open=true]/modal:opacity-100 group-data-[open=true]/modal:top-0",
    //       "group-data-[open=false]/modal:opacity-0 group-data-[open=false]/modal:top-10",
    //       classNames?.main
    //     )}
    //   >
    //     {header && (
    //       <header className="flex items-center justify-between p-5 border-b border-gray-50">
    //         {(header?.title || header.subtitle) && (
    //           <div className="grid gap-1.5">
    //             {header.title && (
    //               <Typography
    //                 as="h2"
    //                 variant="semibold-xl"
    //                 className="text-gray-900"
    //               >
    //                 {header.title}
    //               </Typography>
    //             )}
    //             {header.subtitle && (
    //               <Typography
    //                 as="span"
    //                 variant="regular-xs"
    //                 className="text-gray-500"
    //               >
    //                 {header.subtitle}
    //               </Typography>
    //             )}
    //           </div>
    //         )}
    //         {header?.closeIcon !== false && (
    //           <Button
    //             variant="tetiary"
    //             className="w-10 h-10 flex items-center"
    //             onClick={close}
    //             startContent={
    //               <Icon
    //                 name="icon-close"
    //                 className="text-regular-xl leading-none"
    //               />
    //             }
    //           />
    //         )}
    //       </header>
    //     )}
    //     {children}
    //   </main>
    // </div>
  )
}

export default AppModal
