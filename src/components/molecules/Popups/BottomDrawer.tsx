import Typography from "@/components/atoms/Typography"
import { usePopup } from "@/hooks/popupHooks"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { ReactNode } from "react"

type Slots = "root" | "backdrop" | "main"
type Props = {
  isOpen: boolean
  close?: () => void
  title?: ReactNode
  classNames?: { [slot in Slots]?: TWClassNames }
}

// const CLOSE_CLASS = "hidden"
// const OPEN_CLASS = "block"

const BottomDrawer: FC<Props> = ({
  children,
  isOpen,
  title,
  close,
  classNames,
}) => {
  const { ref } = usePopup(isOpen, {
    // classNames: { opened: OPEN_CLASS, closed: CLOSE_CLASS },
    delay: 350,
  })
  return (
    <div
      ref={ref}
      role="bottom-nav"
      data-opened={isOpen}
      className={cls(
        "fixed top-0 left-0 w-screen h-screen overflow-hidden z-3 flex justify-start items-end sm:hidden group",
        classNames?.root
      )}
    >
      <div
        className={cls(
          "absolute top-0 left-0 h-full w-full bg-black-50 z-1",
          "opacity-0 group-data-[opened=true]:opacity-100 transition-opacity duration-300",
          classNames?.backdrop
        )}
        onClick={close}
      />
      <div
        className={cls(
          "bg-white w-full relative z-2 transition-all duration-300 rounded-t-x20 pt-6",
          "group-data-[opened=true]:opacity-100 group-data-[opened=true]:top-0",
          "group-data-[opened=false]:opacity-0 group-data-[opened=false]:top-full",
          classNames?.main
        )}
      >
        {!!title && (
          <header className="flex justify-center py-2.5 border-b border-gray-50">
            <Typography variant="semibold-xl" className="text-black-100">
              {title}
            </Typography>
          </header>
        )}
        {children}
      </div>
    </div>
  )
}

export default BottomDrawer
