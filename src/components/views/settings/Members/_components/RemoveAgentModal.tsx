import { removeMember } from "@/app/(organisation-routes)/(dashboard)/settings/organisation/actions"
import ConfirmationModal from "@/components/organisms/ConfirmationModal"
import { useFormToast } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { PopupKeys } from "@/utils/enums"
import { FC, FormState } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

type Props = {
  memberId: string
}

const RemoveAgentModal: FC<Props> = ({ memberId }) => {
  const queryClient = useQueryClient()

  const { close } = useModal()

  const [state, action] = useFormState<FormState, FormData>(removeMember, {})

  useFormToast(state)

  useEffect(() => {
    if ("success" in state) {
      queryClient.invalidateQueries({
        queryKey: QUERY_FN_KEYS.ORGANISATION_USERS,
      })
      close()
    }
  }, [state, queryClient, close])

  const form = new FormData()
  form.append("id", memberId)

  return (
    <ConfirmationModal
      modalId={PopupKeys.REMOVE_AGENT_MODAL}
      header={{ title: "Remove member" }}
      title="Remove member"
      content="This will remove this member from your organisation's workspace. You can still invite them to the organisation."
      okBtnText="Yes, Remove"
      okAction={action.bind(null, form)}
    />
  )
}

export default RemoveAgentModal
