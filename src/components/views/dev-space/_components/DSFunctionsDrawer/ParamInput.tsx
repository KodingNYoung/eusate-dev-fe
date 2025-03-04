import Typography from "@/components/atoms/Typography"
import { DevSpaceFunctionParam, FC } from "@/utils/types"
import React from "react"
import {
  PARAMS_PROVIDED_BY_OPTIONS,
  PARAMS_TYPE_OPTIONS,
  ParamsProvidedBy,
} from "../../utils"
import DSInput from "../DSInput"
import DSSelect from "../DSSelect"

type Props = {
  param: DevSpaceFunctionParam
  codenames: string[]
  loadingCodenames: boolean
  nameSuffix: string
  errors: Record<string, string>
  touched: Record<string, boolean>
  onFieldChange: (name: string, value: unknown) => void
}

const ParamInput: FC<Props> = ({
  param,
  codenames,
  loadingCodenames,
  errors,
  touched,
  onFieldChange,
  nameSuffix,
}) => {
  return (
    <div className="border border-gray-50 rounded-xl ">
      <Typography className="text-medium-sm text-gray-400 bg-gray-50 px-5 py-3 rounded-t-xl">
        {param.param}
      </Typography>
      <div className="grid gap-2 mt-5 px-5 pb-3">
        <input
          name={`${nameSuffix}.param`}
          value={param.param}
          readOnly
          hidden
        />
        <DSInput
          name={`${nameSuffix}.description`}
          label="Description"
          value={param.description}
          placeholder="Description"
          errors={errors}
          touched={touched}
          onFieldChange={onFieldChange}
          multiline
          rows={2}
        />
        <DSSelect
          label="Type"
          name={`${nameSuffix}.type`}
          value={param.type}
          errors={errors}
          touched={touched}
          items={PARAMS_TYPE_OPTIONS}
          onFieldChange={onFieldChange}
        />
        <DSSelect
          label="Who will provide this parameter?"
          name={`${nameSuffix}.provided_by`}
          value={param.provided_by}
          errors={errors}
          touched={touched}
          items={PARAMS_PROVIDED_BY_OPTIONS}
          onFieldChange={onFieldChange}
        />
        {param.provided_by === ParamsProvidedBy.EUSATE && (
          <DSSelect
            label="Codename"
            name={`${nameSuffix}.code_name`}
            value={param.code_name || ""}
            errors={errors}
            touched={touched}
            items={codenames.map((codename) => ({
              key: codename,
              label: codename,
            }))}
            onFieldChange={onFieldChange}
            placeholder="Choose a codename that matches the description of this param"
            isLoading={loadingCodenames}
          />
        )}
        {param.provided_by === ParamsProvidedBy.ORGANISATION && (
          <DSInput
            name={`${nameSuffix}.value`}
            label="Value"
            value={param.value}
            errors={errors}
            touched={touched}
            onFieldChange={onFieldChange}
          />
        )}
      </div>
    </div>
  )
}

export default ParamInput
