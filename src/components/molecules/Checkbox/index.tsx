import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { HTMLProps } from "react"

type Slots = "root" | "input" | "box" | "icon" | "label"
export type CheckboxProps = HTMLProps<HTMLInputElement> & {
  id?: string
  name: string
  value?: string
  indeterminate?: boolean
  classNames?: { [slot in Slots]?: TWClassNames }
  loading?: boolean
}

const Checkbox: FC<CheckboxProps> = ({
  name,
  id,
  children,
  className,
  indeterminate,
  classNames,
  loading,
  disabled,
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className={cls(
        "font-mono flex items-center cursor-pointer has-[:disabled]:cursor-not-allowed relative",
        !!children && "gap-3.5",
        classNames?.root
      )}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        className={cls(
          "absolute opacity-0 peer cursor-pointer",
          className,
          classNames?.input
        )}
        disabled={loading || disabled}
        {...props}
      />
      <div
        className={cls(
          "w-4 h-4 border group border-gray-100 border-opacity-100 peer-checked:border-opacity-0 peer-checked:*:opacity-100 flex items-center justify-center rounded-[3px] transition-colors duration-200 peer-disabled:cursor-not-allowed",
          classNames?.box
        )}
      >
        <Icon
          name={
            indeterminate ? "icon-minus-square-bold" : "icon-tick-square-bold"
          }
          className={cls(
            "opacity-0 transition-opacity duration-200 !text-regular-xl text-gray-900",
            classNames?.icon
          )}
        />
      </div>
      {children && (
        <Typography
          className={cls("text-regular-xs text-gray-600", classNames?.label)}
          loading={loading}
        >
          {children}
        </Typography>
      )}
    </label>
  )
}

export default Checkbox
