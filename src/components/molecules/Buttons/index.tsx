import { FC, TWClassNames, TypographyVariants } from "@/utils/types"
import React, { HTMLProps, ReactNode } from "react"
import Typography from "../../atoms/Typography"
import { cls } from "@/utils/helpers"
import "./style.css"
import Spinner from "@/components/atoms/Spinner"

type Sizes = "xl" | "lg" | "sm" | "mini"
type ButtonVariants =
  | "primary"
  | "outlined"
  | "text"
  | "tetiary"
  | "tetiaryText"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "errorText"
type Slots = "root" | "label"
export type ButtonProps = Omit<
  HTMLProps<HTMLButtonElement>,
  "type" | "size"
> & {
  startContent?: ReactNode
  endContent?: ReactNode
  size?: Sizes
  variant?: ButtonVariants
  loading?: boolean
  type?: "submit" | "button" | "reset"
  classNames?: { [slot in Slots]?: TWClassNames }
}

const buttonVariant: { [variant in ButtonVariants]?: TWClassNames } = {
  primary: cls(
    "primary-btn text-white-100 border-transparent",
    "focus:relative focus:before:rounded-[inherit] focus:[&:not(:active)]:before:bg-brand-gradient focus:before:size-[calc(100%_+_4px)] focus:before:-inset-0.5 focus:before:absolute focus:before:-z-1" //focused
  ),
  outlined: cls(
    "outlined-btn relative bg-gray-50 border-transparent ", // default - button
    "before:content-[''] before:absolute before:-inset-[2px] before:-z-1 before:size-[calc(100%_+_4px)] before:bg-[linear-gradient(90deg,_var(--btnColor1),_var(--btnColor2))] before:rounded-[inherit] before:transition-[all,_--btnColor1,_--btnColor2] before:duration-300", //default - before psuedo
    "[&>span]:text-transparent [&>span]:bg-clip-text [&>span]:bg-[linear-gradient(90deg,_var(--btnColor1),_var(--btnColor2))] [&>span]:transition-[all,_--btnColor1,_--btnColor2] [&>span]:duration-300", // default - span child element
    "hover:bg-gold-50", // hover
    "focus:bg-gold-50", // focused
    "focus:before:-inset-0.5 focus:before:-z-1 focus:before:size-[calc(100%_+_4px)]", // focused - before psuedo
    "active:bg-gold-50  active:bg-opacity-70", //pressed state
    "disabled:bg-gray-50" // disabled
  ),
  text: cls(
    "text-btn relative border-transparent transition-all duration-300 bg-white-100", // default - button
    "[&>span]:text-transparent [&>span]:bg-clip-text [&>span]:bg-[linear-gradient(90deg,_var(--btnColor1),_var(--btnColor2))] [&>span]:transition-[all,_--btnColor1,_--btnColor2] [&>span]:duration-300", // default - span child element
    "before:content-[''] before:absolute before:-inset-0.5 before:-z-1 before:size-[calc(100%_+_4px)] [&:not(:active)]:before:bg-[linear-gradient(90deg,_var(--btnColor1),_var(--btnColor2))] before:rounded-[inherit] before:transition-[all,_--btnColor1,_--btnColor2] before:duration-300", // default - before psuedo
    "active:bg-opacity-70" //pressed state
  ),
  tetiary: cls(
    "tetiary-btn border-gray-100 text-gray-500", // default
    "hover:border-gray-500 hover:[&:not(:disabled)]:bg-gray-50 hover:text-gray-900", // hover
    "active:border-gray-500 active:bg-gray-50 active:text-gray-900 active:opacity-70", // active
    "disabled:border-gray-50 disabled:text-gray-100", // disabled
    "focus:border-1 focus:border-gray-900 focus:text-gray-900" // active
  ),
  tetiaryText: cls(
    "tetiary-text-btn border-transparent border-1 text-gray-600", // default
    "hover:text-gray-900", // hover
    "active:text-gray-600", // active
    "disabled:text-gray-100", // disabled
    "focus:border-gray-900 focus:text-gray-900" // active
  ),
  success: cls(
    "success-btn border-transparent border-1 bg-success-500 text-white-100", // default
    "hover:bg-success-600", // hover
    "active:bg-success-700", // active
    "disabled:bg-success-100", // disabled
    "focus:border-success-100 focus:bg-success-600" // active
  ),
  info: cls(
    "info-btn border-transparent border-1 bg-info-500 text-white-100", // default
    "hover:bg-info-600", // hover
    "active:bg-info-700", // active
    "disabled:bg-info-100", // disabled
    "focus:border-info-100 focus:bg-info-600" // active
  ),
  warning: cls(
    "warning-btn border-transparent border-1 bg-warning-500 text-white-100", // default
    "hover:bg-warning-600", // hover
    "active:bg-warning-700", // active
    "disabled:bg-warning-100", // disabled
    "focus:border-warning-100 focus:bg-warning-600" // active
  ),
  error: cls(
    "error-btn border-transparent border-1 bg-error-500 text-white-100", // default
    "hover:bg-error-600", // hover
    "active:bg-error-700", // active
    "disabled:bg-error-100", // disabled
    "focus:border-error-100 focus:bg-error-600" // active
  ),
  errorText: cls(
    "error-btn border-transparent border-1 text-error-500  bg-white", // default
    "hover:text-error-600", // hover
    "active:text-error-700", // active
    "disabled:text-error-100", // disabled
    "focus:border-error-100 focus:text-error-600" // active
  ),
}
const textVariants: { [size in Sizes]: TypographyVariants } = {
  mini: "medium-xs",
  sm: "medium-sm",
  lg: "medium-sm",
  xl: "semibold-sm",
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  startContent,
  endContent,
  size,
  variant = "primary",
  loading,
  disabled,
  classNames,
  type = "button",
  ...props
}) => {
  return (
    <button
      className={cls(
        "border rounded-[90px] cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-1.5 outline-none whitespace-nowrap transition-all duration-300 ",
        variant && buttonVariant[variant],
        className,
        classNames?.root
      )}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading ? <Spinner /> : startContent}
      {children && (
        <Typography
          variant={size && textVariants[size]}
          as="span"
          className={cls("", classNames?.label)}
        >
          {children}
        </Typography>
      )}
      {endContent}
    </button>
  )
}

export default Button
