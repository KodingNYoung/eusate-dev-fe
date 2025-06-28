"use client"

import {
  Select as SelectBase,
  SelectItem,
  SelectProps,
  SelectSlots,
} from "@heroui/react"
import "./style.css"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import Typography from "@/components/atoms/Typography"
import { ChangeEvent, useCallback, useMemo } from "react"
import { findKey, findLabel } from "@/components/views/settings/utils/helpers"

// type Slots = "item" | "label" | "root"
export type Item = {
  key: string
  label: string
}
type Props = Omit<
  SelectProps,
  "children" | "classNames" | "onChange" | "defaultSelectedKeys"
> & {
  items: Item[]
  defaultSelectedKeys?: string[]
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  classNames?: { [slot in SelectSlots]?: TWClassNames } & {
    item?: TWClassNames
  }
}

const Select: FC<Props> = ({
  items,
  label,
  radius,
  variant,
  className,
  onChange,
  classNames,
  defaultSelectedKeys,
  ...props
}) => {
  const defaultSelectedKeys_ = useMemo(
    () => defaultSelectedKeys?.map((label) => findKey(items, label)),
    [items, defaultSelectedKeys]
  )
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target
      const label = findLabel(items, value)
      if (!label || !onChange) return
      const event = {
        target: {
          name: name,
          value: label,
        },
      } as unknown as ChangeEvent<HTMLSelectElement>
      onChange(event)
    },
    [items, onChange]
  )
  return (
    <div className={cls("grid gap-2", className)}>
      <Typography
        variant="semibold-sm"
        className={cls("text-gray-500 px-2 ", classNames?.label)}
      >
        {label}
      </Typography>
      <div
        className={cls(
          "rounded-[100px]",
          "text-input-container mt-1 mb-1.5 flex items-center relative",
          "before:absolute before:-inset-[1px] before:z-0 before:size-[calc(100%_+_2px)] before:bg-[linear-gradient(90deg,_var(--inputColor1),_var(--inputColor2))] before:rounded-[inherit] before:transition-[all,_--inputColor1,_--inputColor2] before:duration-300"
        )}
      >
        <SelectBase
          radius={radius || "full"}
          variant={variant || "bordered"}
          onChange={handleChange}
          defaultSelectedKeys={
            defaultSelectedKeys ? (defaultSelectedKeys_ as string[]) : []
          }
          classNames={{
            value: "!text-gray-900 text-regular-sm",
            mainWrapper: "relative z-1 bg-white rounded-[100px] ",
            selectorIcon: "w-8 h-8 text-gray-900",
            listbox: "p-2 bg-gray-50 rounded-xl",
            trigger:
              "min-h-14 border group-data-[focus=true]:border-white border-none outline-none",
            ...classNames,
          }}
          {...props}
        >
          {items.map(({ key, label }) => {
            return (
              <SelectItem
                key={key}
                aria-label={label}
                className={cls(
                  "px-4 py-2 rounded-full hover:bg-gray-50 text-semibold-sm text-gray-700 mb-3",
                  classNames?.item
                )}
              >
                {label}
              </SelectItem>
            )
          })}
        </SelectBase>
      </div>
    </div>
  )
}

export default Select
