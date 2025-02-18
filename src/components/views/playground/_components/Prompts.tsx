"use client"

import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { usePlayground } from "@/hooks/playground"
import { PROMPTS } from "@/utils/dummy"
import { FC } from "@/utils/types"
import React from "react"

const Prompts: FC = () => {
  const { setTextBoxValue } = usePlayground()
  return (
    <div className="flex flex-col gap-3">
      <header className="flex items-center gap-1.5 text-gray-700">
        <Icon
          name="icon-ai-magic"
          className="text-regular-base sm:text-regular-2xl"
        />
        <Typography className="text-semibold-sm sm:text-semibold-lg">
          Try these prompts
        </Typography>
      </header>
      <div className="flex flex-wrap gap-3">
        {PROMPTS.map((prompt) => (
          <Button
            variant="tetiary"
            classNames={{
              label: "text-semibold-xs sm:text-semibold-base",
              root: "px-3 sm:px-4 py-2 sm:py-3",
            }}
            key={prompt.id}
            onClick={() => setTextBoxValue(prompt.text)}
          >
            {prompt.text}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Prompts
