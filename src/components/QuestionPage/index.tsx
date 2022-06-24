import React, { useState, useEffect } from 'react';
import SecondaryHeader from '../Headers/SecondaryHeader';
import ProgressBar from '../ProgressBar';
import SideBar from '../Sidebar';
import { Footer } from '../Footer';
import CustomButton from '../UI/CustomButton';
import CustomAccordion from '../UI/CustomAccordion';
import questionData from '../../mock/questionData.json';
import { getParsedData } from '../../utils/parserUtil';
import store from '../../redux/store';
import { setAnswerCount } from '../../redux/actions/ProgressBarAction';
import { setRightPanelData } from '../../redux/actions/RightPanelActions';
import { setLeftPanelData } from '../../redux/actions/LeftPanelActions';
import { useDispatch, useSelector } from 'react-redux';
// import '../../styles/partials/common.scss';

const QuestionPage = () => {
  const [jsonData, setJSONData] = useState<any>('');

  const updateScrollPos = (scrollValue: number) => {
    let scrollContainer: any = document.querySelector(
      ".right-panel__inr"
    );
    scrollContainer.scrollTop = scrollValue;
  };

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerText),
    );
    console.log(document.querySelector(".right-panel__inr"));
    setTimeout(function(){updateScrollPos(jsonData?.data?.scrollPosition);}, 1000);
  }, []);
  
  const { dispatch } = store;
  dispatch(setLeftPanelData(jsonData?.data?.leftPanel));
  dispatch(setRightPanelData(jsonData?.data?.rightPanel));

  const nextHandleClick = (event: any) => {
    if (jsonData !== '') {
      // @ts-ignore
      document.getElementById('navText').value =
        jsonData.data?.footerData?.forwardBtn?.forwardInputId;
      // @ts-ignore
      document.getElementById('forwardbutton').disabled = false;
      // @ts-ignore
      document.getElementById('forwardbutton').click();
    // console.log(leftPanel);
    }
  };

  const previousHandleClick = (event: any) => {
    if (jsonData !== '') {
      // @ts-ignore
      document.getElementById('navText').value =
        jsonData.data?.footerData?.previousBtn?.previousInputId;
      // @ts-ignore
      document.getElementById('forwardbutton').disabled = false;
      // @ts-ignore
      document.getElementById('forwardbutton').click();
    }
  };

  console.log(jsonData?.data?.footerData?.previousBtn.previousShow)

  return (
    <div className="question-wrapper">
      <SecondaryHeader />
      <div className="main-container">
        <div className="left-panel">
          <SideBar />
        </div>
        <div className="right-panel">
          
          <ProgressBar showProgressBar={true} />

          <div className="right-panel__inr">
            <div className="title">
              <h2>
                {getParsedData(
                  jsonData?.data?.rightPanel?.questionsData?.capabilityTxt,
                )}
              </h2>
            </div>
            <p>{getParsedData(
                  jsonData?.data?.rightPanel?.questionsData?.insTxt,
                )}</p>
            <div className="question-container">
              <CustomAccordion />
            </div>
          </div>
        </div>
        <Footer>
          {console.log("dd",jsonData?.data?.footerData)}
          <div className="button-container justi">
            {/* {jsonData?.data?.footerData?.previousBtn.previousShow ? */}
              <div className="d-flex">
                <CustomButton
                  className={'submitButton previous-button '}
                  onClick={(e: any) => previousHandleClick(e)}
                >
                  {getParsedData(
                    jsonData?.data?.footerData?.previousBtn?.previousBtnTxt,
                  )}
                </CustomButton>
              </div>
              {/* : ""
            } */}

            {jsonData?.data?.footerData?.forwardBtn.forwardShow ?
              <div>
                <CustomButton
                  className={'submitButton next-button'}
                  onClick={(e: any) => nextHandleClick(e)}
                >
                  {getParsedData(
                    jsonData?.data?.footerData?.forwardBtn?.forwardBtntxt,
                  )}
                </CustomButton>
              </div>
              : ""
            }

          </div>
        </Footer>
      </div>
    </div>
  );
};

export default QuestionPage;
