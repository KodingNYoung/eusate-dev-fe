import { addWebsites } from "@/app/(dashboard)/knowledge-base/actions"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Info from "@/components/molecules/Info"
import WebsiteInput from "@/components/organisms/WebsiteInput"
import { useFormToast } from "@/hooks/formHooks"
import { FC } from "@/utils/types"
import React, { useMemo, useState } from "react"
import { useFormState } from "react-dom"

const WebsiteModalForm: FC = () => {
  const [mainWebsite, setMainWebsite] = useState("")
  const [subdomains, setSubdomains] = useState<string[]>([])

  //   TODO: fetch user's website to know if it's edit or add

  const [state, action] = useFormState(addWebsites, {})

  useFormToast(state, true)

  const domain = useMemo(() => {
    if (mainWebsite) {
      try {
        const { hostname } = new URL(mainWebsite)
        const splitName = hostname.split(".").reverse()

        if (splitName.length >= 2) {
          return `${splitName[1]}.${splitName[0]}`
        }

        return hostname
      } catch {
        return undefined
      }
    }
  }, [mainWebsite])

  const handleUrlVerify = (url: string, name: string) => {
    if (name === "main_website") {
      setMainWebsite(url)
    } else {
      const newSubdomains = [...subdomains]
      const idx = parseInt(name)
      newSubdomains[idx] = url

      setSubdomains(newSubdomains)
    }
  }

  return (
    <div className="relative max-h-[60vh] overflow-y-auto custom-scrollbar ">
      <main className="p-5 flex flex-col gap-5">
        <Info
          title="NOTE"
          icon="icon-information-bold"
          description="Provide the main website URL first. You can then add supporting URLs from the same domain. This ensures all content comes from a single, trusted source. For example, if your main URL is 'https://example.com', supporting URLs should also be from 'example.com'."
        />
        <WebsiteInput name="main_website" onVerify={handleUrlVerify} />
        {mainWebsite ? (
          <section className="border border-gray-50 rounded-2xl p-4 flex flex-col gap-5">
            <header>
              <Typography
                as="h3"
                variant="regular-sm"
                className="text-gray-500"
              >
                Add other website URLs
              </Typography>
            </header>
            {subdomains.map((_, idx) => {
              // TODO: Ensure when delete functionality is implemented that the idx and values don't misplace
              return (
                <WebsiteInput
                  name={`${idx}`}
                  onVerify={handleUrlVerify}
                  key={idx}
                  domain={domain}
                />
              )
            })}
            <Button
              variant="outlined"
              startContent={
                <Icon name="icon-plus" className="text-regular-xl" />
              }
              onClick={() =>
                setSubdomains((curr) => {
                  const newSubdomains = [...curr]
                  newSubdomains.push("")
                  return newSubdomains
                })
              }
              classNames={{ label: "p-2.5" }}
            >
              Add new website
            </Button>
          </section>
        ) : null}
      </main>
      <form action={action} className="sticky bottom-0 z-1">
        <input type="hidden" name="main_website" value={mainWebsite} />
        {subdomains.map((subdomain, idx) => (
          <input type="hidden" name="subdomains" value={subdomain} key={idx} />
        ))}
        <footer className="flex items-center justify-end p-5 border-t border-gray-50 bg-white">
          <SubmitButton
            className="px-3.5 !py-2.5"
            classNames={{ label: "text-medium-sm" }}
            disabled={
              !mainWebsite || subdomains.some((subdomain) => !subdomain)
            }
          >
            Add to knowledge base
          </SubmitButton>
        </footer>
      </form>
    </div>
  )
}

export default WebsiteModalForm
