import { FC } from "@/utils/types"
import {
  Select,
  SelectItem,
  SelectItemProps,
  SelectProps,
} from "@nextui-org/react"
import React, { ReactNode } from "react"

type Props = Omit<SelectProps, "children" | "items"> & {
  itemProps?: SelectItemProps
  items: { key: string; label: ReactNode; props?: SelectItemProps }[]
}

const AppSelect: FC<Props> = ({ itemProps, items, classNames, ...props }) => {
  return (
    <Select
      variant="bordered"
      listboxProps={{ variant: "light" }}
      classNames={{
        ...classNames,
        base: ["data-[has-label=true]:mt-0 gap-4", classNames?.base],
        trigger: [
          "border border-gray-50 data-[hover=true]:border-gray-500",
          classNames?.trigger,
        ],
        selectorIcon: ["text-black", classNames?.selectorIcon],
        value: ["!text-semibold-xs", classNames?.value],
        label: [
          "text-[14px] font-semibold !text-gray-700 static group-data-[filled=true]:translate-y-0",
          classNames?.label,
        ],
      }}
      labelPlacement="outside"
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
