import { removeFunction } from "@/app/(dashboard)/dev-space/actions"
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
  funcId: string
}

const DeleteDSFunction: FC<Props> = ({ funcId }) => {
  const queryClient = useQueryClient()
  const { close } = useModal()

  const [state, action] = useFormState<FormState, FormData>(removeFunction, {})
  useFormToast(state)

  useEffect(() => {
    if ("success" in state) {
      queryClient.invalidateQueries({
        queryKey: QUERY_FN_KEYS.DEV_SPACE_FUNCTIONS,
      })
      close()
    }
  }, [state, queryClient, close])

  const form = new FormData()
  form.append("id", funcId)
  return (
    <ConfirmationModal
      modalId={PopupKeys.DELETE_FUNCTION_MODAL}
      header={{ title: "Delete function" }}
      title="Delete a function"
      content="This will delete this function from record."
      okBtnText="Yes, Delete"
      okAction={action.bind(null, form)}
    />
  )
}

export default DeleteDSFunction
