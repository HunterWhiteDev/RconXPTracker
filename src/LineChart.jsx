import React from "react";
import ReactECharts from "./ReactECharts";

function LineChart({ xData = [], yData = [] }) {
  const option = {
    xAxis: {
      data: xData,
    },
    yAxis: [
      {
        type: "value",
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
        },
        splitNumber: 5,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
    grid: {
      width: "calc(100% - 75px)",
      height: "calc(100% - 1rem)",
      left: 75,
      right: 75,
      top: 15,
      bottom: 25,
    },
    style: {
      width: "100%",
      height: "100%",
    },
    series: [
      {
        data: yData,
        type: "line",
      },
    ],
  };

  console.log(yData);

  return <ReactECharts option={option} width={"100vw"} height={"500px"} />;
}

export default LineChart;
