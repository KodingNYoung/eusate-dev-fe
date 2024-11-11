import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React from "react"

const NotificationBadge: FC = ({ children, className }) => {
  return (
    <div
      className={cls(
        "flex items-center justify-center relative",
        "after:absolute after:top-0 after:right-0 after:size-2 after:bg-error-500 after:rounded-full after:scale-100 after:transition-all after:duration-100",
        className
      )}
    >
      {children}
    </div>
  )
}

export default NotificationBadge
