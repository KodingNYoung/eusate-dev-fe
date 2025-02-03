import Badge, { BadgeColor } from "@/components/atoms/Badge"
import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { HTMLProps, ReactNode } from "react"

export type AppTabSlots = "root" | "label" | "badge"

type Props = Omit<HTMLProps<HTMLDivElement>, "type"> & {
  label: string
  startContent?: ReactNode
  endContent?: ReactNode
  badge?: number
  badgeColor?: BadgeColor
  active?: boolean
  classNames?: { [slot in AppTabSlots]?: TWClassNames }
}

const AppTab: FC<Props> = ({
  label,
  startContent,
  endContent,
  badge,
  badgeColor,
  active,
  classNames,
  ...props
}) => {
  return (
    <div
      data-active={active}
      className={cls(
        "transition-all duration-500 relative z-1 text-gray-400 group-data-[selected=true]:text-gray-900 flex items-center gap-2",
        classNames?.root
      )}
      {...props}
    >
      {startContent}
      <Typography className={cls("text-medium-sm", classNames?.label)}>
        {label}
      </Typography>
      {endContent}
      {badge !== undefined && (
        <Badge
          size="sm"
          type="filled"
          color={badgeColor}
          className={cls(
            "!px-0 size-5 min-w-5 min-h-5 flex items-center justify-center overflow-hidden bg-gray-50 text-gray-600 !rounded text-medium-xxs",
            classNames?.badge
          )}
        >
          {badge}
        </Badge>
      )}
    </div>
  )
}

export default AppTab
