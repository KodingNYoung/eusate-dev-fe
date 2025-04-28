import { Comment } from "../utils"
import React, { FC, useMemo } from "react"
import { timeAgo } from "@/utils/helpers"
import Typography from "@/components/atoms/Typography"
import Userinfo from "@/components/molecules/Userinfo"

type Props = {
  comment: Comment
}

const CommentCard: FC<Props> = ({
  comment: { avatarUrl, name, createdAt, comment },
}) => {
  const timeAgo_ = useMemo(() => {
    return timeAgo(createdAt)
  }, [])
  return (
    <div className="flex flex-col w-full border-b border-b-gray-50 pb-6 gap-y-4">
      <div className="flex gap-3 items-center">
        <Userinfo
          src={avatarUrl}
          title={name}
          classNames={{
            root: "!py-0",
            avatar: "!size-7 !min-w-7 !min-h-7",
            title: "!text-semibold-sm font-[500] !text-gray-900",
          }}
        />
        <span className="text-gray-300">•</span>
        <Typography className="text-gray-300 text-regular-sm">
          {timeAgo_}
        </Typography>
      </div>
      <Typography className="text-gray-400 text-regular-sm">
        {comment}
      </Typography>
    </div>
  )
}

export default CommentCard
