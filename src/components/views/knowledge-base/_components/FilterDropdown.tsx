"use client"

import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import Checkbox from "@/components/molecules/Checkbox"
import BottomDrawer from "@/components/molecules/Popups/BottomDrawer"
import Dropdown from "@/components/molecules/Popups/Dropdown"
import React, { useState } from "react"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"

const filters = [
  {
    label: "Source",
    key: "source",
    options: [{ value: "internal", label: "Internal only" }],
  },
  {
    label: "Content type",
    key: "tag",
    options: [
      { value: "pdf", label: "PDF" },
      { value: "website", label: "Website" },
      { value: "article", label: "Article" },
      { value: "faqs", label: "FAQs" },
    ],
  },
]

const FilterDropdown = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  const close = () => setAnchor(null)

  const apply = (formdata: FormData) => {
    const data = Object.fromEntries(formdata)

    // process payload
    const payload: { [key: string]: string[] } = {}
    for (let name in data) {
      const [key, value] = name.split("-")
      if (key in payload) {
        payload[key].push(value)
      } else {
        payload[key] = [value]
      }
    }

    // set to url

    // close drawer
    close()
  }
  const reset = () => {
    // set url to empty
    // close drawer
    close()
  }

  return (
    <>
      <Button
        variant="tetiary"
        onClick={(e) => setAnchor(e.currentTarget)}
        endContent={<Icon name="icon-sort" className="text-regular-xl" />}
        classNames={{
          label: "text-medium-sm hidden sm:inline",
          root: "p-2 sm:px-3 sm:py-2 border-0 sm:border",
        }}
      >
        Filter
      </Button>
      <Dropdown
        anchorEl={anchor}
        isOpen={Boolean(anchor)}
        close={close}
        classNames={{
          root: "hidden sm:block",
          menuContent:
            "bg-white mr-3 mt-2 min-w-[212px] max-h-[400px] overflow-auto",
        }}
      >
        <header className="flex items-center justify-between border-b border-gray-50 p-3">
          <Typography variant="semibold-xs" className="text-gray-700">
            Filter
          </Typography>
        </header>
        <div className="p-2 flex flex-col gap-3">
          {filters.map((section) => {
            return (
              <section
                className="border border-gray-50 rounded-lg p-2 flex flex-col"
                key={section.key}
              >
                <Typography
                  variant="semibold-xxs"
                  className="text-gray-700 mb-3"
                >
                  {section.label}
                </Typography>
                {section.options.map((option) => {
                  return (
                    <Checkbox
                      classNames={{
                        root: "flex-row-reverse justify-between p-3",
                      }}
                      name={section.key}
                      id={option.value}
                      value={option.value}
                      key={option.value}
                      onChange={(e) => console.log(e.currentTarget.value)}
                    >
                      {option.label}
                    </Checkbox>
                  )
                })}
              </section>
            )
          })}
        </div>
      </Dropdown>
      <BottomDrawer isOpen={Boolean(anchor)} close={close} title="Filter">
        <form action={apply}>
          <main className="flex flex-col gap-6 px-4 py-3">
            {filters.map((section) => (
              <section key={section.key}>
                <Typography
                  variant="semibold-sm"
                  className="text-gray-300 mb-3 px-3"
                >
                  {section.label}
                </Typography>
                <div className="border border-gray-50 p-3 rounded-xl flex flex-col gap-2">
                  {section.options.map((option) => (
                    <Checkbox
                      classNames={{
                        root: "flex-row-reverse justify-between p-3 has-[:checked]:bg-gray-25",
                        label: "!text-medium-sm peer-[:checked]:text-gray-900",
                      }}
                      name={`${section.key}-${option.value}`}
                      id={option.value + "-sm"}
                      key={option.value}
                    >
                      {option.label}
                    </Checkbox>
                  ))}
                </div>
              </section>
            ))}
          </main>
          <footer className="pt-3 pb-6 px-4 grid grid-cols-2 gap-2">
            <Button
              variant="tetiary"
              classNames={{
                root: "sm-gradient py-4.5",
                label: "text-semibold-sm",
              }}
              onClick={reset}
            >
              Reset
            </Button>
            <SubmitButton
              classNames={{
                root: "sm-gradient py-4.5",
                label: "text-semibold-sm",
              }}
            >
              Apply
            </SubmitButton>
          </footer>
        </form>
      </BottomDrawer>
    </>
  )
}

export default FilterDropdown
