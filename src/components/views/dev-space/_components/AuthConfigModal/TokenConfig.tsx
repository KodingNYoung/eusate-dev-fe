import AppSelect from "@/components/molecules/AppSelect"
import { AuthConfig, FC, FormState } from "@/utils/types"
import React, { useEffect, useRef, useState } from "react"
import {
  AUTH_LOCATION_OPTIONS,
  AUTH_TYPES_OPTIONS,
  AuthConfigFields,
  AuthLocation,
  AuthType,
} from "../../utils"
import Input from "@/components/molecules/Inputs"
import AppAutocomplete from "@/components/molecules/AppAutocomplete"
import { useFormState } from "react-dom"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import {
  authConfigWithHeaderAuth,
  authConfigWithQueryAuth,
} from "@/lib/schemas/dev-space"
import { ZodTypeAny } from "zod"
import {
  addAuthConfig,
  updateAuthConfig,
} from "@/app/(dashboard)/dev-space/actions"
import { useModal } from "@/hooks/popupHooks"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_FN_KEYS } from "@/utils/constants"

type Props = {
  onFieldChange: (name: string, value: unknown) => void
  data: AuthConfig
  updateLastDone: () => void
  isAdd: boolean
  id?: string
}

const schemaMap = {
  [AuthLocation.QUERY]: authConfigWithQueryAuth,
  [AuthLocation.HEADER]: authConfigWithHeaderAuth,
}

