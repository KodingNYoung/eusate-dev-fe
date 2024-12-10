"use client"

import Icon from "@/components/atoms/Icon"
import Button, { ButtonProps } from "@/components/molecules/Buttons"
import Dropdown from "@/components/molecules/Popups/Dropdown"
import { cls } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import Link from "next/link"
import React, { useState } from "react"

type Props = {
  row: unknown
  items: ItemType[]
}

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
      action?: (row: unknown) => void
    }
)

const TableRowAction: FC<Props> = ({ row, items }) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Button
        onClick={(e) => setAnchor(e.currentTarget)}
        startContent={<Icon name="icon-more" className="!text-regular-xl" />}
        variant="tetiaryText"
        className="border-0 relative mx-auto w-6 h-6 flex items-center"
      />
      {/* <Dropdown
        isOpen={Boolean(anchor)}
        anchorEl={anchor}
        close={() => setAnchor(null)}
        classNames={{ menuContent: "min-w-[154px] mt-4 sm:-right-4" }}
      >
        {items.map((item) => {
          if ("divider" in item)
            return <div key={item.key} className="h-px w-full bg-gray-50" />

          const {
            key,
            label,
            icon,
            button: { classNames, variant, ...button } = {},
            link,
            action,
          } = item

          const props: ButtonProps = {
            classNames: {
              root: cls(
                "w-full border-0 !justify-start p-3 gap-3",
                !variant && "text-gray-600",
                classNames?.root
              ),
              label: cls("text-regular-xs", classNames?.label),
            },
            variant: variant || "tetiaryText",
            onClick: () => setAnchor(null),
          }

          if (icon)
            props.startContent = (
              <Icon name={icon} className="!text-regular-base" />
            )

          return link ? (
            <Link href={link} key={key}>
              <Button {...props} {...button}>
                {label}
              </Button>
            </Link>
          ) : (
            <Button
              key={key}
              {...props}
              onClick={() => {
                setAnchor(null)
                action && action(row)
              }}
              {...button}
            >
              {label}
            </Button>
          )
        })}
      </Dropdown> */}
    </div>
  )
}

export default TableRowAction
