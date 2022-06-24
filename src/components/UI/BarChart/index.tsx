import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HC_more from "highcharts/highcharts-more";
import { useSelector } from "react-redux";

const BarChart = () => {
  HC_more(Highcharts);
  const { chart } = useSelector((state: any) => state);
  return (
    <HighchartsReact highcharts={Highcharts} options={chart.barChartOptions} />
  );
};

export default BarChart;
