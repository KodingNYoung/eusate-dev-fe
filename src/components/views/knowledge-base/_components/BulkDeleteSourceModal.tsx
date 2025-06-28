import { bulkRemoveSourcePublished } from "@/app/(organisation-routes)/(dashboard)/knowledge-base/actions"
import Icon from "@/components/atoms/Icon"
import ConfirmationModal from "@/components/organisms/ConfirmationModal"
import { useFormToast } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { cls } from "@/utils/helpers"
import { FC, KnowledgeSource } from "@/utils/types"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

type Props = { sources: KnowledgeSource[] }

const BulkDeleteSourceModal: FC<Props> = ({ sources }) => {
  const [state, action] = useFormState(async () => {
    return await bulkRemoveSourcePublished(sources)
  }, {})
  const { close } = useModal()

  useFormToast(state, true)

  useEffect(() => {
    if ("success" in state) {
      close()
    }
  }, [state])

  return (
    <ConfirmationModal
      modalId={PopupKeys.BULK_DELETE_SOURCE_MODAL}
      header={{
        title: "Delete resource(s)",
      }}
      title={`Delete ${sources.length} resource(s)`}
      content="This will remove these resource(s) from the usable resource(s). All content  will be preserved for future republishing."
      icon={
        <div
          className={cls(
            "w-10 h-10 border flex items-center justify-center rounded-full border-error-500 bg-error-50"
          )}
        >
          <Icon name="icon-trash" size={20} className="text-error-500" />
        </div>
      }
      closeBtnText="Cancel"
      okBtnText="Yes, Delete"
      okAction={action}
    />
  )
}

export default BulkDeleteSourceModal
