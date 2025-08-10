import Typography from "@/components/atoms/Typography"
import Userinfo, { UserInfoProps } from "@/components/molecules/Userinfo"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { ReactNode } from "react"

type Slots = "base" | "metric"
type Props = UserInfoProps & {
  metric: ReactNode
  classNames?: { [slot in Slots]?: TWClassNames } & UserInfoProps["classNames"]
  loading?: boolean
}

const AgentMetricItem: FC<Props> = ({
  metric,
  classNames,
  loading,
  ...userInfoProps
}) => {
  return (
    <div
      className={cls(
        "flex items-center justify-between gap-10",
        classNames?.base
      )}
    >
      <Userinfo
        title="Jenny Wilson"
        subtitle="w.lawson@example.com"
        loading={loading}
        {...userInfoProps}
        classNames={{
          ...classNames,
          root: cls("!py-0", classNames?.root),
          title: cls("text-black", classNames?.title),
          subtitle: cls("text-gray-300", classNames?.subtitle),
        }}
        avatarProps={{
          ...userInfoProps.avatarProps,
          classNames: {
            ...userInfoProps.avatarProps?.classNames,
            root: cls(
              "min-w-9 min-h-9 w-9 h-9",
              userInfoProps.avatarProps?.classNames?.root
            ),
            icon: cls(
              "!text-regular-2xl",
              userInfoProps.avatarProps?.classNames?.icon
            ),
          },
        }}
      />

      <Typography
        as="span"
        loading={loading}
        className={cls("text-gray-900 text-semibold-sm", classNames?.metric)}
      >
        {metric}
      </Typography>
    </div>
  )
}

export default AgentMetricItem
