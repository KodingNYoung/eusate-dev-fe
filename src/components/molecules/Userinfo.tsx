import { FC, TWClassNames } from "@/utils/types"
import React from "react"
import Avatar, { AvatarProps } from "../atoms/Avatar"
import Typography from "../atoms/Typography"
import { cls } from "@/utils/helpers"
import { Skeleton } from "@heroui/react"

type Slots = "root" | "avatar" | "info" | "title" | "subtitle"
export type UserInfoProps = {
  src?: string
  title?: string
  subtitle?: string | React.ReactNode
  classNames?: { [slot in Slots]?: TWClassNames }
  avatarProps?: AvatarProps
  loading?: boolean
}

const Userinfo: FC<UserInfoProps> = ({
  src,
  title,
  subtitle,
  classNames,
  loading,
  avatarProps,
}) => {
  return (
    <div className={cls("flex items-center gap-3 py-4", classNames?.root)}>
      <Avatar
        src={src}
        name={title}
        className={classNames?.avatar}
        loading={loading}
        {...avatarProps}
      />
      <div className={cls("grid", classNames?.info)}>
        <Typography
          as="h3"
          className={cls("truncate text-semibold-sm", classNames?.title)}
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
