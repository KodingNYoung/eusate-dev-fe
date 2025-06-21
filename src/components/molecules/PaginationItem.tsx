import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import Link from "next/link"
import React, { ReactNode } from "react"
import Icon from "../atoms/Icon"
import Typography from "../atoms/Typography"
import { cls } from "@/utils/helpers"

type Props = {
  label: ReactNode
  icon?: IconNames
  link?: string
  isLast?: boolean
  hasMultipleLayers?: boolean
}

const PaginationItem: FC<Props> = ({
  icon,
  link,
  label,
  isLast,
  hasMultipleLayers,
}) => {
  const content = (
    <Typography
      as="span"
      className={cls(
        "flex items-center gap-2 text-medium-xs sm:text-medium-sm truncate",
        hasMultipleLayers && !link && "text-gray-900"
      )}
    >
      {icon && (
        <Icon name={icon} className="!text-regular-base sm:!text-regular-xl" />
      )}
      {label}
    </Typography>
  )
  return (
    <>
      {link ? (
        <Link href={link} prefetch className="text-gray-400">
          {content}
        </Link>
      ) : (
        content
      )}
      {!isLast && <Icon name="icon-chevron-right" className="text-gray-400" />}
    </>
  )
}

export default PaginationItem
