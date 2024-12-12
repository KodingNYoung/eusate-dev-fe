import { addFAQ } from "@/app/(dashboard)/knowledge-base/FAQs/actions"
import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import Input from "@/components/molecules/Inputs"
import { useValidation } from "@/hooks/formHooks"
import { addFAQSchema } from "@/lib/schemas/knowledge-base"
import { FC, FormState } from "@/utils/types"
import React, { useEffect, useRef } from "react"
import { useFormState } from "react-dom"

const AddFAQForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const { errors, touched, hasErrors, validate, markFieldTouched } =
    useValidation(addFAQSchema, formRef)
  const [state, action] = useFormState<FormState, FormData>(addFAQ, {})

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <form ref={formRef} action={action}>
      <main className="flex flex-col gap-5 p-5">
        <Input
          name="question"
          label="Question"
          placeholder="Type a question"
          isError={!!errors.question}
          helperText={errors.question}
          onChange={(e) => validate(e.currentTarget.name)}
          onBlur={(e) => markFieldTouched(e.currentTarget.name)}
        />
        <Input
          name="answer"
          label="Answer"
          multiline
          rows={4}
          placeholder="Type an answer to the question above..."
          isError={!!errors.answer}
          helperText={errors.answer}
          onChange={(e) => validate(e.currentTarget.name)}
          onBlur={(e) => markFieldTouched(e.currentTarget.name)}
        />
      </main>
      <footer className="flex items-center justify-end p-5 border-t border-gray-50">
        <Button
          type="submit"
          className="px-3.5 !py-2.5"
          endContent={
            <Icon name="icon-arrow-right" className="text-regular-xl" />
          }
          classNames={{ label: "text-medium-sm" }}
          disabled={!touched.question || !touched.answer || hasErrors}
        >
          Continue
        </Button>
      </footer>
    </form>
  )
}

export default AddFAQForm
