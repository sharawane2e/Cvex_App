import { useSelector } from "react-redux";

// export const getChartOptions = (
//   barChartOptions: any | null = useSelector((state: any) => state.chart),
//   baseLineChartOptions: any | null = useSelector((state: any) => state.chart),
//   potentialChartOptions: any | null = useSelector((state: any) => state.chart),
//   segmentChartOptions: any | null = useSelector((state: any) => state.chart)
// ): any => {
//   return getBaseChartOptions(barChartOptions);
//   return getbaseLineChartOptions(baseLineChartOptions);
//   return getpotentialChartOptions(potentialChartOptions);
//   return getsegmentChartOptions(segmentChartOptions);
// };

const getBaseChartOptions = (barChartOptions: any): any => {
  console.log(barChartOptions);
};
export const getbaseLineChartOptions = (baseLineChartOptions: any): any => {
  const baselineHedding = baseLineChartOptions.headings;
  const seriesName = [];
  const seriesY = [];

  for (let i = 1; i < baselineHedding.length; i++) {
    seriesName.push(baselineHedding[i]);
  }
  for (let i = 0; i < baseLineChartOptions.rowDetails.length; i++) {
    const baselinedata = baseLineChartOptions.rowDetails[i].tbodyDetails;
    console.log(baselinedata);
    // for (let j = 1; j < baselinedata.length; j++) {
    //   // if (typeof baselinedata[j] == "string") {
    //   //   baselinedata[j] = "0";
    //   // }
    //   console.log(baselinedata[j]);
    // }
    //seriesY.push(baselineHedding[i]);
  }

  //return data;
};
const getpotentialChartOptions = (potentialChartOptions: any): any => {
  console.log(potentialChartOptions);
};
const getsegmentChartOptions = (segmentChartOptions: any): any => {};
