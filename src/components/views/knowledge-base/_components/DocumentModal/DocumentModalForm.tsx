import Badge from "@/components/atoms/Badge"
import Typography from "@/components/atoms/Typography"
import FileDragAndDrop from "@/components/molecules/Inputs/FileDragAndDrop"
import { FC } from "@/utils/types"
import React, { useState } from "react"
import FileList from "./FileList"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { ACCEPTABLE_DOCUMENT_EXTENSIONS } from "../../utils"
import { useToast } from "@/providers/toastProviders"
import Toast from "@/components/organisms/Toast"
import FileInputContent from "./FileInputContent"

const DocumentModalForm: FC = () => {
  const toast = useToast()
  const [files, setFiles] = useState<File[]>([])

  const onFileChange = (files: FileList) => {
    const validFiles = Array.from(files).filter((file) => {
      const ext = file.name.split(".").pop() as string
      return ACCEPTABLE_DOCUMENT_EXTENSIONS.has(ext)
    })
    if (files.length !== validFiles.length) {
      toast.show("Some files are not supported so they were removed.", {
        type: "error",
      })
    }
    setFiles((curr) => [...validFiles, ...curr])
  }

  return (
    <form className="pt-8 max-h-[60vh] overflow-y-auto custom-scrollbar relative">
      <div className="absolute top-0 left-0 w-full p-5 z-1">
        <Toast />
      </div>
      <FileDragAndDrop
        onFileChange={onFileChange}
        accept="application/pdf, .txt, .doc, .docx"
        className="mx-5 mb-8"
        files={files}
        name="document"
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
