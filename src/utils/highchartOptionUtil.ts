import Highcharts from 'highcharts';

export const getbaseLineChartOptions = (baseLineChartOptions: any): any => {
  const baselineHeading = baseLineChartOptions.headings;
  const seriesName: any = [];
  const seriesY: any = [];
  const SeriesData: any = [];
  const categories: any = [];
  const colorsArr: any = [];

  for (let i = 1; i < baselineHeading.length; i++) {
    seriesName.push(baselineHeading[i]);
  }
  for (let i = 0; i < baseLineChartOptions.rowDetails.length; i++) {
    let newArrayData: any = [];
    const baselinedata = baseLineChartOptions.rowDetails[i].tbodyDetails;
    // console.log(baselinedata);
    for (let j = 1; j < baselinedata.length; j++) {
      if (typeof baselinedata[j] == 'string') {
        newArrayData.push(0);
      } else {
        newArrayData.push(baselinedata[j]);
      }
    }
    // seriesY.push(chartArrayData);
    // colorsArr.push(colorDataData);
    // console.log(colorDataData)
    // seriesY.splice(1,1)
    // colorsArr.splice(1,1)

    for (
      let index = 0;
      index < baseLineChartOptions.rowDetails[i]?.chartDetails.length;
      index++
    ) {
      //   seriesY.forEach((el: any,i:number) => {
      //     categories.push(seriesName[index]);
      //     SeriesData.push({
      //       name: seriesName[index],
      //       y: el[i],
      //       color: colorsArr[index],
      //     });
      //   });
      // }
    }
  }
  console.log(colorsArr);
  // seriesY.forEach((el: any, index: any) => {
  //   categories.push(seriesName[index]);
  //   SeriesData.push({
  //     name: seriesName[index],
  //     y: el,
  //     // color: "red",
  //   });
  // });
  // var blankIndex = colorsArr.indexOf("");
  // colorsArr.splice(blankIndex,1)

  // seriesY.forEach((el: any, index: any) => {
  //   el?.forEach((element:any)=> {
  //     console.log(el)
  //   });
  // categories.push(seriesName);
  // SeriesData.push({
  //   name: seriesName,
  //   y: el,
  //   color: colorsArr[index],
  // });
  // });
  // console.log(SeriesData)
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
    // console.log(baselinedata);
    for (let j = 1; j < baselinedata.length; j++) {
      if (typeof baselinedata[j] == 'string') {
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
      // color: "red",
    });
  });
  return [SeriesData, categories];
};
export const getsegmentChartOptions = (
  segmentChartOptions: any,
  currencySymbol: any,
): any => {
  const segementHeading = segmentChartOptions.chartLabels;
  const seriesName: any = [];
  const seriesY: any = [];
  const SeriesData: any = [];
  const categories: any = [];
  for (let i = 0; i < segementHeading.length; i++) {
    seriesName.push(segementHeading[i]);
  }

  for (let i = 0; i < segmentChartOptions.chartDetails.length; i++) {
    let newArrayData: any = [];
    const segmentData = segmentChartOptions.chartDetails[i];
    if (typeof segmentData == 'string') {
      newArrayData.push(0);
    } else {
      newArrayData.push(segmentData);
    }
    seriesY.push(newArrayData);
  }

  seriesY.forEach((el: any, index: any) => {
    //console.log('el', el);
    categories.push(seriesName[index]);
    SeriesData.push({
      name: seriesName[index],
      y: el[0],

      // color: "red",
    });
  });
  console.log('SeriesData', {
    data: SeriesData,
    dataLabels: {
      enabled: true,
      color: 'black',
      inside: false,
      y: 50,
      align: 'center',
      // format: `{point.y:,.2f} ${currencySymbol}`,
      formatter: function () {
        return Highcharts.numberFormat(this.y / 1000, 0, ',') + 'k';
      },
    },
    categories,
  });

  return [SeriesData, categories];
};
