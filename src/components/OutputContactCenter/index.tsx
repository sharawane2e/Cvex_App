import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  Box,
  Divider,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import SecondaryHeader from "../Headers/SecondaryHeader";
import "./OutputContactCenter.scss";
import BarChart from "../UI/BarChart";
import { Footer } from "../Footer";
import { getParsedData } from "../../utils/parserUtil";
import CustomButton from "../UI/CustomButton";
import HighchartsReact from "highcharts-react-official";
import BaselineChart from "../UI/BaselineChart";
import PotentialChart from "../UI/PotentialChart";
import SegmentChart from "../UI/SegmentChart";
import HsddInput from "../ImpactCalculator/HsddInput";
import { setDropDown } from "../../redux/actions/HighChartDropDownAction";
import store from "../../redux/store";
import {
  setBarChartOptions,
  setBaseLineChartOptions,
} from "../../redux/actions/HighChartAction";
import { getbaseLineChartOptions } from "../../utils/highchartOptionUtil";
import { useSelector } from "react-redux";

const OutputContactCenter = () => {
  const [jsonData, setJSONData] = useState<any>("");
  const barChartRef = useRef<HighchartsReact.RefObject>(null);
  const potentialChartRef = useRef<HighchartsReact.RefObject>(null);
  const baselineChartRef = useRef<HighchartsReact.RefObject>(null);
  const segmentChartRef = useRef<HighchartsReact.RefObject>(null);
  const { dispatch } = store;

  const [chartInfo, setChartInfo] = useState(null);

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerHTML)
    );
  }, []);

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
  // console.log(inputDetails)
  const getChartType = () => {};
  const getBarChartSeriesForLabelOne = () => {
    return inputDetails?.periodTableData?.A5_1_label?.rowDetails?.map(
      (rowDetail: any, rowIndex: number) => {
        return rowDetail?.tbodyDetails?.map((tbodyDetail: any) => {
          return tbodyDetail;
        });
      }
    );
  };
  const getBarChartSeriesForLabelTwo = () => {
    return inputDetails?.periodTableData?.A5_1_label?.rowDetails?.map(
      (rowDetail: any, rowIndex: number) => {
        return rowDetail?.tbodyDetails?.map((tbodyDetail: any) => {
          return tbodyDetail;
        });
      }
    );
  };
  const getBaselineChartSeries = () => {
    return inputDetails?.periodTableData?.A5_1_label?.rowDetails?.map(
      (rowDetail: any, rowIndex: number) => {
        return rowDetail?.tbodyDetails?.map((tbodyDetail: any) => {
          return tbodyDetail;
        });
      }
    );
  };

  const handleDDChange = (ddId: string) => {
    const updatedJsonData = JSON.parse(JSON.stringify(jsonData));
    updatedJsonData.data.inputData.periodDD.selectedId = ddId;
    document.getElementById(ddId)?.click();
    setJSONData(updatedJsonData);

    var keys = Object.keys(updatedJsonData.data.inputData.periodTableData);
    keys.forEach(function (key: any) {
      if (key == ddId) {
        dispatch(
          setDropDown(updatedJsonData.data.inputData.periodTableData[key])
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
          updatedJsonData.data.inputData.periodTableData[key]
        );
        dispatch(setBaseLineChartOptions(getSeriesData));
        // console.log("getSeriesData", getSeriesData);

        // dispatch(baseLineChartOptions([seriesValue1, seriesValue2]));
        //dispatch(potentialChartOptions([seriesValue1, seriesValue2]));
      }
    });
  };

  const { dropdown } = useSelector((state: any) => state);
  //console.log("dropdown", dropdown.selectedData.rowDetails);
  return (
    <div className="contactpage-container">
      <SecondaryHeader />
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
                {inputDetails?.periodTableData?.A5_1_label?.headings?.map(
                  (heading: any) => {
                    return (
                      <div
                        className={
                          heading == "" ? "table-col__empty" : "table-col"
                        }
                      >
                        <span>{heading}</span>
                      </div>
                    );
                  }
                )}
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
              <div className="outputTable-container__md__header">
                <div className="table-row">
                  <span>Inbound Sales</span>
                  <span>:</span>
                  <span>Not Selected</span>
                </div>
                <div className="table-row">
                  <span>Outbound Sales</span>
                  <span>:</span>
                  <span>9,523 €</span>
                </div>
                <div className="table-row">
                  <span>Service to Sales</span>
                  <span>:</span>
                  <span>Not Selected</span>
                </div>
                <div className="table-row">
                  <span>Retention</span>
                  <span>:</span>
                  <span>9,523 €</span>
                </div>
                <div className="table-row">
                  <span>Winback</span>
                  <span>:</span>
                  <span>Not Selected</span>
                </div>
                <div className="table-row">
                  <span>Total</span>
                  <span>:</span>
                  <span>28,535 €</span>
                </div>
              </div>
              {/* <div className="outputTable-container__md__header">
                                {
                                    inputDetails?.periodTableData?.A5_1_label?.rowDetails?.map((rowDetail: any, rowIndex: number) => {
                                        const currencySymbol = inputDetails?.periodTableData?.A5_1_label?.currencySymbol
                                        return <>
                                            {
                                                rowDetail?.tbodyDetails?.map((tbodyDetail: any) => {
                                                    let indexToRemove = 1;
                                                    let numberToRemove = rowDetail?.tbodyDetails.length - 1;
                                                    const rowValues = rowDetail?.tbodyDetails.splice(indexToRemove, numberToRemove);
                                                    rowValues.map((rowValue: any) => {
                                                        return <div className="table-row">
                                                            {rowValues.map((rowValue: any) => { return <><span>:</span><span>{rowValue}</span></> })}
                                                        </div>
                                                    })
                                                    // return <>
                                                    //     {rowValues.map((rowValue: any) => {
                                                    //         // return  <div className="table-row"><span>:</span><span>{rowValue}</span></div>
                                                    //         // return (typeof rowValue == "number" ?  : <div className="table-row"><span>{rowValue}</span></div>)
                                                    //     })

                                                    //     } </>
                                                    // return (typeof tbodyDetail == "number" ? <div className="table-row"><span>{tbodyDetail}</span><span className="currency-symbol">{currencySymbol}</span></div> : <div className="table-row"><span>{tbodyDetail}</span></div>)
                                                })
                                            }
                                        </>
                                    })
                                }
                            </div> */}
            </div>
          </Box>
          <div className="chart-container multiple-charts">
            <div className="chart-container__inr">
              <div className="chart-baseline">
                <BaselineChart
                // chartRef={baselineChartRef}
                //   setChartInfo={setChartInfo}
                //   chartType={getChartType()}
                //   chartSeries={getBaselineChartSeries()}
                //   chartOptions={getChartType()}
                />
              </div>
              <div className="chart-futurebaseline">
                <PotentialChart
                //  // chartRef={potentialChartRef}
                //   setChartInfo={setChartInfo}
                //   chartType={getChartType()}
                //   chartSeries={getBarChartSeriesForLabelOne()}
                //   chartOptions={getChartType()}
                />
              </div>
            </div>
          </div>
        </div>
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
            <Grid container sx={{ alignItems: "center", pb: 2 }} xs={12} md={4}>
              <Grid item xs={12} md={6} className="single-dropdown-title">
                <p className="gen-info">{}</p>
              </Grid>
              <Grid item xs={12} sx={{ paddingRight: "20px" }}>
                <FormControl fullWidth>
                  <Select
                    sx={{ p: 0, borderRadius: 0, mb: 1 }}
                    className="inputField cutom-input-field"
                    value={"Hello"}
                  >
                    <MenuItem disabled value="none" className="selectItem">
                      <>
                        {
                          inputDetails?.potentialIncreaseData?.segmentDD
                            ?.placeholder
                        }
                      </>
                    </MenuItem>
                    {inputDetails?.potentialIncreaseData?.segmentDD?.options?.map(
                      (elemnt: any) => (
                        <MenuItem value={elemnt?.ddName} className="selectItem">
                          {elemnt?.ddName}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <Box className="outputTable-container" sx={{ mb: 5 }}>
            <div className="outputTable-container__inr">
              <div className="outputTable-container__inr__header">
                <div className="table-col">
                  <span>Inbound Sales</span>
                </div>
                <div className="table-col">
                  <span>Outbound Sales</span>
                </div>
                <div className="table-col">
                  <span>Service to Sales</span>
                </div>
                <div className="table-col">
                  <span>Retention</span>
                </div>
                <div className="table-col">
                  <span>Winback</span>
                </div>
                <div className="table-col">
                  <span>Total</span>
                </div>
              </div>
              <div className="outputTable-container__inr__body">
                <div className="table-col">
                  <div className="table-row">
                    <span>Not Selected</span>
                  </div>
                  <div className="table-row">
                    <span>9,523 €</span>
                  </div>
                  <div className="table-row">
                    <span>Not Selected</span>
                  </div>
                  <div className="table-row">
                    <span>19,010 €</span>
                  </div>
                  <div className="table-row">
                    <span>Not Selected</span>
                  </div>
                  <div className="table-row">
                    <span>28,535 €</span>
                  </div>
                </div>
              </div>
            </div>
          </Box>
          <div className="chart-container">
            <div className="chart-container__waterfall">
              <SegmentChart
              // chartRef={segmentChartRef}
              // setChartInfo={setChartInfo}
              // chartType={getChartType()}
              // chartSeries={getBarChartSeriesForLabelOne()}
              // chartOptions={getChartType()}
              />
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
export default OutputContactCenter;
