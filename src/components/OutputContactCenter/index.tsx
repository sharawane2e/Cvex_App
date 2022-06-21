import { Grid, FormControl, Select, MenuItem, Box, Divider } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import SecondaryHeader from "../Headers/SecondaryHeader";
import "./OutputContactCenter.scss";
import HighChart from "../UI/HighCharts";
import { Footer } from "../Footer";
import { getParsedData } from "../../utils/parserUtil";
import CustomButton from "../UI/CustomButton";

const OutputContactCenter = () => {
    const [jsonData, setJSONData] = useState<any>('');
    const chartRef = useRef(null);
    const [chartInfo, setChartInfo] = useState(null);
    useEffect(() => {
        setJSONData(
            // @ts-ignore
            JSON.parse(document.getElementById('jsonData')?.innerHTML),
        );
    }, []);

    const nextHandleClick = (event: any) => {
        if (jsonData !== '') {
            // @ts-ignore
            document.getElementById('navText').value =
                jsonData.data?.footerData?.forwardBtn?.forwardInputId;
            // @ts-ignore
            document.getElementById('forwardbutton').disabled = false;
            // @ts-ignore
            document.getElementById('forwardbutton').click();
        }
    };

    const inputDetails = jsonData?.data?.inputData;
    // console.log(inputDetails)

    const getChartType = () => {
        inputDetails?.map((inputDetail: any) => {
            inputDetail?.questions?.chartData?.map((chartDetail: any) => {
                // console.log(chartDetail?.series)
                return chartDetail?.type;
            })
        })
    };
    const getChartOptions = () => {
        inputDetails?.map((inputDetail: any) => {
            // inputDetail?.questions?.chartData?.map((chartDetail: any) => {
            // console.log(chartDetail?.series)
            return inputDetail?.questions?.chartData;
            // })
        })
    };
    const getChartSeries = () => {
        inputDetails?.map((inputDetail: any) => {
            inputDetail?.questions?.chartData?.map((chartDetail: any) => {
                return chartDetail?.series;
            })
        })
    };

    return (
        <div className="contactpage-container">
            <SecondaryHeader />
            <div className="contactpage-container__inr">
                <div className="contactpage-container__inr__section">
                    <div className="dropdown-container">
                        <div className="single-dropdown-section__body">
                            <div className="title-container">
                                <p>{inputDetails?.questions?.optionName}</p>
                            </div>
                        </div>
                        <Grid container sx={{ alignItems: 'center', pb: 2 }} xs={12} md={4}>
                            <Grid item xs={12} md={6} className="single-dropdown-title">
                                <p className="gen-info">{ }</p>
                            </Grid>
                            <Grid item xs={12} sx={{ paddingRight: '20px', }}>
                                <FormControl fullWidth>
                                    <Select sx={{ p: 0, borderRadius: 0, mb: 1, }}
                                        className="inputField cutom-input-field" value={'Hello'}
                                    >
                                        <MenuItem disabled value="none" className="selectItem">
                                            <>Select Option</>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="single-dropdown-section">
                        <div className="single-dropdown-section__header">
                            <p className="header-text">{inputDetails?.heading}</p>
                        </div>
                    </div>
                    <div className="chart-container" >
                        <HighChart chartRef={chartRef} setChartInfo={setChartInfo} chartType={getChartType()} chartSeries={getChartSeries()} chartOptions={getChartOptions()} />
                    </div>
                    <Box className="outputTable-container" sx={{ mb: 5, }}>
                        <div className="outputTable-container__inr">
                            <div className="outputTable-container__inr__header">
                                <div className="table-col__empty"></div>
                                <div className="table-col"><span>Inbound Sales</span></div>
                                <div className="table-col"><span>Outbound Sales</span></div>
                                <div className="table-col"><span>Service to Sales</span></div>
                                <div className="table-col"><span>Retention</span></div>
                                <div className="table-col"><span>Winback</span></div>
                                <div className="table-col"><span>Total</span></div>
                            </div>
                            <div className="outputTable-container__inr__body">
                                <div className="table-col">
                                    <div className="table-row">
                                        <span>Baseline</span>
                                    </div>
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
                                <div className="table-col">
                                    <div className="table-row">
                                        <span>Baseline</span>
                                    </div>
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
                                <div className="table-col">
                                    <div className="table-row">
                                        <span>Baseline</span>
                                    </div>
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
                        <div className="outputTable-container__md">
                            <div className="title-container">
                                <p>Baseline</p>
                            </div>
                            <div className="outputTable-container__md__header">
                                <div className="table-row"><span>Inbound Sales</span><span>:</span><span>Not Selected</span></div>
                                <div className="table-row"><span>Outbound Sales</span><span>:</span><span>9,523 €</span></div>
                                <div className="table-row"><span>Service to Sales</span><span>:</span><span>Not Selected</span></div>
                                <div className="table-row"><span>Retention</span><span>:</span><span>9,523 €</span></div>
                                <div className="table-row"><span>Winback</span><span>:</span><span>Not Selected</span></div>
                                <div className="table-row"><span>Total</span><span>:</span><span>28,535 €</span></div>
                            </div>
                        </div>
                    </Box>
                    <div className="chart-container multiple-charts">
                        <div className="chart-container__inr">
                            <div className="chart-baseline">
                                <HighChart chartRef={chartRef} setChartInfo={setChartInfo} chartType={getChartType()} chartSeries={getChartSeries()} chartOptions={getChartOptions()} />
                            </div>
                            <div className="chart-futurebaseline">
                                <HighChart chartRef={chartRef} setChartInfo={setChartInfo} chartType={getChartType()} chartSeries={getChartSeries()} chartOptions={getChartOptions()} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contactpage-container__inr__section">
                    <div className="single-dropdown-section">
                        <div className="single-dropdown-section__header">
                            <p className="header-text">{inputDetails?.heading}</p>
                        </div>
                    </div>
                    <div className="dropdown-container">
                        <div className="single-dropdown-section__body">
                            <div className="title-container">
                                <p>{inputDetails?.questions?.optionName}</p>
                            </div>
                        </div>
                        <Grid container sx={{ alignItems: 'center', pb: 2 }} xs={12} md={4}>
                            <Grid item xs={12} md={6} className="single-dropdown-title">
                                <p className="gen-info">{ }</p>
                            </Grid>
                            <Grid item xs={12} sx={{ paddingRight: '20px', }}>
                                <FormControl fullWidth>
                                    <Select sx={{ p: 0, borderRadius: 0, mb: 1, }}
                                        className="inputField cutom-input-field" value={'Hello'}
                                    >
                                        <MenuItem disabled value="none" className="selectItem">
                                            <>Select Option</>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                    <Box className="outputTable-container" sx={{ mb: 5, }}>
                        <div className="outputTable-container__inr">
                            <div className="outputTable-container__inr__header">
                                <div className="table-col"><span>Inbound Sales</span></div>
                                <div className="table-col"><span>Outbound Sales</span></div>
                                <div className="table-col"><span>Service to Sales</span></div>
                                <div className="table-col"><span>Retention</span></div>
                                <div className="table-col"><span>Winback</span></div>
                                <div className="table-col"><span>Total</span></div>
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
                            <HighChart chartRef={chartRef} setChartInfo={setChartInfo} chartType={getChartType()} chartSeries={getChartSeries()} chartOptions={getChartOptions()} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer>
                <Divider />
                <div className="button-container justi">
                    <div>
                        <CustomButton
                            className={'submitButton next-button'}
                            onClick={(e: any) => nextHandleClick(e)}
                        >
                            {getParsedData(
                                jsonData?.data?.footerData?.forwardBtn?.forwardBtntxt,
                            )}
                        </CustomButton>
                    </div>
                </div>
            </Footer>
        </div >
    )
}
export default OutputContactCenter;