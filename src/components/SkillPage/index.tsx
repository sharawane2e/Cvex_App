import React, { useEffect, useState } from 'react';
import startData from '../../mock/startPageData.json';
import { isPasswordValid } from '../../utils';
import PrimaryHeader from '../Headers/PrimaryHeader/index';
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
    <div className="login-container">
      <PrimaryHeader />
      <div className="main-container">
        <div className="content-area main-container">
          <Box className= "content-container">
            {
              panelData?.panelBody?.map((elm:any, idx:number) => {
                return (
                  <>
                    <div className="singleCapability">
                      <p>{elm.capabilityText}</p>
                      {
                        elm?.skillDetails?.map((skill:any) => {
                          return(
                            <>
                              <div>
                                <p>{skill?.skillText}</p>
                                <div>
                                  <img src="" alt="" />
                                </div>
                                {
                                  skill?.subSkillDetails?.map((subskill:any) => {
                                    return(
                                      <>
                                        <div className="skillDetails">
                                          <div>
                                            <p>{subskill.subSkillText}</p>
                                          </div>
                                          <div>
                                            <p>{subskill.observationtext}</p>
                                          </div>
                                          <div>
                                            <p>{subskill.sliderValue}</p>
                                          </div>
                                        </div>
                                      </>
                                    )
                                  })
                                }
                              </div>
                            </>
                          )
                        })
                      }
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