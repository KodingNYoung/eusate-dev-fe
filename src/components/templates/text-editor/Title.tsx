import { FC } from "@/utils/types"
import React from "react"

type Props = {
  title?: string
}

const Title: FC<Props> = ({ title = "" }) => {
  return (
    <div>
      <input
        type="text"
        name="title"
        placeholder="Untitled content"
        className="px-5 py-3 w-full text-semibold-2xl placeholder:text-gray-200 text-gray-900 outline-none"
        defaultValue={title}
      />
    </div>
  )
}

export default Title
