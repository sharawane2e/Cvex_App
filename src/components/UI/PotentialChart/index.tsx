import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HC_more from 'highcharts/highcharts-more';
import { getBaselinechartOptions, getBarchartOptions, getPotentialchartOptions, getSegmentchartOptions } from "../../../utils/highchartOptionUtil";

type HighChartProps = { chartRef: any, setChartInfo: any, chartType: any, chartSeries: any, chartOptions: any }

const PotentialChart = (props: HighChartProps) => {
    const [jsonData, setJSONData] = useState<any>('');
    // const chartOptions = props?.chartOptions

    useEffect(() => {
        setJSONData(
            // @ts-ignore
            JSON.parse(document.getElementById('jsonData')?.innerHTML),
        );
    }, []);
    HC_more(Highcharts);
    // getHighchartOptions()
    const chartOptions = getBaselinechartOptions();
    const [options, setOptions] = useState({

        chart: {
            type: 'waterfall'
        },
        title: {
            text: "POTENTIAL FUTURE BASELINE",
            useHTML: true,
            style: {
                color: "#fff",
                "background-color": "#027AB1",
                fontWeight: "bold",
            },
        },
        xAxis: {
            tickInterval: 0,
            type: "category",
            gridLineWidth: 0,
        },

        yAxis: {
            tickInterval: 0,
            labels: {
                enabled: false,
            },
            gridLineWidth: 0,
            title: "",
        },

        legend: {
            enabled: false,
        },

        tooltip: {
            pointFormat: "<b>${point.y:,.2f}</b> USD",
        },
        series: [{
            data: [{
                name: 'Start',
                y: 0
            }, {
                name: 'Product Revenue',
                y: 9523
            }, {
                name: 'Service Revenue',
                y: 0
            }, {
                name: 'Positive Balance',
                y: 19010
            }, {
                name: 'Fixed Costs',
                y: 0
            }, {
                name: 'Variable Costs',
                isSum: true,
            }]
        }]

    });
    return (
        <HighchartsReact ref={props?.chartRef} highcharts={Highcharts} options={options} />
    );
};

export default PotentialChart;
