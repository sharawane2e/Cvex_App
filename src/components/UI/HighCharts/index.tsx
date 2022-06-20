import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HC_more from 'highcharts/highcharts-more';

type HighChartProps = { chartRef: any, setChartInfo: any }

const HighChart = (props: HighChartProps) => {
    const [jsonData, setJSONData] = useState<any>('');
    useEffect(() => {
        setJSONData(
            // @ts-ignore
            JSON.parse(document.getElementById('jsonData')?.innerHTML),
        );
    }, []);
    HC_more(Highcharts);
    const [options] = useState({
        // Bar chart
        // chart: {
        //     type: 'bar',
        // }, title: {
        //     text: "",
        // },
        // xAxis: {
        //     tickLength: 0,
        //     categories: ['Baseline', 'Possible future baseline'], gridLineWidth: 0
        // },
        // yAxis: {
        //     tickLength: 0,
        //     labels: {
        //         enabled: false
        //     }, gridLineWidth: 0, title: false,
        //     plotLines: [
        //         {
        //             color: "#000000",
        //             value: 0,
        //             zIndex: 5,
        //         }
        //     ],
        // },
        // plotOptions: {
        //     series: {
        //         stacking: 'normal'
        //     }, dataLabels: {
        //         formatter: function (y: any) {
        //             return Math.abs(y) + "%";
        //         },
        //     },
        // },
        // legend: {
        //     enabled: false
        // },
        // series: [{
        //     data: [28535, 140440]
        // }]
        // chart: {
        //     type: 'waterfall'
        // },

        // title: {
        //     text: "Baseline", useHTML: true,
        //     style: {
        //         color: '#fff',
        //         'background-color': '#ccc',
        //         fontWeight: 'bold',
        //     }
        // },

        // xAxis: {
        //     type: 'category',
        // },

        // yAxis: {
        //     labels: {
        //         enabled: false
        //     }
        // },

        // legend: {
        //     enabled: false
        // },

        // tooltip: {
        //     pointFormat: '<b>${point.y:,.2f}</b> USD'
        // },

        // series: [{
        //     data: [{
        //         name: 'Start',
        //         y: 0
        //     }, {
        //         name: 'Product Revenue',
        //         y: 9523
        //     }, {
        //         name: 'Service Revenue',
        //         y: 0
        //     }, {
        //         name: 'Positive Balance',
        //         y: 19010
        //     }, {
        //         name: 'Fixed Costs',
        //         y: 0
        //     }, {
        //         name: 'Variable Costs',
        //         isSum: true,
        //     }]
        // }]

        chart: {
            type: 'waterfall'
        },


        title: {
            text: "Baseline", useHTML: true,
            style: {
                color: '#fff',
                'background-color': '#ccc',
                fontWeight: 'bold',
            }
        },
        xAxis: {
            tickInterval: 0,
            type: 'category', gridLineWidth: 0
        },

        yAxis: {
            tickInterval: 0,
            labels: {
                enabled: false
            }, gridLineWidth: 0, title: ""
        },

        legend: {
            enabled: false
        },

        tooltip: {
            pointFormat: '<b>${point.y:,.2f}</b> USD'
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

export default HighChart;
