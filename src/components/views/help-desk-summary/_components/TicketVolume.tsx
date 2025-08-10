import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import { Chart, Tooltip } from "@highcharts/react"
import { Areaspline } from "@highcharts/react/series"
import React, { useMemo } from "react"
import { COMPARISM_TIMEFRAME, DATE_FILTER } from "../../overview/utils"
import { formatComma } from "@/utils/helpers"
import { useTicketVolume } from "@/hooks/api/helpdeskHooks"
import { CHART_INTERVALS } from "@/utils/constants"
import dayjs from "dayjs"
import { TIMEFRAME_DATE_FORMATTER } from "../utils"
import { Skeleton } from "@nextui-org/react"

type Props = {
  date: string
  start: string
  end: string
}

const TicketVolume: FC<Props> = ({ date, start, end }) => {
  const { data, isLoading } = useTicketVolume({
    start_date: start,
    end_date: end,
    interval:
      date === DATE_FILTER.TODAY ? CHART_INTERVALS.HOURS : CHART_INTERVALS.DAYS,
  })
  const total = useMemo(
    () => Object.values(data || {}).reduce((cumm, curr) => cumm + curr, 0),
    [data]
  )
  const timeframeLabel = COMPARISM_TIMEFRAME[date]

  return (
    <section className="border border-gray-50 rounded-x10 p-4 sm:p-6">
      <header className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <Typography as="h3" className="text-semibold-base">
          Ticket volume
        </Typography>

        {timeframeLabel ? (
          <Typography className="text-medium-sm">
            Showing <strong>{formatComma(total)} tickets</strong> for{" "}
            <strong>{timeframeLabel}</strong>
          </Typography>
        ) : null}
      </header>
      <Skeleton isLoaded={!isLoading} className="rounded-sm h-[255px]">
        <Chart
          options={{
            chart: {
              height: "255px",
              panning: { enabled: true, type: "x" },
            },
            credits: { enabled: false },
            legend: { enabled: false },
            yAxis: {
              gridLineColor: "#E0E0E0",
              gridLineDashStyle: "LongDash",
              gridLineWidth: 1.2,
              tickColor: "#878787",
              title: { text: undefined },
              min: 0,
              allowDecimals: false,
              labels: {
                style: {
                  color: "#949396",
                  fontSize: 14,
                  fontWeight: "500",
                  fontFamily: "var(--font-app)",
                },
              },
            },
            xAxis: {
              categories: Object.keys(data || {}),
              lineWidth: 0,
              tickLength: 0,
              labels: {
                formatter: function () {
                  const formatter = TIMEFRAME_DATE_FORMATTER[date]
                  return `<span>${
                    formatter
                      ? formatter(this.value as string)
                      : dayjs(this.value).format("DD/MM")
                  } 
                    </span>`
                },

                style: {
                  color: "#949396",
                  fontSize: 12,
                  fontWeight: "500",
                  fontFamily: "var(--font-app)",
                },
              },
              crosshair: {
                width: 1,
                color: "#e86655c7",
              },
            },
            plotOptions: {
              areaspline: {
                marker: {
                  radius: 0,
                },
                lineWidth: 2,
                lineColor: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 0,
                  },
                  stops: [
                    [0, "#D7AB07"],
                    [1, "#E86555"],
                  ],
                },
                color: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 0,
                  },
                  stops: [
                    [0, " rgba(222, 140, 42, 0)"],
                    [0.4, "#de8d2a31"],
                    [1, " rgba(222, 140, 42, 0)"],
                  ],
                },
                states: {
                  hover: {
                    lineWidthPlus: 0,
                    halo: {
                      size: 5,
                      opacity: 1,
                      attributes: {
                        fill: {
                          linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 1,
                            y2: 0,
                          },
                          stops: [
                            [0, "#D7AB07"],
                            [1, "#E86555"],
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
          }}
        >
          <Areaspline.Series data={Object.values(data || {})} />
          <Tooltip>{"{point.category}: {point.y}"}</Tooltip>
        </Chart>
      </Skeleton>
    </section>
  )
}

export default TicketVolume
