import React, { useEffect, useState } from 'react';
import startData from '../../mock/startPageData.json';
import { isPasswordValid } from '../../utils';
import SecondaryHeader from '../Headers/SecondaryHeader/index';
import { Inputbox } from '../UI/Input';
import CustomButton from '../UI/CustomButton';
import { Footer } from '../Footer';

import { getParsedData } from '../../utils/parserUtil';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl, Grid, MenuItem, Select, Tooltip } from '@mui/material';
import HsddInput from './HsddInput';
import { OptionUnstyled } from '@mui/base';
import ProgressBar from '../ProgressBar';
import { hideShowSections } from '../../services/impactCaluculator';
import LinearProgressbar2 from '../LinearProgressbar2';
const PanelPage = (props: any) => {
  const [jsonData, setJSONData] = useState<any>('');
  const [allSHowNumQuestionIds, setAllSHowNumQuestionIds] = useState<any>([]);
  const [showNumQuestionIds, setShowNumQuestionIds] = useState<any>([]);

  const [progpercentage, setProgpercentage] = useState<any>(0);


  // useEffect(() => {
  //   setJSONData(
  //     // @ts-ignore
  //     hideShowSections(
  //       JSON.parse(document.getElementById('jsonData')?.innerHTML),
  //     ),
  //   );
  // }, []);

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
  }, []);


  // useEffect(() => {

  //   progressUpdate();
  // }, [jsonData]);

  // const txtInputValidate = (value: any, pattern: any) => {
  //   const reg = pattern;
  //   let res = '';

  //   for (let i = 0; i < value.length; i++) {
  //     if (value[0] == ' ') return '';

  //     if (reg.test(value[i])) res += value[i];
  //   }

  //   return res;
  // }

  const numInputValidate = (
    value: any,
    pattern: any,
    minRange: number,
    maxRange: number,
  ) => {
    const reg = pattern;
    let res = '';

    for (let i = 0; i < value.length; i++) {
      if (value[0] == ' ') return '';

      if (reg.test(value[i])) res += value[i];
    }

    var tempNum = Number(res);
    if (tempNum > maxRange) res = res.slice(0, -1);

    if (tempNum < minRange) {
      tempNum = minRange;
      res = tempNum.toString();
    }
    progressUpdate();

    return res;
  };

  // const hideShow = () => {
  //   const allSHowNumQuestionIds: string[] = [];
  //   const showNumQuestionIds: string[] = [];

  //   jsonData?.data?.inputData?.map((inputDataEl: any, inputDataIndex: number) => {
  //     inputDataEl.subHeadingDetails.map((subHeading: any, subHeadingIndex: number) => {
  //       subHeading.segmentDetails.map((segment: any, segmentIndex: number) => {
  //         segment.questions.map((question: any, questionIndex: number) => {
  //           if (question.type == "hsdd" && question.enableQuestionIds.length) {
  //             allSHowNumQuestionIds.push(...question.enableQuestionIds)
  //           }
  //           if (question.type == "hsdd" && question.selectedId != "" && question.enableQuestionIds.length) {
  //             question.options.map((option: any) => {
  //               if (option.ddId === question.selectedId && option.enableIds) {
  //                 showNumQuestionIds.push(...question.enableQuestionIds);
  //               }
  //             })
  //           }
  //         })
  //       })
  //     })
  //   })

  //   setAllSHowNumQuestionIds([...allSHowNumQuestionIds]);
  //   setShowNumQuestionIds([...showNumQuestionIds]);

  // };

  const inputData = jsonData?.data?.inputData;
  // const showSection = (questionId: string) => {
  //   if (allSHowNumQuestionIds.indexOf(questionId) != -1 && showNumQuestionIds.indexOf(questionId) != -1)
  //     return true;
  //   else
  //     // if (false) {
  //     //   setJSONData(inputData);
  //     // }
  //     return false;
  // }

  const handleDDChange = (
    ddId: string,
    inputDataIdx: number,
    subHeadingIdx: number,
    segmentDetailIdx: number,
    questionDataIdx: number,
  ) => {
    const updatedJsonData = JSON.parse(JSON.stringify(jsonData));
    updatedJsonData.data.inputData[inputDataIdx].subHeadingDetails[
      subHeadingIdx
    ].segmentDetails[segmentDetailIdx].questions[questionDataIdx].selectedId =
      ddId;
    document.getElementById(ddId)?.click();

    const updatedJson = hideShowSections(updatedJsonData);

    //@ts-ignore

    setJSONData(updatedJson);
    // console.log("Json Updated", updatedJson);
    progressUpdate();
  };

  const handleNumChange = (
    value: number,
    inputDataIdx: number,
    subHeadingIdx: number,
    segmentDetailIdx: number,
    questionDataIdx: number,
  ) => {
    const updatedJsonData = JSON.parse(JSON.stringify(jsonData));
    const selectedId =
      updatedJsonData.data.inputData[inputDataIdx].subHeadingDetails[
        subHeadingIdx
      ].segmentDetails[segmentDetailIdx].questions[questionDataIdx].selectedId;
    updatedJsonData.data.inputData[inputDataIdx].subHeadingDetails[
      subHeadingIdx
    ].segmentDetails[segmentDetailIdx].questions[questionDataIdx].selectedText =
      value;

    //@ts-ignore
    document.getElementById(selectedId).value = value;

    setJSONData(updatedJsonData);
  };

  const progressUpdate = () => {

    var obj:any = {};
    var incCount = 100/(jsonData?.data?.inputData?.length);

    jsonData?.data?.inputData.map((block:any) => {
      obj[block.headingText] = 0;
      block.subHeadingDetails.map((seg:any) => {
        seg.segmentDetails.map((ques:any) => {
          let quesCount = ques.questions.length;

          let len;
          // if(ques.options){
          //   len = ques.questions.filter((select:any) => select.selectedId != "").length;
          //   if(len == quesCount){
          //     obj[block.headingText] = incCount;
          //   }
          //   else{
          //     obj[block.headingText] = 0;
          //   }
          // }
          // else{
          //   len = ques.questions.filter((select:any) => select.selectedText != "").length;
          //   if(len == quesCount){
          //     obj[block.headingText] = incCount;
          //   }
          //   else{
          //     obj[block.headingText] = 0;
          //   }
          // }

          ques.questions.map((x:any) => {
            if(x.options){
              len = ques.questions.filter((select:any) => select.selectedId != "").length;
              console.log(len)
              if(len == quesCount){
                obj[block.headingText] = incCount;
              }
              else{
                obj[block.headingText] = 0;
              }
            }
            else{
              len = ques.questions.filter((select:any) => select.selectedText != "").length;
              if(len == quesCount){
                obj[block.headingText] = incCount;
              }
              else{
                obj[block.headingText] = 0;
              }
            }
          })
      })
    })})
    console.log(obj);
    // console.log(jsonData)
    setProgpercentage(Object.values(obj).reduce((a:any,b:any) => a+b));
  }

  return (
    <div className="impact-calc-container">
      <SecondaryHeader sidebar={false} />
      <div className="impact-calc-container__inr">
        <div className="impact-calc-container__inr--question">
          {
            // console.log(inputData?.isShow)
            // (inputData?.isShow == true)?
            inputData?.map((inputDetails: any, inputDataIdx: number) => {
              return (
                <>
                  <div className="single-dropdown-section">
                    {inputDetails?.isShow == true &&
                    inputDetails?.headingText != '' ? (
                      <div className="single-dropdown-section__header">
                        <p className="header-text">
                          {inputDetails?.headingText}
                        </p>
                      </div>
                    ) : null}

                    {inputDetails?.subHeadingDetails?.map(
                      (subHeadingDetail: any, subHeadingIdx: number) => {
                        return subHeadingDetail?.isShow == true ? (
                          <>
                            <div className="single-dropdown-section__body">
                              {subHeadingDetail?.subHeadingText != '' ? (
                                <div className="title-container">
                                  <p>{subHeadingDetail?.subHeadingText}</p>
                                </div>
                              ) : null}
                              {subHeadingDetail?.segmentDetails?.map(
                                (
                                  segmentDetail: any,
                                  segmentDetailIdx: number,
                                ) => {
                                  return segmentDetail?.isShow == true ? (
                                    <>
                                      <div className="title-container">
                                        <p>{segmentDetail.segmentText}</p>
                                      </div>

                                      <Grid
                                        container
                                        xs={12}
                                        className="section-pad"
                                      >
                                        {segmentDetail?.questions?.map(
                                          (
                                            question: any,
                                            questionDataIdx: number,
                                          ) => {
                                            // {
                                            //   (showSection(question?.questionId)===true)?
                                            //    (<div className='segment-heading'>
                                            //      <p>{segmentDetail?.segmentText}</p>
                                            //    </div>) : null
                                            //  }
                                            if (question.type == 'dd') {
                                              return (
                                                <>
                                                  <HsddInput
                                                    question={question}
                                                    onChange={(ddId: string) =>
                                                      handleDDChange(
                                                        ddId,
                                                        inputDataIdx,
                                                        subHeadingIdx,
                                                        segmentDetailIdx,
                                                        questionDataIdx,
                                                      )
                                                    }
                                                  />
                                                </>
                                              );
                                            } else if (
                                              question.type == 'num' &&
                                              question.isShow
                                            ) {
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
                                                        e.target.value =
                                                          numInputValidate(
                                                            e.target.value,
                                                            /^[0-9]+$/,
                                                            question.minRange,
                                                            question.maxRange,
                                                          );

                                                        handleNumChange(
                                                          e.target.value,
                                                          inputDataIdx,
                                                          subHeadingIdx,
                                                          segmentDetailIdx,
                                                          questionDataIdx,
                                                        );
                                                      }}
                                                    />
                                                  </Grid>
                                                </>
                                              );
                                            } else if (
                                              question.type == 'hsdd'
                                            ) {
                                              return (
                                                <HsddInput
                                                  question={question}
                                                  onChange={(ddId: string) =>
                                                    handleDDChange(
                                                      ddId,
                                                      inputDataIdx,
                                                      subHeadingIdx,
                                                      segmentDetailIdx,
                                                      questionDataIdx,
                                                    )
                                                  }
                                                />
                                              );
                                            }
                                          },
                                        )}
                                      </Grid>
                                    </>
                                  ) : null;
                                },
                              )}
                            </div>
                          </>
                        ) : null;
                      },
                    )}
                  </div>
                </>
              );
            })
          }
        </div>
      </div>
      <Footer>
        <div className="footer-impact-calc">
          <div className="left-sec">
            {/* <ProgressBar showProgressBar={true} /> */}
            <LinearProgressbar2 percentage={progpercentage}/>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default PanelPage;
