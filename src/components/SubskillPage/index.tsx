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

const PanelPage = (props: any) => {

  const [jsonData, setJSONData] = useState<any>("");

  useEffect(() => {
    // @ts-ignore
    // document.getElementById('forwardbutton').disabled = true;
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
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

  console.log(jsonData)
  return (
    <div className="skill-container">
      <SecondaryHeader />
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
                        <p>{elm.capabilityText}</p>
                      </div>
                      <div className="single-capability__right">
                      {
                        elm?.skillDetails?.map((skill:any) => {
                          return(
                            <>
                              <div className="single-capability__right--cap-detail">
                                <div className="skillCont">
                                  <div className="capability">
                                    <p>{skill?.skillText}</p>
                                  </div>
                                  <div>
                                    <img src={skill?.skillIcon} alt="" />
                                  </div>  
                                </div>
                                <div className="subSkillCont">
                                  {
                                    (skill?.subSkillDetails?.map((subSkillDetail:any) => {
                                      return(
                                          <div className="subSkillDetailCont">
                                            <p>{subSkillDetail}</p>
                                          </div>
                                      )
                                    }))
                                  }
                                </div>
                                <div className="observationCont">
                                  <TextareaAutosize
                                    aria-label="minimum height"
                                    className="custom-text-area"
                                    minRows={2}
                                    defaultValue={skill?.observationsText}
                                    onChange={(event: any) =>
                                      {
                                        
                                      }
                                    }
                                    placeholder={skill?.observationsTextPlaceholder}
                                    style={{
                                      width: '100%',
                                      marginTop: 20,
                                      padding: 5,
                                      resize: 'none',
                                    }}
                                  />
                                </div>
                                <div className="progressBarCont">
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
    </div>
  );
};

export default PanelPage;