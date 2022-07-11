import { Grid, Box, Divider, Select, MenuItem } from "@mui/material";
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
import {
  setDropDown,
  setSecDropDown,
} from "../../redux/actions/HighChartDropDownAction";
import store from "../../redux/store";
import {
  setBarChartOptions,
  setBaseLineChartOptions,
  setPotentialChartOptions,
  setSegmentChartOptions,
} from "../../redux/actions/HighChartAction";
import {
  getbaseLineChartOptions,
  getpotentialChartOptions,
} from "../../utils/highchartOptionUtil";
import { useSelector } from "react-redux";
import "../CustomizedIC/CustomizedIC.scss";
import { setPageJson } from "../../redux/actions/JsonDataActions";
import { Inputbox } from "../UI/Input";
import DynamicTable from "../UI/DynamicTable";

const CustomizedIC = () => {
  const [ jsonData, setJSONData ] = useState<any>("");
  const { dropdown } = useSelector((state: any) => state);
  const { ReduxPageJson } = useSelector((state: any) => state);

  const [ selectedSegment, setSelectedSegment ] = useState<any>("Hidsegment_1_label");

  const { dispatch } = store;

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerHTML)
    );
    // onLoadUpdates();
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
    onLoadUpdates();
  },[jsonData]);

  useEffect(() => {
    let segmentId = ReduxPageJson?.JsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.selectedId;
    setSelectedSegment(segmentId);
    // updateSegTable();
  }, [ReduxPageJson])

  function newJson(){
    dispatch(setPageJson(jsonData));
    // console.log("ReduxPageJson", ReduxPageJson.JsonData.data)
  }

  const updateReduxJson = (json:any) => {
    dispatch(setPageJson(json));
  }

  const CalculatePI = (num1:any, num2:any) => {
    let result = Number(num1) - Number(num2);
    // console.log(num1,num2,result)
    return result;
  }

  const CalculatePFB = (num1:any, arpu:any) => {
    let result = Number(num1) * Number(arpu);
    // console.log(num1,num2,result)
    return result;
  }

  const PIvalues = (num:any) => {
    let selectedId = jsonData?.data?.inputData?.periodDD?.selectedId;
    let selectObj = jsonData?.data?.inputData?.periodDD?.options?.filter((opt:any) => opt.ddId == selectedId)[0];
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
    data = JSON.parse(JSON.stringify(ReduxPageJson.JsonData));
    if(data != undefined && data != "" && data != {}){
      data.data.inputData.periodDD.selectedId = ddId;
      updateReduxJson(data);
    }
    document.getElementById(ddId)?.click();

    // console.log(data)
  }

  const segmentDDChange = (ddId: string) => {
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson.JsonData));
    data.data.inputData.potentialIncreaseData.segmentDD.selectedId = ddId;

    let name = data.data.inputData.potentialIncreaseData.segmentDD.options.filter((x:any) => x.ddId == ddId)[0].ddName;
    console.log("getAllQuartiles", getAllQuartiles(name));
    let preValues = getAllQuartiles(name);

    if(preValues.length > 0){
      for(var i=0; i<preValues.length; i++){
        if(i>0){
          preValues[i] = (preValues[i-1]) * (preValues[i]);
          preValues[i] = Math.round(preValues[i])
        }
      }
      data.data.inputData.potentialIncreaseData.segmentTableChartData[ddId].tbodyDetails = preValues;
    }

    updateReduxJson(data);
    console.log(data)
  }

  const getAllQuartiles = (saleName:any) => {
    let arr:any = [];
    let tableIndex = ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.tbody.findIndex((x:any) => x.theading == saleName);
    ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.tbody[tableIndex]?.tbodyDetails?.map((row:any) => {
      if(row?.rowDetails[5].selectedText?.length>0 && (((row?.rowDetails[5]?.selectedText)/100) > row?.rowDetails[4]?.text)){
        arr?.push((row?.rowDetails[5]?.selectedText)/100);
      }
      else{
        arr?.push(row?.rowDetails[4]?.text);
      }
    })
    return arr;
  }

  const updateSegTable = (num:any) => {
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson.JsonData));
    let selectedId = data.data?.inputData?.potentialIncreaseData?.segmentDD?.selectedId;
    let selectedSaleName = data.data?.inputData?.potentialIncreaseData?.segmentDD?.options?.filter((x:any) => x.ddId == selectedId)[0].ddName;
    let preValues = getAllQuartiles(selectedSaleName);
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
    data = JSON.parse(JSON.stringify(jsonData));
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
    data?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails.map((ele:any, ind:any) => {
      if(ind>0){
        if(typeof ele == "number"){
          let potentialVal =  (ele * data?.data?.inputData?.SalesTables?.ARPU) - ele;
          potentialArr.push(Math.round(potentialVal))
          pfbArr.push(Math.round(ele * data?.data?.inputData?.SalesTables?.ARPU));
        }
        else{
          potentialArr.push(ele);
          pfbArr.push(ele);
        }
      }
    });

    if(data != undefined && data != ""){
        let prePOTArr = data.data.inputData.periodTableData.rowDetails[1].tbodyDetails;
        let prePFBArr = data.data.inputData.periodTableData.rowDetails[2].tbodyDetails;
        data.data.inputData.periodTableData.rowDetails[1].tbodyDetails = prePOTArr.concat(potentialArr);
        data.data.inputData.periodTableData.rowDetails[2].tbodyDetails = prePFBArr.concat(pfbArr);
        updateReduxJson(data);
    }
    // setJSONData(data);
  }

  return (
    <div className="contactpage-container">
      <SecondaryHeader sidebar={false} />
      <div className="contactpage-container__inr">
        <button onClick={() => {console.log(ReduxPageJson.JsonData);}}>Console JsonData</button>
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

                              {/* {rowIndex == 0 ? 
                              <span>{PIvalues(tbodyDetail)}</span>
                              :
                              rowIndex == 1 ?
                              <span>{PIvalues(CalculatePI(jsonData?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[tdIndex], jsonData?.data?.inputData?.periodTableData?.rowDetails[2]?.tbodyDetails[tdIndex]))}</span> 
                              : 
                              <span>{PIvalues(CalculatePFB(jsonData?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[tdIndex], jsonData?.data?.inputData?.SalesTables?.ARPU))}</span>
                              } */}
                              
                              {/* <span className="currency-symbol">
                                {currencySymbol}
                              </span> */}
                              <span>{PIvalues(tbodyDetail)}</span>
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
                  {ReduxPageJson.JsonData?.data?.inputData?.potentialIncreaseData?.segmentTableChartData?.[selectedSegment]?.tbodyDetails?.map(
                    (el: any, i:any) => {
                      return (
                        <div className="table-row">
                          <span>{updateSegTable(i)}</span>
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
          <div>
            <CustomButton
              className={"submitButton next-button"}
              onClick={(e: any) => nextHandleClick(e)}
            >
              {getParsedData(
                jsonData?.data?.footerData?.forwardBtn?.forwardBtntxt
              )}
            </CustomButton>
          </div>
        </div>
      </Footer>
    </div>
  );
};
export default CustomizedIC;
