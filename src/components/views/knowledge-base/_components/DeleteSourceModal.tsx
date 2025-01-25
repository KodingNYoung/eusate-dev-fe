import ConfirmationModal from "@/components/organisms/ConfirmationModal"
import { KnowledgeSourceTags, PopupKeys } from "@/utils/enums"
import { FC, FormState, KnowledgeSource } from "@/utils/types"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"
import { removeSource } from "@/app/(dashboard)/knowledge-base/actions"
import { useModal } from "@/hooks/popupHooks"
import Icon from "@/components/atoms/Icon"
import { useFormToast } from "@/hooks/formHooks"

type Props = {
  source: KnowledgeSource
}

const DeleteSourceModal: FC<Props> = ({ source }) => {
  const [state, action] = useFormState<FormState, FormData>(removeSource, {})
  const { close } = useModal()

  useFormToast(state)

  useEffect(() => {
    if ("success" in state) {
      close()
    }
  }, [state])

  const id = new FormData()
  id.append("id", source?.id)
  id.append("tag", source?.tag)

  const sourceTag =
    source?.tag === KnowledgeSourceTags.FAQ ? "FAQ" : source?.tag

  return (
    <ConfirmationModal
      modalId={PopupKeys.DELETE_SOURCE_MODAL}
      header={{ title: `Delete ${sourceTag}` }}
      title={`Delete ${sourceTag}`}
      content={`This will delete the ${sourceTag} from the knowledge base entirely. All content will be lost forever and this action cannot be undone.`}
      icon={
        <div className="w-10 h-10 border border-error-500 bg-error-50 flex items-center justify-center rounded-full">
          <Icon name="icon-trash" size={20} className="text-error-500" />
        </div>
      }
      okBtnText="Yes, Delete"
      okAction={action.bind(null, id)}
    />
  )
}

export default DeleteSourceModal
