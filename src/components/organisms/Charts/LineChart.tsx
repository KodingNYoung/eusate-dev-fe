"use client"

import { FC } from "@/utils/types"
import { Chart } from "@highcharts/react"
import { Line } from "@highcharts/react/series"
import React from "react"

const LineChart: FC = () => {
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
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          lineWidth: 0,
          tickLength: 0,
          // crosshair: true,
          labels: {
            style: {
              color: "#878787",
              fontSize: 16,
              fontWeight: "500",
              fontFamily: "var(--font-app)",
            },
          },
        },
        series: [
          {
            color: "#E0E0E0",
            type: "line",
            data: [43800, 39200, 41700, 37500, 44900, 33600, 29800],
            marker: {
              enabled: false,
              symbol: "circle",
              fillColor: "#fff",
              radius: 5,
              lineWidth: 2,
              lineColor: "#E0E0E0",
            },
          },
          {
            type: "line",
            color: {
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
            data: [32400, 28700, 35200, 31900, 38600, 42300, 45100],
            marker: {
              enabled: false,
              symbol: "circle",
              fillColor: "#fff",
              radius: 5,
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
            },
          },
        ],
      }}
    >
      <Line.Series />
    </Chart>
  )
}

export default LineChart
