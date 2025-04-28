"use client"

import { useTicketChat } from "@/hooks/ticketChat"
import React, { useEffect, useState } from "react"
import { getFileFromPublicAssets } from "../../utils"
import AttachmentCard from "../../_components/AttachmentCard"
import NoContentFound from "../../_components/NoContentFound"

// import { MockFiles } from '../../mockData'
// !if you want to test with data

const Attachments = () => {
  const { attachments } = useTicketChat()
  const [localAttachments, setLocalAttachments] = useState<(string | File)[]>(
    []
  )
  const [resolvedAttachments, setResolvedAttachments] =
    useState<File[]>(attachments)

  useEffect(() => {
    setLocalAttachments([...attachments, ...localAttachments])
  }, [attachments])

  useEffect(() => {
    async function resolveAttachments() {
      const files: File[] = await Promise.all(
        localAttachments.map(async (attachment) => {
          if (typeof attachment === "string") {
            return await getFileFromPublicAssets(attachment)
          }
          return attachment
        })
      )
      setResolvedAttachments(files)
    }
    if (localAttachments.length) {
      resolveAttachments()
    }
  }, [localAttachments])

  return (
    <div className="custom-scrollbar w-full p-6 h-[30vh] flex flex-col overflow-y-auto">
      {resolvedAttachments.length ? (
        resolvedAttachments.map((file, idx) => (
          <AttachmentCard key={idx} file={file} />
        ))
      ) : (
        <NoContentFound msg="No Attachments Found" />
      )}
    </div>
  )
}

export default Attachments
