"use client"

import { FC } from "@/utils/types"
import { Chart } from "@highcharts/react"
import React from "react"

const MultiGauge: FC = () => {
  return (
    <Chart
      options={{
        chart: { width: "237px", type: "solidgauge" },
        series: [
          {
            type: "solidgauge",
            name: "AI",
            data: [
              {
                y: 40,
                color: "#9F8",
                radius: "100%",
                innerRadius: "85%",
              },
            ],
          },
        ],
      }}
    ></Chart>
  )
}

export default MultiGauge
