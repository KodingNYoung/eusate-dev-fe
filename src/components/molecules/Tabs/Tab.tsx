import Badge, { BadgeColor } from "@/components/atoms/Badge"
import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React, { HTMLProps, ReactNode } from "react"

type Props = Omit<HTMLProps<HTMLDivElement>, "type"> & {
  label: string
  startContent?: ReactNode
  endContent?: ReactNode
  badge?: number
  badgeColor?: BadgeColor
  active?: boolean
}

const AppTab: FC<Props> = ({
  label,
  startContent,
  endContent,
  badge,
  badgeColor,
  active,
  ...props
}) => {
  return (
    <div
      data-active={active}
      className={cls(
        "transition-all duration-500 relative z-1 text-gray-400 group-data-[selected=true]:text-gray-900"
      )}
      {...props}
    >
      {startContent}
      <Typography className="text-medium-sm">{label}</Typography>
      {endContent}
      {!!badge && (
        <Badge
          size="sm"
          type="filled"
          color={badgeColor}
          className={cls(
            "!px-0 size-0 group-hover:size-5 group-hover:min-w-5 group-hover:min-h-5 flex items-center justify-center scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 overflow-hidden"
          )}
        >
          {badge}
        </Badge>
      )}
    </div>
  )
}

export default AppTab
