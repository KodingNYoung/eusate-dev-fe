import { createArticleByLink } from "@/app/(organisation-routes)/(dashboard)/knowledge-base/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Info from "@/components/molecules/Info"
import WebsiteInput from "@/components/organisms/WebsiteInput"
import { useFormToast } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { FC, FormState } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { useFormState } from "react-dom"

const AddArticleLink: FC = () => {
  const queryClient = useQueryClient()
  const [url, setUrl] = useState("")
  const { close } = useModal()

  const [state, action] = useFormState<FormState, FormData>(
    createArticleByLink,
    {}
  )

  useFormToast(state, true)

  const handleUrlVerify = (url: string) => {
    setUrl(url)
  }

  useEffect(() => {
    if ("success" in state) {
      // TODO: open the processes modal
      queryClient.invalidateQueries({
        queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
      })
      close()
    }
  }, [state, queryClient])

  return (
    <div className="relative">
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
              className="!py-3.5 px-4.5"
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
