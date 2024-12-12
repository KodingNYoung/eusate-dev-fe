import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import Input from "@/components/molecules/Inputs"
import Modal from "@/components/organisms/Modal"
import React from "react"
import AddFAQForm from "./AddFAQForm"

const AddFAQ = () => {
  return (
    <Modal
      isOpen
      close={console.log}
      classNames={{ root: "px-2", main: "w-full max-w-[600px] rounded-x20" }}
      header={{ title: "Add FAQ" }}
    >
      <AddFAQForm />
    </Modal>
  )
}

export default AddFAQ
