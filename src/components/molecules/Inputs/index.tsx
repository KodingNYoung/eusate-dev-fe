import React, { createElement, HTMLProps, ReactNode } from "react"
import { FC, TWClassNames } from "@/utils/types"
import { cls } from "@/utils/helpers"
import Typography from "@/components/atoms/Typography"
import "./style.css"
import Icon from "@/components/atoms/Icon"

type Sizes = "lg" | "sm"
type InputProps = Omit<HTMLProps<HTMLInputElement>, "size"> & {
  name: string
  label?: string
  helperText?: string
  endComponent?: ReactNode
  startComponent?: ReactNode
  multiline?: boolean
  isError?: boolean
  isSuccess?: boolean
  size?: Sizes
}
function getElement(
  element: keyof HTMLElementTagNameMap,
  className: string,
  props: HTMLProps<HTMLInputElement> = {}
) {
  return createElement(element, { ...props, className })
}

const inputSize: { [sizes in Sizes]: TWClassNames } = {
  sm: "h-9",
  lg: "h-14",
}

const Input: FC<InputProps> = ({
  label,
  endComponent,
  startComponent,
  name,
  helperText,
  className,
  id,
  multiline,
  isError,
  isSuccess,
  size = "lg" as Sizes,
  ...props
}) => {
  return (
    <div className={cls("text-input-group")}>
      <label htmlFor={id || name}>
        <Typography variant="semibold-sm" className="text-gray-500 px-2">
          {label}
        </Typography>
        <div
          className={cls(
            "text-input-container mt-1 mb-1.5 flex items-center relative",
            "before:absolute before:-inset-[1px] before:z-0 before:size-[calc(100%_+_2px)] before:bg-[linear-gradient(90deg,_var(--inputColor1),_var(--inputColor2))] before:rounded-[100px] before:transition-[all,_--inputColor1,_--inputColor2] before:duration-300"
          )}
          data-error={isError}
          data-success={isSuccess}
        >
          {startComponent && (
            <span className="absolute left-3 text-gray-900  flex h-5 w-5 items-center justify-center z-1">
              {startComponent}
            </span>
          )}
          {getElement(
            multiline ? "textarea" : "input",
            cls(
              "p-4 rounded-[100px] transition-colors duration-200 outline-0 w-full relative regular-sm font-app text-gray-900 bg-white-100",
              "placeholder:text-regular-sm placeholder:text-gray-400",
              inputSize[size],
              !!endComponent && "pr-10",
              !!startComponent && "pl-10",
              className
            ),
            { ...props, id: id || name, name }
          )}
          {
            <span className="absolute right-3 -ml-7 flex h-5 w-5 items-center text-gray-900">
              {isError ? (
                <Icon
                  name="icon-info-circle"
                  className="text-error-500 text-regular-xl"
                />
              ) : isSuccess ? (
                <Icon
                  name="icon-tick-circle"
                  className="text-success-600 text-regular-xl"
                />
              ) : (
                endComponent && endComponent
              )}
            </span>
          }
        </div>
      </label>
      {helperText && (
        <Typography
          as="span"
          variant="regular-xs"
          data-error={isError}
          data-success={isSuccess}
          className={cls(
            "text-gray-500 data-[success=true]:text-success-600 data-[error=true]:text-error-500"
          )}
        >
          {helperText}
        </Typography>
      )}
    </div>
  )
}

export default Input
