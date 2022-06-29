import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HC_more from "highcharts/highcharts-more";
import { useSelector } from "react-redux";

const BarChart = () => {
  HC_more(Highcharts);
  const { chart } = useSelector((state: any) => state);
  console.log(chart.barChartOptions)
  Highcharts.setOptions({
    lang: {
      decimalPoint: '.',
      thousandsSep: ','
    }
  });
  return (
    <HighchartsReact highcharts={Highcharts} options={chart.barChartOptions} />
  );
};

export default BarChart;
