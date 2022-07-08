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
    onLoadUpdates();
  },[jsonData])

  function newJson(){
    dispatch(setPageJson(jsonData));
    console.log("ReduxPageJson", ReduxPageJson.JsonData.data)
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

        console.log(mergeKey);

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
    }
  };

  const saleDDChange = (e:any, tableIndex:any, ri:any, detailIndex:any, options:any) => {
    let data = {...jsonData};
    //@ts-ignore
    data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[detailIndex].selectedId = e.target.value;
    data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[4].text = options.filter((x:any) => x.ddId == e.target.value)[0].ddValue
    setJSONData(data);
  }

  const updateText = (e:any, tableIndex:any, ri:any, detailIndex:any) => {
    let data = {...jsonData};
    //@ts-ignore
    data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[detailIndex].selectedText = e.target.value;
    setJSONData(data);
  }

  const getImpactFactor = (tableIndex:any) =>{
    let allQuartiles:any = [];
    // jsonData?.data?.inputData?.SalesTables?.tbody[tableIndex]?.tbodyDetails?.map((row:any) => {
    //   if(row?.rowDetails?.type == "Select"){
    //     row?.rowDetails?.options?.map((opt:any) => {
    //       allQuartiles?.push(opt.ddValue);
    //     })
    //   }
    // })
    jsonData?.data?.inputData?.SalesTables?.tbody[tableIndex]?.tbodyDetails?.map((row:any) => {
      allQuartiles?.push(row?.rowDetails[4].text);
    })
    // allQuartiles.forEach((element:any, index:any) => {
    //   if(index>0){
    //     element = (Number(element))/100;
    //   }
    // });

    // for(var i=0; i<allQuartiles.length; i++){
    //   if(i>0){
    //     allQuartiles[i] = (Number(allQuartiles[i]))/100;
    //   }
    // }

    let calValue:any = 0; 

    if(allQuartiles.length > 0){
      // console.log(allQuartiles?.reduce((a:any,b:any) => a*b));
      calValue = allQuartiles?.reduce((a:any,b:any) => a*b);
      console.log(allQuartiles);
    }

    return Math.round(calValue);
  }

  const onLoadUpdates = () => {
    let data = {...jsonData};
    data?.data?.inputData?.SalesTables?.tbody?.map((table:any, ti:any) => {
      table?.tbodyDetails?.map((row:any, ri:any) => {
        if(row[4] != undefined){
          row[4].text = row[3]?.options.filter()
        }
      })
    })
    console.log(data)
    // setJSONData(data);
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
                {dropdown?.selectedData?.headings?.map((heading: any) => {
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
                {dropdown?.selectedData?.rowDetails?.map(
                  (rowDetail: any, rowIndex: number) => {
                    const currencySymbol =
                      inputDetails?.periodTableData?.A5_1_label?.currencySymbol;
                    return (
                      <div className="table-col" key={rowIndex}>
                        {rowDetail?.tbodyDetails.map((tbodyDetail: any) => {
                          return typeof tbodyDetail == "number" ? (
                            <div className="table-row">
                              <span>{tbodyDetail}</span>
                              <span className="currency-symbol">
                                {currencySymbol}
                              </span>
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
                  <div>{"Impact factor : " + getImpactFactor(tableIndex)}</div>
                  <div>{"Impact Value : " + (getImpactFactor(tableIndex) * jsonData?.data?.inputData?.SalesTables?.ARPU)}</div>
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
                              onChange={(e) => saleDDChange(e, tableIndex, ri, detailIndex, detail.options)}
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

        {/* <div className="table_section">
          <div>Inbound sales</div>
          <div>
            <div className="t-row">
              <div className="t-data">
                <span>One</span>
              </div>
              <div className="t-data">
                <span>One</span>
              </div>
              <div className="t-data">
                <span>One</span>
              </div>
              <div className="t-data">
                <span>One</span>
              </div>
              <div className="t-data">
                <span>One</span>
              </div>
              <div className="t-data">
                <span>One</span>
              </div>
            </div>
            <div className="t-row">
              <div className="t-data">
                <span>One</span>
              </div>
              <div className="t-data">
                <span>One</span>
              </div>
              <div className="t-data">
                <span>One</span>
              </div>
              <div className="t-data">
                <span>One</span>
              </div>
              <div className="t-data">
                <span>One</span>
              </div>
              <div className="t-data">
                <span>One</span>
              </div>
            </div>
          </div>
          <div>Three</div>
          <div>Four</div>
        </div> */}

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
                {dropdown?.selectSecondDropDown?.headings?.map((el: any) => {
                  return (
                    <div className="table-col">
                      <span>{el}</span>
                    </div>
                  );
                })}
              </div>
              <div className="outputTable-container__inr__body">
                <div className="table-col">
                  {dropdown?.selectSecondDropDown?.tbodyDetails?.map(
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
