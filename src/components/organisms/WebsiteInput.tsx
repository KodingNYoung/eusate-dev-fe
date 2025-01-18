"use client"

import { FC } from "@/utils/types"
import React, { useRef, useState } from "react"
import Input, { InputProps } from "../molecules/Inputs"
import Icon from "../atoms/Icon"
import Spinner from "../atoms/Spinner"
import SubmitButton from "../molecules/Buttons/SubmitButton"
import { cls } from "@/utils/helpers"
import { useValidation } from "@/hooks/formHooks"
import {
  validateSubdomainUrlSchema,
  validateUrlSchema,
} from "@/lib/schemas/knowledge-base"
import { useFormStatus } from "react-dom"
import { validateUrl } from "@/app/(dashboard)/knowledge-base/actions"
import { useToast } from "@/providers/toastProviders"

type Props = InputProps & {
  onVerify: (url: string, name: string) => void
  domain?: string
}

const WebsiteInput: FC<Props> = ({
  classNames,
  name,
  domain,
  onVerify,
  ...props
}) => {
  const formRef = useRef<HTMLFormElement>(null)
  const toast = useToast()
  const [inputState, setInputState] = useState<"error" | "success">()

  const { errors, validate, markFieldTouched } = useValidation(
    domain ? validateSubdomainUrlSchema(domain) : validateUrlSchema,
    formRef
  )

  const handleFormAction = async (formdata: FormData) => {
    const response = await validateUrl(formdata)

    if ("success" in response) {
      if (response.payload?.valid) {
        onVerify(formdata.get("url") as string, name)
        setInputState("success")
      } else {
        setInputState("error")
      }
    }

    if ("error" in response) {
      // Request error, not url validation error, so show error toast
      toast.show(response.error.message, { type: "error" })
    }
  }

  return (
    <form
      className="flex items-end gap-5"
      action={handleFormAction}
      ref={formRef}
    >
      <WebsiteCustomInput
        name="url"
        startComponent={<Icon name="icon-link" className="!text-regular-xl" />}
        placeholder="https://"
        classNames={{ ...classNames, root: cls("flex-1", classNames?.root) }}
        isError={!!errors?.url || inputState === "error"}
        isSuccess={inputState === "success"}
        onChange={(e) => {
          validate(e.currentTarget.name)
          onVerify("", name)
          setInputState(undefined)
        }}
        onBlur={(e) => markFieldTouched(e.currentTarget.name)}
        {...props}
      />
      <SubmitButton
        className="py-4 px-6 mb-1.5"
        classNames={{ label: "!text-semibold-sm" }}
        variant="tetiary"
        hideLoader
      >
        Validate
      </SubmitButton>
    </form>
  )
}

const WebsiteCustomInput: FC<InputProps> = ({
  endComponent,
  isError,
  isSuccess,
  ...props
}) => {
  const { pending } = useFormStatus()
  return (
    <Input
      endComponent={pending ? <Spinner /> : endComponent}
      isError={!pending && isError}
      isSuccess={!pending && isSuccess}
      {...props}
    />
  )
}

export default WebsiteInput
