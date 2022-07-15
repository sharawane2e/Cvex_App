import { Grid, Box, Divider, Select, MenuItem, TableCell } from "@mui/material";
import { useState, useEffect } from "react";
import SecondaryHeader from "../Headers/SecondaryHeader";
import BarChart from "../UI/BarChart";
import { Footer } from "../Footer";
import { getParsedData } from "../../utils/parserUtil";
import CustomButton from "../UI/CustomButton";
import BaselineChart from "../UI/BaselineChart";
import PotentialChart from "../UI/PotentialChart";
import SegmentChart from "../UI/SegmentChart";
import HsddInput from "../ImpactCalculator/HsddInput";
import Highcharts from "highcharts";
import {
  setDropDown,
  setSecDropDown,
} from "../../redux/actions/HighChartDropDownAction";
import store from "../../redux/store";
import {
  setBarChartOptions,
  setBaseLineChartOptions,
  setCharBasetTitle,
  setCharcategory,
  setCharPotentialtTitle,
  setPotentialChartOptions,
  setSegmentChartOptions,
} from "../../redux/actions/HighChartAction";
import {
  getbaseChart,
  getbaseLineChartOptions,
  getpotentialChartOptions,
  getsegmentChartOptions,
} from "../../utils/highchartOptionUtil";
import { useSelector } from "react-redux";
import "../CustomizedIC/CustomizedIC.scss";
import { setPageJson } from "../../redux/actions/JsonDataActions";
import { Inputbox } from "../UI/Input";
import DynamicTable from "../UI/DynamicTable";
import { numberWithCommas } from "../../utils/HelperFunctions";

