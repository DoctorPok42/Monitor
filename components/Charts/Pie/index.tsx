import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import React, { useEffect, useState } from "react";

interface PieProps {
    title: string;
    data: any;
}

const Pie = ({ title, data }: PieProps) => {
    const [dataSample2, setDataSample2] = useState({
    options: {
      chart: {
        type: "donut",
        offsetY: -10,
      },
      colors: ["#FCCF31", "#17ead9", "#f02fc2"],
      dataLabels: {
        enabled: false,
      },
      title: {
        text: title,
        align: "left",
        offsetX: 10,
        style: {
          fontSize: "25px",
          color: "#161f28",
        },
      },
      stroke : {
        show: false,
      },
      labels: data.map((item: any) => item.label),
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: -10,
        offsetY: 25,
        labels: {
          useSeriesColors: true,
        },
        formatter: function (seriesName: any, opts: any) {
          const val = opts.w.globals.series[opts.seriesIndex]
          return [seriesName + ": " + val.toFixed(2) + '%']
        },
      },
    },
    series: data.map((item: any) => item.value),
  });

  useEffect(() => {
    setDataSample2({
      ...dataSample2,
      series: data.map((item: any) => item.value),
    });
  }, [data]);

  return (
    <>
      <Chart
        options={dataSample2.options as any}
        series={dataSample2.series}
        type="donut"
        width={"100%"}
        height={250}
      />
    </>
  );
};

export default Pie;
