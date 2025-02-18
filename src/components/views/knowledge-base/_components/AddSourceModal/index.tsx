import Modal from "@/components/organisms/Modal"
import React from "react"
import SelectResourceTag from "./SelectResourceTag"
import { PopupKeys } from "@/utils/enums"

const AddSourceModal = () => {
  return (
    <Modal
      id={PopupKeys.SOURCE_MODAL}
      classNames={{ wrapper: "px-2", base: "w-full max-w-[600px] rounded-x20" }}
      header={{
        title: "Add content",
        subtitle: "Empower your AI with curated knowledge.",
      }}
    >
      <SelectResourceTag />
    </Modal>
  )
}

export default AddSourceModal
