import { toggleSourcePublished } from "@/app/(organisation-routes)/(dashboard)/knowledge-base/actions"
import Icon from "@/components/atoms/Icon"
import ConfirmationModal from "@/components/organisms/ConfirmationModal"
import { useFormToast } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { KnowledgeSourceTags, PopupKeys } from "@/utils/enums"
import { cls } from "@/utils/helpers"
import { FC, FormState, KnowledgeSource } from "@/utils/types"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

type Props = { source: KnowledgeSource }

const UnpublishSourceModal: FC<Props> = ({ source }) => {
  const [state, action] = useFormState<FormState, FormData>(
    toggleSourcePublished,
    {}
  )
  const { close } = useModal()

  useFormToast(state, true)

  useEffect(() => {
    if ("success" in state) {
      close()
    }
  }, [state])

  const form = new FormData()
  form.append("id", source?.id)
  form.append("tag", source?.tag)
  form.append("published", (!source?.published).toString())

  const sourceTag =
    source?.tag === KnowledgeSourceTags.FAQ ? "FAQ" : source?.tag

  return (
    <ConfirmationModal
      modalId={PopupKeys.TOGGLE_PUBLISH_SOURCE_MODAL}
      header={{
        title: `${source.published ? "Unpublish" : "Publish"} ${sourceTag}`,
      }}
      title={`${source.published ? "Unpublish" : "Publish"} ${sourceTag}`}
      content={`This will remove the ${sourceTag} from the usable ${sourceTag}s. All content  will be preserved for future republishing.`}
      icon={
        <div
          className={cls(
            "w-10 h-10 border flex items-center justify-center rounded-full",
            source.published
              ? "border-error-500 bg-error-50"
              : "border-success-500 bg-success-50"
          )}
        >
          <Icon
            name={source.published ? "icon-slash" : "icon-send-2"}
            size={20}
            className={source.published ? "text-error-500" : "text-success-500"}
          />
        </div>
      }
      closeBtnText="Cancel"
      okBtnText={source.published ? "Unpublish" : "Publish"}
      okAction={action.bind(null, form)}
      okBtnVariant="primary"
    />
  )
}

export default UnpublishSourceModal
