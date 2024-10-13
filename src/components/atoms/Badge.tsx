import { FC, TWClassNames, TypographyVariants } from "@/utils/types";
import React from "react";
import Typography from "./Typography";
import { cls } from "@/utils/helpers";

type BadgeType = "filled" | "outline" | "accent";
type Sizes = "sm" | "md" | "lg";
type Color =
  | "primary"
  | "info"
  | "warning"
  | "success"
  | "error"
  | "neutral"
  | "disabled";
type Variants = `${BadgeType}-${Color}`;
type Props = {
  type?: BadgeType;
  color?: Color;
  size?: Sizes;
};

const typoVariants: { [size in Sizes]: TypographyVariants } = {
  sm: "medium-xs",
  md: "medium-sm",
  lg: "medium-sm",
};
const badgeVariants: { [variant in Variants]?: TWClassNames } = {
  "filled-primary": "text-white-100 bg-gold-500",
  "filled-info": "text-white-100 bg-info-700",
  "filled-success": "text-white-100 bg-success-500",
  "filled-warning": "text-white-100 bg-warning-500",
  "filled-error": "text-white-100 bg-error-500",
  "filled-neutral": "text-white-100 bg-gray-900",
  "filled-disabled": "text-gray-100 bg-gray-400",
  "accent-primary": "text-gold-700 bg-gold-50",
  "accent-info": "text-info-700 bg-info-100",
  "accent-success": "text-success-700 bg-success-100",
  "accent-warning": "text-warning-700 bg-warning-100",
  "accent-error": "text-error-700 bg-error-100",
  "accent-neutral": "text-gray-700 bg-gray-100",
  "accent-disabled": "text-gray-700 bg-gray-200",
  "outline-primary": "text-gold-700 border border-gold-700",
  "outline-info": "text-info-700 border border-info-700",
  "outline-success": "text-success-700 border border-success-700",
  "outline-warning": "text-warning-700 border border-warning-700",
  "outline-error": "text-error-700 border border-error-700",
  "outline-neutral": "text-gray-700 border border-gray-700",
  "outline-disabled": "text-gray-500 border border-gray-400",
};
const badgeSizes: { [size in Sizes]: TWClassNames } = {
  sm: "px-2",
  md: "px-3 py-0.5",
  lg: "px-3 py-1",
};

const Badge: FC<Props> = ({
  size = "lg",
  type = "outline",
  color = "primary",
  children,
}) => {
  return (
    <Typography
      as="span"
      variant={typoVariants[size]}
      className={cls(
        "rounded-xl",
        badgeSizes[size],
        badgeVariants[`${type}-${color}`]
      )}
    >
      {children}
    </Typography>
  );
};

export default Badge;
