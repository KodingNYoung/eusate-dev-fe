import { FormState } from ".."
import { FC } from "@/utils/types"
import { ChangeEvent } from "react"
import Input from "@/components/molecules/Inputs"
import Button from "@/components/molecules/Buttons"
import { PRIORITY_LEVELS, PriorityLevelType } from "../../utils"
import AppSelect from "@/components/molecules/AppSelect"

type Props = {
  isEditing: boolean
  onAddPriority: () => void
  formState: { area: string; level: PriorityLevelType }
  setFormState: React.Dispatch<React.SetStateAction<FormState>>
}

const Form: FC<Props> = ({
  isEditing,
  formState,
  setFormState,
  onAddPriority,
}) => {
  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }
  return (
    <main className="p-4 grid gap-8">
      <Input
        name="area"
        value={formState.area}
        label="Organisation priority area"
        placeholder="E.g Withdrawal, Refund etc"
        classNames={{
          label: "mb-4 text-gray-700",
          helperText: "text-regular-sm",
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
        helperText="Enter comma seperated values for different priority areas"
      />
      <AppSelect
        name="level"
        label="Priority level"
        placeholder="Critical"
        items={PRIORITY_LEVELS}
        onChange={onInputChange}
        aria-label="select-priority"
        defaultSelectedKeys={[formState.level]}
      />
      <Button onClick={onAddPriority} size="sm" className="h-14">
        {isEditing ? "Update Priority" : "Add Priority"}
      </Button>
    </main>
  )
}

export default Form
