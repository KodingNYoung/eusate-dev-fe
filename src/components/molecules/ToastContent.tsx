import {
  SnackbarActionType,
  ToastType,
  ToastVariantType,
} from "@/providers/toastProviders"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { HTMLProps, ReactNode } from "react"
import Icon from "../atoms/Icon"
import { IconNames } from "@/utils/iconNames"
import Typography from "../atoms/Typography"

type ToastContentSlots =
  | "root"
  | "container"
  | "icon"
  | "textContent"
  | "title"
  | "subtitle"
  | "action"
  | "close"

type Props = Omit<HTMLProps<HTMLDivElement>, "title"> & {
  classNames?: { [slot in ToastContentSlots]?: TWClassNames }
  type: ToastType
  variant: ToastVariantType
  icon?: IconNames
  title: ReactNode
  subtitle?: ReactNode
  actions?: SnackbarActionType[]
  hide: () => void
  visible: boolean
}

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

const ToastContent: FC<Props> = ({
  classNames,
  type,
  variant,
  icon,
  title,
  subtitle,
  actions,
  hide,
  visible,
  ...props
}) => {
  return (
    <div
      role="toast"
      className={cls(
        "rounded-lg text-white-100 w-full transition-all duration-300 overflow-hidden",
        visible && "my-5 opacity-100",
        visible && "max-h-[20vh]",
        toastVariant[`${type}-${variant}`],
        !visible && "max-h-0 opacity-0",
        classNames?.root
      )}
      {...props}
    >
      <div
        className={cls(
          "py-2 px-3 flex items-start gap-3",
          classNames?.container
        )}
      >
        <Icon
          name={icon ?? toastIcon[type]}
          className={cls(
            "!text-regular-2xl !leading-none",
            toastIconColor[`${type}-${variant}`],
            classNames?.icon
          )}
        />
        <div className={cls("grid gap-1 flex-1", classNames?.textContent)}>
          <Typography
            variant={subtitle ? "medium-base" : "regular-base"}
            className={cls(titleColor[variant], classNames?.title)}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="regular-sm"
              className={cls(subtitleColor[variant], classNames?.subtitle)}
            >
              {subtitle}
            </Typography>
          )}
        </div>
        {actions?.map((action, idx) => (
          <button
            type="button"
            onClick={action.fn}
            key={idx}
            className={cls(classNames?.action)}
          >
            {action.label}
          </button>
        ))}
        <button type="button" onClick={hide} className={cls(classNames?.close)}>
          <Icon
            name="icon-close"
            size={16}
            className={cls(closeBtnColor[variant])}
          />
        </button>
      </div>
    </div>
  )
}

export default ToastContent
