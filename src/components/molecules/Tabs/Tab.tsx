import Badge, { BadgeColor } from "@/components/atoms/Badge"
import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { HTMLProps, ReactNode } from "react"
import { TabVariant } from "."

type Props = Omit<HTMLProps<HTMLButtonElement>, "type"> & {
  label: string
  startContent?: ReactNode
  endContent?: ReactNode
  badge?: number
  badgeColor?: BadgeColor
  variant?: TabVariant
  active?: boolean
}

const variantStyle: { [variant in TabVariant]: TWClassNames } = {
  line: "text-gray-400 py-1 data-[active=true]:text-gray-900",
}

const Tab: FC<Props> = ({
  label,
  startContent,
  endContent,
  badge,
  badgeColor,
  variant = "line",
  active,
  ...props
}) => {
  return (
    <button
      data-active={active}
      className={cls(
        "transition-all duration-500 relative z-1 ",
        variantStyle[variant]
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
    </button>
  )
}

export default Tab
