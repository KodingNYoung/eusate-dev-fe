"use client"

import { useToast } from "@/providers/toastProviders"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { useEffect, useRef } from "react"
import ToastContent from "../molecules/ToastContent"

type Slots =
  | "base"
  | "root"
  | "container"
  | "icon"
  | "textContent"
  | "title"
  | "subtitle"
  | "action"
  | "close"

type Props = {
  classNames?: { [slot in Slots]?: TWClassNames }
}

const Toast: FC<Props> = ({ classNames }) => {
  const timer = useRef<NodeJS.Timeout>()
  const { visible, hide, type, variant, actions, title, subtitle, icon } =
    useToast()

  useEffect(() => {
    if (visible) {
      timer.current = setTimeout(() => {
        hide()
      }, 3000)
    }
  }, [visible, hide])
  return (
    <div
      className={cls("w-full p-5 z-1 top-0 left-0 absolute", classNames?.base)}
    >
      <ToastContent
        classNames={classNames}
        type={type}
        variant={variant}
        icon={icon}
        title={title}
        subtitle={subtitle}
        actions={actions}
        hide={hide}
        visible={visible}
      />
    </div>
  )
}

export default Toast
