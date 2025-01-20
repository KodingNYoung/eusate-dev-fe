import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import { useValidation } from "@/hooks/formHooks"
import { selectArticleMethodSchema } from "@/lib/schemas/knowledge-base"
import { FC } from "@/utils/types"
import React, { ChangeEvent, useRef } from "react"
import { ARTICLE_METHODS, ArticleMethodType } from "../../utils"
import SourceModalRadio from "../AddSourceModal/SourceModalRadio"

type Props = {
  onOptionSelect: () => void
}

const SelectMethod: FC<Props> = ({ onOptionSelect }) => {
  const formRef = useRef<HTMLFormElement>(null)

  const { hasErrors, markFieldTouched } = useValidation(
    selectArticleMethodSchema,
    formRef
  )

  const handleSubmit = (formdata: FormData) => {
    const method = Object.fromEntries(formdata).method as ArticleMethodType

    switch (method) {
      case "link":
        onOptionSelect()
        break
      case "text":
        break
    }
  }
  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    markFieldTouched(name)
  }

  return (
    <form ref={formRef} action={handleSubmit}>
      <main className="grid gap-5 py-10 px-5">
        {ARTICLE_METHODS.map((method) => {
          return (
            <SourceModalRadio
              key={method.value}
              name="method"
              onChange={onFieldChange}
              classNames={{ label: "!flex-row" }}
              {...method}
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
          disabled={hasErrors}
        >
          Continue
        </Button>
      </footer>
    </form>
  )
}

export default SelectMethod
