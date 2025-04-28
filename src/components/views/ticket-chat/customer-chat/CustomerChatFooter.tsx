"use client"

import { FC } from "@/utils/types"
import Icon from "@/components/atoms/Icon"
import FileItem from "../_components/FileItem"
import React, { useEffect, useState } from "react"
import { useTicketChat } from "@/hooks/ticketChat"
import { useCustomerChat } from "@/providers/ticketChatProvider"
import { getAllowedFileExts, promptFileUpload } from "../utils"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import AutoResizingTextarea from "@/components/molecules/Inputs/AutoResizingTextarea"
import AIModal, { AIModalTrigger } from "./AIModal"

type Props = {
  scrollToBottom: () => void
}

const ChatFooter: FC<Props> = ({ scrollToBottom }) => {
  const { message, submitMessage, setMessage } = useCustomerChat()

  const { setComposer, composer, setAttachments } = useTicketChat()
  const [uploadedFiles, setUploadFile] = useState<File[]>([])

  const handleUpload = async () => {
    const files = await promptFileUpload(getAllowedFileExts())
    if (files && files.length) setUploadFile([...uploadedFiles, files[0]])
  }

  useEffect(() => {
    setMessage(composer)
  }, [composer])

  return (
    <footer className="sticky bottom-0 px-4 md:px-6 pb-16 sm:pb-0">
      <div className="max-w-[906px] w-full mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submitMessage("support", {
              hasAttachment: uploadedFiles.length > 0,
              files: uploadedFiles,
            })
            if (uploadedFiles.length) setAttachments([...uploadedFiles])
            setComposer("")
            setUploadFile([])
            scrollToBottom()
          }}
          className="border border-gray-50 bg-gray-25 flex flex-col rounded-x20 p-1 gap-2"
        >
          {/* Attachments */}
          <div className="flex flex-wrap gap-4">
            {uploadedFiles.map((file, idx) => (
              <FileItem
                key={idx}
                file={file}
                onRemove={() =>
                  setUploadFile((p) => [
                    ...p.slice(0, idx),
                    ...p.slice(idx + 1),
                  ])
                }
              />
            ))}
          </div>

          <AutoResizingTextarea
            placeholder="Type a message..."
            name="message"
            value={message}
            onChange={setMessage}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value && !e.shiftKey) {
                e.preventDefault()
                e.currentTarget.form.requestSubmit()
              }
            }}
            classNames={{
              inputWrapper:
                "px-6 py-4 border border-gray-50 group-data-[focus=true]:border-warning-500 group-data-[hover=true]:border-warning-300",
              input: "text-medium-sm font-[500]",
            }}
            minRows={3}
            maxRows={6}
          />

          {/* Attachments and Submit button */}
          <div className="flex items-center px-3 py-2 gap-2">
            <Icon
              onClick={handleUpload}
              size={23}
              name="icon-attach-square"
              className="cursor-pointer font-[400] text-gray-500 px-2.5 py-1.5 bg-white border rounded-full border-gray-50 rotate-[90deg]"
            />
            <Icon
              size={23}
              name="icon-ai-magic"
              className="cursor-pointer font-[400] text-gray-500 px-2.5 py-1.5 bg-white border rounded-full border-gray-50"
            />
            <div className="flex-1" />
            <SubmitButton
              size="sm"
              classNames={{
                label:
                  "!leading-none visible group-data-[loading=true]/button:invisible group-data-[loading=true]/button:absolute",
                root: "size-5 sm:size-10 !py-0",
              }}
            >
              <Icon name="icon-send-2-bold" size={20} />
            </SubmitButton>
          </div>
        </form>
      </div>

      <AIModal />
      <AIModalTrigger />
    </footer>
  )
}

export default ChatFooter
