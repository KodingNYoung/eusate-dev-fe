import Modal from "@/components/organisms/Modal"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"
import DocumentModalForm from "./DocumentModalForm"

const DocumentModal: FC = () => {
  return (
    <Modal
      id={PopupKeys.DOCUMENT_MODAL}
      classNames={{ root: "px-2", main: "w-full max-w-[600px] rounded-x20" }}
      header={{ title: "Upload a document" }}
    >
      <DocumentModalForm />
    </Modal>
  )
}

export default DocumentModal
