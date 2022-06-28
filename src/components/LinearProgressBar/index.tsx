import { Box, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import store from '../../redux/store';
import { getParsedData } from '../../utils/parserUtil';
import { useSelector } from 'react-redux';

export const LinearProgressBar = () => {
  const [jsonData, setJSONData] = useState<any>('');

  const { leftPanel } = useSelector((state: any) => state);

  useEffect(() => {}, [leftPanel?.categories]);

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerText),
    );
  }, []);

  const { currentSelectedId, categories } = leftPanel;
  const progressDetails = jsonData?.data?.progressBarData?.progressBarDetails;
  const currentLeftMenuSelection = categories.find(
    (category: any) => category?.selectedId === currentSelectedId,
  );
  const progressValuePerc = Math.round(
    (currentLeftMenuSelection?.totalAnswered /
      currentLeftMenuSelection?.totalQues) *
      100,
  );
  return (
    <div className="progressbar-container">
      <Box
        className="progressbar-innercontainer"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Box className="progressbar" sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={progressValuePerc} />
        </Box>
        <Box className="progressbar-text" sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.primary">
            {getParsedData(progressDetails?.answeredTxt)}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {currentLeftMenuSelection?.totalAnswered}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {progressDetails?.ofTxt}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {currentLeftMenuSelection?.totalQues}
          </Typography>
          <Typography variant="body2" color="text.secondary">{`(${Math.round(
            progressValuePerc,
          )}%)`}</Typography>
        </Box>
      </Box>
    </div>
  );
};
