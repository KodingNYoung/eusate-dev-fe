import { FC } from "@/utils/types"
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteItemProps,
  AutocompleteProps,
} from "@nextui-org/react"
import React, { ReactNode } from "react"

type Props = Omit<AutocompleteProps, "children" | "items"> & {
  items: { key: string; label: ReactNode; props?: AutocompleteItemProps }[]
  itemProps?: AutocompleteItemProps
}

const AppAutocomplete: FC<Props> = ({
  itemProps,
  items,
  classNames,
  inputProps = {},
  ...props
}) => {
  return (
    <Autocomplete
      allowsCustomValue
      variant="bordered"
      listboxProps={{ variant: "light" }}
      labelPlacement="outside"
      inputProps={{
        ...inputProps,
        classNames: {
          ...inputProps.classNames,
          inputWrapper: ["border px-4", inputProps.classNames?.inputWrapper],
          label: [
            "text-[14px] font-[500] text-gray-500",
            "group-data-[filled-within=true]:!text-gray-500",
            inputProps.classNames?.label,
          ],
        },
      }}
      classNames={{
        ...classNames,
        selectorButton: [
          "text-black [&_svg]:w-5 [&_svg]:h-5",
          classNames?.selectorButton,
        ],
      }}
      size="lg"
      {...props}
    >
      {items.map((item) => (
        <AutocompleteItem key={item.key} {...itemProps} {...item.props}>
          {item.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  )
}

export default AppAutocomplete
