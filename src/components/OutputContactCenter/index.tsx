import { Grid, Box, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import SecondaryHeader from '../Headers/SecondaryHeader';
import BarChart from '../UI/BarChart';
import { Footer } from '../Footer';
import { getParsedData } from '../../utils/parserUtil';
import CustomButton from '../UI/CustomButton';
import BaselineChart from '../UI/BaselineChart';
import PotentialChart from '../UI/PotentialChart';
import SegmentChart from '../UI/SegmentChart';
import HsddInput from '../ImpactCalculator/HsddInput';
import {
  setDropDown,
  setSecDropDown,
} from '../../redux/actions/HighChartDropDownAction';
import store from '../../redux/store';
import {
  setBarChartOptions,
  setBaseLineChartOptions,
  setChartSymbol,
  setPotentialChartOptions,
  setSegmentChartOptions,
} from '../../redux/actions/HighChartAction';
import {
  getbaseLineChartOptions,
  getpotentialChartOptions,
  getsegmentChartOptions,
} from '../../utils/highchartOptionUtil';
import { useSelector } from 'react-redux';
import arrowDown from '../../assets/svg/angle-double-down.svg';
import arrowUp from '../../assets/svg/angle-double-up.svg';
import { getSymbolFormat } from '../../utils';

const OutputContactCenter = () => {
  const [jsonData, setJSONData] = useState<any>('');
  const { dropdown } = useSelector((state: any) => state);

  const { dispatch } = store;

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
  }, []);

  useEffect(() => {
    handleDDChange(jsonData?.data?.inputData?.periodDD?.selectedId);
    handleDropDownChange(
      jsonData?.data?.inputData?.potentialIncreaseData?.segmentDD?.selectedId,
    );
    //const symbolIcon = `{point.y:,.2f}%`;
    // console.log('symbolIcon', jsonData?.data?.inputData?.currencySymbol);
    // dispatch(setChartSymbol(symbolIcon));
  }, [jsonData?.data?.inputData?.periodDD?.selectedId]);

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

  const handleDDChange = (ddId: string) => {
    if (ddId != undefined) {
      const updatedJsonData: any = JSON.parse(JSON.stringify(jsonData));
      updatedJsonData.data.inputData.periodDD.selectedId = ddId;

      document.getElementById(ddId)?.click();
      setJSONData(updatedJsonData);

      var keys = Object.keys(updatedJsonData.data.inputData.periodTableData);
      keys.forEach(function (key: any) {
        if (key == ddId) {
          dispatch(
            setDropDown(updatedJsonData.data.inputData?.periodTableData[ddId]),
          );
          const rowDetails =
            updatedJsonData.data.inputData.periodTableData[key].rowDetails;
          const colorArray =
            updatedJsonData.data.inputData.periodTableData[key].colorArray;
          const seriesValue1 = {
            y: rowDetails[0].tbodyDetails[
              rowDetails[0].tbodyDetails.length - 1
            ],
            color: colorArray[0],
          };
          const seriesValue2 = {
            y: rowDetails[rowDetails.length - 1].tbodyDetails[
              rowDetails[rowDetails.length - 1].tbodyDetails.length - 1
            ],
            color: colorArray[1],
          };

          dispatch(setBarChartOptions([seriesValue1, seriesValue2]));
          const getSeriesData = getbaseLineChartOptions(
            updatedJsonData.data.inputData.periodTableData[key],
          );

          dispatch(
            setBaseLineChartOptions({
              data: getSeriesData[0],
              categories: getSeriesData[1],
            }),
          );
          const getSeriesPotentialData = getpotentialChartOptions(
            updatedJsonData.data.inputData.periodTableData[key],
          );

          dispatch(
            setPotentialChartOptions({
              data: getSeriesPotentialData[0],
              categories: getSeriesPotentialData[1],
            }),
          );
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
          updatedJsonData.data.inputData.periodDD.selectedId + '-' + ddId;
        var keys = Object.keys(
          updatedJsonData.data.inputData.potentialIncreaseData
            .segmentTableChartData,
        );

        keys.forEach(function (key: any) {
          if (key == mergeKey) {
            dispatch(
              setSecDropDown(
                updatedJsonData.data.inputData.potentialIncreaseData
                  .segmentTableChartData[mergeKey],
              ),
            );

            // dispatch(
            //   setSegmentChartOptions({
            //     data: updatedJsonData.data.inputData.potentialIncreaseData
            //       .segmentTableChartData[mergeKey].chartDetails,
            //     categories:
            //       updatedJsonData.data.inputData.potentialIncreaseData
            //         .segmentTableChartData[mergeKey].chartLabels,
            //   })
            // );
            const getSeriesData = getsegmentChartOptions(
              updatedJsonData.data.inputData.potentialIncreaseData
                .segmentTableChartData[mergeKey],
              updatedJsonData.data.inputData.currencySymbol,
            );

            // console.log();
            dispatch(
              setSegmentChartOptions(
                getSeriesData[0],
                // categories: getSeriesData[1],
              ),
            );
          }
        });
      });
    }
  };
  getSymbolFormat(jsonData?.data?.inputData?.currencySymbol);
  return (
    <div className="contactpage-container">
      <SecondaryHeader sidebar={false} />
      <div className="contactpage-container__inr">
        <div className="contactpage-container__inr__section">
          <div className="dropdown-container">
            <Grid
              container
              sx={{ alignItems: 'center', pb: 2 }}
              xs={12}
              md={12}
            >
              <Grid item xs={12} sx={{ paddingRight: '20px' }}>
                {inputDetails != undefined ? (
                  <HsddInput
                    question={inputDetails?.periodDD}
                    onChange={(ddId: string) => handleDDChange(ddId)}
                  />
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </div>
          <div className="single-dropdown-section">
            <div className="single-dropdown-section__header">
              <p className="header-text">{inputDetails?.heading}</p>
            </div>
          </div>
          <div className="chart-container bar-chart-update">
            <BarChart />
          </div>
          <Box className="outputTable-container" sx={{ mb: 5 }}>
            <div className="outputTable-container__inr">
              <div className="outputTable-container__inr__header">
                {dropdown?.selectedData?.headings?.map((heading: any) => {
                  return (
                    <div
                      className={
                        heading == '' ? 'table-col__empty' : 'table-col'
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
                    const currencySymbol = inputDetails?.currencySymbol;
                    return (
                      <div className="table-col" key={rowIndex}>
                        {rowDetail?.tbodyDetails.map(
                          (tbodyDetail: any, i: any) => {
                            return typeof tbodyDetail == 'number' ? (
                              <div className="table-row">
                                <div
                                  className={
                                    rowDetail.iconDetails[i] == 'up'
                                      ? 'arrowUpicon'
                                      : rowDetail.iconDetails[i] == 'down'
                                      ? 'arrowDownicon'
                                      : 'emptyicon'
                                  }
                                ></div>

                                <div>
                                  <span>{tbodyDetail}</span>
                                  <span className="currency-symbol">
                                    {currencySymbol}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div
                                className={
                                  i > 0 && typeof tbodyDetail == 'string'
                                    ? 'table-row bg-StringGray'
                                    : 'table-row'
                                }
                              >
                                <span>{tbodyDetail}</span>
                              </div>
                            );
                          },
                        )}
                      </div>
                    );
                  },
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
                  },
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
              sx={{ alignItems: 'center', pb: 2 }}
              xs={12}
              md={12}
            >
              <Grid item xs={12} sx={{ paddingRight: '20px' }}>
                {inputDetails != undefined ? (
                  <HsddInput
                    question={inputDetails?.potentialIncreaseData?.segmentDD}
                    onChange={(ddId: string) => handleDropDownChange(ddId)}
                  />
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </div>
          <Box className="outputTable-container" sx={{ mb: 5 }}>
            <div className="outputTable-container__inr">
              <div className="outputTable-container__inr__header">
                {dropdown?.selectSecondDropDown?.headings?.map((el: any) => {
                  return (
                    <div className="table-col bg-white">
                      <span>{el}</span>
                    </div>
                  );
                })}
              </div>
              <div className="outputTable-container__inr__body">
                <div className="table-col bg-white">
                  {dropdown?.selectSecondDropDown?.tbodyDetails?.map(
                    (el: any) => {
                      return (
                        <div className="table-row bg-white">
                          <span>{el}</span>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </Box>
          <div className="chart-container__full">
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
    </div>
  );
};
export default OutputContactCenter;
