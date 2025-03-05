import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { ReactNode } from "react"
import Icon from "../../atoms/Icon"
import { IconNames } from "@/utils/iconNames"
import Typography from "../../atoms/Typography"
import {
  closeBtnColor,
  subtitleColor,
  titleColor,
  ToastContentSlots,
  toastIcon,
  toastIconColor,
  ToastType,
  toastVariant,
  ToastVariantType,
} from "./utils"

export type AppToastContentProps = {
  classNames?: { [slot in ToastContentSlots]?: TWClassNames }
  type: ToastType
  variant?: ToastVariantType
  icon?: IconNames
  title: ReactNode
  subtitle?: ReactNode
  actions?: { label: string; fn: () => void }[]
  hide: () => void
}

const AppToastContent: FC<AppToastContentProps> = ({
  classNames,
  type = "default",
  variant = "outlined",
  icon,
  title,
  subtitle,
  actions,
  hide,
}) => {
  return (
    <div
      role="toast"
      className={cls(
        "rounded-lg text-white-100 w-full transition-all duration-300 overflow-hiddenopacity-100",
        toastVariant[`${type}-${variant}`],
        classNames?.root
      )}
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

export default AppToastContent
