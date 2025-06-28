import { toggleSourcePrivacy } from "@/app/(organisation-routes)/(dashboard)/knowledge-base/actions"
import Checkbox, { CheckboxProps } from "@/components/molecules/Checkbox"
import { useFormToast } from "@/hooks/formHooks"
import { FC, KnowledgeSource } from "@/utils/types"
import React from "react"
import { useFormState } from "react-dom"

type Props = Omit<CheckboxProps, "name"> & {
  row: KnowledgeSource
}

const SourcePrivacyCheckbox: FC<Props> = ({ row }) => {
  const [state, action] = useFormState(toggleSourcePrivacy, {})

  useFormToast(state, true)

  return (
    <form action={action}>
      <input type="hidden" value={row.id} name="id" readOnly />
      <input type="hidden" value={row.tag} name="tag" readOnly />
      <Checkbox
        name="privacy"
        value="internal"
        checked={!row.external}
        onChange={(e) => {
          e.currentTarget.form?.requestSubmit()
        }}
        classNames={{ root: "mx-auto w-fit" }}
      />
    </form>
  )
}

export default SourcePrivacyCheckbox
