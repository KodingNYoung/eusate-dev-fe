"use client"

import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import ChartCard from "@/components/molecules/Cards/ChartCard"
import { useKnowledgeBaseResources } from "@/hooks/api/knowledgeBaseHooks"
import { ROUTES } from "@/utils/constants"
import { FC, KnowledgeSource } from "@/utils/types"
import Link from "next/link"
import React, { useMemo } from "react"
import { resourceIcon } from "../../knowledge-base/_components/ResourceTypeTag"
import dayjs from "dayjs"
import { Skeleton } from "@nextui-org/react"

type Props = {
  start: string
  end: string
}

const PAGE_SIZE = 5

const RecentlyAddedResources: FC<Props> = () => {
  const { data, isLoading } = useKnowledgeBaseResources({
    page_size: PAGE_SIZE,
  })

  const resources = useMemo(() => data?.data?.results || [], [data])

  return (
    <ChartCard
      title="Recently Added Resources"
      hideTrendAnalysis
      classNames={{
        root: "pt-0 pb-0 overflow-hidden h-full",
        main: "!py-0 !px-0 overflow-y-auto max-h-[290px]",
      }}
    >
      <div className="grid gap-1.5 px-6">
        {(!!resources?.length || isLoading) &&
          (resources?.length
            ? resources
            : new Array<KnowledgeSource>(PAGE_SIZE).fill({} as KnowledgeSource)
          ).map((resource, idx) => (
            <Skeleton isLoaded={!isLoading} className="rounded-xl" key={idx}>
              <div
                // href={`${ROUTES.RESOURCE}/?${KB_QUERY_KEYS.ID}=${resource.id}&${KB_QUERY_KEYS.TAGS}=${resource.tag}`}
                key={idx}
                className="px-6 py-5 rounded-xl bg-gray-25 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} name={resourceIcon[resource.tag]} />
                  <div className="grid">
                    <Typography variant="medium-sm">
                      {resource.title}
                    </Typography>
                    <Typography variant="regular-sm" className="sm:hidden">
                      {dayjs(resource.date_created).format(
                        "DD MMM, YYYY. hh:mmA"
                      )}
                    </Typography>
                  </div>
                </div>
                <Typography variant="regular-sm" className="hidden sm:inline">
                  {dayjs(resource.date_created).format("DD MMM, YYYY. hh:mmA")}
                </Typography>
              </div>
            </Skeleton>
          ))}
      </div>
      {!!resources.length && (
        <footer className="border-t border-[#e6e6e6] bg-white py-4 flex items-center justify-center sticky bottom-0 mt-auto">
          <Link
            href={`${ROUTES.KNOWLEDGE_BASE}`}
            className="flex items-center justify-center gap-1 leading-none group/link"
          >
            <Typography
              as="span"
              className="text-medium-sm text-gray-500 group-hover/link:text-gradient"
            >
              See all tickets
            </Typography>
            <Icon
              name="icon-arrow-right"
              size={20}
              className="text-gray-500 group-hover/link:text-gradient"
            />
          </Link>
        </footer>
      )}
    </ChartCard>
  )
}

export default RecentlyAddedResources
