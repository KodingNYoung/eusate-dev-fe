import React, { FC, useMemo } from "react"
import Icon from "@/components/atoms/Icon"
import { AttachmentMetadata, MessageType, TWClassNames } from "@/utils/types"
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

type Slots = "root" | "label" | "avatar"
type Props = {
  message: MessageType
  classNames?: { [slot in Slots]?: TWClassNames }
}

const boxVariantStyle: { [variant in MessageSenders]?: TWClassNames } = {
  sate: "bg-gold-50",
  agent: "bg-none border border-gray-50",
  customer: "bg-gray-25 border border-gray-50",
}

const ChatBox: FC<Props> = ({ message, classNames }) => {
  const isGuest = useMemo(
    () => message.sender === MessageSenders.CUSTOMER,
    [message]
  )
  return (
    <div
      className={cls(
        "p-2 flex gap-2 relative w-96 max-w-full",
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
      <div
        className={cls(
          "p-3 rounded-xl space-y-2 flex-1",
          boxVariantStyle[message.sender]
        )}
      >
        {/* Attachments */}
        {message.is_attachment && message.attachment_metadata ? (
          <div className="grid gap-2">
            {/* {message.sender?.map((file, idx) => ( */}
            <CustomerSupportAttachmentCard
              attachment={message.attachment_metadata}
            />
            {/* ))} */}
          </div>
        ) : null}
        <Typography className="text-medium-sm text-gray-700">
          {message.message}
        </Typography>
        <Typography className="text-regular-xs text-gray-400">
          {formatToMessageTime(message.date_created)}
        </Typography>

        {/* Sate Attachments */}
        {/* <div className="space-y-2">
          {showComposer && variant === "sate" && (
            <div
              onClick={() => setComposer(msg)}
              className="cursor-pointer p-3 w-full rounded-xl text-semibold-sm font-[600] border border-gray-900"
            >
              <Typography className="text-center text-semibold-sm font-[600]">
                Copy to composer
              </Typography>
            </div>
          )}
          {variant === "sate" && files?.length && (
            <div className="p-3 rounded-xl border flex flex-col gap-y-2 border-black/10">
              {files?.map(({ name }, idx) => (
                <SateAttachmentsCard key={idx} idx={idx} filename={name} />
              ))}
            </div>
          )}
        </div> */}
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
      // download={attachment.name}
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      // aria-label={`Download attachment: ${attachment.name}`}
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

// const SateAttachmentsCard: FC<{ filename: string; idx: number }> = ({
//   filename,
//   idx,
// }) => {
//   return (
//     <div
//       className={`cursor-pointer flex justify-between py-3 ${idx > 0 && "border-t "} border-t-black/5`}
//     >
//       <div className="flex items-center gap-3">
//         <Icon
//           size={20}
//           name="icon-document-text"
//           className="text-gray-500 font-[300]"
//         />
//         <Typography className="text-medium-xs font-[500]">
//           {capitalizeFirstLetter(filename)}
//         </Typography>
//       </div>

//       <Icon size={20} name="icon-chevron-right" className="text-gray-500" />
//     </div>
//   )
// }
