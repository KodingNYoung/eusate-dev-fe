"use client"

import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import AutoResizingTextarea from "@/components/molecules/Inputs/AutoResizingTextarea"
import { usePlayground } from "@/providers/playgroundProvider"
import { FC } from "@/utils/types"
import React from "react"
import ChatPreferencesButton from "./ChatPreferencesButton"
import ChatPreferencesModal from "./ChatPreferencesModal"
import ClearButton from "./ClearButton"
import ClearConvoModal from "./ClearConvoModal"

const ChatFooter: FC = () => {
  const { textBoxValue, setTextBoxValue } = usePlayground()

  return (
    <footer className="sticky bottom-0 px-4 pb-5 sm:pb-10 ">
      <div className="max-w-[906px] w-full mx-auto flex gap-5">
        <div className="flex-1 border border-gray-50 has-[:focus]:border-gray-900 has-[:valid]:border-gray-900 transition-colors duration-300 bg-gray-25 flex rounded-x20 px-6 py-4">
          <div className="flex flex-1 items-start gap-5">
            <div className="h-14 flex items-center">
              <ChatPreferencesButton />
            </div>
            <AutoResizingTextarea
              placeholder="Ask Eusate AI anything..."
              value={textBoxValue}
              onChange={setTextBoxValue}
              classNames={{ inputWrapper: "min-h-6", base: "self-center" }}
              maxRows={6}
            />
          </div>
          <Button
            classNames={{ label: "!leading-none", root: "w-14 h-14 self-end" }}
          >
            <Icon name="icon-send-2-bold" size={20} />
          </Button>
        </div>
        <ClearButton />
      </div>
      <ChatPreferencesModal />
      <ClearConvoModal />
    </footer>
  )
}

export default ChatFooter
