"use client"

import {
  ToastType,
  ToastVariantType,
  useToast,
} from "@/providers/toastProviders"
import { cls } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import { FC, TWClassNames } from "@/utils/types"
import React, { useEffect, useRef } from "react"
import Icon from "../atoms/Icon"
import Typography from "../atoms/Typography"

type ToastVariant = `${ToastType}-${ToastVariantType}`

const toastVariant: { [variant in ToastVariant]: TWClassNames } = {
  "success-filled": "bg-success-500",
  "success-outlined": "bg-success-50 border border-success-500",
  "error-filled": "bg-error-500",
  "error-outlined": "bg-error-50 border border-error-500",
  "info-filled": "bg-info-600",
  "info-outlined": "bg-info-50 border border-info-500",
  "warning-filled": "bg-warning-500",
  "warning-outlined": "bg-[#FEF0C7] border border-warning-500",
  "default-filled": "bg-black-100",
  "default-outlined": "bg-gray-50 border border-black-100",
}
const toastIcon: { [type in ToastType]: IconNames } = {
  success: "icon-tick-circle-bold",
  error: "icon-danger-bold",
  info: "icon-info-circle-bold",
  warning: "icon-warning-2-bold",
  default: "icon-tick-circle-bold",
}
const toastIconColor: { [variant in ToastVariant]: TWClassNames } = {
  "success-filled": "text-white-100",
  "success-outlined": "text-success-500",
  "error-filled": "text-white-100",
  "error-outlined": "text-error-500",
  "info-filled": "text-white-100",
  "info-outlined": "text-info-600",
  "warning-filled": "text-white-100",
  "warning-outlined": "text-warning-500",
  "default-filled": "text-white-100",
  "default-outlined": "text-black-100",
}
const titleColor: { [variant in ToastVariantType]: TWClassNames } = {
  filled: "text-white-100",
  outlined: "text-gray-900",
}
const subtitleColor: { [variant in ToastVariantType]: TWClassNames } = {
  filled: "text-white-80",
  outlined: "text-gray-400",
}
const closeBtnColor: { [variant in ToastVariantType]: TWClassNames } = {
  filled: "text-white-100",
  outlined: "text-gray-500",
}

const Toast: FC = () => {
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
      role="toast"
      className={cls(
        "rounded-lg text-white-100 w-full transition-all duration-300 overflow-hidden",
        visible && "my-5 opacity-100",
        visible && (subtitle ? "max-h-[62px]" : "max-h-[41px]"),
        toastVariant[`${type}-${variant}`],
        !visible && "max-h-0 opacity-0"
      )}
    >
      <div className="py-2 px-3 flex items-start gap-3">
        <Icon
          name={icon ?? toastIcon[type]}
          className={cls(
            "!text-regular-2xl !leading-none",
            toastIconColor[`${type}-${variant}`]
          )}
        />
        <div className="grid gap-1 flex-1">
          <Typography
            variant={subtitle ? "medium-base" : "regular-base"}
            className={cls(titleColor[variant])}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="regular-sm"
              className={cls(subtitleColor[variant])}
            >
              {subtitle}
            </Typography>
          )}
        </div>
        {actions?.map((action, idx) => (
          <button onClick={action.fn} key={idx}>
            {action.label}
          </button>
        ))}
        <button onClick={hide}>
          <Icon name="icon-close" className={cls(closeBtnColor[variant])} />
        </button>
      </div>
    </div>
  )
}

export default Toast
