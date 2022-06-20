import React, { useState, useEffect } from 'react';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomButton from '../UI/CustomButton';
// import './progressBar.scss';
import { getParsedData } from '../../utils/parserUtil';
import { LinearProgressBar } from '../LinearProgressBar';
// import { useSelector } from 'react-redux';

type ProgressBarProps = {
  showProgressBar: boolean;
};

export default function ProgressBar(props: ProgressBarProps) {
  const [jsonData, setJSONData] = useState<any>('');

  // const { leftPanel } = useSelector((state: any) => state);

  // useEffect(()=>{

  // },[leftPanel?.categories])

  useEffect(() => {
    progressBarUpdateNew(3, 6);
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

  const submitProgress = (event: any) => {};

  const progressBarUpdateNew = (answered: number, totalQuestions: number) => {
    var progressPercentage = (answered / totalQuestions) * 100;
    //console.log('Progress Percentage', progressPercentage);
    return progressPercentage;
  };

  return (
    <>
      <Box className="topContainer">
        {props?.showProgressBar ? (
          <Box className="leftPanel">
            <LinearProgressBar />
          </Box>
        ) : null}

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
