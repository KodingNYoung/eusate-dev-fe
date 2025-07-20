"use client"

import {
  addFAQ,
  editFAQ,
} from "@/app/(organisation-routes)/(dashboard)/knowledge-base/FAQs/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Input from "@/components/molecules/Inputs"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { addFAQSchema } from "@/lib/schemas/knowledge-base"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { FC, FormState, KnowledgeSource } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useRef } from "react"
import { useFormState } from "react-dom"

type Props = {
  isAdd: boolean
  faq?: KnowledgeSource
}

const FAQModalForm: FC<Props> = ({ isAdd, faq }) => {
  const queryClient = useQueryClient()
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
      queryClient.invalidateQueries({
        queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
      })
      close()
    }
  }, [state, queryClient])

  return (
    <form ref={formRef} action={action} className="relative">
      <main className="flex flex-col gap-5 p-5">
        {!isAdd && <input type="hidden" name="id" readOnly value={faq?.id} />}
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
          classNames={{ input: "max-h-32 min-h-24" }}
        />
      </main>
      <footer className="flex items-center justify-end p-5 border-t border-gray-50">
        <SubmitButton
          className="!py-3.5 px-4.5"
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
