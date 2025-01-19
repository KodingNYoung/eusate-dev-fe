"use client"

import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import Checkbox from "@/components/molecules/Checkbox"
import Dropdown from "@/components/molecules/Popups/Dropdown"
import React from "react"

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
  // const apply = (formdata: FormData) => {
  //   const data = Object.fromEntries(formdata)

  //   // process payload
  //   const payload: { [key: string]: string[] } = {}
  //   for (const name in data) {
  //     const [key, value] = name.split("-")
  //     if (key in payload) {
  //       payload[key].push(value)
  //     } else {
  //       payload[key] = [value]
  //     }
  //   }

  //   // set to url

  //   // close drawer
  //   close()
  // }
  // const reset = () => {
  //   // set url to empty
  //   // close drawer
  //   close()
  // }

  return (
    <Dropdown
      trigger={
        <Button
          variant="tetiary"
          endContent={<Icon name="icon-sort" className="text-regular-xl" />}
          classNames={{
            label: "text-medium-sm hidden sm:inline",
            root: "p-2 sm:px-3 sm:py-2 border-0 sm:border",
          }}
        >
          Filter
        </Button>
      }
      classNames={{
        content: "bg-white mr-3 mt-2 min-w-[212px] max-h-[400px] overflow-auto",
      }}
    >
      <header className="flex items-center justify-between border-b border-gray-50 p-3 w-full">
        <Typography variant="semibold-xs" className="text-gray-700">
          Filter
        </Typography>
      </header>
      <div className="p-2 flex flex-col gap-3 w-full">
        {filters.map((section) => {
          return (
            <section
              className="border border-gray-50 rounded-lg p-2 flex flex-col"
              key={section.key}
            >
              <Typography variant="semibold-xxs" className="text-gray-700 mb-3">
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
  )
}

export default FilterDropdown
