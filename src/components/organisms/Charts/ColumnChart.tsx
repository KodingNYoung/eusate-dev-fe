"use client"

import { FC } from "@/utils/types"
import { Chart, Tooltip } from "@highcharts/react"
import { Column } from "@highcharts/react/series"
import React from "react"

const ColumnChart: FC = () => {
  return (
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
          labels: {
            style: {
              color: "#878787",
              fontSize: 16,
              fontWeight: "500",
              fontFamily: "var(--font-app)",
            },
          },
        },
        xAxis: {
          categories: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
          ],
          lineWidth: 0,
          tickLength: 0,
          labels: {
            style: {
              color: "#878787",
              fontSize: 16,
              fontWeight: "500",
              fontFamily: "var(--font-app)",
            },
          },
        },
      }}
    >
      <Column.Series
        data={[
          32400, 28700, 35200, 31900, 38600, 42300, 45100, 43800, 39200, 41700,
          37500, 44900, 33600, 29800, 36400, 34100, 40200, 38900, 42600, 46200,
          41800, 39300, 35700, 48600,
        ]}
        options={{
          color: "#D7AB07",
          pointPadding: 0,
          groupPadding: 0.1,
        }}
      />
      <Tooltip>{"{point.category}: {point.y}"}</Tooltip>
    </Chart>
  )
}
export default ColumnChart
