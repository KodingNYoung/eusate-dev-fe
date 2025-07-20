import Modal from "@/components/organisms/Modal"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"
import AddLink from "./AddLink"

const LinkModal: FC = () => {
  return (
    <Modal
      id={PopupKeys.LINK_MODAL}
      classNames={{ wrapper: "px-2", base: "w-full max-w-[600px] rounded-x20" }}
      header={{ title: "Add  link" }}
    >
      <AddLink />
    </Modal>
  )
}

export default LinkModal
