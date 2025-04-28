import { FC, TWClassNames } from "@/utils/types"
import React from "react"
import Avatar from "../atoms/Avatar"
import Typography from "../atoms/Typography"
import { cls } from "@/utils/helpers"

type Slots = "root" | "avatar" | "info" | "title" | "subtitle"
type Props = {
  src?: string
  title?: string
  subtitle?: string | React.ReactNode
  classNames?: { [slot in Slots]?: TWClassNames }
}

const Userinfo: FC<Props> = ({ src, title, subtitle, classNames }) => {
  return (
    <div className={cls("flex items-center gap-3 py-4", classNames?.root)}>
      <Avatar src={src} name={title} className={classNames?.avatar} />
      <div className={cls("grid", classNames?.info)}>
        <Typography
          variant="semibold-sm"
          as="h3"
          className={cls("text-white-100 truncate", classNames?.title)}
        >
          {title}
        </Typography>

        {typeof subtitle === "string" ? (
          <Typography
            variant="regular-sm"
            as="span"
            className={cls("truncate", classNames?.subtitle)}
          >
            {subtitle}
          </Typography>
        ) : (
          <div>{subtitle}</div>
        )}
      </div>
    </div>
  )
}

export default Userinfo
