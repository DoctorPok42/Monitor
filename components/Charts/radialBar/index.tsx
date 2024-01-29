import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import React, { useEffect, useState } from "react";

interface radialBarProps {
    title: string;
    titleColor?: string;
    data: any;
    multiple: boolean;
}

const RadialBar = ({ title, titleColor = "#fff", data, multiple }: radialBarProps) => {
    const [dataSample2, setDataSample2] = useState({
    options: {
      chart: {
        id: "radialBar",
        offsetY: -10,
      },
      colors: ["#FCCF31", "#17ead9", "#f02fc2"],
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          track: {
            background: '#11141a',
          },
          dataLabels: {
            name: {
              fontSize: '16px',
              offsetY: 120,
              show: false,
            },
            value: {
              color: "#fff",
              offsetY: 10,
              fontSize: '25px',
              fontWeight: 600,
              formatter: function (val: any) {
                return val + "°";
              },
              show: multiple ? false : true,
            }
          }
          }
        },
      title: {
        text: title,
        align: "left",
        offsetX: 10,
        style: {
          fontSize: "25px",
          color: titleColor,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          type: multiple ? "vertical" : "horizontal",
          gradientToColors: ["#F55555", "#6078ea", "#6094ea"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: multiple ? "round" : "butt",
        dashArray: 3,
      },
      labels: ["Min", "Max", "Avg"],
      legend: {
        show: multiple ? true : false,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: -10,
        offsetY: 25,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        formatter: function (seriesName: any, opts: any) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
      },
    },
    series: multiple ? data.map((item: any) => item.value) : data.series,
  });

  useEffect(() => {
    setDataSample2({
      ...dataSample2,
      series: multiple ? data.map((item: any) => item.value) : data.series,
    });
  }, [data]);

  return (
    <>
      <Chart
        options={dataSample2.options as any}
        series={dataSample2.series}
        type="radialBar"
        width={"100%"}
        height={250}
      />
    </>
  );
};

export default RadialBar;
