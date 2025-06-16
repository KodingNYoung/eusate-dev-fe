import Typography from "@/components/atoms/Typography"
import Userinfo, { UserInfoProps } from "@/components/molecules/Userinfo"
import { FC } from "@/utils/types"
import React, { ReactNode } from "react"

type Props = UserInfoProps & {
  metric: ReactNode
}

const AgentMetricItem: FC<Props> = ({ metric }) => {
  return (
    <div className="flex items-center justify-between gap-10">
      <Userinfo
        title="Jenny Wilson"
        subtitle="w.lawson@example.com"
        classNames={{
          root: "!py-0",
          title: "text-black",
          subtitle: "text-gray-300",
        }}
        avatarProps={{
          classNames: {
            root: "min-w-16 min-h-16 w-16 h-16",
            icon: "!text-regular-2xl",
          },
        }}
      />

      <Typography as="span" className="text-gray-900 text-semibold-sm">
        {metric}
      </Typography>
    </div>
  )
}

export default AgentMetricItem
