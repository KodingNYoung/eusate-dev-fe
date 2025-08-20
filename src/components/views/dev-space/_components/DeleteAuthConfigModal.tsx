import { removeAuthConfig } from "@/app/(organisation-routes)/(dashboard)/dev-space/actions"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import ConfirmationModal from "@/components/organisms/ConfirmationModal"
import { useAuthConfigFunctions } from "@/hooks/api/devSpaceHooks"
import { useFormToast } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { PopupKeys } from "@/utils/enums"
import { FC, FormState } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

type Props = {
  id: string
}

const DeleteAuthConfigModal: FC<Props> = ({ id }) => {
  const queryClient = useQueryClient()
  const { close } = useModal()

  const [state, action] = useFormState<FormState, FormData>(
    removeAuthConfig,
    {}
  )
  const { functions } = useAuthConfigFunctions(id)

  useFormToast(state, true)

  useEffect(() => {
    console.log(state)
    if ("success" in state) {
      queryClient.invalidateQueries({ queryKey: QUERY_FN_KEYS.AUTH_CONFIG })
      close()
    }
  }, [state, queryClient, close])

  const form = new FormData()
  form.append("id", id)

  return (
    <ConfirmationModal
      modalId={PopupKeys.DELETE_AUTH_CONFIG_MODAL}
      header={{ title: "Delete config" }}
      title="Delete auth config"
      content={
        functions?.length ? (
          <span>
            This will delete the auth config permanently and all authenticated
            functions would become non-authenticated. The following are the
            affected functions you have:
            <Typography
              as="span"
              className="p-2 border border-gray-50 bg-gray-25 rounded-xl text-medium-base text-gray-600 block mt-2"
            >
              {functions.map((fn) => fn.name).join(", ")}
            </Typography>
          </span>
        ) : (
          "This will delete this authentication configuration. You can always come back to set up a new one."
        )
      }
      icon={
        <div className="w-10 h-10 border border-error-500 bg-error-50 flex items-center justify-center rounded-full">
          <Icon name="icon-trash" size={20} className="text-error-500" />
        </div>
      }
      okBtnText="Yes, Delete"
      okAction={action.bind(null, form)}
    />
  )
}

export default DeleteAuthConfigModal
