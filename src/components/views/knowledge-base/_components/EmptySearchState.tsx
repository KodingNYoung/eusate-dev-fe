import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { useQueryParams } from "@/hooks/utilityHooks"
import { FC } from "@/utils/types"
import React from "react"
import { INIT_PARAMS } from "../utils"

const EmptySearchState: FC = () => {
  const { batchSet } = useQueryParams()

  return (
    <section className="border border-gray-50 rounded-xl sm:rounded-x20 px-5 py-20 sm:py-10 relative z-0">
      <div className="max-w-[352px] w-full text-center flex flex-col items-center justify-center mx-auto">
        <div className="bg-gray-50 border-8 border-gray-25 rounded-full size-14 flex items-center justify-center">
          <Icon name="icon-info-circle" size={24} className="text-gray-500" />
        </div>
        <div className="text-center my-4 max-w-[90%] grid gap-2 sm:gap-1">
          <Typography className="teext-semibold-sm sm:text-semibold-base text-gray-900">
            Nothing here. Try adjusting your filters.
          </Typography>
          <Typography className="text-regular-sm text-gray-500 mb-2">
            Your filters did not match any resources. Please adjust the filters
            or create a new resource.
          </Typography>
        </div>
        <Button
          variant="outlined"
          classNames={{ label: "p-2.5 px-4.5 text-semibold-sm" }}
          onClick={() =>
            batchSet([
              INIT_PARAMS.PAGE,
              INIT_PARAMS.PRIVACY,
              INIT_PARAMS.PUBLISHED,
              INIT_PARAMS.SEARCH,
              INIT_PARAMS.TAGS,
            ])
          }
        >
          Clear filter
        </Button>
      </div>
    </section>
  )
}

export default EmptySearchState
