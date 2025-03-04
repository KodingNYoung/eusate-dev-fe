"use client"

import { FC } from "@/utils/types"
import React from "react"
import { AUTH_CONFIG_STEPS, AuthLocation, AuthType } from "../../utils"
import DevSpaceModalStep from "../DevSpaceModalStep"
import LoginUrlConfig from "./LoginUrlConfig"
import TokenConfig from "./TokenConfig"
import { AuthConfigurationResponse } from "@/lib/data/dev-space"
import { useFormData, useFormSteps } from "@/hooks/formHooks"
import { cls } from "@/utils/helpers"
import Typography from "@/components/atoms/Typography"

type Props = {
  config: AuthConfigurationResponse
  isAdd: boolean
}

const AuthConfigForm: FC<Props> = ({ config, isAdd }) => {
  const { activeStep, lastDoneStep, goToStep, updateLastDone, goToNextStep } =
    useFormSteps(AUTH_CONFIG_STEPS)
  const { data, handleFieldChange } = useFormData({
    login_url: config.login_url || "",
    auth_location: config.auth_location || AuthLocation.HEADER,
    auth_type: config.auth_type || AuthType.API_KEY,
    query_name: config.query_name || "",
    header_name: config.header_name || "",
    header_value: config.header_value || "",
  })

  return (
    <main className="relative flex flex-col gap-5 flex-1 pt-8 overflow-y-auto">
      <section
        className={cls(
          "flex items-center px-5",
          AUTH_CONFIG_STEPS.length <= 3 && "w-1/2"
        )}
      >
        {AUTH_CONFIG_STEPS.map((step, idx) => {
          const isDone = idx <= lastDoneStep
          return (
            <DevSpaceModalStep
              sn={idx + 1}
              key={idx}
              isLast={idx === AUTH_CONFIG_STEPS.length - 1}
              isActive={idx === activeStep}
              isDone={isDone}
              onSelect={isDone ? () => goToStep(idx) : undefined}
            >
              {step}
            </DevSpaceModalStep>
          )
        })}
      </section>
      <section className="px-5 grid gap-2">
        <Typography variant="regular-sm" className="text-gray-700">
          Step {activeStep + 1}
        </Typography>
        <Typography variant="semibold-xl" className="text-gray">
          {AUTH_CONFIG_STEPS[activeStep]}
        </Typography>
      </section>
      <section className="flex-1">
        {activeStep === 0 && (
          <LoginUrlConfig
            onFieldChange={handleFieldChange}
            data={data}
            goToNextStep={goToNextStep}
            updateLastDone={updateLastDone}
          />
        )}
        {activeStep === 1 && (
          <TokenConfig
            onFieldChange={handleFieldChange}
            data={data}
            updateLastDone={updateLastDone}
            isAdd={isAdd}
            id={config.id}
          />
        )}
      </section>
    </main>
  )
}

export default AuthConfigForm
