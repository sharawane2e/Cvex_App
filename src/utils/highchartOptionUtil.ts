import { useSelector } from "react-redux";

export const getChartOptions = (
  barChartOptions: any | null = useSelector((state: any) => state.chart),
  baseLineChartOptions: any | null = useSelector((state: any) => state.chart),
  potentialChartOptions: any | null = useSelector((state: any) => state.chart),
  segmentChartOptions: any | null = useSelector((state: any) => state.chart)
): any => {
  return getBaseChartOptions(barChartOptions);
  return getbaseLineChartOptions(baseLineChartOptions);
  return getpotentialChartOptions(potentialChartOptions);
  return getsegmentChartOptions(segmentChartOptions);
};

const getBaseChartOptions = (barChartOptions: any): any => {
  console.log(barChartOptions);
};
const getbaseLineChartOptions = (baseLineChartOptions: any): any => {
  console.log(baseLineChartOptions);
};
const getpotentialChartOptions = (potentialChartOptions: any): any => {
  console.log(potentialChartOptions);
};
const getsegmentChartOptions = (segmentChartOptions: any): any => {};
