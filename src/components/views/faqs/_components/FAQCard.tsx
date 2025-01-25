"use client"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { FC, KnowledgeSource } from "@/utils/types"
import dayjs from "dayjs"
import React from "react"

type Props = {
  faq: KnowledgeSource
  onEdit: () => void
  onDelete: () => void
}

const FAQCard: FC<Props> = ({ faq, onEdit, onDelete }) => {
  return (
    <div className="border border-gray-100 rounded-xl p-4 sm:p-4 grid gap-6">
      <div className="flex gap-5">
        <div className="flex-1">
          <Typography className="text-medium-base text-black line-clamp-2">
            {faq.title}
          </Typography>
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={onEdit}>
            <Icon name="icon-edit-2" size={20} />
          </button>
          <button onClick={onDelete}>
            <Icon name="icon-trash" size={20} />
          </button>
        </div>
      </div>
      <Typography className="text-regular-sm text-gray-400">
        {dayjs(faq.date_created).format("MMM DD, YYYY. h:mmA")}
      </Typography>
    </div>
  )
}

export default FAQCard
