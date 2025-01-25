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
}

const Checkbox: FC<CheckboxProps> = ({
  name,
  id,
  children,
  className,
  indeterminate,
  classNames,
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className={cls(
        "font-mono flex items-center cursor-pointer relative",
        !!children && "grap-3.5",
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
        {...props}
      />
      <div
        className={cls(
          "w-4 h-4 border group border-gray-100 border-opacity-100 peer-checked:border-opacity-0 peer-checked:*:opacity-100 flex items-center justify-center rounded-[3px] transition-colors duration-200",
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
      <Typography
        className={cls("text-regular-xs text-gray-600", classNames?.label)}
      >
        {children}
      </Typography>
    </label>
  )
}

export default Checkbox
