import {
  Select as SelectBase,
  SelectItem,
  SelectProps,
  SelectSlots,
} from "@nextui-org/react"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import Typography from "@/components/atoms/Typography"

type Slots = "item" | "label"
type Item = {
  key: string
  label: string
}
type Props = Omit<SelectProps, "children" | "classNames"> & {
  items: Item[]
  classNames?: { [r in "root"]?: { [slot in SelectSlots]: TWClassNames } } & {
    [slot in Slots]?: TWClassNames
  }
}

const Select: FC<Props> = ({
  items,
  label,
  radius,
  variant,
  className,
  classNames,
  ...props
}) => {
  return (
    <div className="grid gap-2">
      <Typography
        variant="semibold-sm"
        className={cls("text-gray-500 px-2 ", classNames?.label)}
      >
        {label}
      </Typography>
      <SelectBase
        items={items}
        radius={radius || "full"}
        variant={variant || "bordered"}
        className={cls(className)}
        classNames={{
          ...classNames?.root,
          listbox: "p-2 bg-gray-50 rounded-xl",
          trigger: "min-h-14 border group-data-[focus=true]:border-white",
        }}
        {...props}
      >
        {items.map(({ key, label }) => {
          return key !== "default" ? (
            <SelectItem
              aria-label={label}
              className={cls(
                "px-4 py-2 rounded-full hover:bg-gray-50 regular-sm",
                classNames?.item
              )}
              key={key}
            >
              {label}
            </SelectItem>
          ) : null
        })}
      </SelectBase>
    </div>
  )
}

export default Select
