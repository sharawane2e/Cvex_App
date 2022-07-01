import React, { useEffect, useState } from 'react';
import startData from '../../mock/startPageData.json';
import { isPasswordValid } from '../../utils';
import SecondaryHeader from '../Headers/SecondaryHeader/index';
import { Inputbox } from '../UI/Input';
import CustomButton from '../UI/CustomButton';
import { Footer } from '../Footer';
import { getParsedData } from '../../utils/parserUtil';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {ReactComponent as Knob} from '../../assets/svg/knob2.svg';
import { TextareaAutosize } from '@mui/material';
import SideBar from '../Sidebar';

const PanelPage = (props: any) => {

  const [jsonData, setJSONData] = useState<any>("");

  useEffect(() => {
    // @ts-ignore
    // document.getElementById('forwardbutton').disabled = true;
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
    // @ts-ignore
    document.getElementById("forwardbutton").disabled = true;
  }, []);

  const panelData = jsonData?.data?.panelDetails;


  const handleClick = () => {
    if (jsonData !== '') {
      // @ts-ignore
      // document.getElementById('navText').value =
      //   jsonData['data']['contentDetails']['submitBTnDetails'][
      //     'forwardInputId'
      //   ];

      // // @ts-ignore
      // document.getElementById('forwardbutton').disabled = false;
      // // @ts-ignore
      // document.getElementById('forwardbutton').click();
    }
  };
  
  const handleForwardClick = () => {
    if (jsonData !== "") {
      // @ts-ignore
      document.getElementById("navText").value =
        jsonData?.data?.footerData?.forwardInputId;
      // @ts-ignore
      document.getElementById("forwardbutton").disabled = false;
      // @ts-ignore
      document.getElementById("forwardbutton").click();
    }
  };

  const previousHandleClick = (event: any) => {
    if (jsonData !== '') {
      // @ts-ignore
      document.getElementById('navText').value =
        jsonData.data?.footerData?.previousInputId;
      // @ts-ignore
      document.getElementById('forwardbutton').disabled = false;
      // @ts-ignore
      document.getElementById('forwardbutton').click();
    }
  };

  console.log(jsonData);
  return (
    <div className="skill-container">
      <SecondaryHeader sidebar={false}/>
      <div className="main-container">
        <div className="content-area ">
          <Box className= "content-container">
            <div className='single-capability-header'>
              {
                panelData?.panelHeading?.map((elm:any) => {
                  return(
                    <>
                      <div className="single-capability-header--heading">
                        <p>{elm}</p>
                      </div>
                    </>
                  )
                })
              }
            </div>
            {
              panelData?.panelBody?.map((elm:any, idx:number) => {
                return (
                  <>
                    <div className="single-capability">
                      <div className="single-capability__left">
                      <div className="mobile_heading">{panelData?.panelHeading[0]}</div>
                        {/* <span className='skill_serialNum'>{elm.serialNumber}</span> */}
                        <p className="skill_text">{elm.capabilityText}</p>
                      </div>
                      <div className="single-capability__right">
                      {
                        elm?.skillDetails?.map((skill:any, idx:number) => {
                          return(
                            <>
                              <div className="single-capability__right--cap-detail">
                                <div className="skillCont">
                                  <div className="skillCont-top">
                                    <div className="capability">
                                    <div className="mobile_heading">{panelData?.panelHeading[1]}</div>
                                    {/* <span className='capability_serialNum'>{skill.serialNumber}</span> */}
                                      <p className="skill_text">{skill?.skillText}</p>
                                    </div>
                                  </div>
                                  <div className="skillCont-bottom">
                                    <img src={skill?.skillIcon} alt="" />
                                  </div>  
                                </div>
                                <div className="subSkillCont">
                                <div className="mobile_heading">{panelData?.panelHeading[2]}</div>
                                  {
                                    (skill?.subSkillDetails?.map((subSkillDetail:any) => {
                                      return(
                                          <div className="subSkillDetailCont">
                                            <p className="skill_text">{subSkillDetail}</p>
                                          </div>
                                      )
                                    }))
                                  }
                                </div>
                                <div className="observationCont">
                                <div className="mobile_heading">{panelData?.panelHeading[3]}</div>
                                  <p className="skill_text">{skill?.observationTxt}</p>
                                </div>
                                <div className="progressBarCont">
                                <div className="mobile_heading"><span>0</span>     <span>100</span></div>
                                  <div className="skill-slider-cont">
                                    <div className="knob-container" style={{left:`${skill.sliderValue}%`}}>
                                      <Knob className="knob"/>
                                      <div className="slider-text" >
                                        { skill.sliderValue }
                                      </div>
                                    </div>
                                      
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        })
                      }
                      </div>
                    </div>
                  </>
                );
              })
            }
          </Box>
        </div>
      </div>
      <Footer>
        <div className="button-container">
          <div className="button-container">
            <div className="button-inr-btn">
              {(jsonData?.data?.footerData?.previousTxt)?
                <CustomButton
                className="submitButton  mar-right"
                onClick={previousHandleClick}
              >
                {jsonData.data?.footerData?.previousTxt}
              </CustomButton> : null
            }

            {
              (jsonData?.data?.footerData?.forwardTxt)?
              <CustomButton className="submitButton " onClick={handleForwardClick}>
              {jsonData.data?.footerData?.forwardTxt}
            </CustomButton> : null
            }
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default PanelPage;