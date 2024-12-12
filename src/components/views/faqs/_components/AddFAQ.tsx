import Modal from "@/components/organisms/Modal"
import React from "react"
import AddFAQForm from "./AddFAQForm"
import { PopupKeys } from "@/utils/enums"

const AddFAQ = () => {
  return (
    <Modal
      id={PopupKeys.FAQS_MODAL}
      classNames={{ root: "px-2", main: "w-full max-w-[600px] rounded-x20" }}
      header={{ title: "Add FAQ" }}
    >
      <AddFAQForm />
    </Modal>
  )
}

export default AddFAQ
