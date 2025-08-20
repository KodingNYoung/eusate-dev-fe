import Typography from "@/components/atoms/Typography"
import { useAgentResolutionTimes } from "@/hooks/api/helpdeskHooks"
import { FC } from "@/utils/types"
import React, { useMemo } from "react"
import AgentMetricItem from "../../report/_components/AgentMetricItem"
import { formatDuration } from "@/utils/helpers"

type Props = {
  start: string
  end: string
}

const AgentResolutionTimes: FC<Props> = ({ start, end }) => {
  const { data, isLoading } = useAgentResolutionTimes({
    start_date: start,
    end_date: end,
  })

  const agents = useMemo(() => data?.data || [], [data])

  return (
    <section className="border border-gray-50 rounded-x10 p-4 sm:p-6">
      <Typography as="h3" className="text-semibold-base mb-6">
        Agent avg. resolution times
      </Typography>
      <div className="min-h-[220px] max-h-[300px] overflow-auto no-scrollbar relative flex flex-col gap-6">
        {(agents && agents.length) || isLoading ? (
          (agents.length ? agents : new Array(3).fill(null))?.map(
            (agent, idx) => (
              <AgentMetricItem
                key={agent?.id || idx}
                title={agent?.username}
                subtitle={agent?.email}
                src={agent.profile_picture}
                loading={isLoading}
                classNames={{
                  metric: "grid justify-items-end",
                  avatar: "!size-9",
                }}
                avatarProps={{ classNames: { root: "border-0" } }}
                metric={
                  <>
                    {formatDuration(agent?.avg_resolution_time_seconds)}
                    <Typography
                      as="span"
                      className="text-gray-300 text-regular-xs"
                    >
                      hours
                    </Typography>
                  </>
                }
              />
            )
          )
        ) : (
          <div className="flex items-center justify-center h-full w-full absolute">
            No data
          </div>
        )}
      </div>
    </section>
  )
}

export default AgentResolutionTimes
