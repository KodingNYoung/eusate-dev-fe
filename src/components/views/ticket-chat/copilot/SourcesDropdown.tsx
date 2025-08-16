import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import AppPopover from "@/components/molecules/Popups/AppPopover"
import { FC, KnowledgeSource } from "@/utils/types"
import Link from "next/link"
import React from "react"
import ResourceTypeTag from "../../knowledge-base/_components/ResourceTypeTag"

type Props = {
  sources: KnowledgeSource[]
}

const SourcesDropdown: FC<Props> = ({ sources }) => {
  return (
    <AppPopover
      placement="top-end"
      trigger={
        <button className="outline-none !leading-none text-gray-500 flex items-center gap-2">
          <Icon name="icon-folder" size={18} />
          <span>3 sources</span>
        </button>
      }
      classNames={{
        content:
          "bg-gray-50 border border-[#E4E7EC] rounded-x10 w-[270px] max-w-11/12 p-0.5",
      }}
    >
      <Typography
        as="h5"
        className="w-full px-3.5 py-3 text-medium-sm text-gray-500 flex items-center gap-2"
      >
        <Icon name="icon-folder" size={18} /> {sources.length} sources
      </Typography>
      <div className="bg-white rounded-xl p-2 flex flex-col gap-2 w-full">
        {sources.map((source) => (
          <Link
            key={source.id}
            href="#"
            className="flex items-center justify-between gap-4 px-4 py-3 bg-gray-25 rounded-xl"
          >
            <div className="grid gap-2">
              <Typography className="text-regular-sm">
                {source.title}
              </Typography>
              <ResourceTypeTag
                type={source.tag}
                classNames={{
                  root: "gap-2 text-gray-400",
                  label: "text-gray-500 text-regular-xs",
                  icon: "text-[18px]",
                }}
              />
            </div>
            <Icon name="icon-chevron-right" size={18} />
          </Link>
        ))}
      </div>
    </AppPopover>
  )
}

export default SourcesDropdown
