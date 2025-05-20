import Button from "@/components/molecules/Buttons"
import { DSFunction, FC } from "@/utils/types"
import React, { useMemo, useRef, useState } from "react"
import ParamInput from "./ParamInput"
import AppTabs from "@/components/molecules/Tabs"
import {
  DSFunctionFields,
  extractFieldName,
  generateParamSchema,
  ParamsProvidedBy,
} from "../../utils"
import { useParamsCodenames } from "@/hooks/api/devSpaceHooks"
import { copyObject } from "@/utils/helpers"
import { paramFieldSchema } from "@/lib/schemas/dev-space"
import { useValidation } from "@/hooks/formHooks"

type Props = {
  onFieldChange: (name: string, value: unknown) => void
  data: DSFunction
  goToNextStep: () => void
  updateLastDone: () => void
}

type ParamKeys = DSFunctionFields.URL_PARAMS | DSFunctionFields.QUERY_PARAMS

const ParametersConfig: FC<Props> = ({
  onFieldChange,
  data,
  goToNextStep,
  updateLastDone,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const { codenames, isFetching } = useParamsCodenames()

  const [activeTab, setActiveTab] = useState<ParamKeys>(
    DSFunctionFields.URL_PARAMS
  )
  const [inactiveTab, setInactiveTab] = useState<ParamKeys>(
    DSFunctionFields.QUERY_PARAMS
  )

  const { errors, touched, hasErrors, markFieldTouched } = useValidation(
    generateParamSchema(paramFieldSchema, {
      query_params: data.query_params?.length || 0,
      url_params: data.url_params?.length || 0,
    }),
    formRef
  )

  const { activeParams, inactiveParams } = useMemo(
    () => ({
      activeParams: data[activeTab],
      inactiveParams: data[inactiveTab],
    }),
    [data, activeTab, inactiveTab]
  )

  const handleSubmit = () => {
    updateLastDone()
    goToNextStep()
  }

  const handleFieldChange = (idx: number) => (name: string, value: unknown) => {
    const params = copyObject(activeParams)

    const actualFieldName = extractFieldName(name)

    if (!params) return
    let fieldsToReset = {}

    if (actualFieldName === "provided_by") {
      // if the field is provided_by, do some extra logic before commiting the change
      if (value === ParamsProvidedBy.EUSATE) {
        // code_name only should be set
        fieldsToReset = { value: undefined, function_arg: undefined }
      } else if (value === ParamsProvidedBy.ORGANISATION) {
        // value alone should be set
        fieldsToReset = { code_name: undefined, function_arg: undefined }
      } else {
        //function_arg alone should be set (to true)
        fieldsToReset = {
          code_name: undefined,
          value: undefined,
          function_arg: true,
        }
      }
    }

    params[idx] = {
      ...params[idx],
      [actualFieldName]: value,
      ...fieldsToReset,
    }

    markFieldTouched(name)

    onFieldChange(activeTab, params)
  }

  return (
    <form ref={formRef} action={handleSubmit} className="h-full flex flex-col">
      <main className="px-5 grid gap-5 pb-8">
        <AppTabs
          variant="solid"
          tabs={[
            {
              label: `URL(${data.url_params?.length || 0})`,
              key: DSFunctionFields.URL_PARAMS,
            },
            {
              label: `Query(${data.query_params?.length || 0})`,
              key: DSFunctionFields.QUERY_PARAMS,
            },
          ]}
          disableAnimation
          classNames={{
            tabList: "bg-gray-50 rounded-[100px] p-1.5 w-full",
            tab: "data-[selected=true]:bg-white p-2.5 min-h-9 min-w-32 rounded-[100px] w-1/2",
          }}
          onSelectionChange={(tab) => {
            setActiveTab(tab as ParamKeys)
            setInactiveTab(
              tab === DSFunctionFields.URL_PARAMS
                ? DSFunctionFields.QUERY_PARAMS
                : DSFunctionFields.URL_PARAMS
            )
          }}
        />
        {inactiveParams?.map((param, idx) =>
          Object.entries(param).map(
            ([name, value]) =>
              value !== undefined && (
                <input
                  name={`${inactiveTab}.${idx}.${name}`}
                  key={`${inactiveTab}.${idx}.${name}`}
                  value={value.toString()}
                  hidden
                  readOnly
                />
              )
          )
        )}
        {activeParams ? (
          <div className="flex flex-col gap-5">
            {activeParams.map((param, idx) => (
              <ParamInput
                key={`${activeTab}.${idx}`}
                param={param}
                nameSuffix={`${activeTab}.${idx}`}
                onFieldChange={handleFieldChange(idx)}
                codenames={codenames || []}
                loadingCodenames={isFetching}
                errors={errors}
                touched={touched}
              />
            ))}
          </div>
        ) : (
          <>No Params</>
        )}
      </main>
      <footer className="flex items-center p-5 border-t border-gray-50 sticky left-0 right-0 z-20 bg-white bottom-0 mt-auto">
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

export default ParametersConfig
