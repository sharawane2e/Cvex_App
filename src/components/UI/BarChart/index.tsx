import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const BarChart = () => {
  HC_more(Highcharts);
  Highcharts.setOptions({
    lang: {
      decimalPoint: ".",
      thousandsSep: ",",
    },
  });
  const { chart } = useSelector((state: any) => state);

  useEffect(() => {
    console.log(chart.barChartOptions)
  }, [])
  
  return (
    <HighchartsReact highcharts={Highcharts} options={chart.barChartOptions} />
  );
};

export default BarChart;
