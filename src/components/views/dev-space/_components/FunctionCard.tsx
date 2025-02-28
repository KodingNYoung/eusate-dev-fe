import Badge from "@/components/atoms/Badge"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import dayjs from "dayjs"
import React from "react"

type Props = {
  isLive?: boolean
}

const FunctionCard: FC<Props> = ({ isLive }) => {
  return (
    <div
      className={cls(
        "w-full rounded-xl p-px",
        isLive ? "bg-info-50" : "bg-warning-50"
      )}
    >
      <main className="bg-white border border-gray-50 rounded-xl p-4 grid gap-6">
        <header className="flex items-center justify-between gap-4">
          <Badge
            color="primary"
            type="accent"
            size="md"
            className="text-regular-xs border-opacity-50"
          >
            GET
          </Badge>
          <div className="flex items-center gap-4">
            <Button
              variant="tetiaryText"
              classNames={{
                root: "!border-0 focus:border-0",
                label: "!leading-none",
              }}
            >
              <Icon name="icon-edit-2" size={20} />
            </Button>
            <Button
              variant="tetiaryText"
              classNames={{
                root: "!border-0 focus:border-0",
                label: "!leading-none",
              }}
            >
              <Icon name="icon-trash" size={20} />
            </Button>
          </div>
        </header>
        <section className="grid gap-3">
          <Typography variant="medium-base" className="text-black">
            Function name
          </Typography>
          <Typography
            variant="medium-sm"
            className="line-clamp-2 text-gray-500"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, assumenda voluptatum et impedit non molestias, a
            ratione minima similique esse accusantium illum perspiciatis omnis
            nesciunt quos quis aperiam voluptates ducimus?
          </Typography>
        </section>
        <Typography as="span" variant="regular-sm" className="text-gray-400">
          {dayjs().format("MMM DD, YYYY. h:MMA")}
        </Typography>
      </main>
      <span className="flex justify-center p-1.5">
        <Typography
          className={cls(isLive ? "text-info-500" : "text-warning-600")}
          variant="semibold-xs"
        >
          {isLive ? "LIVE - AVAILABLE TO AI" : "PLAYGROUND"}
        </Typography>
      </span>
    </div>
  )
}

export default FunctionCard
