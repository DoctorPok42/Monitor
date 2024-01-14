import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AreaProps {
    title: string;
    titleColor?: string;
    colorData: string[];
    data: any;
}

const Area = ({ title, titleColor = "#fff", colorData, data }: AreaProps) => {
    const options = {
        chart: {
            id: "realtime",
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            toolbar: {
                show: true,
            },
            zoom: {
                enabled: true,
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
        colors: colorData,
        stroke: { width: 2, curve: 'smooth' },
        dataLabels: { enabled: false },
        xaxis: {
            categories: data?.map((data: any) => data.time),
            show: false,
        },
        yaxis: {
            show: false,
        },
        grid: {
            row: {
                colors: ["#1b213b", "transparent"],
                opacity: 0,
            },
            column: {
                colors: ["#1b213b", "transparent"],
                opacity: 0,
            },
        },
    }

    return (
        <Chart
            type="area"
            height={300}
            width='100%'
            options={options as any}
            series={[{
                name: "Speed",
                data: data?.map((data: any) => data.speed),
            }]}
        />
    )
}

export default Area