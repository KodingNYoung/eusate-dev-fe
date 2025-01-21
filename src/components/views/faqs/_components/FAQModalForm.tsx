"use client"

import { addFAQ, editFAQ } from "@/app/(dashboard)/knowledge-base/FAQs/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Input from "@/components/molecules/Inputs"
import Toast from "@/components/organisms/Toast"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { addFAQSchema } from "@/lib/schemas/knowledge-base"
import { FC, FormState, KnowledgeSource } from "@/utils/types"
import React, { useEffect, useRef } from "react"
import { useFormState } from "react-dom"

type Props = {
  isAdd: boolean
  faq?: KnowledgeSource
}

const FAQModalForm: FC<Props> = ({ isAdd, faq }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const { close } = useModal()

  const { errors, touched, hasErrors, markFieldTouched } = useValidation(
    addFAQSchema,
    formRef
  )

  const [state, action] = useFormState<FormState, FormData>(
    isAdd ? addFAQ : editFAQ,
    {}
  )

  useFormToast(state, true)

  useEffect(() => {
    if ("success" in state) {
      setTimeout(close, 1500)
    }
  }, [state, close])

  return (
    <form ref={formRef} action={action} className="relative">
      <Toast />
      <main className="flex flex-col gap-5 p-5">
        {!isAdd && <input hidden name="id" value={faq?.id} />}
        <Input
          name="question"
          label="Question"
          defaultValue={faq?.question}
          placeholder="Type a question"
          isError={touched.question && !!errors.question}
          helperText={touched.question ? errors.question : ""}
          onChange={(e) => markFieldTouched(e.currentTarget.name)}
        />
        <Input
          name="answer"
          label="Answer"
          defaultValue={faq?.answer}
          multiline
          rows={4}
          placeholder="Type an answer to the question above..."
          isError={touched.answer && !!errors.answer}
          helperText={touched.answer ? errors.answer : ""}
          onChange={(e) => markFieldTouched(e.currentTarget.name)}
        />
      </main>
      <footer className="flex items-center justify-end p-5 border-t border-gray-50">
        <SubmitButton
          className="px-3.5 !py-2.5"
          classNames={{ label: "text-medium-sm" }}
          disabled={hasErrors}
        >
          {isAdd ? "Add to knowledge base" : "Edit FAQ"}
        </SubmitButton>
      </footer>
    </form>
  )
}

export default FAQModalForm
