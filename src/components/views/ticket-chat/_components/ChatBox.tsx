import React, { FC, useMemo } from "react"
import Icon from "@/components/atoms/Icon"
import {
  AttachmentMetadata,
  KnowledgeSource,
  MessageType,
  TWClassNames,
} from "@/utils/types"
import Typography from "@/components/atoms/Typography"
import {
  cls,
  formatFileSize,
  formatToMessageTime,
  getFileNameWithoutExt,
  kbToByte,
  truncateWord,
} from "@/utils/helpers"
import { MessageSenders } from "@/utils/enums"
import Avatar from "@/components/atoms/Avatar"
import ChatLoader from "@/components/atoms/ChatLoader"
import Button from "@/components/molecules/Buttons"
import CopyButton from "../../playground/_components/CopyButton"
import SourcesDropdown from "../copilot/SourcesDropdown"

type Slots = "root" | "label" | "avatar"
type Props = {
  message: MessageType
  classNames?: { [slot in Slots]?: TWClassNames }
  align?: "right" | "left"
  copilotOptions?: {
    copyToComposer?: () => void | false
    sources?: KnowledgeSource[]
  }
}

const boxVariantStyle: { [variant in MessageSenders]?: TWClassNames } = {
  [MessageSenders.SATE]: "bg-gold-50",
  [MessageSenders.CUSTOMER]: "bg-none border border-gray-50",
  [MessageSenders.AGENT]: "bg-gray-25 border border-gray-50",
}

const ChatBox: FC<Props> = ({
  message,
  classNames,
  align = "right",
  copilotOptions,
}) => {
  const isGuest = useMemo(
    () => message.sender === MessageSenders.CUSTOMER || align === "left",
    [message, align]
  )
  return (
    <div
      className={cls(
        "p-2 flex gap-2 relative max-w-[min(384px,_95%)] w-fit",
        isGuest ? "self-start flex-row" : "self-end flex-row-reverse",
        classNames?.root
      )}
    >
      <div
        className={cls(
          "size-8 min-h-8 min-w-8 flex justify-center items-center rounded-full self-end",
          message.sender === MessageSenders.SATE && "bg-black text-white",
          classNames?.avatar
        )}
      >
        {message.sender === MessageSenders.SATE ? (
          <Icon name="icon-eusate" size={16} />
        ) : (
          <Avatar
            size="min-w-8 min-h-8 w-8 h-8"
            classNames={{ root: "border-0" }}
          />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div
          className={cls(
            "p-3 rounded-xl space-y-2 w-full",
            boxVariantStyle[message.sender]
          )}
        >
          {message.loading ? (
            <ChatLoader className="w-8" />
          ) : (
            <>
              {/* Attachments */}
              {message.is_attachment && message.attachment_metadata ? (
                <div className="grid gap-2">
                  <CustomerSupportAttachmentCard
                    attachment={message.attachment_metadata}
                  />
                </div>
              ) : null}
              <Typography
                as="span"
                className="text-medium-sm text-gray-700 [&_ol]:list-decimal [&_ol]:list-inside [&_ul]:list-inside whitespace-break-spaces block"
                dangerouslySetInnerHTML={{ __html: message.message?.trim() }}
              />
              <Typography className="text-regular-xs text-gray-400">
                {formatToMessageTime(message.date_created)}
              </Typography>
              {copilotOptions ? (
                <Button
                  variant="tetiary"
                  classNames={{
                    root: "rounded-lg border-gray-900 w-full p-2",
                    label: "text-semibold-sm text-black",
                  }}
                  onClick={copilotOptions.copyToComposer}
                >
                  Copy to composer
                </Button>
              ) : null}
            </>
          )}
        </div>
        {copilotOptions ? (
          <div className="flex items-center gap-3 px-3 py-2">
            <CopyButton response={message.message} />{" "}
            {copilotOptions.sources?.length ? (
              <>
                <div className="h-5 w-px bg-gray-100" />
                <SourcesDropdown sources={copilotOptions.sources} />
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ChatBox

const CustomerSupportAttachmentCard: FC<{ attachment: AttachmentMetadata }> = ({
  attachment,
}) => {
  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      role="button"
      tabIndex={0}
      className="p-2 flex gap-3 items-center bg-gray-50 rounded-xl text-left"
    >
      <div className="p-2.5 bg-gold-50 border border-gold-600 rounded-xl leading-none">
        <Icon size={24} name="icon-document-text" className="text-gold-600" />
      </div>

      <div className="grid gap-1">
        <Typography className="text-semibold-sm text-gray-700">
          {truncateWord(getFileNameWithoutExt(attachment.name), 9)}
          <span className="text-gray-300">{attachment.extension}</span>
        </Typography>
        <Typography className="text-semibold-xs text-gray-300">
          {formatFileSize(kbToByte(attachment.size_kb))}
        </Typography>
      </div>
    </a>
  )
}
