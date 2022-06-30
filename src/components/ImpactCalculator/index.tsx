import { useEffect, useState } from "react";
import SecondaryHeader from "../Headers/SecondaryHeader/index";
import { Inputbox } from "../UI/Input";
import { Footer } from "../Footer";
import { Grid } from "@mui/material";
import HsddInput from "./HsddInput";
import { hideShowSections } from "../../services/impactCaluculator";
import LinearProgressbar2 from "../LinearProgressbar2";
import Tooltip from "@mui/material/Tooltip";
import { ReactComponent as InfoIcon } from "../../assets/svg/info-icon.svg";

const ImpactCalculator = (props: any) => {
  const [jsonData, setJSONData] = useState<any>("");
  const [upJson, setupJson] = useState<any>("");
  const [allSHowNumQuestionIds, setAllSHowNumQuestionIds] = useState<any>([]);
  const [showNumQuestionIds, setShowNumQuestionIds] = useState<any>([]);
  const [showError, setShowError] = useState(false);

  const [progpercentage, setProgpercentage] = useState<any>(0);
  const [unAnsLocs, setUnAnsLocs] = useState([]);

  // @ts-ignore
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
    setJSONData(updatedJson);

    getblockLocations(updatedJson);
    setTimeout(function () {
      // updateScrollPos(updatedJson?.data?.scrollPosition);
      getblockLocations(updatedJson);

      console.log(updatedJson);
    }, 0);
  }, []);

  useEffect(() => {
    progressUpdate();
    getblockLocations(jsonData);
    unAnsweredLocs();
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
    // console.log("Json Updated", updatedJson);
    // progressUpdate();

    let selectedId =
      updatedJsonData.data.inputData[inputDataIdx].subHeadingDetails[
        subHeadingIdx
      ].segmentDetails[segmentDetailIdx].questions[questionDataIdx].selectedId;

    let quesLength = JSON.parse(JSON.stringify(jsonData)).data.inputData[
      inputDataIdx
    ].subHeadingDetails[subHeadingIdx].segmentDetails[segmentDetailIdx]
      .questions.length;

    let subHeadingLength = JSON.parse(JSON.stringify(jsonData)).data.inputData[
      inputDataIdx
    ].subHeadingDetails.length;

    if (
      subHeadingIdx == subHeadingLength - 1 &&
      questionDataIdx == quesLength - 1
    ) {
      scrollEffect(inputDataIdx);
    }
    getblockLocations(updatedJson);
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
    getblockLocations(updatedJson);
  };

  const numFocusOut = (
    value: number,
    inputDataIdx: number,
    subHeadingIdx: number,
    segmentDetailIdx: number,
    questionDataIdx: number
  ) => {
    let quesLength = JSON.parse(JSON.stringify(jsonData)).data.inputData[
      inputDataIdx
    ].subHeadingDetails[subHeadingIdx].segmentDetails[segmentDetailIdx]
      .questions.length;

    let subHeadingLength = JSON.parse(JSON.stringify(jsonData)).data.inputData[
      inputDataIdx
    ].subHeadingDetails.length;

    if (
      subHeadingIdx == subHeadingLength - 1 &&
      questionDataIdx == quesLength - 1
    ) {
      scrollEffect(inputDataIdx);
      console.log("last", inputDataIdx);
    }
  };

  const progressUpdate = () => {
    var obj: any = {};
    var incCount = 100 / jsonData?.data?.inputData?.length;

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

  const getblockLocations = (jsonData: any) => {
    let arr: any = [];
    let obj: any = {};

    // @ts-ignore
    let parentheight = document.getElementById("impactCalc")?.scrollHeight;

    // @ts-ignore
    let parentscrollpos = document.getElementById("impactCalc")?.scrollTop;

    // @ts-ignore
    jsonData?.data?.inputData.forEach((y: any, i: any) => {
      let idStr = "scroll_" + (i + 1);
      let height = 0;
      // @ts-ignore
      if (parentscrollpos > 0) {
        // prettier-ignore
        // @ts-ignore
        height = parentscrollpos + document.getElementById(idStr)?.getBoundingClientRect().top;
      } else {
        // @ts-ignore
        height = document.getElementById(idStr)?.getBoundingClientRect().top;
      }
      arr.push(height);
      obj[idStr] = height;
    });

    setBlockLocs(arr);
    console.log(arr);
    console.log("sh ", parentscrollpos);
  };

  const scrollEffect = (ind: any) => {
    // @ts-ignore
    let container = document.getElementById("impactCalc");
    let dataobj = JSON.parse(JSON.stringify(jsonData));

    if (ind < dataobj?.data?.inputData.length - 1) {
      let reqheight = blockLocs[ind + 1];
      // @ts-ignore
      container.scrollTo(0, reqheight - 110);
      console.log(reqheight);
    }
  };

  const unAnsweredLocs = () => {
    let arr: any = [];
    let arr2: any = [];
    let blockID = "";
    let len;
    // prettier-ignore
    jsonData?.data?.inputData?.map(
          (block: any, ib: any) => {
            block.subHeadingDetails.map((seg: any, is: any) => {
              seg.segmentDetails.map((ques: any, iq: any) => {
                ques.questions.map((x: any, ix: any) => {
                  blockID = "subblock_" + (ib + 1) + "_" + (is + 1);

                 let newheight = 0;
                    if (x.options != undefined) {
                      // prettier-ignore
                      // @ts-ignore
                      newheight = document.getElementById(blockID)?.getBoundingClientRect().top;
                      len = ques.questions.filter((select: any) => select.isRequired == true && select.selectedId == "").length;
                      if (len > 0) {
                        if(is==0 && ib==0){
                          arr.push(0);
                          arr2.push(0);
                        }
                        else{
                          arr.push(blockID);
                          arr2.push(newheight);
                        }
                      }
                    } 
                    else {
                      // prettier-ignore
                      len = ques.questions.filter((select: any) => select.isRequired == true && select.selectedText == "").length;
                      if(len > 0){
                        if(is==0 && ib==0){
                          arr.push(0);
                          arr2.push(0);
                        }
                        else{
                          arr.push(blockID);
                          arr2.push(newheight);
                        }
                      }
                    }
                  
                });
              });
            });
          }
        )
    // @ts-ignore
    arr = [...new Set(arr)];
    // @ts-ignore
    console.log("qnames ", [...new Set(arr2)]);
    setUnAnsLocs(arr);
  };

  return (
    <div className="impact-calc-container">
      <SecondaryHeader sidebar={false} />
      <div className="impact-calc-container__inr" id="impactCalc">
        <div className="impact-calc-container__inr--question">
          {inputData?.map((inputDetails: any, inputDataIdx: number) => {
            return (
              <>
                {(inputDetails.isSequential &&
                  inputDetails.isSequentialShow &&
                  inputDetails.isShow) ||
                (!inputDetails.isSequential && inputDetails.isShow) ||
                inputDataIdx == 0 ? (
                  <div
                    className="single-dropdown-section"
                    id={"scroll_" + (inputDataIdx + 1)}
                  >
                    {inputDetails?.isShow == true &&
                    inputDetails?.headingText != "" ? (
                      <div className="single-dropdown-section__header">
                        <p className="header-text">
                          <span>{inputDetails?.headingText}</span>
                          {inputDetails?.description?.length > 0 && (
                            <Tooltip title={inputDetails?.description} arrow>
                              <InfoIcon className="info-icon" />
                            </Tooltip>
                          )}
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
                                        // <div className="segment-container">
                                        <p className="segment-container">
                                          {segmentDetail.segmentText}
                                          <span>
                                            {segmentDetail?.headingText}
                                          </span>
                                          {segmentDetail?.description?.length >
                                            0 && (
                                            <Tooltip
                                              title={segmentDetail?.description}
                                              arrow
                                            >
                                              <InfoIcon className="info-icon" />
                                            </Tooltip>
                                          )}
                                        </p>
                                      ) : // </div>
                                      null}

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
                                            // {
                                            //   (showSection(question?.questionId)===true)?
                                            //    (<div className='segment-heading'>
                                            //      <p>{segmentDetail?.segmentText}</p>
                                            //    </div>) : null
                                            //  }
                                            if (question.type == "dd") {
                                              return (
                                                <>
                                                  <HsddInput
                                                    question={question}
                                                    showtooltip={true}
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
                                                    sm={4}
                                                    lg={4}
                                                    md={4}
                                                    className="input-form-control"
                                                  >
                                                    <p className="label-heading">
                                                      <span>
                                                        {question?.optionName}
                                                      </span>
                                                      {question?.description
                                                        .length > 0 && (
                                                        <Tooltip
                                                          title={
                                                            question?.description
                                                          }
                                                          arrow
                                                        >
                                                          <InfoIcon className="info-icon" />
                                                        </Tooltip>
                                                      )}
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
                                                      onBlur={(e: any) => {
                                                        numFocusOut(
                                                          e.target.value,
                                                          inputDataIdx,
                                                          subHeadingIdx,
                                                          segmentDetailIdx,
                                                          questionDataIdx
                                                        );
                                                      }}
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
                                                  showtooltip={true}
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
                  </div>
                ) : null}
              </>
            );
          })}
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
              unAnsLocs={unAnsLocs}
            />
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default ImpactCalculator;
