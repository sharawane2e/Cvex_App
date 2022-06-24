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
  const seriesName: any = [];
  const seriesY: any = [];
  const SeriesData: any = [];

  for (let i = 1; i < baselineHedding.length; i++) {
    seriesName.push(baselineHedding[i]);

  }
  for (let i = 0; i < baseLineChartOptions.rowDetails.length; i++) {
    let newArrayData: any = [];
    const baselinedata = baseLineChartOptions.rowDetails[i].tbodyDetails;
    for (let j = 1; j < baselinedata.length; j++) {
      if (typeof baselinedata[j] == "string") {
        newArrayData.push(0);
      } else {
        newArrayData.push(baselinedata[j]);
      }
    }
    seriesY.push(newArrayData);
  }
  seriesY[0].forEach((el: any, index: any) => {
    SeriesData.push({
      name: seriesName[index],
      y: el,
    });
  });
  console.log(SeriesData);

  return [...SeriesData];
};
const getpotentialChartOptions = (potentialChartOptions: any): any => {
  console.log(potentialChartOptions);
};
const getsegmentChartOptions = (segmentChartOptions: any): any => {};
