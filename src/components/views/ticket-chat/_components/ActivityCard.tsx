import React, { FC } from "react"
import Badge from "@/components/atoms/Badge"
import Typography from "@/components/atoms/Typography"
import Userinfo from "@/components/molecules/Userinfo"
import { Activity, formatDateTimeParts } from "../utils"
import { STATUS_COLOR_MAP } from "../../help-desk/utils"

type Props = {
  activity: Activity
  lastCard: boolean
}

const ActivityCard: FC<Props> = ({
  activity: { avatarUrl, name, activityType, createdAt, comment, status },
  lastCard,
}) => {
  const [month, time] = formatDateTimeParts(createdAt)
  return (
    <div>
      <div
        className={`
              flex z-1 w-full h-full gap-x-3 items-center 
              relative before:content-[''] before:absolute 
              before:-z-1 before:top-0 before:left-3 before:w-[2px] 
              ${lastCard ? "before:h-[5rem]" : "before:h-[7.8rem]"}
              before:bg-gray-50`}
      >
        <Userinfo
          src={avatarUrl}
          title={name}
          classNames={{
            root: "!py-0",
            avatar: "!size-7 !min-w-7 !min-h-7",
            title: "!text-semibold-sm font-[500] !text-gray-900",
          }}
        />
        <Typography className="text-gray-300 text-regular-sm">
          {activityType === "status"
            ? "changed ticket status to"
            : "commented on this ticket"}
        </Typography>
      </div>

      <div className="translate-x-10 ">
        {/* Status and Comment */}
        {status ? (
          <Badge size="sm" type="outline" color={STATUS_COLOR_MAP[status]}>
            {status}
          </Badge>
        ) : (
          comment && (
            <div className="px-2 py-2.5 w-[80%] text-regular-sm font-[400] text-gray-700 rounded-lg bg-gray-25 border border-gray-50">
              {comment}
            </div>
          )
        )}
        {/* Month and Time */}
        <div className="flex items-center gap-x-2 ">
          <Typography className="font-[400] text-regular-xs text-gray-300">
            {month}
          </Typography>
          <span className="text-gray-300">•</span>
          <Typography className="font-[400] text-regular-xs text-gray-300">
            {time}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard
