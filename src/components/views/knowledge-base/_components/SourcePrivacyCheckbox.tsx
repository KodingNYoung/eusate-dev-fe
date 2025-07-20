import { toggleSourcePrivacy } from "@/app/(organisation-routes)/(dashboard)/knowledge-base/actions"
import Checkbox, { CheckboxProps } from "@/components/molecules/Checkbox"
import { useFormToast } from "@/hooks/formHooks"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { FC, KnowledgeSource } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

type Props = Omit<CheckboxProps, "name"> & {
  row: KnowledgeSource
  loading?: boolean
}

const SourcePrivacyCheckbox: FC<Props> = ({ row, loading }) => {
  const queryClient = useQueryClient()
  const [state, action] = useFormState(toggleSourcePrivacy, {})

  useFormToast(state, true)

  useEffect(() => {
    if ("success" in state) {
      queryClient.invalidateQueries({
        queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
      })
    }
  }, [queryClient, state])

  return (
    <form action={action}>
      <input type="hidden" value={row.id || ""} name="id" readOnly />
      <input type="hidden" value={row.tag || ""} name="tag" readOnly />
      <Checkbox
        name="privacy"
        value="internal"
        disabled={loading}
        defaultChecked={!row.external && !loading}
        onChange={(e) => {
          e.currentTarget.form?.requestSubmit()
        }}
        classNames={{ root: "mx-auto w-fit" }}
      />
    </form>
  )
}

export default SourcePrivacyCheckbox
