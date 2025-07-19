import Badge from "@/components/atoms/Badge"
import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import React from "react"

const Badges: FC = () => {
  return (
    <div className="grid gap-5">
      <Typography variant="semibold-3xl">Badges</Typography>
      <div className="flex items-center gap-3 flex-wrap">
        <Badge color="primary">Primary </Badge>
        <Badge color="info">Info </Badge>
        <Badge color="warning">Warning </Badge>
        <Badge color="success">Success </Badge>
        <Badge color="error"> Error</Badge>
        <Badge color="neutral">Neutral</Badge>
        <Badge color="disabled">Disabled</Badge>
        <Badge color="disabled" loading>
          Disabled
        </Badge>
      </div>
    </div>
  )
}

export default Badges
