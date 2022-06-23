import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HC_more from 'highcharts/highcharts-more';
import { getBaselinechartOptions, getBarchartOptions, getPotentialchartOptions, getSegmentchartOptions } from "../../../utils/highchartOptionUtil";

type HighChartProps = { chartRef: any, setChartInfo: any, chartType: any, chartSeries: any, chartOptions: any }

const BarChart = (props: HighChartProps) => {
    const [jsonData, setJSONData] = useState<any>('');
    // const chartOptions = props?.chartOptions

    useEffect(() => {
        setJSONData(
            // @ts-ignore
            JSON.parse(document.getElementById('jsonData')?.innerHTML),
        );
        getChartSeries()
    }, []);
    const chartSeries = props?.chartSeries
    const chartIndexDetails: any = [];
    const chartIndexData: any = [];
    const seriesData: any = [];
    HC_more(Highcharts);

    const getChartSeries = () => {
        return chartSeries?.map((chartDetail: any, index: number) => {
            if (chartDetail?.length > -1) {
                if (chartSeries[0][index] == chartDetail[0]) {
                    chartIndexDetails?.push(...chartDetail)
                }
                if (chartSeries[chartSeries?.length - 1][index] == chartDetail[chartSeries?.length - 1]) {
                    chartIndexData?.push(...chartDetail)
                }
            }
        })
    }

    const getCategories = () => {
        const categories: any = [];
        categories.push(chartIndexDetails[0]);
        categories.push(chartIndexData[0]);
        return categories;
    }

    const getSeriesData = () => {
        if ((chartIndexDetails != undefined && chartIndexDetails != "") || (chartIndexData != undefined && chartIndexData != "")) {
            const chartIdx = chartIndexDetails;
            const chartIndex = chartIndexData;
            seriesData.push(chartIdx[chartIdx?.length - 1])
            seriesData.push(chartIndex[chartIndex?.length - 1])
            return seriesData;
        }
    }

    const [options, setOptions] = useState({
        // Bar chart
        chart: {
            type: 'bar',
        },
        title: {
            text: "",
        },
        xAxis: {
            tickLength: 0,
            categories: getCategories(), gridLineWidth: 0
            // categories: ["asd", "asd"], gridLineWidth: 0
        },
        yAxis: {
            tickLength: 0,
            labels: {
                enabled: false
            }, gridLineWidth: 0, title: false,
            plotLines: [
                {
                    color: "#000000",
                    value: 0,
                    zIndex: 5,
                }
            ],
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }, dataLabels: {
                formatter: function (y: any) {
                    return Math.abs(y) + "%";
                },
            },
        },
        legend: {
            enabled: false
        },
        series: [{
            data: getSeriesData()
            // data: [1000, 4000]
        }]
    });
    return (
        <HighchartsReact ref={props?.chartRef} highcharts={Highcharts} options={options} />
    );
};

export default BarChart;
