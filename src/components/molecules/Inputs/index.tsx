import React, { createElement, HTMLProps, ReactNode } from "react"
import { FC, TWClassNames } from "@/utils/types"
import { cls } from "@/utils/helpers"
import Typography from "@/components/atoms/Typography"
import "./style.css"
import Icon from "@/components/atoms/Icon"
import HelperText from "@/components/atoms/HelperText"

type Sizes = "lg" | "sm" | "md"
type Slots =
  | "root"
  | "label"
  | "inputContainer"
  | "startContent"
  | "input"
  | "endContent"
  | "helperText"
export type InputProps = Omit<HTMLProps<HTMLInputElement>, "size"> & {
  name: string
  label?: string
  helperText?: string
  endComponent?: ReactNode
  startComponent?: ReactNode
  multiline?: boolean
  isError?: boolean
  isSuccess?: boolean
  size?: Sizes
  classNames?: { [slot in Slots]?: TWClassNames }
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
  md: "h-11",
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
  classNames,
  ...props
}) => {
  return (
    <div className={cls("text-input-group", classNames?.root)}>
      <label htmlFor={id || name}>
        <Typography
          variant="semibold-sm"
          className={cls("text-gray-500 px-2", classNames?.label)}
        >
          {label}
        </Typography>
        <div
          className={cls(
            "text-input-container mt-1 mb-1.5 flex items-center relative",
            multiline ? "rounded-x20" : "rounded-[100px]",
            "before:absolute before:-inset-[1px] before:z-0 before:size-[calc(100%_+_2px)] before:bg-[linear-gradient(90deg,_var(--inputColor1),_var(--inputColor2))] before:rounded-[inherit] before:transition-[all,_--inputColor1,_--inputColor2] before:duration-300",
            classNames?.inputContainer
          )}
          data-error={isError}
          data-success={isSuccess}
        >
          {startComponent && (
            <span
              className={cls(
                "absolute left-3 text-gray-900  flex h-5 w-5 items-center justify-center z-1",
                classNames?.startContent
              )}
            >
              {startComponent}
            </span>
          )}
          {getElement(
            multiline ? "textarea" : "input",
            cls(
              "p-4 transition-colors duration-200 outline-0 w-full relative regular-sm font-app text-gray-900 bg-white-100",
              "placeholder:text-regular-sm placeholder:text-gray-400 rounded-[inherit] resize-none",
              !multiline && inputSize[size],
              !!endComponent && "pr-10",
              !!startComponent && "pl-10",
              className,
              classNames?.input
            ),
            { ...props, id: id || name, name }
          )}
          {(isError || isSuccess || endComponent) && (
            <span
              className={cls(
                "absolute right-3 -ml-7 flex h-5 w-5 items-center text-gray-900 bg-white",
                classNames?.endContent
              )}
            >
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
          )}
        </div>
      </label>
      {helperText && (
        <HelperText
          isError={isError}
          isSuccess={isSuccess}
          className={cls(classNames?.helperText)}
        >
          {helperText}
        </HelperText>
      )}
    </div>
  )
}

export default Input
