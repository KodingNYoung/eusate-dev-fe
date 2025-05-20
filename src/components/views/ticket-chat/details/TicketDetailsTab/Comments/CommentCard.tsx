import React, { FC } from "react"
import Typography from "@/components/atoms/Typography"
import Userinfo from "@/components/molecules/Userinfo"
import { TicketComment } from "@/utils/types"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import sateAvatar from "@/assets/images/eusate-avatar.svg"

dayjs.extend(relativeTime)

type Props = {
  comment: TicketComment
}

const CommentCard: FC<Props> = ({ comment }) => {
  return (
    <div className="flex flex-col w-full border-b last:border-0 border-b-gray-50 py-4 gap-2.5">
      <div className="flex gap-2 items-center">
        <Userinfo
          src={sateAvatar}
          title={comment.agent.name}
          classNames={{
            root: "!py-0 !gap-2.5",
            avatar: "!size-6 !min-w-6 !min-h-6",
            title: "!text-semibold-sm font-[500] !text-gray-900",
          }}
        />
        <span className="text-gray-300">•</span>
        <Typography className="text-gray-300 text-regular-sm">
          {dayjs(comment.date_created).fromNow()}
        </Typography>
      </div>
      <Typography className="text-gray-700 text-regular-sm">
        {comment.message}
      </Typography>
    </div>
  )
}

export default CommentCard
