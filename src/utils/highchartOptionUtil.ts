import { getParsedData } from './parserUtil';

export const getbaseChart = (
  rowDetails: any,
  colorArray: any,
  currencySymbol: any,
): any => {
  const labelsFormat = {
    enabled: true,
    bold: false,
    color: 'black',
    inside: false,
    x: 0,
    align: 'left',
    format: `{point.y:,.0f} ${getParsedData(currencySymbol)}`,
  };
  const seriesValue1 = {
    y: rowDetails[0].tbodyDetails[rowDetails[0].tbodyDetails.length - 1],
    color: colorArray[0],
    dataLabels: {
      ...labelsFormat,
    },
  };
  const seriesValue2 = {
    y: rowDetails[rowDetails.length - 1].tbodyDetails[
      rowDetails[rowDetails.length - 1].tbodyDetails.length - 1
    ],
    color: colorArray[1],
    dataLabels: {
      ...labelsFormat,
    },
  };
  return [seriesValue1, seriesValue2];
};

export const getbaseLineChartOptions = (
  baseLineChartOptions: any,
  currencySymbol: any,
): any => {
  const baselineHeading = baseLineChartOptions.headings;
  const categorieName: any = [];
  const data: any = [];
  const categories: any = [];
  const series: any = [];

  for (let i = 1; i < baselineHeading.length; i++) {
    categorieName.push(baselineHeading[i]);
  }
  const baseLineChart = baseLineChartOptions.rowDetails[0];
  const baseLineChartColor = baseLineChartOptions.rowDetails[0].chartColorArray;

  baseLineChart?.chartDetails.forEach((detail: any, Index: any) => {
    categories.push(categorieName[Index]);
    data.push({
      name: categorieName[Index],
      y: detail,
      color: baseLineChartColor[Index],
    });
  });

  series.push({
    data,
    dataLabels: {
      enabled: true,
      color: 'black',
      inside: false,
      y: 0,
      align: 'center',
      format: `{point.y:,.0f} ${getParsedData(currencySymbol)}`,
    },
  });
  return [series, categories];
};
export const getpotentialChartOptions = (
  potentialChartOptions: any,
  currencySymbol: any,
): any => {
  const baselineHedding = potentialChartOptions.headings;
  const categorieName: any = [];
  const data: any = [];
  const categories: any = [];
  const series: any = [];

  for (let i = 1; i < baselineHedding.length; i++) {
    categorieName.push(baselineHedding[i]);
  }

  const baseLineChart = potentialChartOptions.rowDetails[2];
  const baseLineChartColor =
    potentialChartOptions.rowDetails[2].chartColorArray;

  baseLineChart?.chartDetails.forEach((detail: any, Index: any) => {
    categories.push(categorieName[Index]);
    data.push({
      name: categorieName[Index],
      y: detail,
      color: baseLineChartColor[Index],
    });
  });
  series.push({
    data,
    dataLabels: {
      enabled: true,
      color: '#000000',
      inside: false,
      y: 0,
      align: 'center',
      format: `{point.y:,.0f} ${getParsedData(currencySymbol)}`,
    },
  });

  return [series, categories];
};
export const getsegmentChartOptions = (
  segmentChartOptions: any,
  currencySymbol: any,
): any => {
  const segementHeading = segmentChartOptions.chartLabels;
  const seriesName: any = [];
  const data: any = [];
  const series: any = [];
  const categories: any = [];
  for (let i = 0; i < segementHeading.length; i++) {
    seriesName.push(segementHeading[i]);
  }
  const chartDetails = segmentChartOptions.chartDetails;
  const chartColor = segmentChartOptions.chartColorArray;

  chartDetails.forEach((detail: any, Index: number) => {
    categories.push(seriesName[Index]);
    data.push({
      y: detail,
      name: seriesName[Index],
      color: chartColor[Index],
    });
  });

  series.push({
    data,
    dataLabels: {
      enabled: true,
      color: 'black',
      inside: false,
      y: -10,
      align: 'center',
      format: `{point.y:,.0f} ${getParsedData(currencySymbol)}`,
    },
  });

  return [series, categories];
};
