"use client"

import Button from "@/components/molecules/Buttons"
import Input from "@/components/molecules/Inputs"
import AppToastContent from "@/components/molecules/Toast/ToastContent"
import { useValidation } from "@/hooks/formHooks"
import { authConfigStep1 } from "@/lib/schemas/dev-space"
import { AuthConfig, FC } from "@/utils/types"
import React, { useRef, useState } from "react"
import { useFormState } from "react-dom"

type Props = {
  onFieldChange: (name: string, value: unknown) => void
  data: AuthConfig
  goToNextStep: () => void
  updateLastDone: () => void
}

const LoginUrlConfig: FC<Props> = ({
  onFieldChange,
  data,
  goToNextStep,
  updateLastDone,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null)

  const [infoVisible, setInfoVisible] = useState(true)

  const { errors, touched, hasErrors, markFieldTouched } = useValidation(
    authConfigStep1,
    formRef
  )
  const formState = useFormState(() => {
    updateLastDone()
    goToNextStep()
  }, undefined)

  return (
    <form ref={formRef} action={formState[1]} className="h-full flex flex-col">
      <main className="px-5 grid gap-5 pb-8">
        {infoVisible && (
          <AppToastContent
            type="info"
            variant="outlined"
            icon="icon-warning-2-bold"
            title="Read our documentation"
            subtitle="Explore our documentation to learn how to add your login endpoint URL to the authentication settings for secure user access! Learn more"
            hide={() => setInfoVisible(false)}
            classNames={{ root: "!my-0" }}
          />
        )}
        <Input
          name="login_url"
          label="Login Endpoint URL"
          placeholder="Enter a name for the API key"
          isError={touched.login_url && !!errors.login_url}
          helperText={touched.login_url ? errors.login_url : ""}
          onChange={(e) => {
            const { name, value } = e.currentTarget
            onFieldChange(name, value)
            markFieldTouched(name)
          }}
          value={data.login_url}
          classNames={{ label: "mb-2 mx-2" }}
        />
      </main>
      <footer className="flex items-center justify-end p-5 border-t border-gray-50 sticky left-0 right-0 z-1 bg-white bottom-0 mt-auto">
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

export default LoginUrlConfig
