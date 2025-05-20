import Badge, { BadgeColor } from "@/components/atoms/Badge"
import { FC } from "@/utils/types"
import React from "react"
import { ApiKeyStatus } from "../utlis"

type Props = {
  status: ApiKeyStatus
}

const colorMap: { [type in ApiKeyStatus]: BadgeColor } = {
  active: "success",
  expired: "neutral",
  revoked: "error",
}

const ApiKeyTag: FC<Props> = ({ status }) => {
  return (
    <Badge
      className="capitalize"
      type="accent"
      size="sm"
      color={colorMap[status]}
    >
      {status}
    </Badge>
  )
}

export default ApiKeyTag
