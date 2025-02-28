"use client"

import { AuthConfig, FC } from "@/utils/types"
import React, { useCallback, useState } from "react"
import { AUTH_CONFIG_STEPS, AuthLocation, AuthType } from "../../utils"
import DevSpaceModalStep from "../DevSpaceModalStep"
import LoginUrlConfig from "./LoginUrlConfig"
import TokenConfig from "./TokenConfig"
import { AuthConfigurationResponse } from "@/lib/data/dev-space"

type Props = {
  config: AuthConfigurationResponse
  isAdd: boolean
}

const AuthConfigForm: FC<Props> = ({ config, isAdd }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [lastDoneStep, setLastDoneStep] = useState<number>(-1)
  const [data, setData] = useState<Omit<AuthConfig, "organisation_id">>({
    login_url: config.login_url || "",
    auth_location: config.auth_location || AuthLocation.HEADER,
    auth_type: config.auth_type || AuthType.API_KEY,
    query_name: config.query_name || "",
    header_name: config.header_name || "",
    header_value: config.header_value || "",
  })

  const handleFieldChange = (name: string, value: unknown) => {
    setData((curr = {} as AuthConfig) => ({ ...curr, [name]: value }))
  }

  const updateLastDone = useCallback(() => {
    if (lastDoneStep < activeStep) {
      setLastDoneStep(activeStep)
    }
  }, [lastDoneStep, activeStep])
  const goToNextStep = () => setActiveStep((curr) => curr + 1)

  return (
    <div className="relative pb-20">
      <main className="flex">
        <aside className="w-fit max-h-[400px] h-full mr-2.5 px-5 py-10 grid">
          {AUTH_CONFIG_STEPS.map((step, idx) => {
            const isDone = idx <= lastDoneStep
            return (
              <DevSpaceModalStep
                sn={idx + 1}
                key={idx}
                isLast={idx === AUTH_CONFIG_STEPS.length - 1}
                isActive={idx === activeStep}
                isDone={isDone}
                onSelect={isDone ? () => setActiveStep(idx) : undefined}
              >
                {step}
              </DevSpaceModalStep>
            )
          })}
        </aside>
        <section className="h-[400px] max-h-[50vh] overflow-y-auto border-l border-gray-50 pl-2.5 flex-1">
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
    </div>
  )
}

export default AuthConfigForm
