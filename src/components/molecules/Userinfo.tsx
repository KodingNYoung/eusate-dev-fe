import { FC, TWClassNames } from "@/utils/types"
import React from "react"
import Avatar from "../atoms/Avatar"
import Typography from "../atoms/Typography"
import { cls } from "@/utils/helpers"
import { Skeleton } from "@nextui-org/react"

type Slots = "root" | "avatar" | "info" | "title" | "subtitle"
type Props = {
  src?: string
  title?: string
  subtitle?: string | React.ReactNode
  classNames?: { [slot in Slots]?: TWClassNames }
  loading?: boolean
}

const Userinfo: FC<Props> = ({ src, title, subtitle, classNames, loading }) => {
  return (
    <div className={cls("flex items-center gap-3 py-4", classNames?.root)}>
      <Avatar
        src={src}
        name={title}
        className={classNames?.avatar}
        loading={loading}
      />
      <div className={cls("grid", classNames?.info)}>
        <Typography
          variant="semibold-sm"
          as="h3"
          className={cls("text-white-100 truncate", classNames?.title)}
          loading={loading}
        >
          {title}
        </Typography>

        {typeof subtitle === "string" ? (
          <Typography
            variant="regular-sm"
            as="span"
            className={cls("truncate", classNames?.subtitle)}
            loading={loading}
          >
            {subtitle}
          </Typography>
        ) : (
          <Skeleton>
            <div>{subtitle}</div>
          </Skeleton>
        )}
      </div>
    </div>
  )
}

export default Userinfo
