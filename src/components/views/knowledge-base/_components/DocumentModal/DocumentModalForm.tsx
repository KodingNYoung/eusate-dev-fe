"use client"

import Badge from "@/components/atoms/Badge"
import Typography from "@/components/atoms/Typography"
import FileDragAndDrop from "@/components/molecules/Inputs/FileDragAndDrop"
import { FC } from "@/utils/types"
import React, { useEffect, useState } from "react"
import FileList from "./FileList"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { ACCEPTABLE_DOCUMENT_EXTENSIONS } from "../../utils"
import FileInputContent from "./FileInputContent"
import { useFormState } from "react-dom"
import { uploadDocuments } from "@/app/(dashboard)/knowledge-base/actions"
import { useFormToast } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { toaster } from "@/components/molecules/Toast"

const DocumentModalForm: FC = () => {
  const { close } = useModal()
  const [files, setFiles] = useState<File[]>([])

  const [state, action] = useFormState(uploadDocuments, {})

  useFormToast(state, true)

  const onFileChange = (files: FileList) => {
    const validFiles = Array.from(files).filter((file) => {
      const ext = file.name.split(".").pop() as string
      return ACCEPTABLE_DOCUMENT_EXTENSIONS.has(ext)
    })
    if (files.length !== validFiles.length) {
      toaster.error("Some files are not supported so they were removed.")
    }
    setFiles((curr) => [...validFiles, ...curr])
  }

  useEffect(() => {
    if ("success" in state) {
      // TODO: Open the processes modal
      close()
    }
  }, [state])

  return (
    <form
      className="pt-8 max-h-[60vh] overflow-y-auto custom-scrollbar relative"
      action={action}
    >
      <FileDragAndDrop
        onFileChange={onFileChange}
        accept="application/pdf, .txt, .doc, .docx"
        className="mx-5 mb-8"
        files={files}
        name="documents"
      >
        <FileInputContent />
      </FileDragAndDrop>
      {files.length ? (
        <>
          <section className="mx-5">
            <header className="flex items-center gap-2 sticky -top-[33px] pt-px bg-white">
              <Typography className="text-semibold-base text-gray-500">
                Files to upload
              </Typography>
              <Badge
                type="filled"
                color="neutral"
                className="size-5 !p-0 flex items-center justify-center text-semibold-xxs"
              >
                {files.length}
              </Badge>
            </header>
            <FileList
              files={files}
              removeFile={(idx) =>
                setFiles((curr) => curr.filter((_, currIdx) => currIdx !== idx))
              }
            />
          </section>
          <footer className="flex justify-end p-5 sticky bottom-0 bg-white border-t border-gray-50 rounded-b-x20">
            <SubmitButton className="!py-4 px-3">
              Add to knowledge base
            </SubmitButton>
          </footer>
        </>
      ) : null}
    </form>
  )
}

export default DocumentModalForm
