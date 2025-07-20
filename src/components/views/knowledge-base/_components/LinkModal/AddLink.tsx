import { addLinks } from "@/app/(organisation-routes)/(dashboard)/knowledge-base/actions"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import ValidatableLinkInput from "@/components/organisms/ValidatableLinkInput"
import { useFormToast } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { FC, FormState } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { useFormState } from "react-dom"

const AddLink: FC = () => {
  const queryClient = useQueryClient()
  const { close } = useModal()

  const [links, setLinks] = useState([""])

  const [state, action] = useFormState<FormState, FormData>(addLinks, {})

  useFormToast(state, true)

  const handleUrlVerify = (url: string, name: string) => {
    setLinks((curr) => {
      const links = [...curr]
      links[parseInt(name)] = url

      return links
    })
  }
  const handleDelete = (name: string) => {
    setLinks((curr) => curr.filter((_, index) => index !== parseInt(name)))
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
      <main className="flex flex-col">
        <div className="p-5 grid gap-5">
          <div className="border border-gray-100 rounded-xl p-5 flex flex-col gap-5">
            <Typography as="h4" className="text-regular-sm text-gray-500">
              Add a link to a source
            </Typography>
            {links.map((_, idx) => (
              <ValidatableLinkInput
                key={idx}
                name={`${idx}`}
                onVerify={handleUrlVerify}
                onDelete={handleDelete}
                hasDelete={links.length > 1}
              />
            ))}
            {links.every((link) => link) && (
              <Button
                variant="tetiary"
                startContent={
                  <Icon name="icon-plus" className="text-regular-xl" />
                }
                onClick={() =>
                  setLinks((curr) => {
                    const links = [...curr]
                    links.push("")
                    return links
                  })
                }
                classNames={{ root: "w-fit p-2.5 px-6" }}
              >
                Add new
              </Button>
            )}
          </div>
        </div>
        <form action={action}>
          {links.map((url, idx) => (
            <input type="hidden" name="url" value={url} key={idx} readOnly />
          ))}
          <footer className="flex items-center justify-end p-5 border-t border-gray-50">
            <SubmitButton
              className="!py-3.5 px-4.5"
              classNames={{ label: "text-medium-sm" }}
              disabled={links.some((link) => !link)}
            >
              Add to knowledge base
            </SubmitButton>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default AddLink
