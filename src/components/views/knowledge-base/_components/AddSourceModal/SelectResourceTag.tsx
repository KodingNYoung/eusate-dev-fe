"use client"

import React, { ChangeEvent, useRef } from "react"
import SourceModalRadio from "./SourceModalRadio"
import Icon from "@/components/atoms/Icon"
import { ROUTES } from "@/utils/constants"
import { useRouter } from "next/navigation"
import { useValidation } from "@/hooks/formHooks"
import { selectResourcesTagsSchema } from "@/lib/schemas/knowledge-base"
import Button from "@/components/molecules/Buttons"
import { KnowledgeSourceTags } from "@/utils/enums"
import { MODAL_RESOURCE_TAGS } from "../../utils"

const SelectResourceTag = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const { touched, hasErrors, validate, markFieldTouched } = useValidation(
    selectResourcesTagsSchema,
    formRef
  )

  const handleSubmit = (formdata: FormData) => {
    const tag = Object.fromEntries(formdata).tag as KnowledgeSourceTags
    switch (tag) {
      case KnowledgeSourceTags.FAQ:
        router.push(ROUTES.FAQS)
    }
  }
  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    markFieldTouched(name)
    validate(name)
  }

  return (
    <form action={handleSubmit} ref={formRef}>
      <main className="grid grid-cols-2 gap-5 py-10 px-5">
        {MODAL_RESOURCE_TAGS.map((tag) => {
          return (
            <SourceModalRadio
              key={tag.value}
              name="tag"
              onChange={onFieldChange}
              {...tag}
            />
          )
        })}
      </main>
      <footer className="flex items-center justify-end p-5 border-t border-gray-50">
        <Button
          type="submit"
          className="px-3.5 !py-2.5"
          endContent={
            <Icon name="icon-arrow-right" className="text-regular-xl" />
          }
          classNames={{ label: "text-medium-sm" }}
          disabled={!touched.tag || hasErrors}
        >
          Continue
        </Button>
      </footer>
    </form>
  )
}

export default SelectResourceTag
