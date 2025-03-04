import { useFormData, useFormSteps } from "@/hooks/formHooks"
import { DevSpaceFunctionsResponse } from "@/lib/data/dev-space"
import { FC } from "@/utils/types"
import React from "react"
import { DS_FUNCTION_STEPS, FunctionMethods, FunctionStatus } from "../../utils"
import DevSpaceModalStep from "../DevSpaceModalStep"
import GeneralConfig from "./GeneralConfig"
import ParametersConfig from "./ParametersConfig"
import UsageConfig from "./UsageConfig"
import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"

type Props = {
  isAdd: boolean
  func: DevSpaceFunctionsResponse
}

const FunctionFormSections: FC<Props> = ({ isAdd, func }) => {
  const { activeStep, lastDoneStep, goToStep, updateLastDone, goToNextStep } =
    useFormSteps(DS_FUNCTION_STEPS)
  const { data, handleFieldChange } = useFormData({
    name: func.name || "",
    description: func.description || "",
    method: func.method || FunctionMethods.GET,
    endpoint_url: func.endpoint_url || "",
    url_params: func.url_params || [],
    query_params: func.query_params || [],
    status: func.status || FunctionStatus.DEV,
    auth_config_id: func.auth_config || "",
  })
  return (
    <main className="relative flex flex-col gap-5 flex-1 pt-8 overflow-y-auto">
      <section
        className={cls(
          "flex items-center px-5",
          DS_FUNCTION_STEPS.length <= 3 && "w-1/2"
        )}
      >
        {DS_FUNCTION_STEPS.map((_, idx) => {
          const isDone = idx <= lastDoneStep
          return (
            <DevSpaceModalStep
              sn={idx + 1}
              key={idx}
              isLast={idx === DS_FUNCTION_STEPS.length - 1}
              isActive={idx === activeStep}
              isDone={isDone}
              onSelect={isDone ? () => goToStep(idx) : undefined}
            />
          )
        })}
      </section>
      <section className="px-5 grid gap-2">
        <Typography variant="regular-sm" className="text-gray-700">
          Step {activeStep + 1}
        </Typography>
        <Typography variant="semibold-xl" className="text-gray">
          {DS_FUNCTION_STEPS[activeStep]}
        </Typography>
      </section>
      <section className="flex-1">
        {activeStep === 0 && (
          <GeneralConfig
            onFieldChange={handleFieldChange}
            data={data}
            updateLastDone={updateLastDone}
            goToNextStep={goToNextStep}
          />
        )}
        {activeStep === 1 && (
          <ParametersConfig
            onFieldChange={handleFieldChange}
            data={data}
            updateLastDone={updateLastDone}
            goToNextStep={goToNextStep}
          />
        )}
        {activeStep === 2 && (
          <UsageConfig
            onFieldChange={handleFieldChange}
            data={data}
            updateLastDone={updateLastDone}
            isAdd={isAdd}
            id={func.id}
          />
        )}
      </section>
    </main>
  )
}

export default FunctionFormSections
