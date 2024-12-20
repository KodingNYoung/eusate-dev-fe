import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import Info from "@/components/molecules/Info"
import Toast from "@/components/organisms/Toast"
import WebsiteInput from "@/components/organisms/WebsiteInput"
import ToastContextProvider from "@/providers/toastProviders"
import { FC } from "@/utils/types"
import React, { useMemo, useState } from "react"

const WebsiteModalForm: FC = () => {
  const [mainWebsite, setMainWebsite] = useState("")
  const [subdomains, setSubdomains] = useState([""])

  const domain = useMemo(() => {
    if (mainWebsite) {
      try {
        const { hostname } = new URL(mainWebsite)
        const splitName = hostname.split(".").reverse()

        if (splitName.length >= 2) {
          return `${splitName[1]}.${splitName[0]}`
        }

        return hostname
      } catch (error) {
        return undefined
      }
    }
  }, [mainWebsite])

  console.log(domain)

  const handleUrlVerify = (url: string, name: string) => {
    if (name === "main_website") {
      setMainWebsite(url)
      setSubdomains([""])
    } else {
      const newSubdomains = [...subdomains]
      const idx = parseInt(name)
      newSubdomains[idx] = url

      setSubdomains(newSubdomains)
    }
  }

  return (
    <ToastContextProvider>
      <div className="relative">
        <div className="absolute w-full px-5">
          {/* <Toast /> */}
        </div>
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
        <form action={(formdata) => console.log(Object.fromEntries(formdata))}>
          <input type="hidden" name="main_website" value={mainWebsite} />
          <footer className="flex items-center justify-end p-5 border-t border-gray-50">
            <Button
              type="submit"
              className="px-3.5 !py-2.5"
              classNames={{ label: "text-medium-sm" }}
              //   disabled={!touched.tag || hasErrors}
            >
              Add to knowledge base
            </Button>
          </footer>
        </form>
      </div>
    </ToastContextProvider>
  )
}

export default WebsiteModalForm
