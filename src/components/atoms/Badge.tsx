import { FC, TWClassNames, TypographyVariants } from "@/utils/types"
import React from "react"
import Typography from "./Typography"
import { cls } from "@/utils/helpers"

type BadgeType = "filled" | "outline" | "accent"
type Sizes = "sm" | "md" | "lg"
export type BadgeColor =
  | "primary"
  | "info"
  | "warning"
  | "success"
  | "error"
  | "neutral"
  | "disabled"
type Variants = `${BadgeType}-${BadgeColor}`
type Props = {
  type?: BadgeType
  color?: BadgeColor
  size?: Sizes
  loading?: boolean
}

const typoVariants: { [size in Sizes]: TypographyVariants } = {
  sm: "medium-xs",
  md: "medium-sm",
  lg: "medium-sm",
}
const badgeVariants: { [variant in Variants]?: TWClassNames } = {
  "filled-primary": "text-white bg-gold-500",
  "filled-info": "text-white bg-info-700",
  "filled-success": "text-white bg-success-500",
  "filled-warning": "text-white bg-warning-500",
  "filled-error": "text-white bg-error-500",
  "filled-neutral": "text-white bg-gray-900",
  "filled-disabled": "text-gray-100 bg-gray-400",

  "accent-primary": "text-gold-700 bg-gold-50 border border-gold-700",
  "accent-info": "text-info-700 bg-info-50 border border-info-500",
  "accent-success": "text-success-700 bg-success-50 border border-success-700",
  "accent-warning": "text-warning-700 bg-warning-50 border border-warning-500",
  "accent-error": "text-error-700 bg-error-50 border border-error-700",
  "accent-neutral": "text-gray-700 bg-gray-50 border border-gray-700",
  "accent-disabled": "text-gray-400 bg-gray-100 border border-gray-400",

  "outline-primary": "text-gold-700 border border-gold-700",
  "outline-info": "text-info-700 border border-info-700",
  "outline-success": "text-success-700 border border-success-700",
  "outline-warning": "text-warning-700 border border-warning-700",
  "outline-error": "text-error-700 border border-error-700",
  "outline-neutral": "text-gray-700 border border-gray-700",
  "outline-disabled": "text-gray-500 border border-gray-400",
}
const badgeSizes: { [size in Sizes]: TWClassNames } = {
  sm: "px-2",
  md: "px-3 py-0.5",
  lg: "px-3 py-1",
}

const Badge: FC<Props> = ({
  size = "lg",
  type = "outline",
  color = "disabled",
  children,
  className,
  loading,
}) => {
  return (
    <Typography
      as="span"
      variant={typoVariants[size]}
      className={cls(
        "rounded-2xl block w-fit whitespace-nowrap",
        badgeSizes[size],
        badgeVariants[`${type}-${color}`],
        className
      )}
      placeholder="medium"
      loading={loading}
    >
      {children}
    </Typography>
  )
}

export default Badge
