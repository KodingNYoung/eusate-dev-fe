"use client"
import { FC } from "@/utils/types"
import { Chart } from "@highcharts/react"
import { Pie } from "@highcharts/react/series"
import { Skeleton } from "@nextui-org/react"
import React, { useMemo } from "react"
import AppProgress from "./AppProgress"

type Props = {
  unit?: string
  name: string
  hasLegend?: boolean
  loading?: boolean
  data: {
    label: string
    count: number
    color: string
  }[]
}

const DonutChart: FC<Props> = ({
  unit,
  name = "donut chart for xyz",
  hasLegend,
  data,
  loading,
}) => {
  const total = useMemo(
    () => data.reduce((cumm, curr) => cumm + curr.count, 0),
    [data]
  )
  return (
    <section className="flex flex-wrap items-center gap-5">
      <div className="flex-1 min-w-2/5 sm:h-full max-w-[220px]">
        <Skeleton isLoaded={!loading} className="rounded-full">
          <Chart
            options={{
              accessibility: { enabled: false },
              credits: { enabled: false },
              chart: { height: "100%", margin: 0 },
              tooltip: {
                enabled: false,
              },
              subtitle: {
                useHTML: true,
                verticalAlign: "middle",
                text: `<h3 class="font-app text-bold-xl text-black">${total}</h3>
                <span class="font-app text-medium-xs text-gray-500">total ${unit}s</span>
              `,
              },
            }}
          >
            <Pie.Series
              data={data.map((item) => ({ y: item.count, name: item.label }))}
              options={{
                name,
                borderWidth: 0,
                size: "100%",
                innerSize: "70%",
                dataLabels: { enabled: false },
                colors: data.map((item) => item.color),
              }}
            />
          </Chart>
        </Skeleton>
      </div>
      {hasLegend && (
        <div className="flex-1 min-w-2/5 flex flex-col gap-5">
          {data.map((item) => {
            return (
              <AppProgress
                key={item.label}
                color={item.color}
                value={(item.count * 100) / (total > 0 ? total : 1)}
                label={item.label}
                showValueLabel
                loading={loading}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}

export default DonutChart
