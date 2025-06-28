import { bulkToggleSourcePublished } from "@/app/(organisation-routes)/(dashboard)/knowledge-base/actions"
import Icon from "@/components/atoms/Icon"
import ConfirmationModal from "@/components/organisms/ConfirmationModal"
import { useFormToast } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { cls } from "@/utils/helpers"
import { FC, KnowledgeSource } from "@/utils/types"
import React, { useEffect, useMemo } from "react"
import { useFormState } from "react-dom"

type Props = { sources: KnowledgeSource[] }

const BulkTogglePublishedModal: FC<Props> = ({ sources }) => {
  const hasPublished = useMemo(
    () => sources.some((source) => source.published),
    [sources]
  )

  const [state, action] = useFormState(async () => {
    return await bulkToggleSourcePublished(sources, !hasPublished)
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
      modalId={PopupKeys.BULK_TOGGLE_PUBLISH_SOURCE_MODAL}
      header={{
        title: `${hasPublished ? "Unpublish" : "Publish"} resources`,
      }}
      title={`${hasPublished ? "Unpublish" : "Publish"} ${sources.length} resource(s)`}
      content="This will remove these resource(s) from the usable resource(s). All content  will be preserved for future republishing."
      icon={
        <div
          className={cls(
            "w-10 h-10 border flex items-center justify-center rounded-full",
            hasPublished
              ? "border-error-500 bg-error-50"
              : "border-success-500 bg-success-50"
          )}
        >
          <Icon
            name={hasPublished ? "icon-slash" : "icon-send-2"}
            size={20}
            className={hasPublished ? "text-error-500" : "text-success-500"}
          />
        </div>
      }
      closeBtnText="Cancel"
      okBtnText={hasPublished ? "Unpublish" : "Publish"}
      okAction={action}
      okBtnVariant="primary"
    />
  )
}

export default BulkTogglePublishedModal
