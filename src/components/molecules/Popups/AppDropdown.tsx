import { IconNames } from "@/utils/iconNames"
import { FC, TWClassNames } from "@/utils/types"
import {
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownMenuProps,
  DropdownProps,
  DropdownSection,
  DropdownSectionProps,
  DropdownTrigger,
  DropdownTriggerProps,
} from "@nextui-org/react"
import React, { ReactElement } from "react"
import Icon from "@/components/atoms/Icon"
import { cls } from "@/utils/helpers"

export type ItemType = {
  key: number | string
  label: string
  icon?: IconNames
  className?: TWClassNames
  disabled?: boolean
  link?: string
  action?: () => void
}
export type SectionsType = {
  items: ItemType[]
  props?: Omit<DropdownSectionProps, "children">
  key?: string | number
}[]

type Props = Omit<DropdownProps, "children"> & {
  triggerEl: ReactElement
  triggerProps?: DropdownTriggerProps
  triggerBtnProps?: ButtonProps
  menuProps?: Omit<DropdownMenuProps, "children">
  sectionProps?: Omit<DropdownSectionProps, "children">
  sections?: SectionsType
}

const AppDropdown: FC<Props> = ({
  triggerEl,
  triggerProps,
  triggerBtnProps,
  menuProps,
  sectionProps,
  sections,
  ...props
}) => {
  return (
    <Dropdown
      placement="bottom-end"
      className="min-w-[154px] "
      classNames={{
        content: "p-0 shadow-soft-medium border border-gray-50 rounded-xl",
      }}
      {...props}
    >
      <DropdownTrigger {...triggerProps}>
        <Button variant="light" {...triggerBtnProps}>
          {triggerEl}
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="light" classNames={{ base: "p-0" }} {...menuProps}>
        {sections
          ? sections.map(({ items, props, key }, id) => {
              return (
                <DropdownSection
                  key={key || id}
                  classNames={{ base: "mb-0", divider: "bg-gray-50 mt-0" }}
                  {...sectionProps}
                  {...props}
                >
                  {items.map((item) => {
                    return (
                      <DropdownItem
                        key={item.key}
                        startContent={
                          item.icon && (
                            <Icon
                              name={item.icon}
                              size={16}
                              className={cls("text-gray-600", item.className)}
                            />
                          )
                        }
                        onPress={item.action}
                        href={item.link}
                        className={cls("p-3 gap-3 group/item", item.className)}
                        classNames={{
                          title: cls(
                            "text-[12px] text-gray-600",
                            item.className
                          ),
                        }}
                        textValue={item.label}
                      >
                        {item.label}
                      </DropdownItem>
                    )
                  })}
                </DropdownSection>
              )
            })
          : null}
      </DropdownMenu>
    </Dropdown>
  )
}

export default AppDropdown
