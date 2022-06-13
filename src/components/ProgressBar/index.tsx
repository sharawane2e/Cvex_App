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
import { getParsedData } from '../../utils/parserUtil';
import store from '../../redux/store';
import { setAnswerCount } from '../../redux/actions/ProgressBarAction';
import { useDispatch } from 'react-redux';
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number } & { jsonData: any },
) {
  const dispatch = useDispatch();

  dispatch(setAnswerCount('demo'));
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
            {getParsedData(
              props?.jsonData?.data?.progressBarData?.progressBarDetails
                ?.answeredTxt,
            )}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {
              props?.jsonData?.data?.progressBarData?.progressBarDetails
                ?.totalAnswered
            }
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props?.jsonData?.data?.progressBarData?.progressBarDetails?.ofTxt}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {
              props?.jsonData?.data?.progressBarData?.progressBarDetails
                ?.totalQues
            }
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
  // const [progress, setProgress] = useState(25);
  // const questionsData = questionData;
  const [jsonData, setJSONData] = useState<any>('');
  const [currSaveId, setSaveId] = useState<any>('');
  useEffect(() => {
    progressBarUpdateNew(3  , 6);
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerText),
    );
    // @ts-ignore
    document.getElementById('forwardbutton').disabled = true;
    //setSaveId(jsonData?.data?.progressBarData?.saveBtn?.saveId)
  }, []);

  const saveProgress = (saveId: string) => {
    // @ts-ignore
    document.getElementById('navText').value = saveId;
    // @ts-ignore
    document.getElementById('forwardbutton').disabled = false;
    // @ts-ignore
    document.getElementById('forwardbutton').click();
  };

  const submitProgress = (event: any) => { };


  const progressBarUpdateNew = (answered:number, totalQuestions:number) =>   {
    var progressPercentage = (answered / totalQuestions) * 100;
    console.log("Progress Percentage", progressPercentage)
   return progressPercentage;
  }
  
  //Use Effect Code

  return (
    <>
      <Box className="topContainer">
        <Box className="leftPanel">
          <LinearProgressWithLabel value={progressBarUpdateNew(1, 6)} jsonData={jsonData} />
        </Box>
        <Box className="rightPanel">
          <div className="button-container">
            <div>
              <CustomButton
                className={'submitButton previous-button'}
                onClick={() =>
                  saveProgress(jsonData?.data?.progressBarData?.saveBtn?.saveId)
                }
              >
                {getParsedData(
                  jsonData?.data?.progressBarData?.saveBtn?.saveBtnTxt,
                )}
              </CustomButton>
            </div>
            <div>
              <CustomButton
                className={'submitButton next-button'}
                onClick={(e: any) => submitProgress(e)}
              >
                {getParsedData(
                  jsonData?.data?.progressBarData?.submitBtn?.submitBtntxt,
                )}
              </CustomButton>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
