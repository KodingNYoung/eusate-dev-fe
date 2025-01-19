import Icon from "@/components/atoms/Icon"
import Button, { ButtonProps } from "@/components/molecules/Buttons"
import { cls } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import Link from "next/link"
import React from "react"

export type ItemType = {
  key: number | string
} & (
  | { divider: boolean }
  | {
      label: string
      divider?: boolean
      icon?: IconNames
      button?: ButtonProps
      link?: string
    }
)

type Props = {
  item: ItemType
  action?: () => void
}

const TableActionItem: FC<Props> = ({ item, action }) => {
  if ("divider" in item)
    return <div key={item.key} className="h-px w-full bg-gray-50" />

  const {
    key,
    label,
    icon,
    button: { classNames, variant, ...button } = {},
    link,
  } = item

  const props: ButtonProps = {
    classNames: {
      root: cls(
        "w-full !border-0 outline-none !justify-start p-3 gap-3",
        !variant && "text-gray-600",
        classNames?.root
      ),
      label: cls("text-regular-xs", classNames?.label),
    },
    variant: variant || "tetiaryText",
  }

  if (icon)
    props.startContent = <Icon name={icon} className="!text-regular-base" />

  return link ? (
    <Link href={link} key={key}>
      <Button {...props} {...button}>
        {label}
      </Button>
    </Link>
  ) : (
    <Button key={key} {...props} onClick={action} {...button}>
      {label}
    </Button>
  )
}

export default TableActionItem
