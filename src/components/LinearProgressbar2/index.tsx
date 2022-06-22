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

// import { useSelector } from 'react-redux';

type ProgressBarProps = {
  percentage: number;
  upJson: string;
};

export default function LinearProgressbar2(props: ProgressBarProps) {
  const { leftPanel, rightPanel } = useSelector((state: any) => state);

  const [jsonData, setJSONData] = useState<any>("");
  const [sbtDisable, setSbtdisable] = useState(true);

  const [open, setOpen] = useState(false);

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
  const getMandatoryField = () => {
    const inputData = jsonData?.data?.inputData;

    return inputData?.map((inputDetail: any) => {
      inputDetail?.subHeadingDetails?.map((subHeadingDetail: any) => {
        subHeadingDetail?.segmentDetails.map((segmentDetail: any) => {
          segmentDetail?.questions.map((question: any) => {
            if (question.isRequired && question.selectedId !== "") {
              setOpen(true);
            }
          });
        });
      });
    });
  };

  const saveScrollPos = () => {
    var scrollValue = document.querySelector(".impact-calc-container__inr")?.scrollTop;
    console.log(scrollValue);
    var scrollInput:any = document.querySelector("#scroll-value");
    scrollInput.innerHTML = scrollValue;
  }

  const saveProgress = (saveId: string) => {};
  const handleBtnClick = (saveId: string) => {
    // @ts-ignore
    document.getElementById("navText").value = saveId;
    // @ts-ignore
    document.getElementById("forwardbutton").disabled = false;
    // @ts-ignore
    document.getElementById("forwardbutton").click();
    isReqAnswered();
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

  const isReqAnswered = () => {
    if (JSON.parse(props?.upJson)?.data?.inputData) {
      let count: number = 0;
      JSON.parse(props?.upJson)?.data?.inputData?.map((block: any) => {
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
      console.log(JSON.parse(props?.upJson));
      if (count == 0) {
        return true;
      } else {
        setOpen(true);
        return false;
      }
    }
  };

  return (
    <>
      <Box className="topContainer">
        <Box className="leftPanel">
          {/* <Box className="progressbar-text" sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">{`(${Math.round(props?.percentage)}%)`}</Typography>
                    </Box> */}
          <div className="ProgressText">
            {"Answered " + Math.round(props?.percentage) + "%"}
          </div>
          <div className="progressbar-container">
            <Box
              className="progressbar-innercontainer jc-start"
              sx={{ display: "flex", justifyContent: "start" }}
            >
              <Box className="progressbar" sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={props?.percentage}
                />
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
                  handleBtnClick(
                    jsonData?.data?.progressBarData?.saveBtn?.saveId
                  );
                    saveScrollPos();
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
                  handleBtnClick(
                    jsonData?.data?.progressBarData?.saveBtn?.submitId
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
}
