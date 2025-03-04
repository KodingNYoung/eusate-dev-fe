import { DSFunction, FC, FormState } from "@/utils/types"
import React, { useEffect } from "react"
import {
  FUNCTION_AUTH_OPTIONS,
  FUNCTION_USAGE_STATUS_OPTIONS,
  FunctionStatus,
} from "../../utils"
import UsageRadio from "./UsageRadio"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useModal } from "@/hooks/popupHooks"
import { useQueryClient } from "@tanstack/react-query"
import { useFormState } from "react-dom"
import {
  addFunction,
  updateFunction,
} from "@/app/(dashboard)/dev-space/actions"
import Typography from "@/components/atoms/Typography"
import { useAuthConfig } from "@/hooks/devSpaceHooks"
import { QUERY_FN_KEYS } from "@/utils/constants"
import Spinner from "@/components/atoms/Spinner"

type Props = {
  onFieldChange: (name: string, value: unknown) => void
  data: DSFunction
  updateLastDone: () => void
  isAdd: boolean
  id: string
}

const UsageConfig: FC<Props> = ({
  onFieldChange,
  data,
  updateLastDone,
  isAdd,
  id,
}) => {
  const { configs, isLoading } = useAuthConfig()

  const { close } = useModal()
  const queryClient = useQueryClient()

  const [state, action] = useFormState<FormState, FormData>((state) => {
    if (isAdd) {
      return addFunction(state, data)
    } else {
      return updateFunction(state, { id, ...data })
    }
  }, {})

  useEffect(() => {
    if ("success" in state) {
      queryClient.invalidateQueries({
        queryKey: QUERY_FN_KEYS.DEV_SPACE_FUNCTIONS,
      })
      updateLastDone()
      close()
    }
  }, [state, close, queryClient, updateLastDone])

  return (
    <form action={action} className="h-full flex flex-col">
      <main className="px-5 w-full flex flex-col gap-6 pb-8">
        <section className="bg-gray-50 border border-gray-50 rounded-xl">
          <header className="px-5 py-3">
            <Typography variant="medium-sm" className="text-gray-90">
              How should this function be used?
            </Typography>
          </header>
          <div className="flex flex-col gap-5 p-5 bg-white rounded-xl">
            {FUNCTION_USAGE_STATUS_OPTIONS.map((status) => (
              <UsageRadio
                key={status.value}
                name="status"
                onChange={(e) =>
                  onFieldChange(e.currentTarget.name, e.currentTarget.value)
                }
                defaultChecked={
                  status.value === (data.status || FunctionStatus.DEV)
                }
                {...status}
              />
            ))}
          </div>
        </section>
        <section className="bg-gray-50 border border-gray-50 rounded-xl">
          <header className="px-5 py-3 flex items-center justify-between">
            <Typography variant="medium-sm" className="text-gray-90">
              Should this function be authenticated?
            </Typography>
            {isLoading && <Spinner />}
          </header>
          <div className="flex flex-col gap-5 p-5 bg-white rounded-xl">
            {FUNCTION_AUTH_OPTIONS.map((option, idx) => {
              const value = idx === 0 ? "" : configs?.[0]?.id
              const checked = value === data.auth_config_id
              return (
                <UsageRadio
                  key={idx}
                  value={idx === 0 ? "" : configs?.[0]?.id || ""}
                  name="auth_config_id"
                  onChange={(e) =>
                    onFieldChange(e.currentTarget.name, e.currentTarget.value)
                  }
                  defaultChecked={checked}
                  disabled={value === undefined || isLoading}
                  loading={isLoading}
                  {...option}
                />
              )
            })}
          </div>
        </section>
      </main>
      <footer className="flex items-center p-5 border-t border-gray-50 sticky left-0 right-0 z-20 bg-white bottom-0 mt-auto">
        <SubmitButton className="p-5 w-full" size="xl">
          {isAdd ? `Save & finish` : "Update"}
        </SubmitButton>
      </footer>
    </form>
  )
}

export default UsageConfig
