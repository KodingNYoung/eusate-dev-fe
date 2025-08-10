import { useTicketResolution } from "@/hooks/api/helpdeskHooks"
import { FC } from "@/utils/types"
import React from "react"
import { DATE_FILTER } from "../../overview/utils"
import { CHART_INTERVALS } from "@/utils/constants"
import Typography from "@/components/atoms/Typography"
import Badge from "@/components/atoms/Badge"
import { Skeleton } from "@nextui-org/react"
import { Chart } from "@highcharts/react"
import { Column } from "@highcharts/react/series"
import { TIMEFRAME_DATE_FORMATTER } from "../utils"
import dayjs from "dayjs"

type Props = {
  start: string
  end: string
  date: string
}

const TicketResolution: FC<Props> = ({ start, end, date }) => {
  const { data, isLoading } = useTicketResolution({
    start_date: start,
    end_date: end,
    interval:
      date === DATE_FILTER.TODAY ? CHART_INTERVALS.HOURS : CHART_INTERVALS.DAYS,
  })
  return (
    <section className="border border-gray-50 rounded-x10 p-4 sm:p-6">
      <header className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <Typography as="h3" className="text-semibold-base">
          Ticket resolution
        </Typography>

        {data?.efficiency ? (
          <div className="flex items-center justify-end gap-2">
            <Typography className="text-medium-sm mr-1">
              Overall efficiency:
            </Typography>
            <Badge
              type="filled"
              color="neutral"
              className="py-1.5 text-medium-sm"
            >
              AI <strong className="ml-2.5">{data?.efficiency?.sate}%</strong>
            </Badge>
            <Badge
              type="filled"
              color="primary"
              className="py-1.5 text-medium-sm !bg-gold-50 !text-gray-900"
            >
              Human{" "}
              <strong className="ml-2.5">{data?.efficiency?.agent}%</strong>
            </Badge>
          </div>
        ) : null}
      </header>
      <Skeleton isLoaded={!isLoading} className="h-[255px] rounded-sm">
        {data?.data?.length ? (
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
                allowDecimals: false,
                title: { text: undefined },
                min: 0,
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
                categories: data?.data.map((item) => item.timestamp),
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
              },
              plotOptions: {
                column: {
                  states: {
                    hover: {
                      halo: { enabled: false },
                    },
                  },
                },
              },
              tooltip: {
                useHTML: true,
                formatter: function () {
                  const key = this.key
                  return `
                  <table>
                    <thead>
                      <tr>
                        <th>${dayjs(key).format("ddd, DD MMM, YYYY")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div style="display:flex;align-items:center;">
                            <div style="background:${this.series.color};width:8px;height:8px; border-radius:8px;margin-right:4px;"></div>
                            <span>${this.series.name}</span>
                          </div>
                        </td>
                        <td>${this.y}</td>
                      </tr>
                    </tbody>
                  </table>
                  `
                },
              },
            }}
          >
            <Column.Series
              data={data?.data.map((item) => item.agent) || []}
              options={{ name: "Human", color: "#F3E5B2" }}
            />
            <Column.Series
              data={data?.data.map((item) => item.sate) || []}
              options={{ name: "AI", color: "#0A0A0A" }}
            />
          </Chart>
        ) : (
          <div className="flex items-center justify-center h-full w-full absolute">
            No data
          </div>
        )}
      </Skeleton>
    </section>
  )
}

export default TicketResolution
