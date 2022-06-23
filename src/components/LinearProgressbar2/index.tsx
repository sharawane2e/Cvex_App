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
};

const LinearProgressbar2 = ({
  percentage,
  upJson,
  showError,
}: ProgressBarProps) => {
  const { leftPanel, rightPanel } = useSelector((state: any) => state);

  const [jsonData, setJSONData] = useState<any>("");
  const [sbtDisable, setSbtdisable] = useState(true);

  const [open, setOpen] = useState(false);

  const defaultProps: ProgressBarProps = {
    percentage: 0,
    upJson: jsonData,
    showError: false,
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

  const isReqAnswered = (saveId:any) => {
    if (JSON.parse(upJson)?.data?.inputData) {
      let count: number = 0;
      JSON.parse(upJson)?.data?.inputData?.map((block: any) => {
        block.subHeadingDetails.map((seg: any) => {
          seg.segmentDetails.map((ques: any) => {
            let len;
            ques.questions.map((x: any) => {
              if (x.options) {
                len = ques.questions.filter(
                  (select: any) => select.selectedId == "" && select.isRequired
                ).length;
                if (len > 0) {
                  count = count + 1;
                }
              } else {
                len = ques.questions.filter(
                  (select: any) =>
                    select.selectedText == "" && select.isRequired
                ).length;
                if (len > 0) {
                  count = count + 1;
                }
              }
            });
          });
        });
      });
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
                  saveScrollPosNew(".impact-calc-container__inr", "#scroll-value");
                  handleSave(
                    jsonData?.data?.progressBarData?.saveBtn?.saveId
                  );
                  }
                }
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
