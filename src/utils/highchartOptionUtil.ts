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
  const categories: any = [];

  for (let i = 1; i < baselineHedding.length; i++) {
    seriesName.push(baselineHedding[i]);
  }
  for (let i = 0; i < baseLineChartOptions.rowDetails.length; i++) {
    let newArrayData: any = [];
    const baselinedata = baseLineChartOptions.rowDetails[i].tbodyDetails;
    // console.log(baselinedata);
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
    categories.push(seriesName[index]);
    SeriesData.push({
      name: seriesName[index],
      y: el,
    });
  });

  return [SeriesData, categories];
};
export const getpotentialChartOptions = (potentialChartOptions: any): any => {
  const baselineHedding = potentialChartOptions.headings;
  const seriesName: any = [];
  const seriesY: any = [];
  const SeriesData: any = [];
  const categories: any = [];

  for (let i = 1; i < baselineHedding.length; i++) {
    seriesName.push(baselineHedding[i]);
  }
  for (let i = 0; i < potentialChartOptions.rowDetails.length; i++) {
    let newArrayData: any = [];
    const baselinedata = potentialChartOptions.rowDetails[i].tbodyDetails;
    console.log(baselinedata);
    for (let j = 1; j < baselinedata.length; j++) {
      if (typeof baselinedata[j] == "string") {
        newArrayData.push(0);
      } else {
        newArrayData.push(baselinedata[j]);
      }
    }
    seriesY.push(newArrayData);
  }

  seriesY[seriesY.length - 1].forEach((el: any, index: any) => {
    categories.push(seriesName[index]);
    SeriesData.push({
      name: seriesName[index],
      y: el,
    });
  });
  return [SeriesData, categories];
};
const getsegmentChartOptions = (segmentChartOptions: any): any => {
  const baselineHedding = segmentChartOptions.headings;
  const seriesName: any = [];
  const seriesY: any = [];
  const SeriesData: any = [];
  const categories: any = [];

  for (let i = 1; i < baselineHedding.length; i++) {
    seriesName.push(baselineHedding[i]);
  }
  for (let i = 0; i < segmentChartOptions.rowDetails.length; i++) {
    let newArrayData: any = [];
    const baselinedata = segmentChartOptions.rowDetails[i].tbodyDetails;
    console.log(baselinedata);
    for (let j = 1; j < baselinedata.length; j++) {
      if (typeof baselinedata[j] == "string") {
        newArrayData.push(0);
      } else {
        newArrayData.push(baselinedata[j]);
      }
    }
    seriesY.push(newArrayData);
  }

  seriesY[seriesY.length - 1].forEach((el: any, index: any) => {
    categories.push(seriesName[index]);
    SeriesData.push({
      name: seriesName[index],
      y: el,
    });
  });
  return [SeriesData, categories];
};
