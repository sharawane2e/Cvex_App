import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HC_more from 'highcharts/highcharts-more';
import { getBaselinechartOptions, getBarchartOptions, getPotentialchartOptions, getSegmentchartOptions } from "../../../utils/highchartOptionUtil";


type HighChartProps = { chartRef: any, chartSeriesLabelOne: any, chartSeriesLabelTwo: any, chartOptions: any }

const BarChart = (props: HighChartProps) => {
    HC_more(Highcharts);
    const [chartIndexDetails, setChartIndexDetails] = useState<any>([]);
    const [chartIndexData, setChartIndexData] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    const [seriesData, setSeriesData] = useState<any>([]);

    const chartSeriesOne = props?.chartSeriesLabelOne
    const chartSeriesTwo = props?.chartSeriesLabelTwo
    // const chartIndexDetails: any = [];
    // const chartIndexData: any = [];
    // console.log(chartSeriesOne)




    // const getChartSeriesOne = () => {
    //     return chartSeriesOne?.map((chartDetail: any, index: number) => {
    //         if (chartDetail?.length > -1) {
    //             if (chartSeriesOne[0][index] == chartDetail[0]) {
    //                 setChartIndexDetails([...chartDetail])
    //             }
    //             if (chartSeriesOne[chartSeriesOne?.length - 1][index] == chartDetail[chartSeriesOne?.length - 1]) {
    //                 setChartIndexData([...chartDetail])
    //             }
    //         }
    //     })
    // }
    useEffect(() => {
        // getChartSeriesOne();
        // setTimeout(() => {
        //     getCategories();
        //     getSeriesData();
        // }, 1000)
    }, []);
    const getCategories = () => {
        const categoriesArr: any = [];
        categoriesArr.push(chartIndexDetails[0]);
        categoriesArr.push(chartIndexData[0]);
        setCategories(categoriesArr)
        // return categories;
    }

    const getSeriesData = () => {
        const seriesDataArr: any = [];
        if ((chartIndexDetails != undefined && chartIndexDetails != "") || (chartIndexData != undefined && chartIndexData != "")) {
            const chartIdx = chartIndexDetails;
            const chartIndex = chartIndexData;
            seriesDataArr.push(chartIdx[chartIdx?.length - 1])
            seriesDataArr.push(chartIndex[chartIndex?.length - 1])
            setSeriesData(seriesDataArr)
        }
    }


    const getChartSeriesTwo = () => {
        return chartSeriesTwo?.map((chartDetail: any, index: number) => {
            if (chartDetail?.length > -1) {
                if (chartSeriesTwo[0][index] == chartDetail[0]) {
                    chartIndexDetails?.push(...chartDetail)
                }
                if (chartSeriesTwo[chartSeriesTwo?.length - 1][index] == chartDetail[chartSeriesTwo?.length - 1]) {
                    chartIndexData?.push(...chartDetail)
                }
            }
        })
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
            categories: categories, gridLineWidth: 0
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
            data: seriesData
            // data: [1000, 4000]
        }]
    });
    return (
        <HighchartsReact ref={props?.chartRef} highcharts={Highcharts} options={options} />
    );
};

export default BarChart;
