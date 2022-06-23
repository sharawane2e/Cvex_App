import React, { useEffect, useRef, useState } from "react";
import startData from "../../mock/startPageData.json";
import { isPasswordValid } from "../../utils";
import SecondaryHeader from "../Headers/SecondaryHeader/index";
import { Inputbox } from "../UI/Input";
import CustomButton from "../UI/CustomButton";
import { Footer } from "../Footer";

import { getParsedData } from "../../utils/parserUtil";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormControl, Grid, MenuItem, Select, Tooltip } from "@mui/material";
import HsddInput from "./HsddInput";
import { OptionUnstyled } from "@mui/base";
import ProgressBar from "../ProgressBar";
import { hideShowSections } from "../../services/impactCaluculator";
import LinearProgressbar2 from "../LinearProgressbar2";
import { LegendToggleTwoTone } from "@mui/icons-material";

const ImpactCalculator = (props: any) => {
  const [jsonData, setJSONData] = useState<any>("");
  const [upJson, setupJson] = useState<any>("");
  const [allSHowNumQuestionIds, setAllSHowNumQuestionIds] = useState<any>([]);
  const [showNumQuestionIds, setShowNumQuestionIds] = useState<any>([]);
  const [showError, setShowError] = useState(false);

  const [progpercentage, setProgpercentage] = useState<any>(0);
  // @ts-ignore
  const testRef = useRef<HTMLDivElement>(document.getElementById("ok"));
  const scrollToElement = () => testRef.current.scrollIntoView();

 const [blockLocs, setBlockLocs] = useState([]);

  useEffect(() => {
    // prettier-ignore
    // @ts-ignore
    let updatedJsona: any = JSON.parse(document.getElementById("jsonData")?.innerText);
    setupJson(updatedJsona);
    // const updatedJsona = JSON.parse(
    //   document.getElementById("jsonData")?.innerText
    // );
    // @ts-ignore
    const updatedJson = hideShowSections(updatedJsona);
    setJSONData(
      // @ts-ignore
      updatedJson
    );
    getblockLocations(updatedJson);
    setTimeout(function(){updateScrollPos(updatedJson?.data?.scrollPosition);}, 1500);
    
  }, []);

  useEffect(() => {
    progressUpdate();
  }, [jsonData]);


  const numInputValidate = (
    value: any,
    pattern: any,
    minRange: number,
    maxRange: number
  ) => {
    const reg = pattern;
    let res = "";

    for (let i = 0; i < value.length; i++) {
      if (value[0] == " ") return "";

      if (reg.test(value[i])) res += value[i];
    }

    var tempNum = Number(res);
    if (tempNum > maxRange) res = res.slice(0, -1);

    if (tempNum < minRange) {
      tempNum = minRange;
      res = tempNum.toString();
    }
    // progressUpdate();

    return res;
  };

    const inputData = jsonData?.data?.inputData;
  
  const handleDDChange = (
    ddId: string,
    inputDataIdx: number,
    subHeadingIdx: number,
    segmentDetailIdx: number,
    questionDataIdx: number
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
    setupJson(updatedJson);
     let quesLength = JSON.parse(JSON.stringify(jsonData)).data.inputData[
      inputDataIdx
    ].subHeadingDetails[subHeadingIdx].segmentDetails[segmentDetailIdx]
      .questions.length;
    if (questionDataIdx == quesLength - 1) {
      // scrollEffect(inputDataIdx);
      console.log("last", inputDataIdx);
    }
  };

  const handleNumChange = (
    value: number,
    inputDataIdx: number,
    subHeadingIdx: number,
    segmentDetailIdx: number,
    questionDataIdx: number
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

      const updatedJson = hideShowSections(updatedJsonData);

    //@ts-ignore
    document.getElementById(selectedId).value = value;

    setJSONData(updatedJson);
    setupJson(updatedJson);
  };

  const progressUpdate = () => {
    var obj: any = {};
    var incCount = 100/jsonData?.data?.inputData?.length;

    jsonData?.data?.inputData?.map((block: any) => {
      obj[block.headingText] = 0;
      block?.subHeadingDetails?.map((seg: any) => {
        seg?.segmentDetails?.map((ques: any) => {
          let quesCount = ques.questions.length;
          let len;

          ques?.questions?.map((x: any) => {
            if (x.options) {
              len = ques.questions.filter(
                (select: any) => select?.selectedId != ""
              ).length;
              //console.log(len)
              if (len == quesCount) {
                obj[block?.headingText] = incCount;
              } else {
                obj[block?.headingText] = 0;
              }
            } else {
              len = ques?.questions?.filter(
                (select: any) => select?.selectedText != ""
              ).length;
              if (len == quesCount) {
                obj[block?.headingText] = incCount;
              } else {
                obj[block?.headingText] = 0;
              }
            }
          });
        });
      });
    });
    if (Object.values(obj).length > 0) {
      setProgpercentage(Object.values(obj).reduce((a: any, b: any) => a + b));
    }
  };

  

  // function scrollToTargetAdjusted() {
  //   // @ts-ignore
  //   let element = document.getElementById("ok");
  //   // @ts-ignore
  //   let container = document.getElementById("impactCalc");
  //   let headerOffset = 45;
  //   // @ts-ignore
  //   let elementPosition = element.getBoundingClientRect().top;
  //   // @ts-ignore
  //   let offsetPosition = elementPosition + container.pageYOffset - headerOffset;
  //   // @ts-ignore
  //   container.scrollTo({
  //     top: offsetPosition,
  //     behavior: "smooth",
  //   });
  //   // @ts-ignore
  //   document.getElementById("impactCalc").scrollTop = container.pageYOffset;
  // }

  const getblockLocations = (jsonData: any) => {
    // debugger;
    let arr: any = [];
    jsonData?.data?.inputData.forEach((y: any, i: any) => {
      let height = document.getElementById("scroll_" + (i + 1))?.scrollHeight;
      arr.push(height);
    });
    setBlockLocs(arr);
  };

  const scrollEffect = (ind: any) => {
    // @ts-ignore
    let container = document.getElementById("impactCalc");
    // @ts-ignore
    container.scrollTo(0, 400);
    console.log(blockLocs[ind]);
  };
  const updateScrollPos = (scrollValue: number) => {
    let scrollContainer: any = document.querySelector(
      ".impact-calc-container__inr"
    );
    scrollContainer.scrollTop = scrollValue;
  };

  return (
    <div className="impact-calc-container">
      <SecondaryHeader sidebar={false} />
      <div className="impact-calc-container__inr" id="impactCalc">
        <div className="impact-calc-container__inr--question">
          {
            inputData?.map((inputDetails: any, inputDataIdx: number) => {
              return (
                <>
                  {((inputDetails.isSequential && inputDetails.isSequentialShow && inputDetails.isShow)||(!inputDetails.isSequential && inputDetails.isShow)||inputDataIdx==0)?<div
                    className="single-dropdown-section"
                    id={"scroll_" + (inputDataIdx + 1)}
                  >
                    {inputDetails?.isShow == true &&
                    inputDetails?.headingText != "" ? (
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
                              {subHeadingDetail.hasOwnProperty(
                                "subHeadingText"
                              ) ? (
                                subHeadingDetail?.subHeadingText != "" &&
                                subHeadingDetail?.isShow == true ? (
                                  <div className="title-container">
                                    <p>{subHeadingDetail?.subHeadingText}</p>
                                  </div>
                                ) : null
                              ) : null}

                              {subHeadingDetail?.segmentDetails?.map(
                                (
                                  segmentDetail: any,
                                  segmentDetailIdx: number
                                ) => {
                                  return segmentDetail?.isShow == true ? (
                                    <>
                                      {segmentDetail?.segmentText != "" ? (
                                        <div className="segment-container">
                                          <p>{segmentDetail.segmentText}</p>
                                        </div>
                                      ) : null}

                                      <Grid
                                        container
                                        xs={12}
                                        className="section-pad"
                                      >
                                        {segmentDetail?.questions?.map(
                                          (
                                            question: any,
                                            questionDataIdx: number
                                          ) => {
                                    
                                            if (question.type == "dd") {
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
                                                        questionDataIdx
                                                      )
                                                    }
                                                  />
                                                </>
                                              );
                                            } else if (
                                              question.type == "num" &&
                                              question.isShow
                                            ) {
                                              return (
                                                <>
                                                  <Grid
                                                    item
                                                    xs={12}
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
                                                        "_html"
                                                      }
                                                      placeholder={
                                                        question.placeholder
                                                      }
                                                      type={
                                                        question.type == "text"
                                                          ? "text"
                                                          : ""
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
                                                            question.maxRange
                                                          );

                                                        handleNumChange(
                                                          e.target.value,
                                                          inputDataIdx,
                                                          subHeadingIdx,
                                                          segmentDetailIdx,
                                                          questionDataIdx
                                                        );
                                                      }}
                                                      error={
                                                        showError &&
                                                        question.selectedText ==
                                                          "" &&
                                                        question.isRequired
                                                      }
                                                    />
                                                  </Grid>
                                                </>
                                              );
                                            } else if (
                                              question.type == "hsdd"
                                            ) {
                                              return (
                                                <HsddInput
                                                  question={question}
                                                  // error={showwerror && x.selcetedid == "" && x.isrequired}
                                                  onChange={(ddId: string) =>
                                                    handleDDChange(
                                                      ddId,
                                                      inputDataIdx,
                                                      subHeadingIdx,
                                                      segmentDetailIdx,
                                                      questionDataIdx
                                                    )
                                                  }
                                                  error={
                                                    showError &&
                                                    question.selectedId == "" &&
                                                    question.isRequired
                                                  }
                                                />
                                              );
                                            }
                                          }
                                        )}
                                      </Grid>
                                    </>
                                  ) : null;
                                }
                              )}
                            </div>
                          </>
                        ) : null;
                      }
                    )}
                  </div>:null}
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
            <LinearProgressbar2
              percentage={progpercentage}
              upJson={JSON.stringify(upJson)}
              showError={setShowError}
            />
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default ImpactCalculator;
