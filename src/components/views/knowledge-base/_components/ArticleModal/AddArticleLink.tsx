import { createArticleByLink } from "@/app/(dashboard)/knowledge-base/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Info from "@/components/molecules/Info"
import Toast from "@/components/organisms/Toast"
import WebsiteInput from "@/components/organisms/WebsiteInput"
import { useFormToast } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { FC, FormState } from "@/utils/types"
import React, { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"

const AddArticleLink: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [url, setUrl] = useState("")
  const { close } = useModal(PopupKeys.ARTICLE_MODAL)

  const [state, action] = useFormState<FormState, FormData>(
    createArticleByLink,
    {}
  )

  useFormToast(state)

  const handleUrlVerify = (url: string) => {
    setUrl(url)
  }

  useEffect(() => {
    if ("success" in state) {
      close()
      if (formRef.current) {
        formRef.current.reset()
      }
      // TODO: open processes modal
    }
  }, [state, formRef, close])

  return (
    <div className="relative">
      <Toast />
      <main className="flex flex-col gap-5">
        <div className="px-5 pt-5 grid gap-5">
          <Info
            title="NOTE"
            icon="icon-information-bold"
            description="Only provide URLs to articles that are publicly available. This means articles that are private or paid for cannot be used."
          />
          <WebsiteInput name="url" onVerify={handleUrlVerify} />
        </div>
        <form action={action}>
          <input type="hidden" name="url" value={url} readOnly />
          <footer className="flex items-center justify-end p-5 border-t border-gray-50">
            <SubmitButton
              className="px-3.5 !py-2.5"
              classNames={{ label: "text-medium-sm" }}
              disabled={!url}
            >
              Add to knowledge base
            </SubmitButton>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default AddArticleLink
