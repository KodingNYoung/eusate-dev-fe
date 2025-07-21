"use client"

import { FC } from "@/utils/types"
import React, { useEffect, useRef, useState } from "react"
import { KnowledgeSourceTags } from "@/utils/enums"
import {
  createArticle,
  updateResourceContent,
} from "@/app/(organisation-routes)/(dashboard)/knowledge-base/resource/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import {
  createArticleSchema,
  editResourceContentSchema,
} from "@/lib/schemas/knowledge-base"
import { useFormState } from "react-dom"
import Editor from "./Editor"
import { useRouter } from "next/navigation"
import { getFormdataFromFormRef } from "@/utils/helpers"
import { useKnowledgeBaseResource } from "@/hooks/api/knowledgeBaseHooks"
import { Skeleton } from "@nextui-org/react"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { useProcesses } from "@/hooks/processHooks"

type Props = {
  id?: string
  tag?: KnowledgeSourceTags
}

const TextEditor: FC<Props> = ({ id, tag }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { refetch: refetchProcesses } = useProcesses()
  const formRef = useRef<HTMLFormElement>(null)

  const { data: resource, isLoading } = useKnowledgeBaseResource(id, tag)

  const [shouldRedirect, setShouldRedirect] = useState(true)

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
      refetchProcesses()
      queryClient.invalidateQueries({
        queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
      })
      if (shouldRedirect) {
        router.push(state?.redirectTo || "")
      } else {
        setShouldRedirect(false)
      }
    }
  }, [state, shouldRedirect, queryClient, refetchProcesses])

  return (
    <form
      ref={formRef}
      className="bg-white h-full rounded-x20 px-5 py-4.5 flex flex-col gap-5 relative"
      id="text-editor-form"
      action={action}
    >
      <div className="flex justify-between items-center gap-5">
        <Skeleton isLoaded={!isLoading} className="w-full rounded-sm">
          <input
            type="text"
            name="title"
            placeholder="Untitled content"
            className="px-5 w-full text-semibold-2xl placeholder:text-gray-200 text-gray-900 outline-none font-app"
            defaultValue={resource?.title}
            onChange={(e) => markFieldTouched(e.currentTarget.name)}
          />
        </Skeleton>
        <div className="justify-end flex items-center gap-3">
          {resource ? (
            <>
              <input type="hidden" value={resource.id} name="id" readOnly />
              <input type="hidden" value={resource.tag} name="tag" readOnly />
              <Skeleton isLoaded={!isLoading} className="roundded-[90px]">
                <SubmitButton
                  variant="tetiary"
                  classNames={{
                    root: "!py-2 px-4.5",
                    label: "text-medium-sm",
                  }}
                  formAction={() => {
                    setShouldRedirect(false)
                    const form = getFormdataFromFormRef(formRef)
                    if (form) {
                      form?.append(
                        "resourceState",
                        resource.published ? "unpublished" : "published"
                      )
                      action.bind(null, form)()
                    }
                  }}
                >
                  {resource.published ? "Unpublish" : "Publish"}
                </SubmitButton>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} className="rounded-[90px]">
                <SubmitButton
                  classNames={{
                    root: "!py-2 px-4.5",
                    label: "text-medium-sm",
                  }}
                >
                  Save
                </SubmitButton>
              </Skeleton>
            </>
          ) : (
            <>
              <Skeleton isLoaded={!isLoading} className="rounded-[90px]">
                <SubmitButton
                  formAction={() => {
                    const form = getFormdataFromFormRef(formRef)
                    if (form) {
                      form?.append("resourceState", "unpublished")
                      const createDraft = action.bind(null, form)
                      createDraft()
                    }
                  }}
                  variant="tetiary"
                  classNames={{
                    root: "!py-2 px-4.5",
                    label: "text-medium-sm",
                  }}
                  disabled={hasErrors}
                >
                  Save as draft
                </SubmitButton>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} className="rounded-[90px]">
                <SubmitButton
                  classNames={{
                    root: "!py-2 px-4.5",
                    label: "text-medium-sm",
                  }}
                  disabled={hasErrors}
                >
                  Publish
                </SubmitButton>
              </Skeleton>
            </>
          )}
        </div>
      </div>
      <Skeleton
        isLoaded={!isLoading}
        classNames={{ base: "rounded-sm flex-1", content: "h-full" }}
      >
        <Editor
          onContentChange={() => markFieldTouched("content")}
          content={resource?.content}
          loading={isLoading}
        />
      </Skeleton>
    </form>
  )
}

export default TextEditor
