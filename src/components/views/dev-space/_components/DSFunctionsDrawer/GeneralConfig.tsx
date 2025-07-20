"use client"

import Button from "@/components/molecules/Buttons"
import { useValidation } from "@/hooks/formHooks"
import { generalConfigStep } from "@/lib/schemas/dev-space"
import { DSFunction, FC } from "@/utils/types"
import React, { useRef } from "react"
import {
  DSFunctionFields,
  extractParams,
  FUNCTION_METHODS_OPTIONS,
} from "../../utils"
import DSSelect from "../DSSelect"
import DSInput from "../DSInput"

type Props = {
  onFieldChange: (name: string, value: unknown) => void
  data: DSFunction
  goToNextStep: () => void
  updateLastDone: () => void
}

const GeneralConfig: FC<Props> = ({
  onFieldChange,
  data,
  goToNextStep,
  updateLastDone,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null)

  const { errors, touched, hasErrors, markFieldTouched } = useValidation(
    generalConfigStep,
    formRef
  )
  const handleSubmit = () => {
    const { urlParams, queryParams } = extractParams(data.endpoint_url)

    onFieldChange(
      DSFunctionFields.QUERY_PARAMS,
      queryParams.map((param) => {
        const oldParam = data.query_params?.find((p) => p.param === param.param)
        return oldParam || param
      })
    )
    onFieldChange(
      DSFunctionFields.URL_PARAMS,
      urlParams.map((param) => {
        const oldParam = data.url_params?.find((p) => p.param === param.param)
        return oldParam || param
      })
    )
    updateLastDone()
    goToNextStep()
  }

  const handleFieldChange = (name: string, value: unknown) => {
    onFieldChange(name, value)
    markFieldTouched(name)
  }

  return (
    <form ref={formRef} action={handleSubmit} className="h-full flex flex-col">
      <main className="px-5 grid gap-5 pb-8">
        <DSSelect
          label="Method"
          name={DSFunctionFields.METHOD}
          value={data[DSFunctionFields.METHOD]}
          errors={errors}
          touched={touched}
          onFieldChange={handleFieldChange}
          items={FUNCTION_METHODS_OPTIONS}
        />
        <DSInput
          name={DSFunctionFields.NAME}
          label="Function name"
          value={data[DSFunctionFields.NAME]}
          placeholder="Enter a function name"
          errors={errors}
          touched={touched}
          onFieldChange={handleFieldChange}
        />
        <DSInput
          name={DSFunctionFields.DESC}
          label="Function description"
          value={data[DSFunctionFields.DESC]}
          placeholder="Enter a function description"
          errors={errors}
          touched={touched}
          onFieldChange={handleFieldChange}
          multiline
          rows={4}
        />
        <DSInput
          name={DSFunctionFields.ENDPOINT}
          label="Endpoint URL"
          value={data[DSFunctionFields.ENDPOINT]}
          placeholder="https:api.example.com/user/{userId}/?type={userType}"
          errors={errors}
          touched={touched}
          onFieldChange={handleFieldChange}
        />
      </main>
      <footer className="flex items-center p-5 border-t border-gray-50 sticky left-0 right-0 z-1 bg-white bottom-0 mt-auto">
        <Button
          type="submit"
          size="xl"
          className="p-5 w-full"
          disabled={hasErrors}
        >
          Save & continue
        </Button>
      </footer>
    </form>
  )
}

export default GeneralConfig
