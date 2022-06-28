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
      if (typeof baselinedata[j] == 'string') {
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
    });
  });
  return [SeriesData, categories];
};
export const getsegmentChartOptions = (segmentChartOptions: any): any => {
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
      if (typeof segmentData== 'string') {
        newArrayData.push(0);
      } else {
        newArrayData.push(segmentData);
    }
    seriesY.push(newArrayData);
  }
  
  seriesY.forEach((el: any, index: any) => {
    categories.push(seriesName[index]);
    // if(seriesY[0][0]==el){
    //   SeriesData.push({
    //     name: seriesName[0],
    //     y: el[0],
    //     isSum:true
    //   });
    // }
    if(seriesY[seriesY.length-1][0]==el){
      SeriesData.push({
        name: seriesName[index],
        // y: false,
       isSum:true
      });
    }
    // else{
      SeriesData.push({
        name: seriesName[index],
        y: el[0]
      });
    // }
  });

  return [SeriesData, categories];
};
