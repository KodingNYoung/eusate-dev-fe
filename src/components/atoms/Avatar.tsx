import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import Image from "next/image"
import React, { useMemo } from "react"

type Props = {
  src?: string
  name?: string
}

const Avatar: FC<Props> = ({ src, name, className }) => {
  const initials = useMemo(() => {
    if (!name) return ""
    const names = name?.split(" ")
    return names[0][0] + (names[1][0] ?? "")
  }, [name])

  return (
    <div
      className={cls(
        "min-w-10 min-h-10 w-10 h-10 border border-white-100 rounded-full overflow-hidden",
        className
      )}
    >
      {src && (
        <Image
          height={100}
          width={100}
          src={src}
          alt=""
          className="h-full w-full object-cover"
        />
      )}
      {!src && name && <span className="uppercase">{initials}</span>}
    </div>
  )
}

export default Avatar
