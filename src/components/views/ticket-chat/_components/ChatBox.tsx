import React, { FC, useMemo } from "react"
import Icon from "@/components/atoms/Icon"
import { TWClassNames } from "@/utils/types"
import Avatar from "@/components/atoms/Avatar"
import { useTicketChat } from "@/hooks/ticketChat"
import { ChatPersons, formatTime12Hr } from "../utils"
import Typography from "@/components/atoms/Typography"
import eusateAvatar from "@/assets/images/eusate-avatar.svg"
import {
  capitalizeFirstLetter,
  cls,
  formatFileSize,
  getFileExtension,
  truncateWord,
} from "@/utils/helpers"

type BoxVariants = ChatPersons
type Slots = "root" | "label" | "avatar"
type Props = {
  msg: string
  createdAt: Date
  avatarUrl?: string
  variant: BoxVariants
  hasAttachments?: boolean
  files?: File[]
  showComposer?: boolean
  position: "right" | "left"
  classNames?: { [slot in Slots]?: TWClassNames }
}

const boxVariantStyle: { [variant in BoxVariants]?: TWClassNames } = {
  sate: "bg-gold-50",
  support: "bg-none border border-gray-50",
  customer: "bg-gray-25 border border-gray-50",
}

const ChatBox: FC<Props> = ({
  msg,
  avatarUrl,
  showComposer,
  hasAttachments,
  files,
  variant,
  classNames,
  createdAt,
  position,
}) => {
  const { setComposer } = useTicketChat()
  return (
    <div
      className={cls(
        `p-2 flex gap-2 relative w-96 ${position === "right" ? "self-end flex-row-reverse" : "self-start"}`,
        classNames?.root
      )}
    >
      <Avatar
        src={avatarUrl || eusateAvatar}
        className={cls(
          "self-end !size-8 !min-w-8 !min-h-8",
          classNames?.avatar
        )}
      />
      <div
        className={cls("p-3 rounded-xl space-y-2", boxVariantStyle[variant])}
      >
        {/* Attachments */}
        <div>
          {(hasAttachments && variant === "support") ||
          variant === "customer" ? (
            <div className="grid gap-2">
              {files?.map((file, idx) => (
                <CustomerSupportAttachmentCard key={idx} file={file} />
              ))}
            </div>
          ) : null}
        </div>
        <Typography className="text-medium-sm text-gray-700">{msg}</Typography>
        <Typography className="text-regular-xs text-gray-400">
          {formatTime12Hr(createdAt)}
        </Typography>

        {/* Sate Attachments */}
        <div className="space-y-2">
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
        </div>
      </div>
    </div>
  )
}

export default ChatBox

const CustomerSupportAttachmentCard: FC<{ file: File }> = ({ file }) => {
  const { name, size } = file
  const ext = useMemo(() => {
    return getFileExtension(file)
  }, [])

  return (
    <div className="p-3 flex gap-3 items-center bg-gray-50 rounded-xl ">
      <div className="p-3 bg-gold-50 border border-gold-600 rounded-xl">
        <Icon size={24} name="icon-document-text" className="text-gold-600" />
      </div>

      <div className="">
        <Typography className="text-semibold-sm text-gray-700">
          {capitalizeFirstLetter(truncateWord(name, 9))}
          <span className="text-gray-300">{ext}</span>
        </Typography>
        <Typography className="text-regular-xs text-gray-300">
          {formatFileSize(size)}
        </Typography>
      </div>
    </div>
  )
}

const SateAttachmentsCard: FC<{ filename: string; idx: number }> = ({
  filename,
  idx,
}) => {
  return (
    <div
      className={`cursor-pointer flex justify-between py-3 ${idx > 0 && "border-t "} border-t-black/5`}
    >
      <div className="flex items-center gap-3">
        <Icon
          size={20}
          name="icon-document-text"
          className="text-gray-500 font-[300]"
        />
        <Typography className="text-medium-xs font-[500]">
          {capitalizeFirstLetter(filename)}
        </Typography>
      </div>

      <Icon size={20} name="icon-chevron-right" className="text-gray-500" />
    </div>
  )
}
