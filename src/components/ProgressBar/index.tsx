import React, { useState, useEffect } from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from "@mui/material/Checkbox";
import CustomButton from "../UI/CustomButton";
import questionData from "../../mock/questionData.json"
import "./progressBar.scss";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <div className="progressbar-container">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    </div>
  );
}

const saveProgress = (event: any) => {

}
const submitProgress = (event: any) => {

}

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  const progressBarUpdate = () => {
    var chkBoxes = document.querySelectorAll(".progCheck");
    var checkedCnt = 0;
    console.log(chkBoxes)
    chkBoxes.forEach((elm: any, idx) => {
      console.log(elm.children[0])
      if (elm.children[0].checked) {
        checkedCnt++;
      }
    });

    console.log(checkedCnt);
    var progressPercentage = (100 / chkBoxes.length) * checkedCnt;
    console.log(progressPercentage);
    setProgress(progressPercentage);
  }



  //Use Effect Code


  return (
    <Box sx={{ width: '100%' }}>
      <Box className='topContainer'>
        <Box className='leftPanel'>
          <LinearProgressWithLabel value={progress} />
        </Box>
        <Box className='rightPanel'>
          <div className="button-container">
            <div>
              <CustomButton className={"submitButton previous-button"}
                onClick={(e: any) => saveProgress(e)}>
                {questionData.data.progressBarData.saveBtn.saveBtnTxt}
                {/* {jsonData["data"]["contentDetails"]["submitBTnDetails"]["submitBTnTxt"]} */}
              </CustomButton>
            </div>
            <div >
              <CustomButton className={"submitButton next-button"}
                onClick={(e: any) => submitProgress(e)}>
                {questionData.data.progressBarData.submitBtn.submitBtntxt}
                {/* {jsonData["data"]["contentDetails"]["submitBTnDetails"]["submitBTnTxt"]} */}
              </CustomButton>
            </div>
          </div>
        </Box>
      </Box>
      <Box>
        <Checkbox className='progCheck' onChange={() => progressBarUpdate()} />
        <Checkbox className='progCheck' onChange={() => progressBarUpdate()} />
        <Checkbox className='progCheck' onChange={() => progressBarUpdate()} />
        <Checkbox className='progCheck' onChange={() => progressBarUpdate()} />
        <Checkbox className='progCheck' onChange={() => progressBarUpdate()} />
        <Checkbox className='progCheck' onChange={() => progressBarUpdate()} />
      </Box>
    </Box>
  );
}
// useEffect(() => {
//   const timer = setInterval(() => {
//     setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
//   }, 800);
//   return () => {
//     clearInterval(timer);
//   };
// }, []);