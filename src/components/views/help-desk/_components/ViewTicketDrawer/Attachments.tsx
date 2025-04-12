import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import React from "react"

const Attachments: FC = () => {
  return (
    <section className="py-5 px-8 border-b border-gray-50">
      <header className="flex items-center gap-2 text-gray-400 mb-1 !leading-none">
        <Icon name="icon-attach-square" size={20} />
        <Typography className="text-medium-sm">Attachments (2)</Typography>
      </header>
    </section>
  )
}

export default Attachments
