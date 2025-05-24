"use client"

import { AttachmentMetadata, FC } from "@/utils/types"
import Icon from "@/components/atoms/Icon"
import FileItem from "../_components/FileItem"
import React, { useState } from "react"
// import { useTicketChat } from "@/hooks/ticketChat"
// import { useCustomerChat } from "@/providers/ticketChatProvider"
import { promptFileUpload } from "../utils"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import AutoResizingTextarea from "@/components/molecules/Inputs/AutoResizingTextarea"
import AIModal, { AIModalTrigger } from "./AIModal"
import { useChatContext } from "@/hooks/helpdesk"
import Button from "@/components/molecules/Buttons"
import { getFileExtension } from "@/utils/helpers"
import { uploadTicketAttachment } from "@/app/(dashboard)/helpdesk/actions"
import { toaster } from "@/components/molecules/Toast"

const ChatFooter: FC = () => {
  const { sendMessage } = useChatContext()
  // const { message, submitMessage, setMessage } = useCustomerChat()

  // const { setComposer, composer, setAttachments } = useTicketChat()
  const [attachment, setAttachment] = useState<AttachmentMetadata>()

  // const handleUpload = async () => {
  //   const files = await promptFileUpload(getAllowedFileExts())
  //   if (files && files.length) setUploadFile([...uploadedFiles, files[0]])
  // }

  // useEffect(() => {
  // setMessage(composer)
  // }, [composer])

  const handleFileUpload = async () => {
    const file = (
      await promptFileUpload(
        "application/pdf, .txt, .doc, .docx, .xls, .png, .jpg, .jpeg, .gif"
      )
    )?.[0]
    if (!file) return
    const attachmentMetadata: AttachmentMetadata = {
      name: file.name,
      url: URL.createObjectURL(file),
      size_kb: file.size / 1024,
      extension: getFileExtension(file),
      loading: true,
    }
    setAttachment(attachmentMetadata)

    const formdata = new FormData()
    formdata.append("file", file)

    const uploadResponse = await uploadTicketAttachment(formdata)

    if ("success" in uploadResponse) {
      setAttachment(uploadResponse.payload)
    } else if ("error" in uploadResponse) {
      setAttachment({ ...attachmentMetadata, loading: false, error: true })
      toaster.error(`Failed to upload file: ${uploadResponse.error.message}`)
    }
  }

  return (
    <footer className="sticky bottom-0 mt-auto px-4 md:px-6 pb-16 sm:pb-5 bg-white">
      <form
        action={(formdata) => {
          const message = formdata.get("message") as string
          sendMessage(message, attachment)
        }}
        className="border border-gray-50 bg-gray-25 flex flex-col rounded-x20 p-0.5 gap-2"
      >
        {!!attachment && (
          <FileItem
            file={attachment}
            onRemove={() => setAttachment(undefined)}
          />
        )}
        <AutoResizingTextarea
          placeholder="Type a message..."
          name="message"
          // value={message}
          autoFocus
          // onChange={setMessage}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value && !e.shiftKey) {
              e.preventDefault()
              e.currentTarget.form.requestSubmit()
            }
          }}
          classNames={{
            inputWrapper:
              "p-3 border border-gray-50 group-data-[focus=true]:border-warning-500 group-data-[hover=true]:border-warning-300 !shadow-none !ring-0",
            input: "!text-medium-sm font-[500] text-gray-900 outline-none",
          }}
          minRows={3}
          maxRows={6}
        />

        {/* Attachments and Submit button */}
        <div className="flex items-center px-3 py-2.5 gap-2">
          <Button
            variant="tetiary"
            autoFocus={false}
            className="py-1.5 px-3 flex items-center justify-center rounded-[100px] !leading-none"
            startContent={
              <Icon
                size={20}
                name="icon-attach-square"
                className="!leading-none"
              />
            }
            onClick={handleFileUpload}
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
      <AIModal />
      <AIModalTrigger />
      <div className="absolute bottom-0 left-0 w-full shadow-[0px_-15px_20px_10px_rgba(255,255,255,1)]  h-full pointer-events-none -z-1" />
    </footer>
  )
}

export default ChatFooter
