import { Grid, FormControl, Select, MenuItem, Box } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import SecondaryHeader from "../Headers/SecondaryHeader";
import "./OutputContactCenter.scss";
import HighChart from "../UI/HighCharts";

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

    const inputDetails = jsonData?.data?.inputData;

    return (
        <div className="contactpage-container">
            <SecondaryHeader />
            <div className="contactpage-container__inr">
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
                                    // style={{"padding":0}}       
                                    className="inputField cutom-input-field" value={'Hello'}
                                //   onChange={}     
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
                    <HighChart chartRef={chartRef} setChartInfo={setChartInfo} />
                </div>
                <Box className="outputTable-container">
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
                </Box>
                <div className="chart-container">
                    <div className="chart-container__inr">
                        <div className="chart-baseline">
                            <HighChart chartRef={chartRef} setChartInfo={setChartInfo} />
                        </div>
                        <div className="chart-futurebaseline">
                            <HighChart chartRef={chartRef} setChartInfo={setChartInfo} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OutputContactCenter;