const CustomizedIC = () => {
  const [ jsonData, setJSONData ] = useState<any>("");
  const { dropdown } = useSelector((state: any) => state);
  const { ReduxPageJson } = useSelector((state: any) => state);
  const { chart } = useSelector((state: any) => state);
  const [ periodTable, setPeriodTable ] = useState<any>({});
  const [ totalIF, setTotalIf ] = useState<any>(0);
  const [ time, setTime ] = useState<any>("Monthly");

  const [ selectedSegment, setSelectedSegment ] = useState<any>("Hidsegment_1_label");

  const { dispatch } = store;

  useEffect(() => {
    //@ts-ignore
    let htmldata = JSON.parse(document.getElementById("jsonData")?.innerHTML);
    setJSONData(htmldata);
    updateReduxJson(htmldata);
    // onLoadUpdates();
    // console.log("chart", chart.barChartOptions)
    updateBaseChart(htmldata, htmldata?.data?.inputData?.periodDD?.selectedId);
    // let harsh = [1,2,3,4,5];
    // harsh.push(200);
    // console.log("harsh ", harsh);
  }, []);

  useEffect(() => {
    // timeDDChange(jsonData?.data?.inputData?.periodDD?.selectedId);
    handleDropDownChange(
      jsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.selectedId
    );
  }, [jsonData?.data?.inputData?.periodDD?.selectedId]);

  // useEffect(() => {
  //   updateSegTable();
  // },[jsonData?.data?.inputData?.SalesTables?.tbody])

  useEffect(() => {
    // onLoadUpdates();
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson?.JsonData));
    // updateReduxJson(data);
    // updateBaseChart(data)
  },[jsonData]);

  useEffect(() => {
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson?.JsonData));
    let segmentId = ReduxPageJson?.JsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.selectedId;
    let segTableId = ReduxPageJson?.JsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.options.filter((x:any) => x.ddId == segmentId)[0].tableId;
    setSelectedSegment(segmentId);
    getTotalIV();
    updateBaseChart(ReduxPageJson?.JsonData, ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.selectedId)
    updateBaselinechart(ReduxPageJson?.JsonData, ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.selectedId);
    updateSegmentChart(segmentId, segTableId);
    // updateBaselinechart(ReduxPageJson?.JsonData);  
    // updateSegTable2(data);
    // updateSegTable();
    console.log("tt", totalIF)
  }, [ReduxPageJson])

  // useEffect(() => {
  //   let data:any = {};
  //   data = JSON.parse(JSON.stringify(ReduxPageJson?.JsonData));
  //   updateSegTable2(data);
  // }, [ReduxPageJson?.JsonData?.data?.inputData?.SalesTables])

  function newJson(){
    dispatch(setPageJson(jsonData));
    // console.log("ReduxPageJson", ReduxPageJson.JsonData.data)
  }

  const updateReduxJson = (json:any) => {
    dispatch(setPageJson(json));
  }

  const updateBaseChart = (data:any, ddId:any) => {
    // let barData:any = {};
    // barData = JSON.parse(JSON.stringify(chart.barChartOptions));
    // barData.series[0].data = 
    let selectedId = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.selectedId;
    let selectObj = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.options?.filter((opt:any) => opt.ddId == ddId)[0];
    let temp:any = [{
      y: 5000,
      color: "#A6A6A6",
      dataLabels: {
        enabled : true,
        bold: false,
        inside: true,
        align: "centre",
        style: {
          textShadow: false,
          textOutline: false,
          fontWeight: "normal"
        }
      }
    },
    {
      y: 5000,
      color: "#A6A6A6",
      dataLabels: {
        enabled : true,
        bold: false,
        inside: true,
        align: "centre",
        style: {
          textShadow: false,
          textOutline: false,
          fontWeight: "normal"
        }
      }
    }];

    let basedata:any = JSON.parse(JSON.stringify(data));

    let details:any = basedata?.data?.inputData?.periodTableData?.rowDetails;

    for(var i=0; i<details?.[2]?.tbodyDetails?.length; i++){
      details[2].tbodyDetails[i] = CalculatePFB(i,"display");
      if(selectObj?.ddName == "Monthly"){
        details[0].tbodyDetails[i] = (details[0].tbodyDetails[i])/12;
      }
      else{
        details[0].tbodyDetails[i] = (details[0].tbodyDetails[i]);
      }
    }

    if(details?.length > 0){
      if(selectObj?.ddName == "Monthly"){
        details[2].tbodyDetails[details?.[2]?.tbodyDetails?.length - 1] = (getTotalIV())/12;
      }
      else{
        details[2].tbodyDetails[details?.[2]?.tbodyDetails?.length - 1] = getTotalIV();
      }
    }


    // const rowDetails = data?.data?.inputData?.periodTableData?.rowDetails;
    const rowDetails = details;
    const colorArray = data?.data?.inputData?.periodTableData?.colorArray;
    const firtsCatg = data?.data?.inputData.periodTableData.rowDetails[0].tbodyDetails[0];
    const secsCatg = data?.data?.inputData.periodTableData.rowDetails[2].tbodyDetails[0];
    if(rowDetails != undefined && colorArray != undefined){
      const getchartBarSeries = getbaseChart(
        rowDetails,
        colorArray,
        "€"
      );
      dispatch(setBarChartOptions({data : getchartBarSeries}));
      dispatch(setCharcategory([firtsCatg, secsCatg]));
      updateBaselinechart(data, ddId)
    }
  }

  const updateBaselinechart = (data:any, ddId:any) => {
    let selectObj = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.options?.filter((opt:any) => opt.ddId == ddId)[0];

    const baseLineTitle1 = data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[0];
    const baseLineTitle2 = data?.data?.inputData?.periodTableData?.rowDetails[2]?.tbodyDetails[0];
    dispatch(setCharBasetTitle(baseLineTitle1));
    dispatch(setCharPotentialtTitle(baseLineTitle2));

    let baselineData = {"data": [], "dataLabels": []};

    let a = {
      "data": [
          {
              "name": "Inbound Sales",
              "y": 785000,
              "color": "#8FAADC"
          },
          {
              "name": "Outbound Sales",
              "y": 10600,
              "color": "#8FAADC"
          },
          {
              "name": "Service to Sales",
              "y": 1672000,
              "color": "#8FAADC"
          },
          {
              "name": "Retention",
              "y": 1804000,
              "color": "#8FAADC"
          },
          {
              "name": "Winback",
              "y": 4315000,
              "color": "#8FAADC"
          },
          {
              "name": "Total",
              "y": 8682000,
              "color": "#A6A6A6"
          }
      ],
      "dataLabels": {
          "enabled": true,
          "color": "black",
          "bold": false,
          "verticalAlign": "top",
          "y": -20,
          "style": {
              "textShadow": false,
              "textOutline": false,
              "fontWeight": "normal"
          },
          formatter: function (this: any) {
            return (
              Highcharts.numberFormat(Math.abs(this.y), 0)
            );
          }
      }
  }

    let allSales:any = [];
    const blData: any = [];
    const blDataLabels: any = a.dataLabels;

    const pfbData: any = [];
    const pfbDataLabels: any = a.dataLabels;

    data?.data?.inputData?.periodTableData?.headings.map((x:any, xi:any) => {
      if(xi>0){
        if(typeof data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[xi] == "number" && xi == data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails.length -1 && selectObj?.ddName == "Monthly"){
          blData.push({
            name: data?.data?.inputData?.periodTableData?.headings[xi],
            y: (Math.round((data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[xi] - 2 * data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[xi])/12)),
            color: data?.data?.inputData?.periodTableData?.rowDetails[0]?.chartColorArray[xi]
          })
        }
        else if(typeof data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[xi] == "number" && xi == data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails.length -1 && selectObj?.ddName == "Yearly"){
          blData.push({
            name: data?.data?.inputData?.periodTableData?.headings[xi],
            y: (Math.round((data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[xi] - 2 * data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[xi]))),
            color: data?.data?.inputData?.periodTableData?.rowDetails[0]?.chartColorArray[xi]
          })
        }
        else if(typeof data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[xi] == "number" && selectObj?.ddName == "Monthly"){
          blData.push({
            name: data?.data?.inputData?.periodTableData?.headings[xi],
            y: (Math.round((data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[xi])/12)),
            color: data?.data?.inputData?.periodTableData?.rowDetails[0]?.chartColorArray[xi]
          })
        }
        else if(typeof data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[xi] == "number" && selectObj?.ddName == "Yearly"){
          blData?.push({
            name: data?.data?.inputData?.periodTableData?.headings[xi],
            y: data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[xi],
            color: data?.data?.inputData?.periodTableData?.rowDetails[0]?.chartColorArray[xi]
          })
        }
        else{
          blData?.push({
            name: data?.data?.inputData?.periodTableData?.headings[xi],
            y: 0,
            color: data?.data?.inputData?.periodTableData?.rowDetails[0]?.chartColorArray[xi]
          })
        }
      }
    })

    data?.data?.inputData?.periodTableData?.headings.map((x:any, xind:any) => {
      if(xind>0){
        if(xind == (data?.data?.inputData?.periodTableData?.headings.length - 1) && selectObj?.ddName == "Monthly"){
          pfbData?.push({
            name: data?.data?.inputData?.periodTableData?.headings[xind],
            // y: data?.data?.inputData?.periodTableData?.rowDetails[2]?.tbodyDetails[xind],
            y: Math.round((getTotalIV() - 2 * getTotalIV()) / 12),
            color: data?.data?.inputData?.periodTableData?.rowDetails[2]?.chartColorArray[xind]
          })
        }
        else if(xind == (data?.data?.inputData?.periodTableData?.headings.length - 1) && selectObj?.ddName == "Yearly"){
          pfbData?.push({
            name: data?.data?.inputData?.periodTableData?.headings[xind],
            // y: data?.data?.inputData?.periodTableData?.rowDetails[2]?.tbodyDetails[xind],
            y: Math.round((getTotalIV() - 2 * getTotalIV())),
            color: data?.data?.inputData?.periodTableData?.rowDetails[2]?.chartColorArray[xind]
          })
        }
        else if(typeof CalculatePFB(xind, "actual") == "number" && selectObj?.ddName == "Monthly"){
          pfbData?.push({
            name: data?.data?.inputData?.periodTableData?.headings[xind],
            // y: data?.data?.inputData?.periodTableData?.rowDetails[2]?.tbodyDetails[xind],
            y: CalculatePFB(xind, "actual"),
            color: data?.data?.inputData?.periodTableData?.rowDetails[2]?.chartColorArray[xind]
          })
        }
        else if(typeof CalculatePFB(xind, "actual") == "number" && selectObj?.ddName == "Yearly"){
          pfbData?.push({
            name: data?.data?.inputData?.periodTableData?.headings[xind],
            y: CalculatePFB(xind, "actual"),
            color: data?.data?.inputData?.periodTableData?.rowDetails[2]?.chartColorArray[xind]
          })
        }
        else {
          pfbData?.push({
            name: data?.data?.inputData?.periodTableData?.headings[xind],
            y: 0,
            color: data?.data?.inputData?.periodTableData?.rowDetails[2]?.chartColorArray[xind]
          })
        }
      }
    });


    const categories: any = [];
    data?.data?.inputData?.periodTableData?.headings?.forEach((detail: any, Index: number) => {
      if(Index > 0){
        categories.push(detail);
      }
    });

    const getSeriesData = getbaseLineChartOptions(data?.data?.inputData?.periodTableData, "R");
    const dataValue = getSeriesData[0][0];
    if(data != undefined && data != "" && data != {}){
      dispatch(
        setBaseLineChartOptions({
          data: blData,
          dataLabels: blDataLabels,
          categories: categories,
        })
      );
      dispatch(
        setPotentialChartOptions({
          data: pfbData,
          dataLabels: pfbDataLabels,
          categories: categories,
        })
      );
    }

  }

  function updateee(){
    updateBaselinechart(ReduxPageJson?.JsonData, "");
  }

  const CalculateBL = (value:any) => {
    let selectedId = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.selectedId;
    let selectObj = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.options?.filter((opt:any) => opt.ddId == selectedId)[0];
    let result:any = 0;
    return selectObj?.ddName == "Monthly" && typeof result == "number" ? Math.round((value/12)) : value;
  }

  const CalculatePI = (tdIndex:any) => {
    let totalPFB = ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody?.map((x:any) => x.ImpactValue)?.reduce((a:any,b:any) => a+b);
    let lastIndex = ReduxPageJson?.JsonData?.data?.inputData?.periodTableData?.rowDetails[1]?.tbodyDetails?.length - 1;
    let baselineVal = ReduxPageJson?.JsonData?.data?.inputData?.periodTableData.rowDetails[0].tbodyDetails[tdIndex];
    let lastBaseline = ReduxPageJson?.JsonData?.data?.inputData?.periodTableData.rowDetails[0].tbodyDetails[lastIndex];
    let selectedId = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.selectedId;
    let selectObj = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.options?.filter((opt:any) => opt.ddId == selectedId)[0];
    let result:any = 0;

    if(selectObj?.ddName == "Monthly"){
      if(typeof baselineVal == "number"){
        if(tdIndex == lastIndex){
          result = Math.round(totalIF/12 - Math.abs(baselineVal/12));
        }
        else{
          let val = (CalculatePFB(tdIndex, "actual")) - (baselineVal/12)
          result = Math.round(val);
        }
      }
      else{
        result = baselineVal
      }
      console.log(Math.round(totalIF/12), baselineVal/12, (CalculatePFB(tdIndex, "actual")), result)
    }
    else{
      if(typeof baselineVal == "number"){
        if(tdIndex == lastIndex){
          result = Math.round(totalIF - Math.abs(baselineVal));
        }
        else{
          result = Math.round(CalculatePFB(tdIndex, "actual") - baselineVal);
        }
      }
      else{
        result = baselineVal
      }
      // console.log()
    }

    // console.log("hh",ReduxPageJson?.JsonData?.data?.inputData?.periodTableData.rowDetails[0].tbodyDetails)
    // let result = Number(num1) - Number(num2);
    // return result;
    return result;
  }

  const CalculatePFB = (tdIndex:any, type:any) => {
    let lastIndex = ReduxPageJson?.JsonData?.data?.inputData?.periodTableData?.rowDetails[2]?.tbodyDetails?.length;
    let selectedId = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.selectedId;
    let selectObj = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.options?.filter((opt:any) => opt.ddId == selectedId)[0];
    let result:any = 0;
    if(tdIndex == lastIndex){
      result = ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody?.map((x:any) => x.ImpactValue)?.reduce((a:any,b:any) => a+b)
    }
    else{
      // result = ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody?.[tdIndex-1]?.ImpactValue;
      let tableId = "table_"+(tdIndex);
      let tableObj = ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody?.filter((table:any) => table.tableId == tableId)[0]
      if(tableObj?.disable == false){
        result = getIF("table_"+(tdIndex) , "iv");
      }
      else{
        result = "Not Selected";
      }
      // console.log(result)
      // console.log("table_"+(tdIndex))
    }
    // console.log(result)
    return typeof result == "number" ? selectObj?.ddName == "Monthly" ? Math.round((result/12)) : Math.round(result) : result;
  }

  const PIvalues = (num:any) => {
    let selectedId = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.selectedId;
    let selectObj = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.options?.filter((opt:any) => opt.ddId == selectedId)[0];
    let result:any = 0;
    if(selectObj?.ddName == "Monthly"){
      result = (Number(num)/12);
      // if(String(result)?.split(".").length>1){
      //   result = Math.round(result);
      // }
      // else{
      //   result = Math.round(result);
      // }
    }
    else{
      result = Number(num);
      // if(String(result)?.split(".").length>1){
      //   result = Math.round(result);
      // }
    }
    let final:any = 0;
    // if(String(result)?.split(".").length>1){
    //   final = Math.round(result * 100);
    // }
    return Math.round(result);
  }

  const getselectedDDName = (options: any, selectedId: string) => {
    let selectedDDName = "";
    options.forEach((element: any) => {
      if (element.ddId == selectedId) {
        selectedDDName = element.ddName;
      }
    });
    console.log(selectedDDName)
    return selectedDDName;
  };

  const nextHandleClick = (event: any) => {
    if (jsonData !== "") {
      // @ts-ignore
      document.getElementById("navText").value =
        jsonData.data?.footerData?.forwardBtn?.forwardInputId;
      // @ts-ignore
      document.getElementById("forwardbutton").disabled = false;
      // @ts-ignore
      document.getElementById("forwardbutton").click();
    }
  };

  const inputDetails = ReduxPageJson.JsonData?.data?.inputData;

  const handleDDChange = (ddId: string) => {
    if (ddId != undefined) {
      const updatedJsonData: any = JSON.parse(JSON.stringify(jsonData));
      console.log(updatedJsonData.data.inputData.periodDD.selectedId);
      updatedJsonData.data.inputData.periodDD.selectedId = ddId;

      document.getElementById(ddId)?.click();
      setJSONData(updatedJsonData);

      var keys = Object.keys(updatedJsonData.data.inputData.periodTableData);
      keys.forEach(function (key: any) {
        if (key == ddId) {
          dispatch(
            setDropDown(updatedJsonData.data.inputData?.periodTableData[ddId])
          );
          const rowDetails =
            updatedJsonData.data.inputData.periodTableData[key].rowDetails;
          const seriesValue1 =
            rowDetails[0].tbodyDetails[rowDetails[0].tbodyDetails.length - 1];
          const seriesValue2 =
            rowDetails[rowDetails.length - 1].tbodyDetails[
              rowDetails[rowDetails.length - 1].tbodyDetails.length - 1
            ];

          dispatch(setBarChartOptions([seriesValue1, seriesValue2]));
          const getSeriesData = getbaseLineChartOptions(
            updatedJsonData.data.inputData.periodTableData[key],
            updatedJsonData.data.inputData.currencySymbol
          );

          dispatch(
            setBaseLineChartOptions({
              data: getSeriesData[0],
              categories: getSeriesData[1],
            })
          );
          // const getSeriesPotentialData = getpotentialChartOptions(
          //   updatedJsonData.data.inputData.periodTableData[key]
          // );

          // dispatch(
          //   setPotentialChartOptions({
          //     data: getSeriesPotentialData[0],
          //     categories: getSeriesPotentialData[1],
          //   })
          // );
        }
      });
    }
  };

  const handleDropDownChange = (ddId: string) => {
    if (ddId != undefined) {
      const updatedJsonData: any = JSON.parse(JSON.stringify(jsonData));
      updatedJsonData.data.inputData.potentialIncreaseData.segmentDD.selectedId =
        ddId;
      document.getElementById(ddId)?.click();
      setJSONData(updatedJsonData);
      var options =
        updatedJsonData.data.inputData.potentialIncreaseData.segmentDD.options;
      options.map((option: any) => {
        const mergeKey =
          updatedJsonData.data.inputData.periodDD.selectedId + "-" + ddId;
        var keys = Object.keys(
          updatedJsonData.data.inputData.potentialIncreaseData
            .segmentTableChartData
        );

        keys.forEach(function (key: any) {
          if (key == mergeKey) {
            dispatch(
              setSecDropDown(
                updatedJsonData.data.inputData.potentialIncreaseData
                  .segmentTableChartData[mergeKey]
              )
            );
            dispatch(
              setSegmentChartOptions({
                data: updatedJsonData.data.inputData.potentialIncreaseData
                  .segmentTableChartData[mergeKey].chartDetails,
                categories:
                  updatedJsonData.data.inputData.potentialIncreaseData
                    .segmentTableChartData[mergeKey].chartLabels,
              })
            );
          }
        });
      });
      // updateSegTable();
    }
    // console.log(ddId)
  };

  const timeDDChange = (ddId: string) => {
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson?.JsonData));
    data.data.inputData.periodDD.selectedId = ddId;
    let selectObj = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.options?.filter((opt:any) => opt.ddId == ddId)[0];
    if(selectObj.ddName == "Monthly"){
      setTime("Monthly");
    }
    else{
      setTime("Yearly");
    }
    console.log(data);
    updateReduxJson(data);
    updateBaseChart(data,ddId);
    document.getElementById(ddId)?.click();
    // let selectedId = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.selectedId;
    // let selectObj = ReduxPageJson?.JsonData?.data?.inputData?.periodDD?.options?.filter((opt:any) => opt.ddId == ddId)[0];
    // let result:any = 0;
    // data.data.inputData.periodTableData.rowDetails.map((row:any, ri:any) => {
    //   row.tbodyDetails.map((x:any, i:any) => {
    //     if(selectObj.ddName == "Monthly"){
    //       if(typeof row.tbodyDetails[i] == "number"){
    //         row.tbodyDetails[i] = Math.round(Number(row.tbodyDetails[i])/12);
    //       }
    //     }
    //     else{
    //       if(typeof row.tbodyDetails[i] == "number"){
    //         row.tbodyDetails[i] = Math.round(Number(periodTable.rowDetails[ri].tbodyDetails[i]));
    //       }
    //       console.log(jsonData.data.inputData.periodTableData)
    //     }
    //   })
    // })
  }

  const segmentDDChange = (ddId: string) => {
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson.JsonData));
    data.data.inputData.potentialIncreaseData.segmentDD.selectedId = ddId;

    // let tableId = data.data.inputData.potentialIncreaseData.segmentDD.options.filter((x:any) => x.ddId == ddId)[0].tableId;
    // // console.log("getAllQuartiles", getAllQuartiles(name));
    // let table = data.data.inputData.SalesTables.tbody.filter((x:any) => x.tableId == tableId)[0];
    // let preValues = table.tbodyDetails.map((y:any) => y.rowDetails[4].text);

    // if(preValues.length > 0){
    //   for(var i=0; i<preValues.length; i++){
    //     if(i>0){
    //       preValues[i] = (preValues[i-1]) * (preValues[i]);
    //       preValues[i] = Math.round(preValues[i])
    //     }
    //   }
    //   data.data.inputData.potentialIncreaseData.segmentTableChartData[ddId].tbodyDetails = preValues;
    // }
    // console.log(preValues);

    let tableId = ReduxPageJson.JsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.options.filter((x:any) => x.ddId == ddId)[0].tableId;

    updateSegTable2(data);
    updateReduxJson(data);
    updateSegmentChart(ddId, tableId);
    // console.log(data);
  }

  const updateSegmentChart = (ddId:any, tableId:any) => {

    let chartDetails = ReduxPageJson?.JsonData?.data?.inputData.potentialIncreaseData.segmentTableChartData[ddId].chartDetails.slice();

    const chartColor = ReduxPageJson?.JsonData?.data?.inputData.potentialIncreaseData.segmentTableChartData[ddId].chartColorArray;

    const segementHeading = ReduxPageJson?.JsonData?.data?.inputData?.potentialIncreaseData.segmentTableChartData[ddId].chartLabels;
    
    let tableObj = ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.tbody?.filter((x:any) => x.tableId == tableId)[0];
    
    let series: any = [];
    const seriesName: any = [];
    const categories: any = [];
    const tempdata: any = [];


    for (let i = 0; i < segementHeading?.length; i++) {
      seriesName.push(segementHeading[i]);
    }

    // chartDetails?.push("total")
    // const getSeriesData = getsegmentChartOptions(
    //   ReduxPageJson.JsonData.data.inputData.potentialIncreaseData.segmentTableChartData[ddId],
    //   ReduxPageJson.JsonData.data.inputData.currencySymbol
    // );

    let newArr:any = [];
    // ReturnSGTData(tableId, 0);
    // for(var i=0; i<chartDetails?.length; i++){
    //   let ele = ReturnSGTData(tableId, i);
    //   if(i<chartDetails?.length-1){
    //     // newArr[i] = newArr[i+1] - newArr[i];
    //     // console.log(ReturnSGTData(tableId, i+1))
    //     let newVal = ReturnSGTData(tableId, i+1) - ReturnSGTData(tableId, i);
    //     newArr.push(newVal);
    //     // newArr[i] = newArr[i] - 2*(newArr[i]);
    //   }
    //   else if(i == chartDetails?.length-1){
    //     let newVal = ReturnSGTData(tableId, i) - 2*(ReturnSGTData(tableId, i));
    //     newArr.push(newVal);
    //   }
    //   else{
    //     newArr.push(ele)
    //   }
    //   // else if(i == 0){
    //   //   // newArr[0] = newArr[0] - 5* (newArr[newArr.length-1]);
    //   //   newArr[0] = newArr[0] - 2*newArr[0];
    //   // }
    // }

    if(tableObj?.qbValue == null){
      for(var i=0; i<chartDetails?.length-1; i++){
        newArr.push(ReturnSGTData(tableId, i))
      }
    }
    else{
      for(var i=1; i<chartDetails?.length; i++){
        newArr.push(ReturnSGTData(tableId, i))
      }
    }


    // for(var k=1; k<chartDetails?.length; k++){
    //   newArr[k] = -Math.abs(Math.abs(newArr[k]) - (Math.abs(newArr[k-1])));

    // }

    newArr.splice(0,0,newArr[0])
    for(var i=1; i<newArr.length; i++){
      if(i > 0 && i != newArr.length-1){
        newArr[i] = -Math.abs(newArr[i] - newArr[i+1])
      }
      else if(i == newArr.length-1){
        newArr[i] = -Math.abs(newArr[i])
      }
    }

    //0
    //1 - 0
    //2 - 1

    console.log(newArr,)

    chartDetails?.forEach((detail: any, Index: number) => {
      categories.push(seriesName[Index]);
      tempdata.push({
        // y: detail,
        y: newArr[Index],
        name: seriesName[Index],
        color: chartColor[Index],
      });
    });

    // Original Code
    // chartDetails?.forEach((detail: any, Index: number) => {
    //   categories.push(seriesName[Index]);
    //   tempdata.push({
    //     // y: detail,
    //     y: ReturnSGTData(tableId, Index),
    //     name: seriesName[Index],
    //     color: chartColor[Index],
    //   });
    // });

    series = {
      tempdata,
      dataLabels: {
        enabled: true,
        color: "black",
        bold: false,
        verticalAlign: "bottom",
        y: 0,
        style: {
          textShadow: false,
          textOutline: false,
          fontWeight: "normal",
        },
        formatter: function (this: any) {
          return Highcharts.numberFormat(Math.abs(this.y), 0);
        },
      },
    };

    dispatch(
      setSegmentChartOptions({
        data: series.tempdata,
        dataLabels: series.dataLabels,
        categories: categories,
      })
    );
  }

  // const getAllQuartiles = (saleName:any) => {
  //   let arr:any = [];
  //   let tableIndex = ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.tbody.findIndex((x:any) => x.theading == saleName);
  //   ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.tbody[tableIndex]?.tbodyDetails?.map((row:any) => {
  //     if(row?.rowDetails[5].selectedText?.length>0 && (((row?.rowDetails[5]?.selectedText)/100) > row?.rowDetails[4]?.text)){
  //       arr?.push((row?.rowDetails[5]?.selectedText)/100);
  //     }
  //     else{
  //       arr?.push(row?.rowDetails[4]?.text);
  //     }
  //   })
  //   return arr;
  // }

  const getAllQuartiles = (tableId:any) => {
    let tableobj:any = ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody.filter((X:any) => X.tableId == tableId)[0];
    let arr:any = [];
    if(tableobj?.qbValue != null){
      arr.push(tableobj?.qbValue);
    }
    tableobj?.tbodyDetails.map((row:any) => {
      let selectedOpt = row.rowDetails[3].selectedId;
      let optObj = row.rowDetails[3].options.filter((x:any) => x.ddId == selectedOpt)[0];
      let val = optObj.ddValue;
      let inputVal = row.rowDetails[5].selectedText;
      // debugger

      if(optObj.afterText == "%"){
        if(inputVal?.length > 0 && ((Number(inputVal)/100) > val)){
          arr.push((Number(inputVal) / 100));
        }
        else{
          arr.push(val);
        }
      }
      else{
        if(inputVal?.length > 0 && (Number(inputVal) > val)){
          arr.push(Number(inputVal));
        }
        else{
          arr.push(val);
        }
      }
    });
    // if(tableobj?.qbValue != null){
    //   arr.push(tableobj?.qbValue);
    // }
    return arr;
  }

  const updateSegTable2 = (data:any) => {
    let ddId = data?.data?.inputData?.potentialIncreaseData?.segmentDD?.selectedId;
    let tableId = data?.data?.inputData?.potentialIncreaseData?.segmentDD?.options?.filter((x:any) => x.ddId == ddId)[0].tableId;
    // console.log("getAllQuartiles", getAllQuartiles(name));
    let table = data?.data?.inputData.SalesTables.tbody.filter((x:any) => x.tableId == tableId)[0];
    let preValues = table?.tbodyDetails.map((y:any) => y.rowDetails[4].text);

    if(preValues?.length > 0){
      for(var i=0; i<preValues?.length; i++){
        if(i>0){
          preValues[i] = (preValues[i-1]) * (preValues[i]);
          preValues[i] = Math.round(preValues[i])
        }
      }
      data.data.inputData.potentialIncreaseData.segmentTableChartData[ddId].tbodyDetails = preValues;
    }
    console.log(preValues);
    updateReduxJson(data);
  }

  const getIF = (tableId:any, type:any) => {

    let tableQuartiles = getAllQuartiles(tableId);
    if(tableQuartiles.length > 0){
      if(type == "if"){
        return Math.round(tableQuartiles.reduce((a:any, b:any) => a*b));
      }
      else{
        return Math.round((tableQuartiles.reduce((a:any, b:any) => a*b))*ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.ARPU);
      }
    }
  }

  const updateSegTable = (num:any) => {
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson.JsonData));
    let selectedId = data.data?.inputData?.potentialIncreaseData?.segmentDD?.selectedId;
    let selectedtableId = data.data?.inputData?.potentialIncreaseData?.segmentDD?.options?.filter((x:any) => x.ddId == selectedId)[0].tableId;
    let preValues = getAllQuartiles(selectedtableId);
    // console.log(selectedSaleName);
    
    if(preValues.length > 0){
      for(var i=0; i<preValues.length; i++){
        if(i>0){
          preValues[i] = (preValues[i-1]) * (preValues[i]);
          preValues[i] = Math.round(preValues[i])
        }
      }
      if(data != undefined){
        data.data.inputData.potentialIncreaseData.segmentTableChartData[selectedId].tbodyDetails = preValues;
      }
      return preValues[num];
    }
    else{
      return 0;
    }

  }

  // const saleDDChange = (e:any) => {
  //   let data = JSON.parse(JSON.stringify(jsonData));
  //   console.log(data)
  //   //@ts-ignore
  //   data.data.inputData.potentialIncreaseData?.segmentDD?.selectedId = e.target.value;
  //   setJSONData(data);
  // }

  const onLoadUpdates = () => {
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson?.JsonData));
    // data?.data?.inputData?.SalesTables?.tbody?.map((table:any, ti:any) => {
    //   table?.tbodyDetails?.map((row:any, ri:any) => {
    //     if(row[4] != undefined){
    //       row[4].text = row[3]?.options.filter()
    //     }
    //   })
    // })
    let selectedsale = data?.data?.inputData?.potentialIncreaseData?.segmentDD?.selectedId;
    // data?.data?.inputData?.potentialIncreaseData?.segmentTableChartData?.map((segment:any) => {
    //   console.log(Object.keys(segment))
    // })
    // if(data != undefined && data != null){
    //   let saleIds = Object.keys(inputDetails?.potentialIncreaseData?.segmentTableChartData)
    //   console.log(saleIds)
    // }




      let pfbArr:any = [];
      let potentialArr:any = [];
      let prePOTArr = data?.data?.inputData?.periodTableData?.rowDetails[1]?.tbodyDetails;
      let prePFBArr = data?.data?.inputData?.periodTableData?.rowDetails[2]?.tbodyDetails;
      prePOTArr?.splice(1,prePOTArr?.length-1);
      prePFBArr?.splice(1,prePFBArr?.length-1);
      data?.data?.inputData?.SalesTables?.tbody.map((x:any) => prePFBArr?.push(x.ImpactValue));
      prePFBArr?.push(getTotalIV());
      console.log(prePFBArr)
  
      data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails?.map((ele:any, ind:any) => {
        if(ind>0){
          if(typeof ele == "number"){
            let potentialVal =  data?.data?.inputData?.periodTableData?.rowDetails[2]?.tbodyDetails[ind] - ele;
            potentialArr?.push(Math.round(potentialVal))
            pfbArr?.push(Math.round(ele * data?.data?.inputData?.SalesTables?.ARPU));
          }
          else{
            potentialArr.push(ele);
            pfbArr.push(ele);
          }
        }
      });

    if(data != undefined && data != "" && Object.keys(data).length>0){

      
        data.data.inputData.periodTableData.rowDetails[1].tbodyDetails = prePOTArr.concat(potentialArr);
        data.data.inputData.periodTableData.rowDetails[2].tbodyDetails = prePFBArr
        // setJSONData(data);
        setPeriodTable(data.data.inputData.periodTableData);
        updateReduxJson(data);
    }
    // setJSONData(data);
  }

  const getTotalIV = () => {
    let arr:any = [];
    // arr = ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody?.map((x:any) => x.ImpactValue);
    ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody?.map((x:any,i:any) => {
      if(x.disable == false){
        arr.push(getIF("table_"+(i+1),"iv"))
      }
    });
    let result:any = 0;
    if(arr.length > 0){
      result = arr?.reduce((a:any,b:any) => Number(a) + Number(b));
      setTotalIf(result);
    }
    return result; 
  }

  const ReturnSGTData = (tableId:any, index:any) => {
    let tableObj = ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.tbody?.filter((x:any) => x.tableId == tableId)[0];
    // tableObj?.tbodyDetails.map((obj:any) => {
    //   obj.rowDetails[]
    // })
    let preValues = getAllQuartiles(tableId);
    if(preValues.length > 0){
      for(var i=0; i<preValues.length; i++){
        if(i>0){
          preValues[i] = (preValues[i-1]) * (preValues[i]);
          preValues[i] = Math.round(preValues[i])
        }
      }
      return time == "Monthly" ? Math.round(preValues[index]/12) : preValues[index];
    }
    else{
      return 0;
    }
    // console.log(quartiles[index+1])
    // return quartiles[index];
  }

  return (
    <div className="contactpage-container">
      <SecondaryHeader sidebar={false} />
      <div className="contactpage-container__inr">
        <div className="contactpage-container__inr__section">
          <div className="dropdown-container">
            <Grid
              container
              sx={{ alignItems: "center", pb: 2 }}
              xs={12}
              md={12}
            >
              <Grid item xs={12} sx={{ paddingRight: "20px" }}>
                {inputDetails != undefined ? (
                  <HsddInput
                    question={inputDetails?.periodDD}
                    onChange={(ddId: string) => timeDDChange(ddId)}
                  />
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </div>
          <div className="single-dropdown-section">
            <div className="single-dropdown-section__header">
              <p className="header-text">{inputDetails?.heading}</p>
            </div>
          </div>
          <div className="chart-container">
            <BarChart />
          </div>
          <Box className="outputTable-container" sx={{ mb: 5 }}>
            <div className="outputTable-container__inr">
              <div className="outputTable-container__inr__header">
                {ReduxPageJson.JsonData?.data?.inputData?.periodTableData?.headings?.map((heading: any) => {
                  return (
                    <div
                      className={
                        heading == "" ? "table-col__empty" : "table-col"
                      }
                    >
                      <span>{heading}</span>
                    </div>
                  );
                })}
              </div>
              <div className="outputTable-container__inr__body">
                {ReduxPageJson?.JsonData?.data?.inputData?.periodTableData?.rowDetails?.map(
                  (rowDetail: any, rowIndex: number) => {
                    const currencySymbol =
                      inputDetails?.periodTableData?.A5_1_label?.currencySymbol;
                    return (
                      <div className="table-col" key={rowIndex}>
                        {rowDetail?.tbodyDetails.map((tbodyDetail: any, tdIndex:any) => {
                          return typeof tbodyDetail == "number" ? (
                            <div className="table-row">
                                <div
                                  className={
                                    CalculatePFB(tdIndex, "display") > CalculateBL(tbodyDetail) && rowIndex == 1
                                      ? 
                                        "arrowUpicon"
                                      : 
                                        CalculatePFB(tdIndex, "display") < CalculateBL(tbodyDetail) && rowIndex == 1
                                        ? 
                                          "arrowDownicon" 
                                        :
                                          totalIF < ReduxPageJson?.JsonData?.data?.inputData?.periodTableData.rowDetails[0].tbodyDetails[rowDetail?.tbodyDetails.length - 1] && rowIndex == 1 && tdIndex == rowDetail?.tbodyDetails.length - 1
                                          ? 
                                          "arrowDownicon"
                                          :
                                          totalIF > ReduxPageJson?.JsonData?.data?.inputData?.periodTableData.rowDetails[0].tbodyDetails[rowDetail?.tbodyDetails.length - 1] && rowIndex == 1 && tdIndex == rowDetail?.tbodyDetails.length - 1
                                          ?
                                          "arrowUpicon"
                                          :
                                          "emptyicon"
                                  }
                                >
                                </div>
                              {
                                rowIndex == 1
                                ?
                                // <span>{totalIF}</span>
                                <span>{typeof CalculatePI(tdIndex) == "number" ? numberWithCommas(Math.abs(CalculatePI(tdIndex))) : CalculatePI(tdIndex)}</span>
                                :
                                rowIndex == 2 
                                ? 
                                tdIndex == (rowDetail?.tbodyDetails.length-1)
                                ?
                                // <span>{ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody?.map((x:any) => x.ImpactValue)?.reduce((a:any,b:any) => a+b)}</span>
                                // <span>{time == "Monthly" ? ((ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody?.map((x:any) => x.ImpactValue)?.reduce((a:any,b:any) => a+b))/12) : ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody?.map((x:any) => x.ImpactValue)?.reduce((a:any,b:any) => a+b)}</span>
                                <span>{time == "Monthly" ? numberWithCommas(Math.abs(Math.round(totalIF/12))) : numberWithCommas(Math.abs(totalIF))}</span>
                                :
                                <span>{typeof CalculatePI(tdIndex) == "number" ? numberWithCommas(CalculatePFB(tdIndex, "display")) : CalculatePFB(tdIndex, "display")}</span>
                                :
                                <span>{numberWithCommas(Math.round(CalculateBL(tbodyDetail)))}</span>
                              }
                              
                            </div>
                          ) : (
                            <div className="table-row">
                              <span>{tbodyDetail}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="outputTable-container__md">
              <div className="title-container">
                {inputDetails?.periodTableData?.A5_1_label?.rowDetails?.map(
                  (rowDetail: any, rowIndex: number) => {
                    return (
                      <>
                        <p>{rowDetail?.tbodyDetails[0]}</p>
                      </>
                    );
                  }
                )}
              </div>
            </div>
          </Box>
          <div className="chart-container multiple-charts">
            <div className="chart-container__inr">
              <div className="chart-baseline">
                <BaselineChart />
              </div>
              <div className="chart-futurebaseline">
                <PotentialChart />
              </div>
            </div>
          </div>
        </div>

        <DynamicTable />

        <div className="contactpage-container__inr__section">
          <div className="single-dropdown-section">
            <div className="single-dropdown-section__header">
              <p className="header-text">
                {inputDetails?.potentialIncreaseData?.heading}
              </p>
            </div>
          </div>
          <div className="dropdown-container">
            <div className="single-dropdown-section__body">
              <div className="title-container">
                <p>
                  {inputDetails?.potentialIncreaseData?.segmentDD?.description}
                </p>
              </div>
            </div>
            <Grid
              container
              sx={{ alignItems: "center", pb: 2 }}
              xs={12}
              md={12}
            >
              <Grid item xs={12} sx={{ paddingRight: "20px" }}>
                {inputDetails != undefined ? (
                  <HsddInput
                    question={inputDetails?.potentialIncreaseData?.segmentDD}
                    onChange={(ddId: string) => segmentDDChange(ddId)}
                  />
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </div>

          <Box className="outputTable-container" sx={{ mb: 5 }}>
            <div className="outputTable-container__inr">
              <div className="outputTable-container__inr__header">
                {ReduxPageJson.JsonData?.data?.inputData?.potentialIncreaseData?.segmentTableChartData?.[selectedSegment]?.headings?.map((el: any) => {
                  return (
                    <div className="table-col">
                      <span>{el}</span>
                    </div>
                  );
                })}
              </div>
              <div className="outputTable-container__inr__body">
                <div className="table-col">
                  {ReduxPageJson.JsonData?.data?.inputData?.potentialIncreaseData?.segmentTableChartData?.[selectedSegment]?.headings?.map(
                    (el: any, eleIndex:any) => {
                      return (
                        <div className="table-row">
                          {/* {ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.tbody?.filter((y:any) => y.tableId == ReduxPageJson.JsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.options.filter((x:any) => x.ddId == selectedSegment)[0].tableId)[0].qbValue != null ? 
                          <span>{ReturnSGTData(ReduxPageJson.JsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.options.filter((x:any) => x.ddId == selectedSegment)[0].tableId, (eleIndex+1))}</span>
                          :
                          <span>{ReturnSGTData(ReduxPageJson.JsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.options.filter((x:any) => x.ddId == selectedSegment)[0].tableId, eleIndex)}</span>
                          } */}
                          {/* <span>{time == "Monthly" ? Math.round(ReturnSGTData(ReduxPageJson.JsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.options.filter((x:any) => x.ddId == selectedSegment)[0].tableId, eleIndex)/12) : ReturnSGTData(ReduxPageJson.JsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.options.filter((x:any) => x.ddId == selectedSegment)[0].tableId, eleIndex)}</span> */}
                          <span>{ReturnSGTData(ReduxPageJson.JsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.options.filter((x:any) => x.ddId == selectedSegment)[0].tableId, eleIndex)}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </Box>
          <div className="chart-container">
            <div className="chart-container__waterfall">
              <SegmentChart />
            </div>
          </div>
        </div>
      </div>
      <Footer>
        <Divider />
        <div className="button-container justi">
          {jsonData?.data?.footerData?.previousTxt != "" && (
            <div>
              <CustomButton
                className={"submitButton mar-right common-width"}
                onClick={(e: any) =>
                  nextHandleClick(jsonData?.data?.footerData?.previousInputId)
                }
              >
                {getParsedData(jsonData?.data?.footerData?.previousTxt)}
              </CustomButton>
            </div>
          )}

          {jsonData?.data?.footerData?.forwardTxt && (
            <div>
              <CustomButton
                className={"submitButton next-button common-width"}
                onClick={(e: any) =>
                  nextHandleClick(jsonData?.data?.footerData?.forwardInputId)
                }
              >
                {getParsedData(jsonData?.data?.footerData?.forwardTxt)}
              </CustomButton>
            </div>
          )}
        </div>
      </Footer>
    </div>
  );
};
export default CustomizedIC;
