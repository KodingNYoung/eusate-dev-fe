"use client"

import { FC } from "@/utils/types"
import React, { useRef, useState } from "react"
import Input, { InputProps } from "../molecules/Inputs"
import Icon from "../atoms/Icon"
import Spinner from "../atoms/Spinner"
import SubmitButton from "../molecules/Buttons/SubmitButton"
import { cls } from "@/utils/helpers"
import { useValidation } from "@/hooks/formHooks"
import { validateUrlSchema } from "@/lib/schemas/knowledge-base"
import { useFormStatus } from "react-dom"
import { validateUrl } from "@/app/(organisation-routes)/(dashboard)/knowledge-base/actions"
import { toaster } from "../molecules/Toast"
import Button from "../molecules/Buttons"

type Props = InputProps & {
  onVerify: (url: string, name: string) => void
  onDelete?: (name: string) => void
  hasDelete?: boolean
}

const ValidatableLinkInput: FC<Props> = ({
  classNames,
  name,
  onDelete,
  onVerify,
  hasDelete,
  ...props
}) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [inputState, setInputState] = useState<"error" | "success">()

  const { errors, markFieldTouched } = useValidation(validateUrlSchema, formRef)

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
      // Request error, not url validation error, so show error
      toaster.error(response.error.message)
    }
  }

  return (
    <form
      className="flex items-end gap-3"
      action={handleFormAction}
      ref={formRef}
    >
      <LinkCustomInput
        name="url"
        startComponent={<Icon name="icon-link" className="!text-regular-xl" />}
        placeholder="https://"
        classNames={{ ...classNames, root: cls("flex-1", classNames?.root) }}
        isError={!!errors?.url || inputState === "error"}
        isSuccess={inputState === "success"}
        onChange={(e) => {
          markFieldTouched(e.currentTarget.name)
          onVerify("", name)
          setInputState(undefined)
        }}
        {...props}
      />
      {inputState !== "success" && (
        <SubmitButton
          className="py-4 px-6 mb-1.5"
          classNames={{ label: "!text-semibold-sm" }}
          variant="tetiary"
          hideLoader
          disabled={!!errors.url}
        >
          Validate
        </SubmitButton>
      )}
      {hasDelete && onDelete && (
        <Button
          className="border-none p-4.5 mb-1.5"
          variant="errorOutlined"
          onClick={() => onDelete(name)}
          startContent={
            <Icon name="icon-trash" size={20} className="text-error-500" />
          }
        />
      )}
    </form>
  )
}

const LinkCustomInput: FC<InputProps> = ({
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

export default ValidatableLinkInput
