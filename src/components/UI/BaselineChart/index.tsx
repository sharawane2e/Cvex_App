import { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
import {
  getBaselinechartOptions,
  getBarchartOptions,
  getPotentialchartOptions,
  getSegmentchartOptions,
} from '../../../utils/highchartOptionUtil';

type HighChartProps = {
  chartRef: any;
  setChartInfo: any;
  chartType: any;
  chartSeries: any;
  chartOptions: any;
};

const BaselineChart = (props: HighChartProps) => {
  const [jsonData, setJSONData] = useState<any>('');
  // const chartOptions = props?.chartOptions

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
  }, []);
  HC_more(Highcharts);
  const chartSeries = props?.chartSeries;
  const chartIndexDetails: any = [];
  const chartIndexData: any = [];
  const seriesData: any = [];
  // const chartOptions = getBaselinechartOptions();

  const getChartSeries = () => {
    return chartSeries?.map((chartDetail: any, index: number) => {
      // console.log()
      if (chartDetail?.length > -1) {
        if (chartSeries[0][index] == chartDetail[0]) {
          chartIndexDetails?.push(...chartDetail);
        }
        if (
          chartSeries[chartSeries?.length - 1][index] ==
          chartDetail[chartSeries?.length - 1]
        ) {
          chartIndexData?.push(...chartDetail);
        }
      }
    });
  };
  getChartSeries();

  const getCategories = () => {
    const categories: any = [];
    categories.push(chartIndexDetails[0]);
    categories.push(chartIndexData[0]);
    return categories;
  };

  const getSeriesData = () => {
    let chartIdx = chartIndexDetails;
    let chartIndex = chartIndexData;
    seriesData.push(chartIdx[chartIdx?.length - 1]);
    seriesData.push(chartIndexData[chartIndex?.length - 1]);
    return seriesData;
  };
  const chartOptions = getBaselinechartOptions();

  const [options, setOptions] = useState({
    chart: {
      type: 'waterfall',
    },
    title: {
      text: 'BASELINE',
      useHTML: true,
      style: {
        color: '#fff',
        'background-color': '#ccc',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      tickInterval: 0,
      type: 'category',
      gridLineWidth: 0,
    },

    yAxis: {
      tickInterval: 0,
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
      title: '',
    },

    legend: {
      enabled: false,
    },

    tooltip: {
      pointFormat: '<b>${point.y:,.2f}</b> USD',
    },
    series: [
      {
        data: [
          {
            name: 'Start',
            y: 0,
          },
          {
            name: 'Product Revenue',
            y: 9523,
          },
          {
            name: 'Service Revenue',
            y: 0,
          },
          {
            name: 'Positive Balance',
            y: 19010,
          },
          {
            name: 'Fixed Costs',
            y: 0,
          },
          {
            name: 'Variable Costs',
            isSum: true,
          },
        ],
      },
    ],
  });
  return (
    <HighchartsReact
      ref={props?.chartRef}
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default BaselineChart;
