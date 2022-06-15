import React, { useEffect, useState } from 'react';
import startData from '../../mock/startPageData.json';
import { isPasswordValid } from '../../utils';
import SecondaryHeader from '../Headers/SecondaryHeader/index';
import { Inputbox } from '../UI/Input';
import './Skill.scss';
import CustomButton from '../UI/CustomButton';
import { Footer } from '../Footer';
import { getParsedData } from '../../utils/parserUtil';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
        <div className="content-area main-container">
          <Box className= "content-container">
            <div className='single-capability-header'>
              {
                panelData?.panelHeading?.map((elm:any) => {
                  return(
                    <>
                      <div>
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
                                <div className="skill-details-cnrt">
                                {
                                  skill?.subSkillDetails?.map((subskill:any) => {
                                    return(
                                      <>
                                        <div className=" skill-details-cnrt__skill-details">
                                          <div className="skill-details-cnrt__sub-skill skill-common">
                                            <p>{subskill.subSkillText}</p>
                                          </div>
                                          <div className="skill-details-cnrt__observation skill-common">
                                            <p>{subskill.observationtext}</p>
                                          </div>
                                          <div className="skill-details-cnrt__slider skill-common">
                                            <p>{subskill.sliderValue}</p>
                                          </div>
                                        </div>
                                      </>
                                    )
                                  })
                                }
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