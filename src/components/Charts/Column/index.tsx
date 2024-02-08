import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ColumnProps {
    data: any;
}

const Column = ({ data }: ColumnProps) => {
    const options = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ["#6078ea"],
        stroke: { width: 2, curve: 'smooth' },
        series: [{
            name: "Cpu Cache",
            data: data[0].value
        }],
        plotOptions: {
            bar: {
                borderRadius: 5,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val: any) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#fff"]
            }
        },
        xaxis: {
            categories: data[0].time,
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
                offsetY: -35,

            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val: any) {
                    return val + "%";
                }
            }
        },
        title: {
            text: "Cpu Cache",
            align: "left",
            offsetX: 10,
            style: {
                fontSize: "25px",
                color: "#fff",
            },
        },
    }

    return (
        <>
            <Chart
                options={options as any}
                series={options.series}
                type="bar"
                height={350}
                width='100%'
            />
        </>
    )
}

export default Column