const TokenConfig: FC<Props> = ({
  onFieldChange,
  data,
  updateLastDone,
  isAdd,
  id,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const { close } = useModal()
  const queryClient = useQueryClient()

  const [schema, setSchema] = useState<ZodTypeAny>(
    schemaMap[AuthLocation.HEADER]
  )

  const { errors, touched, hasErrors, markFieldTouched } = useValidation(
    schema,
    formRef
  )

  const [state, action] = useFormState<FormState, FormData>(
    isAdd ? addAuthConfig : updateAuthConfig,
    {}
  )

  useFormToast(state, true)

  useEffect(() => {
    if ("success" in state) {
      queryClient.invalidateQueries({ queryKey: QUERY_FN_KEYS.AUTH_CONFIG })
      updateLastDone()
      close()
    }
  }, [state, close, queryClient, updateLastDone])

  return (
    <form ref={formRef} action={action}>
      <main className="py-10 px-5 grid gap-5 w-full">
        {!isAdd && <input hidden readOnly name="id" value={id} />}
        <input
          hidden
          readOnly
          name={AuthConfigFields.LOGIN_URL}
          value={data[AuthConfigFields.LOGIN_URL]}
        />
        <AppSelect
          label="Authorization location"
          items={AUTH_LOCATION_OPTIONS}
          name={AuthConfigFields.AUTH_LOCATION}
          selectedKeys={[data[AuthConfigFields.AUTH_LOCATION]]}
          classNames={{
            base: "w-full",
            trigger: "rounded-[100px]",
          }}
          size="lg"
          isInvalid={
            touched[AuthConfigFields.AUTH_LOCATION] &&
            !!errors[AuthConfigFields.AUTH_LOCATION]
          }
          errorMessage={
            touched[AuthConfigFields.AUTH_LOCATION]
              ? errors[AuthConfigFields.AUTH_LOCATION]
              : ""
          }
          onChange={(e) => {
            onFieldChange(AuthConfigFields.AUTH_TYPE, AuthType.API_KEY)
            onFieldChange(AuthConfigFields.AUTH_LOCATION, e.target.value)
            markFieldTouched(e.target.name)
            setSchema(schemaMap[e.target.value as AuthLocation])
          }}
          placeholder="Choose an option"
        />
        <AppSelect
          label="Authorization type"
          items={AUTH_TYPES_OPTIONS[data[AuthConfigFields.AUTH_LOCATION]] || []}
          name={AuthConfigFields.AUTH_TYPE}
          selectedKeys={[data[AuthConfigFields.AUTH_TYPE]]}
          classNames={{
            base: "w-full",
            trigger: "rounded-[100px]",
          }}
          size="lg"
          isInvalid={
            touched[AuthConfigFields.AUTH_TYPE] &&
            !!errors[AuthConfigFields.AUTH_TYPE]
          }
          errorMessage={
            touched[AuthConfigFields.AUTH_TYPE]
              ? errors[AuthConfigFields.AUTH_TYPE]
              : ""
          }
          onChange={(e) => {
            onFieldChange(AuthConfigFields.AUTH_TYPE, e.target.value)
            markFieldTouched(e.target.name)
          }}
          placeholder="Choose an option"
        />
        {data[AuthConfigFields.AUTH_LOCATION] === AuthLocation.QUERY ? (
          <Input
            name={AuthConfigFields.QUERY_NAME}
            label="Query name"
            value={data[AuthConfigFields.QUERY_NAME]}
            placeholder="Enter a query name"
            isError={
              touched[AuthConfigFields.QUERY_NAME] &&
              !!errors[AuthConfigFields.QUERY_NAME]
            }
            helperText={
              touched[AuthConfigFields.QUERY_NAME]
                ? errors[AuthConfigFields.QUERY_NAME]
                : ""
            }
            onChange={(e) => {
              onFieldChange(e.currentTarget.name, e.currentTarget.value)

              markFieldTouched(e.currentTarget.name)
            }}
          />
        ) : (
          <>
            <AppAutocomplete
              label="Header label"
              name={AuthConfigFields.HEADER_NAME}
              placeholder="Enter your header label"
              isInvalid={
                touched[AuthConfigFields.HEADER_NAME] &&
                !!errors[AuthConfigFields.HEADER_NAME]
              }
              errorMessage={
                touched[AuthConfigFields.HEADER_NAME]
                  ? errors[AuthConfigFields.HEADER_NAME]
                  : ""
              }
              onInputChange={(value) => {
                onFieldChange(AuthConfigFields.HEADER_NAME, value)
                markFieldTouched(AuthConfigFields.HEADER_NAME)
              }}
              onSelectionChange={(value) => {
                onFieldChange(AuthConfigFields.HEADER_NAME, value)
                markFieldTouched(AuthConfigFields.HEADER_NAME)
              }}
              inputValue={data[AuthConfigFields.HEADER_NAME]}
              items={[
                { label: "X-API-KEY", key: "X-API-KEY" },
                { label: "Authorization", key: "Authorization" },
              ]}
              inputProps={{
                classNames: { inputWrapper: "rounded-[100px]" },
              }}
            />
            <AppAutocomplete
              label="Header value"
              name={AuthConfigFields.HEADER_VALUE}
              placeholder="Enter your header value"
              labelPlacement="outside"
              isInvalid={
                touched[AuthConfigFields.HEADER_VALUE] &&
                !!errors[AuthConfigFields.HEADER_VALUE]
              }
              errorMessage={
                touched[AuthConfigFields.HEADER_VALUE]
                  ? errors[AuthConfigFields.HEADER_VALUE]
                  : ""
              }
              onInputChange={(value) => {
                onFieldChange(AuthConfigFields.HEADER_VALUE, value)
                markFieldTouched(AuthConfigFields.HEADER_VALUE)
              }}
              onSelectionChange={(value) => {
                onFieldChange(AuthConfigFields.HEADER_VALUE, value)
                markFieldTouched(AuthConfigFields.HEADER_VALUE)
              }}
              inputValue={data[AuthConfigFields.HEADER_VALUE]}
              items={[
                { label: "{token}", key: "{token}" },
                { label: "Bearer {token}", key: "Bearer {token}" },
                { label: "Basic {token}", key: "Basic {token}" },
                { label: "ApiKey {token}", key: "ApiKey {token}" },
              ]}
              inputProps={{ classNames: { inputWrapper: "rounded-[100px]" } }}
            />
          </>
        )}
      </main>
      <footer className="flex items-center justify-end p-5 border-t border-gray-50 absolute left-0 right-0 z-1 bg-white bottom-0">
        <SubmitButton
          className="px-3.5 !py-2.5"
          classNames={{ label: "text-medium-sm" }}
          disabled={hasErrors}
        >
          {isAdd ? `Save & finish` : "Update"}
        </SubmitButton>
      </footer>
    </form>
  )
}
export default TokenConfig
