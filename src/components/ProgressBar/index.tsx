import React, { useState, useEffect } from 'react';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import CustomButton from '../UI/CustomButton';
import questionData from '../../mock/questionData.json';
import './progressBar.scss';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number },
) {
  return (
    <div className="progressbar-container">
      <Box
        className="progressbar-innercontainer"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Box className="progressbar" sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box className="progressbar-text" sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.primary">
            {questionData.data.progressBarData.progressBarDetails.answeredTxt}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {questionData.data.progressBarData.progressBarDetails.totalAnswered}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {questionData.data.progressBarData.progressBarDetails.ofTxt}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {questionData.data.progressBarData.progressBarDetails.totalQues}
          </Typography>
          <Typography variant="body2" color="text.secondary">{`(${Math.round(
            props.value,
          )}%)`}</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const questionsData = questionData;
  const [jsonData, setJSONData] = useState<any>('');
  // useEffect(() => {
  //   setJSONData(
  //     // @ts-ignore
  //     JSON.parse(document.getElementById("jsonData")?.innerHTML)
  //   );

  // }, []);
  const saveProgress = (event: any) => {
    // if (jsonData !== "") {
    //   // @ts-ignore
    //   document.getElementById("navText").value =
    //     jsonData["data"]["progressBarData"]["saveBtn"]["SelectedInputId"]
    //   // @ts-ignore
    //   document.getElementById("forwardbutton").click();
    // }
  };
  const submitProgress = (event: any) => {};
  const progressBarUpdate = () => {
    var chkBoxes = document.querySelectorAll('.progCheck');
    var checkedCnt = 0;
    console.log(chkBoxes);
    chkBoxes.forEach((elm: any, idx) => {
      if (elm.children[0].checked) {
        checkedCnt++;
      }
    });

    console.log(checkedCnt);
    var progressPercentage = (100 / chkBoxes.length) * checkedCnt;
    console.log(progressPercentage);
    setProgress(progressPercentage);
  };

  //Use Effect Code

  return (
    <>
      <Box className="topContainer">
        <Box className="leftPanel">
          <LinearProgressWithLabel value={progress} />
        </Box>
        <Box className="rightPanel">
          <div className="button-container">
            <div>
              <CustomButton
                className={'submitButton previous-button'}
                onClick={(e: any) => saveProgress(e)}
              >
                {questionData.data.progressBarData.saveBtn.saveBtnTxt}
                {/* {jsonData["data"]["contentDetails"]["submitBTnDetails"]["submitBTnTxt"]} */}
              </CustomButton>
            </div>
            <div>
              <CustomButton
                className={'submitButton next-button'}
                onClick={(e: any) => submitProgress(e)}
              >
                {questionData.data.progressBarData.submitBtn.submitBtntxt}
                {/* {jsonData["data"]["contentDetails"]["submitBTnDetails"]["submitBTnTxt"]} */}
              </CustomButton>
            </div>
          </div>
        </Box>
      </Box>
      <Box className="bottomContainer">
        <Checkbox className="progCheck" onChange={() => progressBarUpdate()} />
        <Checkbox className="progCheck" onChange={() => progressBarUpdate()} />
        <Checkbox className="progCheck" onChange={() => progressBarUpdate()} />
        <Checkbox className="progCheck" onChange={() => progressBarUpdate()} />
        <Checkbox className="progCheck" onChange={() => progressBarUpdate()} />
        <Checkbox className="progCheck" onChange={() => progressBarUpdate()} />
      </Box>
    </>
  );
}
