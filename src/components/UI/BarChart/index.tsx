import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HC_more from 'highcharts/highcharts-more';
import { getBaselinechartOptions, getBarchartOptions, getPotentialchartOptions, getSegmentchartOptions } from "../../../utils/highchartOptionUtil";

type HighChartProps = { chartRef: any, setChartInfo: any, chartType: any, chartSeries: any, chartOptions: any }

const BarChart = (props: HighChartProps) => {
    const [jsonData, setJSONData] = useState<any>('');
    // const chartOptions = props?.chartOptions
    const chartSeries = props?.chartSeries
    const chartDetails: any = [];
    const seriesData: any = [];
    const titleData: any = [];
    useEffect(() => {
        setJSONData(
            // @ts-ignore
            JSON.parse(document.getElementById('jsonData')?.innerHTML),
        );
    }, []);
    HC_more(Highcharts);
    // getHighchartOptions()
    const getChartSeries = () => {
        chartSeries?.map((chartDetail: any) => {
            chartDetails.push(chartDetail)
        })
        return chartSeries?.map((chartDetail: any, index: number) => {
            // console.log(chartDetail)
            if (chartDetail.length > -1) {
                if (chartDetail[0] == "Baseline" && chartDetail[chartDetail.length - 1] == "service to sales") {
                    chartDetail.splice(chartDetail.length, 1)
                    console.log(chartDetail)
                    titleData.push(chartDetail)
                    seriesData.push(chartDetail[0])

                }
            }
        })
    }
    getChartSeries()
    console.log(getChartSeries())
    console.log(titleData)
    console.log(seriesData)
    const chartOptions = getBaselinechartOptions();
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
            categories: ['Baseline', 'Possible future baseline'], gridLineWidth: 0
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
            data: [28535, 140440]
        }]
    });
    return (
        <HighchartsReact ref={props?.chartRef} highcharts={Highcharts} options={options} />
    );
};

export default BarChart;
