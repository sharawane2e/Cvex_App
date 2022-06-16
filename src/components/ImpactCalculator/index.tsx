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
import "../../styles/partials/common.scss";

const PanelPage = (props: any) => {
  const [jsonData, setJSONData] = useState<any>('');

  useEffect(() => {
    // @ts-ignore
    // document.getElementById('forwardbutton').disabled = true;
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
  }, []);

  const getSubHeadingDetails = (data: any) => {
    return data?.subHeadingDetails;
  };

  const getSegmentDetails = (subHeadingDetail: any) => {
    return subHeadingDetail?.segmentDetails;
  };

  const getQuestions = (detail: any) => {
    console.log(detail?.questions, 'OPTIONS');
    return detail?.questions;
  };

  const getOptions = (question: any) => {
    return question?.options;
  };

  const hideShow = () => {
    const showNumQuestionIds: string[] = [];

    jsonData?.data?.inputData.forEach((data: any) => {
      getSubHeadingDetails(data).forEach((subHeadingDetail: any) => {
        getSegmentDetails(subHeadingDetail).forEach((segmentDetail: any) => {
          getQuestions(segmentDetail).forEach((question: any) => {
            if (question?.type == 'hsdd') {
              getOptions(question).forEach((option: any) => {
                // console.log(question?.selectedId == option?.ddId);
                // console.log(option?.enableIds == true);
                console.log(question?.selectedId);

                if (
                  question?.selectedId == option?.ddId &&
                  option?.enableIds == true &&
                  question?.enableQuestionIds.length != 0
                ) {
                  showNumQuestionIds.push(...question?.enableQuestionIds);
                  console.log('Something OUTPUT _____', showNumQuestionIds);
                }
              });
            }
          });
        });
      });
    });
  };

  hideShow();

  const inputData = jsonData?.data?.inputData;

  console.log(inputData);

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

  return (

    <div className="impact-calc-container">
      <SecondaryHeader />
      <div className="impact-calc-container__inr">
        <div className="impact-calc-container__inr--question">
          {inputData?.map((inputDetails: any) => {
            return (
              <>
                <div className="single-dropdown-section">
                  <div className="single-dropdown-section__header">
                    <p className="header-text">{inputDetails?.headingText}</p>
                  </div>
                  
                  {inputDetails?.subHeadingDetails?.map(
                    (subHeadingDetail: any) => {
                      return (
                        <>
                          <div className="single-dropdown-section__body">
                            {
                              (subHeadingDetail?.subHeadingText != "")? 

                              <div className="title-container">
                                <p>{subHeadingDetail?.subHeadingText}</p>
                              </div> : null
                            }
                            
                            {subHeadingDetail?.segmentDetails?.map(
                              (segmentDetail: any) => {
                                return (
                                  <>
                                  <Grid
                                    container
                                    xs={12} 
                                    className="section-pad"            
                                  >
                                    {/* <div className="dropdown-container"> */}
                                      {segmentDetail?.questions?.map(
                                        (question: any) => {
                                          if (question.type == 'dd') {
                                            return (
                                              <>
                                                {/* <Grid
                                                  container
                                                  sx={{
                                                    alignItems: 'center',
                                                  }}
                                                  xs={12}
                                                  md={4}
                                                > */}
                                                  {/* <Grid
                                                    item
                                                    xs={12}
                                                    md={6}
                                                    className="single-dropdown-title"
                                                  >
                                                    <p className="gen-info111">
                                                      {question?.optionName}
                                                    </p>
                                                  </Grid> */}
                                                  <Grid
                                                    item
                                                    xs={4}
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
                                                        // style={{"padding":0}}
                                                        className="inputField cutom-input-field"
                                                        value={'Hello'}
                                                        //   onChange={}
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
                                                {/* </Grid> */}
                                              </>
                                            );
                                          }
                                           else if (question.type == 'num') {
                                            return (
                                              <>
                                                {/* <Grid
                                                  container
                                                  sx={{
                                                    // alignItems: 'center',
                                                  }}
                                                  xs={12}
                                                  md={4}
                                                > */}
                                                  {/* <Grid
                                                    item
                                                    xs={12}
                                                    md={6}
                                                    className="single-dropdown-title"
                                                  >
                                                    <p className="gen-info111">
                                                      {question?.optionName}
                                                    </p>
                                                  </Grid> */}
                                                  <Grid
                                                    item
                                                    xs={4}
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
                                                      onChange={(e: any) => {}}
                                                    />
                                                  </Grid>
                                                {/* </Grid> */}
                                              </>
                                            );
                                          } else if (question.type == 'hsdd') {
                                            return (
                                              <HsddInput
                                                type={question.type}
                                                optionName={
                                                  question?.optionName
                                                }
                                                placeholder={
                                                  question?.placeholder
                                                }
                                                menuItems={question?.options}
                                              />
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
    </div>
  );
};

export default PanelPage;
