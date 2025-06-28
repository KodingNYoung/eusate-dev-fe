import { deleteAPIKey } from "@/app/(organisation-routes)/(dashboard)/settings/actions"
import Icon from "@/components/atoms/Icon"
import ConfirmationModal from "@/components/organisms/ConfirmationModal"
import { useFormToast } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { ApiKeyResponse } from "@/lib/data/settings"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { PopupKeys } from "@/utils/enums"
import { FC, FormState } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

type Props = {
  apiKey: ApiKeyResponse
}

const DeleteApiKeyModal: FC<Props> = ({ apiKey }) => {
  const queryClient = useQueryClient()
  const { close } = useModal()

  const [state, action] = useFormState<FormState, FormData>(deleteAPIKey, {})

  useFormToast(state)

  useEffect(() => {
    if ("success" in state) {
      queryClient.invalidateQueries({
        queryKey: QUERY_FN_KEYS.API_KEYS,
      })
      close()
    }
  }, [state, queryClient, close])

  const form = new FormData()
  form.append("token", apiKey.token)

  return (
    <ConfirmationModal
      modalId={PopupKeys.DELETE_API_KEY}
      header={{ title: `Delete API key` }}
      title="Delete API Key"
      content="This will delete the api key permanently and all app that uses this api will break."
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

export default DeleteApiKeyModal
