import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import CustomSlider from '../UI/CustomSlider';
import SecondaryHeader from '../Headers/SecondaryHeader';
import ProgressBar from '../ProgressBar';
import SideBar from '../Sidebar';
import { Footer } from '../Footer';
import './QuestionPage.scss';
import CustomButton from '../UI/CustomButton';
import CustomAccordion from '../UI/CustomAccordion';
import questionData from '../../mock/questionData.json';
import { getParsedData } from '../../utils/parserUtil';
const QuestionPage = () => {
  const [jsonData, setJSONData] = useState<any>('');
  // const questionsData = questionData;
  useEffect(() => {
    console.log('questionpage is callled');
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
  }, []);

  const nextHandleClick = (event: any) => {
    if (jsonData !== '') {
      // @ts-ignore
      document.getElementById('navText').value =
        jsonData.data?.footerData?.forwardBtn?.forwardInputId;
      // @ts-ignore
      document.getElementById('forwardbutton').click();
    }
  };

  const previousHandleClick = (event: any) => {
    if (jsonData !== '') {
      // @ts-ignore
      document.getElementById('navText').value =
        jsonData.data?.footerData?.previousBtn?.previousInputId;
      // @ts-ignore
      document.getElementById('forwardbutton').click();
    }
  };

  return (
    <div className="question-wrapper">
      <SecondaryHeader />
      <div className="main-container">
        <div className="left-panel">
          <SideBar />
        </div>
        <div className="right-panel">
          <div>
            <ProgressBar />
            <div className="title">
              <h2>
                {getParsedData(jsonData?.data?.rightPanel?.questionsData[0]?.capabilityTxt)}
              </h2>
            </div>
            <div className="question-container">
              <CustomAccordion />
            </div>
          </div>
        </div>
        <Footer>
          <div className="button-container">
            <div>
              <CustomButton
                className={'submitButton previous-button'}
                onClick={(e: any) => previousHandleClick(e)}
              >
                {getParsedData(jsonData?.data?.footerData?.previousBtn?.previousBtnTxt)}
              </CustomButton>
            </div>
            <div>
              <CustomButton
                className={'submitButton next-button'}
                onClick={(e: any) => nextHandleClick(e)}
              >
                {getParsedData(jsonData?.data?.footerData?.forwardBtn?.forwardBtntxt)}
              </CustomButton>
            </div>
          </div>
        </Footer>
      </div>
    </div>
  );
};

export default QuestionPage;
