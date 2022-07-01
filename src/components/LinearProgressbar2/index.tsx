import React, { useState, useEffect } from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomButton from "../UI/CustomButton";
// import './progressBar.scss';
import { getParsedData } from "../../utils/parserUtil";
import { LinearProgressBar } from "../LinearProgressBar";
import { useSelector } from "react-redux";
import CustomPopup from "../UI/CustomPopup";
import { $CombinedState } from "@reduxjs/toolkit";
import { saveScrollPosNew } from "../../utils";

// import { useSelector } from 'react-redux';

type ProgressBarProps = {
  percentage: number;
  upJson: string;
  showError: any;
  unAnsLocs: any;
};

const LinearProgressbar2 = ({
  percentage,
  upJson,
  showError,
  unAnsLocs,
}: ProgressBarProps) => {
  const { leftPanel, rightPanel } = useSelector((state: any) => state);
  const [jsonData, setJSONData] = useState<any>("");
  const [sbtDisable, setSbtdisable] = useState(true);
  const [open, setOpen] = useState(false);
  // const [unAnsLocs, setUnAnsLocs] = useState([]);

  const defaultProps: ProgressBarProps = {
    percentage: 0,
    upJson: jsonData,
    showError: false,
    unAnsLocs: [],
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const { leftPanel } = useSelector((state: any) => state);

  // useEffect(()=>{

  // },[leftPanel?.categories])

  useEffect(() => {
    // progressBarUpdateNew(3, 6);
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerText)
    );
    // @ts-ignore
    document.getElementById("forwardbutton").disabled = true;
    //setSaveId(jsonData?.data?.progressBarData?.saveBtn?.saveId)
  }, []);
  // const getMandatoryField = () => {
  //   const inputData = jsonData?.data?.inputData;

  //   return inputData?.map((inputDetail: any) => {
  //     inputDetail?.subHeadingDetails?.map((subHeadingDetail: any) => {
  //       subHeadingDetail?.segmentDetails.map((segmentDetail: any) => {
  //         segmentDetail?.questions.map((question: any) => {
  //           if (question.isRequired && question.selectedId !== "") {
  //             setOpen(true);
  //           }
  //         });
  //       });
  //     });
  //   });
  // };

  // const saveScrollPos = () => {
  //   var scrollValue = document.querySelector(".impact-calc-container__inr")?.scrollTop;
  //   var scrollInput:any = document.querySelector("#scroll-value");
  //   scrollInput.value = scrollValue;
  // }

  // useEffect(() => {
  //   unAnsweredLocs();
  // }, [jsonData]);

  const handleSave = (saveId: string) => {
    // @ts-ignore
    document.getElementById("navText").value = saveId;
    // @ts-ignore
    document.getElementById("forwardbutton").disabled = false;
    // @ts-ignore
    document.getElementById("forwardbutton").click();
  };
  const handleSubmit = (saveId: string) => {
    isReqAnswered(saveId);
    showError(true);
    if(isReqAnswered(saveId) == false){
      scrollEvent();
    }
    // unAnsweredLocs();
  };

  const submitProgress = (event: any) => {
    var len = leftPanel.categories.filter(
      (x: any) => x.totalAnswered == x.totalQues
    ).length;
    // if(len == 8){
    //   // @ts-ignore
    //   // document.getElementById('').click();
    // }
  };
  const handleClose = () => {
    setOpen(false);
  };

  //   const progressBarUpdateNew = (answered: number, totalQuestions: number) => {
  //     var progressPercentage = (answered / totalQuestions) * 100;
  //     //console.log('Progress Percentage', progressPercentage);
  //     return progressPercentage;
  //   };

  const scrollEvent = () => {
    let container = document.getElementById("impactCalc");
    // @ts-ignore
    let parentscrollpos = container.scrollTop;
    let height = 0;
    // prettier-ignore
    let firstLoc = document.getElementById(unAnsLocs[0])?.getBoundingClientRect().top;
    // @ts-ignore
    if (parentscrollpos > 0) {
      // @ts-ignore
      height = parentscrollpos + firstLoc;
    } else {
      // @ts-ignore
      height = firstLoc;
    }

    console.log("firstloc ", firstLoc);
    console.log("unAnsLocs ", unAnsLocs);
    console.log("loc ", height);
    // @ts-ignore
    container.scrollTo(0, height-110);

    //block_1_1 = 0;
    //block_2_1 = 220;
    //block_2_2 = 390;
  };

  const scrollEffect = () => {
    if (unAnsLocs.length > 0) {
      let parentscrollpos = document.getElementById("impactCalc")?.scrollTop;
      let height = 0;
      let firstLoc = document
        .getElementById(unAnsLocs[0])
        ?.getBoundingClientRect().top;
      // @ts-ignore
      if (parentscrollpos > 0) {
        // @ts-ignore
        height = parentscrollpos + firstLoc;
      } else {
        // @ts-ignore
        height = firstLoc;
      }
    }

    console.log(jsonData);
    console.log("blocks ", unAnsLocs);
    // console.log("qnames ", arr2);

    // @ts-ignore
    let container = document.getElementById("impactCalc");
    let dataobj = JSON.parse(JSON.stringify(jsonData));

    // let reqheight = blockLocs[ind] + (10 / 100) * window.screen.height;
    let reqheight = unAnsLocs[0];
    // @ts-ignore
    container.scrollTo(0, reqheight - 110);
    // @ts-ignore
    // container.location("#scroll_3");
    // document.getElementById("scroll_3")?.scrollIntoView();
    console.log(reqheight);

    // block 2 = 180
    // block 3 = 780
    // block 4 = 1220
  };

  const isReqAnswered = (saveId: any) => {
    if (JSON.parse(upJson)?.data?.inputData) {
      let count: number = 0;
      JSON.parse(upJson)?.data?.inputData?.map((block: any) => {
        block.subHeadingDetails.map((seg: any) => {
          seg.segmentDetails.map((ques: any) => {
            let len;
            ques.questions.map((x: any) => {
              if (x.options) {
                len = ques.questions.filter(
                  (select: any) => select.selectedId == "" && select.isRequired && ques.isShow
                ).length;
                if (len > 0) {
                  count = count + 1;
                }
              } else {
                len = ques.questions.filter(
                  (select: any) =>
                    select.selectedText == "" && select.isRequired && ques.isShow
                ).length;
                if (len > 0) {
                  count = count + 1;
                }
              }
            });
          });
        });
      });
      console.log(count);
      console.log(JSON.parse(upJson))
      if (count == 0) {
        // @ts-ignore
        document.getElementById("navText").value = saveId;
        // @ts-ignore
        document.getElementById("forwardbutton").disabled = false;
        // @ts-ignore
        document.getElementById("forwardbutton").click();
        return true;
      } else {
        setOpen(true);
        return false;
      }
    }
    //console.log(upJson);
  };

  return (
    <>
      <Box className="topContainer">
        <Box className="leftPanel">
          {/* <Box className="progressbar-text" sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">{`(${Math.round(percentage)}%)`}</Typography>
                    </Box> */}
          <div className="ProgressText">
            {"Answered " + Math.round(percentage) + "%"}
          </div>
          <div className="progressbar-container">
            <Box
              className="progressbar-innercontainer jc-start"
              sx={{ display: "flex", justifyContent: "start" }}
            >
              <Box className="progressbar" sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" value={percentage} />
              </Box>
            </Box>
          </div>
        </Box>

        <Box className="rightPanel">
          <div className="button-container">
            <div>
              <CustomButton
                className={"submitButton previous-button"}
                onClick={() => {
                  saveScrollPosNew(
                    ".impact-calc-container__inr",
                    "#scroll-value"
                  );
                  handleSave(jsonData?.data?.progressBarData?.saveBtn?.saveId);
                }}
              >
                {getParsedData(
                  jsonData?.data?.progressBarData?.saveBtn?.saveBtnTxt
                )}
              </CustomButton>
            </div>
            <div>
              <CustomButton
                className={
                  leftPanel.categories.filter(
                    (x: any) => x.totalAnswered == x.totalQues
                  ).length == leftPanel.categories.length
                    ? "submitButton submitactive"
                    : "submitButton next-button"
                }
                onClick={() =>
                  handleSubmit(
                    jsonData?.data?.progressBarData?.submitBtn?.submitId
                  )
                }
              >
                {getParsedData(
                  jsonData?.data?.progressBarData?.submitBtn?.submitBtntxt
                )}
              </CustomButton>
            </div>
          </div>
        </Box>
        <CustomPopup
          buttonText={jsonData?.data?.errorData?.btnText}
          description={jsonData?.data?.errorData?.bodyText}
          handleClose={handleClose}
          open={open}
        />
      </Box>
    </>
  );
};

export default LinearProgressbar2;
