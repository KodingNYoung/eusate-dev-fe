import { cls } from "@/utils/helpers"
import { Skeleton } from "@nextui-org/react"
import { FC, TWClassNames } from "@/utils/types"
import Image from "next/image"
import React from "react"
import userAvatar from "@/assets/images/user-avatar.svg"

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
        <Image
          height={100}
          width={100}
          src={src || userAvatar}
          alt=""
          className={cls("h-full w-full object-cover", classNames?.img)}
        />
      </div>
    </Skeleton>
  )
}

export default Avatar
