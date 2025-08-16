import Icon from "@/components/atoms/Icon"
import AppTooltip from "@/components/molecules/Tooltip"
import { copy } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React, { useState } from "react"

type Props = { response: string; loading?: boolean }

const CopyButton: FC<Props> = ({ response, loading }) => {
  const [copied, setCopied] = useState(false)

  return (
    <AppTooltip
      trigger="click"
      content="copied!"
      placement="top"
      isOpen={copied}
      classNames={{ content: "text-white", trigger: "z-0" }}
    >
      <button
        onClick={() => {
          setCopied(true)
          copy(response)
          setTimeout(() => setCopied(false), 1500)
        }}
        disabled={copied || loading}
        className="outline-none !leading-none"
      >
        <Icon name="icon-copy" size={20} className="text-gray-500" />
      </button>
    </AppTooltip>
  )
}

export default CopyButton
