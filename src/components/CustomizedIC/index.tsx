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
  const [jsonData, setJSONData] = useState<any>("");
  const { dropdown } = useSelector((state: any) => state);
  const { ReduxPageJson } = useSelector((state: any) => state);

  const { dispatch } = store;

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerHTML)
    );
  }, []);

  useEffect(() => {
    handleDDChange(jsonData?.data?.inputData?.periodDD?.selectedId);
    handleDropDownChange(
      jsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.selectedId
    );
  }, [jsonData?.data?.inputData?.periodDD?.selectedId]);

  useEffect(() => {
    getImpactFactor(0);
    newJson()
    // onLoadUpdates();
    onLoadUpdates();
  },[jsonData])

  function newJson(){
    dispatch(setPageJson(jsonData));
    // console.log("ReduxPageJson", ReduxPageJson.JsonData.data)
  }

  const CalculatePI = (num1:any, num2:any) => {
    let result = Number(num1) - Number(num2);
    // console.log(num1,num2,result)
    return result;
  }

  const PIvalues = (num:any, isLastVal:any) => {
    let selectedId = jsonData?.data?.inputData?.periodDD?.selectedId;
    let selectObj = jsonData?.data?.inputData?.periodDD?.options?.filter((opt:any) => opt.ddId == selectedId)[0];
    let result:any = 0;
    if(selectObj?.ddName == "Monthly" && isLastVal==false){
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

  const inputDetails = jsonData?.data?.inputData;

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
      updateSegTable(ddId)
    }
    console.log(ddId)
  };

  const updateSegTable = (ddId:any) => {
    let selectedSale = jsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.options.filter((x:any) => x.ddId == ddId)[0].ddName;
    let data = JSON.parse(JSON.stringify(jsonData));
    data.data.inputData.potentialIncreaseData.segmentTableChartData[ddId].tbodyDetails = getAllQuartiles(selectedSale);
    setJSONData(data);
  }

  const timeDDChange = (e:any, tableIndex:any, ri:any, detailIndex:any, options:any) => {
    let data = JSON.parse(JSON.stringify(jsonData));
    console.log(data)
    //@ts-ignore
    data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[detailIndex].selectedId = e.target.value;
    data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[4].text = options.filter((x:any) => x.ddId == e.target.value)[0].ddValue
    setJSONData(data);
  }

  // const saleDDChange = (e:any) => {
  //   let data = JSON.parse(JSON.stringify(jsonData));
  //   console.log(data)
  //   //@ts-ignore
  //   data.data.inputData.potentialIncreaseData?.segmentDD?.selectedId = e.target.value;
  //   setJSONData(data);
  // }

  const updateText = (e:any, tableIndex:any, ri:any, detailIndex:any) => {
    let data = JSON.parse(JSON.stringify(jsonData));
    //@ts-ignore
    data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[detailIndex].selectedText = e.target.value;
    setJSONData(data);
    getImpactFactor(tableIndex);
  }

  const getImpactFactor = (saleName:any) =>{
    let allQuartiles:any = [];

    // jsonData?.data?.inputData?.SalesTables?.tbody[tableIndex]?.tbodyDetails?.map((row:any) => {
    //   if(row?.rowDetails[5].selectedText?.length>0 && (((row?.rowDetails[5]?.selectedText)/100) > row?.rowDetails[4]?.text)){
    //     allQuartiles?.push((row?.rowDetails[5]?.selectedText)/100);
    //   }
    //   else{
    //     allQuartiles?.push(row?.rowDetails[4]?.text);
    //   }
    // })

    allQuartiles = getAllQuartiles(saleName)

    let calValue:any = 0; 
    if(allQuartiles.length > 0){
      calValue = allQuartiles?.reduce((a:any,b:any) => a*b);
    }
    return Math.round(calValue);
  }

  const getAllQuartiles = (saleName:any) => {
    let arr:any = [];
    let tableIndex = jsonData?.data?.inputData?.SalesTables?.tbody.findIndex((x:any) => x.theading == saleName);
    jsonData?.data?.inputData?.SalesTables?.tbody[tableIndex]?.tbodyDetails?.map((row:any) => {
      if(row?.rowDetails[5].selectedText?.length>0 && (((row?.rowDetails[5]?.selectedText)/100) > row?.rowDetails[4]?.text)){
        arr?.push((row?.rowDetails[5]?.selectedText)/100);
      }
      else{
        arr?.push(row?.rowDetails[4]?.text);
      }
    })
    return arr;
  }

  const onLoadUpdates = () => {
    let data = JSON.parse(JSON.stringify(jsonData));
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

    // setJSONData(data);
  }

  return (
    <div className="contactpage-container">
      <SecondaryHeader sidebar={false} />
      <div className="contactpage-container__inr">
        <button onClick={() => console.log(jsonData)}>Console JsonData</button>
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
                    onChange={(ddId: string) => handleDDChange(ddId)}
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
                {jsonData?.data?.inputData?.periodTableData?.headings?.map((heading: any) => {
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
                {jsonData?.data?.inputData?.periodTableData?.rowDetails?.map(
                  (rowDetail: any, rowIndex: number) => {
                    const currencySymbol =
                      inputDetails?.periodTableData?.A5_1_label?.currencySymbol;
                    return (
                      <div className="table-col" key={rowIndex}>
                        {rowDetail?.tbodyDetails.map((tbodyDetail: any, tdIndex:any) => {
                          return typeof tbodyDetail == "number" ? (
                            <div className="table-row">

                              {rowIndex == 1 ? 
                              <span>{((rowDetail?.tbodyDetails.length-1) == tdIndex) ? PIvalues(CalculatePI(jsonData?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[tdIndex], jsonData?.data?.inputData?.periodTableData?.rowDetails[2]?.tbodyDetails[tdIndex]), true) : PIvalues(CalculatePI(jsonData?.data?.inputData?.periodTableData?.rowDetails[0]?.tbodyDetails[tdIndex], jsonData?.data?.inputData?.periodTableData?.rowDetails[2]?.tbodyDetails[tdIndex]), false)}</span> 
                              : 
                              <span>{((rowDetail?.tbodyDetails.length-1) == tdIndex) ? PIvalues(tbodyDetail,true) : PIvalues(tbodyDetail,false)}</span>}

                              {/* <span className="currency-symbol">
                                {currencySymbol}
                              </span> */}
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

        <div className="contactpage-container__inr__section">
          {jsonData?.data?.inputData?.SalesTables?.tbody?.map((table: any, tableIndex: any) => (
            <>
              <Box className="outputTable-container" sx={{ mb: 5 }}>
                <div className="outputTable-container__inr">
                  <div>{table.theading}</div>
                  <div>{"Impact factor : " + getImpactFactor(table.theading)}</div>
                  <div>{"Impact Value : " + (getImpactFactor(table.theading) * jsonData?.data?.inputData?.SalesTables?.ARPU)}</div>
                  <div>{Math.round(0.729 * 100)}</div>

                  <div className="outputTable-container__inr__body">
                    {table.tbodyDetails?.map((row: any, ri: any) => (
                      <div className="table-col" key={ri}>
                        {row.rowDetails.map((detail: any, detailIndex: any) => (
                          <div className="table-row">
                            {(detail.type == "String") ? (
                              <span>{detail.text}</span>
                            )
                          :
                          detail.type == "Select" ? 
                          (
                            <Select
                              sx={{ p: 0, borderRadius: 0, mb: 1 ,width:"100%"}}
                              className="inputField cutom-input-field"
                              defaultValue={detail.selectedId}
                              displayEmpty
                              renderValue={(selected) => {
                                if (selected?.length === 0) {
                                  return <>{"Select"}</>;
                                }
                                return selected;
                              }}
                              value={detail.options.filter((x:any) => x.ddId == detail?.selectedId)[0]?.ddName}
                              onChange={(e) => timeDDChange(e, tableIndex, ri, detailIndex, detail.options)}
                              error={false}
                            >
                              <MenuItem disabled value="none" className="selectItem">
                                <>{"Select"}</>
                              </MenuItem>
                              {detail?.options?.map((option: any) => (
                                <MenuItem value={option?.ddId} className="selectItem">
                                  {option?.ddName}
                                </MenuItem>
                              ))}
                            </Select>
                          )
                          :
                          detail.type == "Input" ?
                          (<>
                            {/* <Inputbox
                              value={detail?.selectedText}
                              onChange={(e:any) => updateText(e, tableIndex, ri, detailIndex)}
                            /> */}
                            <input value={detail?.selectedText}
                            onChange={(e:any) => updateText(e, tableIndex, ri, detailIndex)}
                            />
                          </>)
                          :
                          detail.type == "Number" ?
                          (
                            <>
                              {(String(detail.text)).split(".").length > 1 ? 
                                <span>{Math.round(detail.text * 100) + "%"}</span>
                                :
                                <span>{detail.text}</span>
                            }
                            </>
                          )
                          :
                          ""
                          }
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </Box>
            </>
          ))}
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
                    onChange={(ddId: string) => handleDropDownChange(ddId)}
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
                {jsonData?.data?.inputData?.potentialIncreaseData?.segmentTableChartData?.Hidsegment_1_label?.headings?.map((el: any) => {
                  return (
                    <div className="table-col">
                      <span>{el}</span>
                    </div>
                  );
                })}
              </div>
              <div className="outputTable-container__inr__body">
                <div className="table-col">
                  {jsonData?.data?.inputData?.potentialIncreaseData?.segmentTableChartData?.Hidsegment_1_label?.tbodyDetails?.map(
                    (el: any) => {
                      return (
                        <div className="table-row">
                          <span>{el}</span>
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
