"use client"

import { generateAPIKey } from "@/app/(organisation-routes)/(dashboard)/settings/actions"
import Icon from "@/components/atoms/Icon"
import AppSelect from "@/components/molecules/AppSelect"
import Button from "@/components/molecules/Buttons"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Input from "@/components/molecules/Inputs"
import { toaster } from "@/components/molecules/Toast"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { generateAPIKeySchema } from "@/lib/schemas/settings"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { copy } from "@/utils/helpers"
import { FC } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import React, { useCallback, useEffect, useRef } from "react"
import { useFormState } from "react-dom"

const GenerateAPIKeyForm: FC = () => {
  const queryClient = useQueryClient()
  const formRef = useRef<HTMLFormElement>(null)

  const { errors, touched, hasErrors, markFieldTouched } = useValidation(
    generateAPIKeySchema,
    formRef
  )

  const [state, action] = useFormState(generateAPIKey, {})

  useFormToast(state)

  const handleCopy = useCallback(() => {
    if ("success" in state) {
      copy(state.payload?.token || "")
      toaster.info("API key copied")
    }
  }, [state])

  useEffect(() => {
    if ("success" in state) {
      queryClient.invalidateQueries({
        queryKey: QUERY_FN_KEYS.API_KEYS,
      })
    }
  }, [queryClient, state])

  return (
    <form action={action} ref={formRef} className="relative">
      <main className="flex flex-col gap-5 p-5 py-10">
        <Input
          name="name"
          label="Name"
          placeholder="Enter a name for the API key"
          isError={touched.question && !!errors.question}
          helperText={touched.question ? errors.question : ""}
          onChange={(e) => markFieldTouched(e.currentTarget.name)}
        />
        <Input
          name="expiry_num"
          label="Expiry time"
          type="number"
          min={0}
          isError={touched.question && !!errors.question}
          helperText={touched.question ? errors.question : ""}
          onChange={(e) => markFieldTouched(e.currentTarget.name)}
          classNames={{ endContent: "w-[94px]", input: "pr-[110px] " }}
          endComponent={
            <AppSelect
              name="expiry_unit"
              defaultSelectedKeys={["hours"]}
              items={[
                { key: "seconds", label: "Seconds" },
                { key: "minutes", label: "Minutes" },
                { key: "hours", label: "Hours" },
                { key: "days", label: "Days" },
              ]}
              classNames={{
                trigger:
                  "bg-gray-50 !border-0 px-3 rounded-[100px] min-h-9 h-9",
                popoverContent: "p-0",
              }}
            />
          }
        />
        {"success" in state && (
          <div className="flex items-end gap-6">
            <Input
              label="API Key"
              startComponent={<Icon name="icon-key" size={20} />}
              name="key"
              classNames={{ root: "flex-1" }}
              value={state.payload?.token || ""}
              readOnly
            />
            <Button
              className="py-4 px-6 mb-1.5"
              startContent={<Icon name="icon-copy" size={20} />}
              variant="tetiary"
              onClick={handleCopy}
              classNames={{ root: "active:scale-0.95" }}
            >
              Copy
            </Button>
          </div>
        )}
      </main>
      {!("success" in state) && (
        <footer className="flex items-center justify-end p-5 border-t border-gray-50">
          <SubmitButton
            className="px-3.5 !py-2.5"
            classNames={{ label: "text-medium-sm" }}
            disabled={hasErrors}
          >
            Generate API Key
          </SubmitButton>
        </footer>
      )}
    </form>
  )
}

export default GenerateAPIKeyForm
