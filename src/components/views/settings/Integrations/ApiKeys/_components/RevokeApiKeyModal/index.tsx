import { revokeAPIKey } from "@/app/(organisation-routes)/(dashboard)/settings/actions"
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

const RevokeApiKeyModal: FC<Props> = ({ apiKey }) => {
  const queryClient = useQueryClient()
  const { close } = useModal()

  const [state, action] = useFormState<FormState, FormData>(revokeAPIKey, {})

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
      modalId={PopupKeys.REVOKE_API_KEY}
      header={{ title: `Revoke API key` }}
      title="Revoke API Key"
      content="This will revoke the api key permanently. This action is not reversible."
      icon={
        <div className="w-10 h-10 border border-error-500 bg-error-50 flex items-center justify-center rounded-full">
          <Icon name="icon-trash" size={20} className="text-error-500" />
        </div>
      }
      okBtnText="Revoke"
      okAction={action.bind(null, form)}
    />
  )
}

export default RevokeApiKeyModal
