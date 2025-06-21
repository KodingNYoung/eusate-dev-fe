import { cls } from "@/utils/helpers"
import { Skeleton } from "@heroui/react"
import { FC, TWClassNames } from "@/utils/types"
import Image from "next/image"
import React from "react"
import Icon from "./Icon"

type Slots = "root" | "img" | "iconContainer" | "icon"
export type AvatarProps = {
  src?: string
  name?: string
  size?: TWClassNames
  classNames?: { [slot in Slots]?: TWClassNames }
  loading?: boolean
}

const Avatar: FC<AvatarProps> = ({
  src,
  size,
  className,
  classNames,
  loading,
}) => {
  return (
    <Skeleton
      isLoaded={!loading}
      className={cls(
        "rounded-full overflow-hidden",
        size || "min-w-10 min-h-10 w-10 h-10",
        className,
        classNames?.root
      )}
    >
      <div
        className={cls(
          "border border-white-100 rounded-full overflow-hidden",
          size || "min-w-10 min-h-10 w-10 h-10",
          className,
          classNames?.root
        )}
      >
        {src && (
          <Image
            height={100}
            width={100}
            src={src}
            alt=""
            className={cls("h-full w-full object-cover", classNames?.img)}
          />
        )}
        {!src && (
          <div
            className={cls(
              "flex items-center justify-center w-full h-full rounded-full bg-gold-50",
              classNames?.iconContainer
            )}
          >
            <Icon
              name="icon-user"
              className={cls("text-gold-600", classNames?.icon)}
            />
          </div>
        )}
      </div>
    </Skeleton>
  )
}

export default Avatar
