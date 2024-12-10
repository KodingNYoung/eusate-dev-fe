import Modal from "@/components/organisms/Modal"
import React from "react"
import SelectResourceTag from "./SelectResourceTag"

const AddSourceModal = () => {
  return (
    <Modal
      isOpen
      close={console.log}
      classNames={{ root: "px-2", main: "w-full max-w-[600px] rounded-x20" }}
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
