import React, { ReactNode } from "react"
import { Id, toast, ToastContentProps, ToastOptions } from "react-toastify"
import AppToastContent, { AppToastContentProps } from "./ToastContent"
import { cls } from "@/utils/helpers"
import { TWClassNames } from "@/utils/types"

type ToastContentComponentProps = Omit<AppToastContentProps, "type" | "hide">

type AppToastProps = ToastContentProps<ToastContentComponentProps>

const AppToast = ({
  closeToast,
  toastProps: { type },
  data,
}: AppToastProps) => {
  return <AppToastContent type={type} hide={closeToast} {...data} />
}

// Entry utility function that will be called every time toast is to be used
type ToasterProps = Omit<ToastOptions, "className"> &
  Omit<ToastContentComponentProps, "title"> & { className?: TWClassNames }

export const toaster = (title: ReactNode, props: ToasterProps = {}): Id => {
  const {
    classNames,
    variant,
    icon,
    subtitle,
    actions,
    className,
    ...toastProps
  } = props
  return toast(AppToast, {
    ...toastProps,
    className: cls("p-0 min-h-0 shadow-soft-xsmall", className),
    data: { classNames, variant, icon, title, subtitle, actions },
    icon: false,
  })
}

toaster.warning = (title: ReactNode, props?: Omit<ToasterProps, "type">) =>
  toaster(title, { ...props, type: "warning" })
toaster.success = (title: ReactNode, props?: Omit<ToasterProps, "type">) =>
  toaster(title, { ...props, type: "success" })
toaster.error = (title: ReactNode, props?: Omit<ToasterProps, "type">) =>
  toaster(title, { ...props, type: "error" })
toaster.info = (title: ReactNode, props?: Omit<ToasterProps, "type">) =>
  toaster(title, { ...props, type: "info" })
