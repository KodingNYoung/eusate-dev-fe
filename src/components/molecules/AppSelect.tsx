import { FC } from "@/utils/types"
import {
  Select,
  SelectItem,
  SelectItemProps,
  SelectProps,
} from "@nextui-org/react"
import React, { ReactNode } from "react"

export type AppSelectProps = Omit<SelectProps, "children" | "items"> & {
  itemProps?: SelectItemProps
  items: { key: string; label: ReactNode; props?: SelectItemProps }[]
}

const AppSelect: FC<AppSelectProps> = ({
  itemProps,
  items,
  classNames,
  size,
  ...props
}) => {
  return (
    <Select
      variant="bordered"
      listboxProps={{ variant: "light" }}
      classNames={{
        ...classNames,
        trigger: [
          "border border-gray-50 data data-[hover=true]:border-gray-500 px-4",
          size === "lg" && "h-14 min-h-14",
          size === "sm" && "h-9 min-h-9",
          classNames?.trigger,
        ],
        selectorIcon: ["text-black w-5 h-5", classNames?.selectorIcon],
        value: [
          "text-[14px] font-[400] text-gray-900 group-data-[has-value=true]:text-gray-900",
          classNames?.value,
        ],
        label: [
          "text-[14px] font-[500] text-gray-500",
          "group-data-[filled=true]:text-gray-500 px-2 pb-1",
          classNames?.label,
        ],
        mainWrapper: ["mt-1 mb-1.5", classNames?.mainWrapper],
      }}
      labelPlacement="outside"
      disallowEmptySelection
      {...props}
    >
      {items.map((item) => {
        return (
          <SelectItem key={item.key} value={item.key} {...itemProps}>
            {item.label}
          </SelectItem>
        )
      })}
    </Select>
  )
}

export default AppSelect
