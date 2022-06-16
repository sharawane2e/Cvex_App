import React, { useEffect, useState } from 'react';
import startData from '../../mock/startPageData.json';
import { isPasswordValid } from '../../utils';
import SecondaryHeader from '../Headers/SecondaryHeader/index';
import { Inputbox } from '../UI/Input';
import CustomButton from '../UI/CustomButton';
import { Footer } from '../Footer';
import './ImpactCalculator.scss';
import { getParsedData } from '../../utils/parserUtil';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl, Grid, MenuItem, Select, Tooltip } from '@mui/material';
import HsddInput from './HsddInput';
import { OptionUnstyled } from '@mui/base';
import ProgressBar from '../ProgressBar';
const PanelPage = (props: any) => {
  const [jsonData, setJSONData] = useState<any>('');
  const [allSHowNumQuestionIds, setAllSHowNumQuestionIds] = useState<any>([]);
  const [showNumQuestionIds, setShowNumQuestionIds] = useState<any>([]);

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
  }, []);

  useEffect(() => {

    hideShow();
  }, [jsonData]);


  const txtInputValidate = (value: any, pattern: any) => {
    const reg = pattern;
    let res = '';

    for (let i = 0; i < value.length; i++) {
      if (value[0] == ' ') return '';

      if (reg.test(value[i])) res += value[i];
    }

    return res;
  }

  const numInputValidate = (value: any, pattern: any, minRange: number, maxRange: number) => {
    const reg = pattern;
    let res = '';

    for (let i = 0; i < value.length; i++) {
      if (value[0] == ' ') return '';

      if (reg.test(value[i])) res += value[i];
    }

    var tempNum = Number(res);
    if (tempNum > maxRange)
      res = res.slice(0, -1);

    if (tempNum < minRange)
      tempNum = minRange;

    // res = tempNum.toString();
    return res;
  };

  const hideShow = () => {
    const allSHowNumQuestionIds: string[] = [];
    const showNumQuestionIds: string[] = [];


    jsonData?.data?.inputData?.map((inputDataEl: any, inputDataIndex: number) => {
      inputDataEl.subHeadingDetails.map((subHeading: any, subHeadingIndex: number) => {
        subHeading.segmentDetails.map((segment: any, segmentIndex: number) => {
          segment.questions.map((question: any, questionIndex: number) => {
            if (question.type == "hsdd" && question.enableQuestionIds.length) {
              allSHowNumQuestionIds.push(...question.enableQuestionIds)
            }
            if (question.type == "hsdd" && question.selectedId != "") {
              question.options.map((option: any) => {
                if (option.ddId === question.selectedId && option.enableIds) {
                  showNumQuestionIds.push(...question.enableQuestionIds)
                }
              })
            }
          })
        })
      })
    })

    setAllSHowNumQuestionIds([...allSHowNumQuestionIds]);
    setShowNumQuestionIds([...showNumQuestionIds]);

  };

  const showSection = (questionId: string) => {


    if (allSHowNumQuestionIds.indexOf(questionId) != -1 && showNumQuestionIds.indexOf(questionId) != -1)
      return true;
    else
      return false;
  }

  const inputData = jsonData?.data?.inputData;

  const handleClick = () => {
    if (jsonData !== '') {
      // @ts-ignore
      // document.getElementById('navText').value =
      //   jsonData['data']['contentDetails']['submitBTnDetails'][
      //     'forwardInputId'
      //   ];
      // // @ts-ignore
      // document.getElementById('forwardbutton').disabled = false;
      // // @ts-ignore
      // document.getElementById('forwardbutton').click();
    }
  };

  const handleDDChange = () => {
    console.log("called")
  }

  const handleNumChange = (value: number, inputDataIdx: number, subHeadingIdx: number, segmentDetailIdx: number, questionDataIdx: number) => {
    const updatedJsonData = JSON.parse(JSON.stringify(jsonData));
    updatedJsonData.data.inputData[inputDataIdx].subHeadingDetails[subHeadingIdx].segmentDetails[segmentDetailIdx].questions[questionDataIdx].selectedText = value;

    setJSONData(updatedJsonData);
  }


  return (

    <div className="impact-calc-container">
      <SecondaryHeader />
      <div className="impact-calc-container__inr">
        <div className="impact-calc-container__inr--question">
          {inputData?.map((inputDetails: any, inputDataIdx: number) => {
            return (
              <>
                <div className="single-dropdown-section">
                  <div className="single-dropdown-section__header">
                    <p className="header-text">{inputDetails?.headingText}</p>
                  </div>

                  {inputDetails?.subHeadingDetails?.map(
                    (subHeadingDetail: any, subHeadingIdx: number) => {
                      return (
                        <>
                          <div className="single-dropdown-section__body">
                            {
                              (subHeadingDetail?.subHeadingText != "") ?

                                <div className="title-container">
                                  <p>{subHeadingDetail?.subHeadingText}</p>
                                </div> : null
                            }

                            {subHeadingDetail?.segmentDetails?.map(
                              (segmentDetail: any, segmentDetailIdx: number) => {
                                return (
                                  <>
                                    <Grid
                                      container
                                      xs={12}
                                      className="section-pad"
                                    >
                                      {/* <div className="dropdown-container"> */}
                                      {segmentDetail?.questions?.map(
                                        (question: any, questionDataIdx: number) => {
                                          if (question.type == 'dd') {
                                            return (
                                              <>
                                                <Grid
                                                  item
                                                  xs={4}
                                                  md={4}
                                                  lg={4}
                                                  className="input-form-control"
                                                >
                                                  <p className="label-heading">
                                                    {question?.optionName}
                                                  </p>
                                                  <FormControl fullWidth>
                                                    <Select
                                                      sx={{
                                                        p: 0,
                                                        borderRadius: 0,
                                                        mb: 1,
                                                      }}
                                                      className="inputField cutom-input-field"
                                                      value={'Hello'}
                                                      onChange={(e: any) => {
                                                        handleNumChange(e.target.value, inputDataIdx, subHeadingIdx, segmentDetailIdx, questionDataIdx);
                                                      }}
                                                    >
                                                      <MenuItem
                                                        disabled
                                                        value="none"
                                                        className="selectItem"
                                                      >
                                                        <>Select Option</>
                                                      </MenuItem>
                                                      {question?.options?.map(
                                                        (element: any) => (
                                                          <MenuItem
                                                            value={
                                                              element?.ddName
                                                            }
                                                            className="selectItem"
                                                          >
                                                            {element?.ddName}
                                                          </MenuItem>
                                                        ),
                                                      )}
                                                    </Select>
                                                  </FormControl>
                                                </Grid>
                                              </>
                                            );
                                          }
                                          else if (question.type == 'num' && showSection(question?.questionId)) {
                                            return (
                                              <>

                                                <Grid
                                                  item
                                                  xs={4}
                                                  md={4}
                                                  lg={4}
                                                  className="input-form-control"
                                                >
                                                  <p className="label-heading">
                                                    {question?.optionName}
                                                  </p>
                                                  <Inputbox
                                                    className="inputField cutom-input-field"
                                                    id={
                                                      question.questionId +
                                                      '_html'
                                                    }
                                                    placeholder={
                                                      question.placeholder
                                                    }
                                                    type={
                                                      question.type == 'text'
                                                        ? 'text'
                                                        : ''
                                                    }
                                                    value={
                                                      question.selectedText
                                                    }
                                                    onChange={(e: any) => {
                                                      e.target.value = numInputValidate(
                                                        e.target.value,
                                                        /^[0-9]+$/, question.minRange, question.maxRange
                                                      );

                                                      handleNumChange(e.target.value, inputDataIdx, subHeadingIdx, segmentDetailIdx, questionDataIdx);
                                                    }}
                                                  />
                                                </Grid>
                                              </>
                                            );
                                          } else if (question.type == 'hsdd') {
                                            return (
                                              <HsddInput question={question} onChange={handleDDChange} />
                                            );
                                          }
                                        },
                                      )}
                                    </Grid>
                                    {/* </div> */}
                                  </>
                                );
                              },
                            )}

                          </div>
                        </>
                      );
                    },
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
      <Footer>
        <div className="footer-impact-calc">
          <div className="left-sec">
            <ProgressBar showProgressBar={false}/>
          </div>

        </div>
      </Footer>
    </div>
  );
};

export default PanelPage;
