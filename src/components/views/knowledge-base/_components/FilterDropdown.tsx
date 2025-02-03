"use client"

import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import Checkbox from "@/components/molecules/Checkbox"
import AppPopover from "@/components/molecules/Popups/AppPopover"
import { useQueryParams } from "@/hooks/utilityHooks"
import React from "react"
import { INIT_PAGE_PARAMS, KB_QUERY_KEYS } from "../utils"
import { KnowledgeSourceTags } from "@/utils/enums"

const filters = [
  {
    label: "Source",
    key: KB_QUERY_KEYS.PRIVACY,
    options: [{ value: "internal", label: "Internal only", default: false }],
  },
  {
    label: "Content type",
    key: KB_QUERY_KEYS.TAGS,
    options: [
      { value: KnowledgeSourceTags.DOCUMENT, label: "File", default: true },
      { value: KnowledgeSourceTags.WEBSITE, label: "Website", default: true },
      { value: KnowledgeSourceTags.ARTICLE, label: "Article", default: true },
      { value: KnowledgeSourceTags.FAQ, label: "FAQs", default: true },
    ],
  },
]

const FilterDropdown = () => {
  const { batchSet, get } = useQueryParams()

  return (
    <AppPopover
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
            <form
              className="border border-gray-50 rounded-lg p-2 flex flex-col"
              key={section.key}
              action={(formdata) =>
                batchSet([
                  {
                    key: section.key,
                    value: formdata.getAll(section.key).join(",") || null,
                  },
                  INIT_PAGE_PARAMS,
                ])
              }
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
                    value={option.value}
                    key={option.value}
                    onChange={(e) => e.currentTarget.form?.requestSubmit()}
                    checked={
                      get(section.key)
                        ? Boolean(
                            get(section.key)?.split(",").includes(option.value)
                          )
                        : option.default
                    }
                  >
                    {option.label}
                  </Checkbox>
                )
              })}
            </form>
          )
        })}
      </div>
    </AppPopover>
  )
}

export default FilterDropdown
