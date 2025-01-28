import {
  createArticle,
  updateResourceContent,
} from "@/app/(dashboard)/knowledge-base/resource/actions"
import Button from "@/components/molecules/Buttons"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import {
  createArticleSchema,
  editResourceContentSchema,
} from "@/lib/schemas/knowledge-base"
import { FC, KnowledgeSource } from "@/utils/types"
import React, { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import Editor from "./Editor"
import Toast from "@/components/organisms/Toast"
import { useRouter } from "next/navigation"

type Props = {
  resource?: KnowledgeSource
}

const TextEditorForm: FC<Props> = ({ resource }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const { hasErrors, markFieldTouched } = useValidation(
    resource ? editResourceContentSchema : createArticleSchema,
    formRef
  )

  const [state, action] = useFormState(
    resource ? updateResourceContent : createArticle,
    {}
  )

  useFormToast(state, true)

  useEffect(() => {
    if ("success" in state) {
      setTimeout(() => router.push(state?.redirectTo || ""), 1500)
      console.log(state)
    }
  }, [state])
  return (
    <form
      ref={formRef}
      className="bg-white h-full rounded-x20 px-5 py-4.5 flex flex-col gap-5 relative"
      id="text-editor-form"
      action={action}
    >
      <Toast />
      {!!resource && (
        <>
          <input type="hidden" value={resource.id} name="id" readOnly />
          <input type="hidden" value={resource.tag} name="tag" readOnly />
        </>
      )}
      <div className="flex justify-between items-center">
        <input
          type="text"
          name="title"
          placeholder="Untitled content"
          className="px-5 py-3 w-full text-semibold-2xl placeholder:text-gray-200 text-gray-900 outline-none"
          defaultValue={resource?.title}
          onChange={(e) => markFieldTouched(e.currentTarget.name)}
        />
        <div className="justify-end flex items-center gap-3">
          {resource ? (
            <>
              <Button
                variant="tetiary"
                classNames={{
                  root: "py-2.5 px-4.5",
                  label: "text-medium-sm",
                }}
              >
                Publish
              </Button>
              <SubmitButton
                classNames={{
                  root: "!py-2.5 px-4.5",
                  label: "text-medium-sm",
                }}
              >
                Save
              </SubmitButton>
            </>
          ) : (
            <>
              <Button
                variant="tetiary"
                classNames={{
                  root: "py-2.5 px-4.5",
                  label: "text-medium-sm",
                }}
              >
                Save as draft
              </Button>
              <SubmitButton
                classNames={{
                  root: "!py-2.5 px-4.5",
                  label: "text-medium-sm",
                }}
                disabled={hasErrors}
              >
                Publish
              </SubmitButton>
            </>
          )}
        </div>
      </div>
      <Editor
        onContentChange={() => markFieldTouched("content")}
        content={resource?.content}
      />
    </form>
  )
}

export default TextEditorForm
