import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import { Skeleton } from "@nextui-org/react"
import Image from "next/image"
import React, { useMemo } from "react"

type Props = {
  src?: string
  name?: string
  loading?: boolean
}

const Avatar: FC<Props> = ({ src, name, className, loading }) => {
  const initials = useMemo(() => {
    if (!name) return ""
    const clean = name.replace(/[^a-zA-Z ]/g, "") // removes symbols like #
    const names = clean.trim().split(" ")

    const first = names[0]?.[0] ?? ""
    const second = names[1]?.[0] ?? ""
    return (first + second).toUpperCase()
  }, [name])

  return (
    <Skeleton
      isLoaded={!loading}
      className={cls("rounded-full overflow-hidden", className)}
    >
      <div
        className={cls(
          "min-w-10 min-h-10 w-10 h-10 border border-white-100 rounded-full overflow-hidden",
          className
        )}
      >
        {loading && <Skeleton />}
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
    </Skeleton>
  )
}

export default Avatar
