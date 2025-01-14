import { deleteFAQ } from "@/app/(dashboard)/knowledge-base/FAQs/actions"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Modal from "@/components/organisms/Modal"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { FC, FormState, KnowledgeSource } from "@/utils/types"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

type Props = {
  faq: KnowledgeSource
}

const DeleteFAQModal: FC<Props> = ({ faq }) => {
  const [state, action] = useFormState<FormState, FormData>(deleteFAQ, {})
  const { close } = useModal()

  useEffect(() => {
    if ("success" in state) {
      close()
    }
  }, [state, close])
  return (
    <Modal
      id={PopupKeys.DELETE_FAQS_MODAL}
      header={{ title: "Delete FAQ" }}
      classNames={{ root: "px-2", main: "w-full max-w-[600px] rounded-x20" }}
    >
      <main className="flex flex-col items-center p-5 gap-5">
        <div className="w-10 h-10 border border-error-500 bg-error-50 flex items-center justify-center rounded-full">
          <Icon name="icon-trash" size={20} className="text-error-500" />
        </div>
        <div className="grid w-full gap-2 items-center  text-center">
          <Typography className="text-bold-2xl">Delete FAQ</Typography>
          <Typography className="text-regular-sm text-black-50 max-w-[446px] mx-auto">
            This will delete the FAQ from the knowledge base entirely. All
            content will be lost forever and this action cannot be undone.
          </Typography>
        </div>
        <form action={action}>
          <input hidden value={faq?.id} name="id" />
          <footer className="py-5 flex items-center justify-center gap-5">
            <Button variant="tetiary" className="py-3 px-4">
              No, Cancel
            </Button>
            <SubmitButton variant="error" className="py-3 px-4">
              Yes, Delete
            </SubmitButton>
          </footer>
        </form>
      </main>
    </Modal>
  )
}

export default DeleteFAQModal
