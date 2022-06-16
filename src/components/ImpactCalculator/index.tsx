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



  const hideShow = () => {
    const allSHowNumQuestionIds: string[] = [];
    const showNumQuestionIds: string[] = [];

    // jsonData?.data?.inputData.forEach((data: any) => {
    //   getSubHeadingDetails(data).forEach((subHeadingDetail: any) => {
    //     getSegmentDetails(subHeadingDetail).forEach((segmentDetail: any) => {
    //       getQuestions(segmentDetail).forEach((question: any) => {
    //         if (question?.type == 'hsdd') {
    //           getOptions(question).forEach((option: any) => {
    //             // console.log(question?.selectedId == option?.ddId);
    //             // console.log(option?.enableIds == true);
    //             console.log(question?.selectedId);

    //             if (
    //               question?.selectedId == option?.ddId &&
    //               option?.enableIds == true &&
    //               question?.enableQuestionIds.length != 0
    //             ) {
    //               showNumQuestionIds.push(...question?.enableQuestionIds);
    //               console.log('Something OUTPUT _____', showNumQuestionIds);
    //             }
    //           });
    //         }
    //       });
    //     });
    //   });
    // });


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

    //console.log(allSHowNumQuestionIds);
    //console.log(showNumQuestionIds);
  };



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

  return (
    // <div className="impact-calc-container">
    //   <SecondaryHeader />
    //   <div className="impact-calc-container__inr">
    //     <Box className="impact-calc-container__inr--question">
    //       {inputData?.map((inputDetails: any) => {
    //         return (
    //           <>
    //             <div className="single-dropdown-section">
    //               <div className="single-dropdown-section__header">
    //                 <p className="header-text">{inputDetails?.headingText}</p>
    //               </div>
    //               {inputDetails?.subHeadingDetails?.map(
    //                 (subHeadingDetail: any) => {
    //                   return (
    //                     <>
    //                       <div className="single-dropdown-section__body">
    //                         <div className="title-container">
    //                           <p>{subHeadingDetail?.subHeadingText}</p>
    //                         </div>
    //                         {subHeadingDetail?.segmentDetails?.map(
    //                           (segmentDetail: any) => {
    //                             return (
    //                               <>
    //                                 <div className="dropdown-container">
    //                                   {segmentDetail?.questions?.map(
    //                                     (question: any) => {
    //                                       if (question.type == 'dd') {
    //                                         return (
    //                                           <>
    //                                             <Grid
    //                                               container
    //                                               sx={{
    //                                                 alignItems: 'center',
    //                                               }}
    //                                               xs={12}
    //                                               md={4}
    //                                             >
    //                                               <Grid
    //                                                 item
    //                                                 xs={12}
    //                                                 md={6}
    //                                                 className="single-dropdown-title"
    //                                               >
    //                                                 <p className="gen-info">
    //                                                   {question?.optionName}
    //                                                 </p>
    //                                               </Grid>
    //                                               <Grid
    //                                                 item
    //                                                 xs={12}
    //                                                 sx={{
    //                                                   paddingRight: '20px',
    //                                                 }}
    //                                               >
    //                                                 <FormControl fullWidth>
    //                                                   <Select
    //                                                     sx={{
    //                                                       p: 0,
    //                                                       borderRadius: 0,
    //                                                       mb: 1,
    //                                                     }}
    //                                                     // style={{"padding":0}}
    //                                                     className="inputField cutom-input-field"
    //                                                     defaultValue="none"
    //                                                     value={'Hello'}
    //                                                     //   onChange={}
    //                                                   >
    //                                                     <MenuItem
    //                                                       disabled
    //                                                       value="none"
    //                                                       className="selectItem"
    //                                                     >
    //                                                       <>Select Option</>
    //                                                     </MenuItem>
    //                                                     {question?.options?.map(
    //                                                       (element: any) => (
    //                                                         <MenuItem
    //                                                           value={
    //                                                             element?.ddName
    //                                                           }
    //                                                           className="selectItem"
    //                                                         >
    //                                                           {element?.ddName}
    //                                                         </MenuItem>
    //                                                       ),
    //                                                     )}
    //                                                   </Select>
    //                                                 </FormControl>
    //                                               </Grid>
    //                                             </Grid>
    //                                           </>
    //                                         );
    //                                       } else if (question.type == 'num') {
    //                                         return (
    //                                           <>
    //                                             <Grid
    //                                               container
    //                                               sx={{
    //                                                 alignItems: 'center',
    //                                               }}
    //                                               xs={12}
    //                                               md={4}
    //                                             >
    //                                               <Grid
    //                                                 item
    //                                                 xs={12}
    //                                                 md={6}
    //                                                 className="single-dropdown-title"
    //                                               >
    //                                                 <p className="gen-info">
    //                                                   {question?.optionName}
    //                                                 </p>
    //                                               </Grid>
    //                                               <Grid
    //                                                 item
    //                                                 xs={12}
    //                                                 sx={{
    //                                                   display: 'flex',
    //                                                   alignItems: 'center',
    //                                                   justifyContent:
    //                                                     'space-between',
    //                                                   paddingRight: '20px',
    //                                                 }}
    //                                               >
    //                                                 <Inputbox
    //                                                   className="inputField cutom-input-field"
    //                                                   id={
    //                                                     question.questionId +
    //                                                     '_html'
    //                                                   }
    //                                                   placeholder={
    //                                                     question.placeholder
    //                                                   }
    //                                                   type={
    //                                                     question.type == 'text'
    //                                                       ? 'text'
    //                                                       : ''
    //                                                   }
    //                                                   value={
    //                                                     question.selectedText
    //                                                   }
    //                                                   onChange={(e: any) => {}}
    //                                                 />
    //                                               </Grid>
    //                                             </Grid>
    //                                           </>
    //                                         );
    //                                       } else if (question.type == 'hsdd') {
    //                                         return (
    //                                           <HsddInput
    //                                             type={question.type}
    //                                             optionName={
    //                                               question?.optionName
    //                                             }
    //                                             placeholder={
    //                                               question?.placeholder
    //                                             }
    //                                             menuItems={question?.options}
    //                                           />
    //                                         );
    //                                       }
    //                                     },
    //                                   )}
    //                                 </div>
    //                               </>
    //                             );
    //                           },
    //                         )}
    //                       </div>
    //                     </>
    //                   );
    //                 },
    //               )}
    //             </div>
    //           </>
    //         );
    //       })}
    //     </Box>
    //   </div>
    // </div>

    <div className="impact-calc-container">
      <SecondaryHeader />
      <div className="impact-calc-container__inr">
        <Box className="impact-calc-container__inr--question">
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
                            <div className="title-container">
                              <p>{subHeadingDetail?.subHeadingText}</p>
                            </div>
                            {subHeadingDetail?.segmentDetails?.map(
                              (segmentDetail: any) => {
                                return (
                                  <>
                                    <div className="dropdown-container">
                                      {segmentDetail?.questions?.map(
                                        (question: any) => {
                                          if (question.type == 'dd') {
                                            return (
                                              <>
                                                <Grid
                                                  container
                                                  sx={{
                                                    alignItems: 'center',
                                                  }}
                                                  xs={12}
                                                  md={4}
                                                >
                                                  <Grid
                                                    item
                                                    xs={12}
                                                    md={6}
                                                    className="single-dropdown-title"
                                                  >
                                                    <p className="gen-info">
                                                      {question?.optionName}
                                                    </p>
                                                  </Grid>
                                                  <Grid
                                                    item
                                                    xs={12}
                                                    sx={{
                                                      paddingRight: '20px',
                                                    }}
                                                  >
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
                                                </Grid>
                                              </>
                                            );
                                          } else if (question.type == 'num') {
                                            return (
                                              <>
                                                <Grid
                                                  container
                                                  sx={{
                                                    alignItems: 'center',
                                                  }}
                                                  xs={12}
                                                  md={4}
                                                >
                                                  <Grid
                                                    item
                                                    xs={12}
                                                    md={6}
                                                    className="single-dropdown-title"
                                                  >
                                                    <p className="gen-info">
                                                      {question?.optionName}
                                                    </p>
                                                  </Grid>
                                                  <Grid
                                                    item
                                                    xs={12}
                                                    sx={{
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent:
                                                        'space-between',
                                                      paddingRight: '20px',
                                                    }}
                                                  >
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
                                                      onChange={(e: any) => { }}
                                                    />
                                                  </Grid>
                                                </Grid>
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
                                    </div>
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
        </Box>
      </div>
    </div>
  );
};

export default PanelPage;
