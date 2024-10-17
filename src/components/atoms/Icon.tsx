import { FC } from "@/utils/types"
import { cls } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import { HTMLProps } from "react"

type Props = HTMLProps<HTMLSpanElement> & {
  name: IconNames
  size?: number | string
}

const Icon: FC<Props> = ({ className, name, size, ...props }) => {
  return (
    <span
      style={{
        fontSize: size
          ? typeof size === "number"
            ? `${size}px`
            : size
          : undefined,
      }}
      className={cls("text-xl text-inherit", name, className)}
      {...props}
    />
  )
}

export default Icon
