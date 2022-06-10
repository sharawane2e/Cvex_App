// @flow
import React, { useState, useEffect } from 'react';
import PrimaryHeader from '../Headers/PrimaryHeader';
//import generalData from '../../mock/giData.json';
import './GI.scss';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Checkbox, InputLabel, ListItemText, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Inputbox } from '../UI/Input';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Footer } from '../Footer';
import CustomButton from '../UI/CustomButton';
import { ReactComponent as InfoIocn } from '../../assets/svg/info-icon.svg';
import Tooltip from '@mui/material/Tooltip';
import { debug } from 'console';

const GI = () => {
  const [state, setState] = useState(0);
  const [jsonData, setJSONData] = useState<any>('');
  const [geography, setGeography] = useState('none');
  const [country, setCountry] = useState('none');
  const [economicStatus, setEconomicStatus] = useState('none');
  const [sector, setSector] = useState('none');
  const [services, setServices] = useState<string[]>([]);
  const [servicesId, setServicesId] = useState<any>('');
  const [serviceOffer, setServicesOffer] = useState<any>([]);
  const [getFilterCountry, setFilterCountry] = useState([]);
  const [getFilterService, setFilterService] = useState([]);
  const [getFilterServiceData, setFilterServiceData] = useState<any>([]);

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
  }, []);

  const giInfo = jsonData?.data?.rightData;

  const getselectedDDName = (options:any,selectedId:string) =>{
    let selectedDDName = "";
    options?.forEach((element:any) => {
      if(element.ddId==selectedId){selectedDDName =  element.ddName}
    })
    console.log(selectedId)
    console.log(selectedDDName)
    return selectedDDName;
  }

  // const handlegeography = (
  //   event: any,
  //   questionmap: any,
  //   questionoption2: any,
  // ) => {
  //   setGeography(event.target.value);
  //   const filterCountry = getSddQ2Options(event, questionmap, questionoption2);
  //   setFilterCountry(filterCountry);
  // };


  const handleCountry = (event: any) => {
    setCountry(event.target.value);
  };
  const handleSector = (event: any, questionmap: any, questionoption2: any) => {
    setSector(event.target.value);
    setServices([]);
    const selectedSector = getSddQ2Options(event, questionmap, questionoption2);
    setFilterService(selectedSector);
  };

  const handleEconomicStatus = (event:any) => {
    setEconomicStatus(event.target.value);
  }

  const handleServices = (
    event: any,
    questionmap: any,
    questionoption3: any,
  ) => {
    const {
      target: { value },
    } = event;
    console.log(event)
    setServices(typeof value === 'string' ? value.split(',') : value);

    const selectedServices = getdddptions(
      servicesId,
      questionmap,
      questionoption3,
    );
    console.log("SelectedServices", selectedServices);
    setFilterServiceData(selectedServices);
    console.log(getFilterService);
    console.log(getFilterServiceData);
  };

  const getSddQ2Options = (
    ddLabel: any,
    questionmap: any,
    questionoption2: any,
  ) => {
    let filteredData;
    let selectIquestion = ddLabel.split('_')[1];
    const mapQuesion = questionmap
      .split('|')
      .map((element: string) => element.split(':'));
    const index = mapQuesion.findIndex((el: any) => el[0] == selectIquestion);
    if (index === -1) {
      filteredData = [];
      setServices([]);
    } else {
      const optionsToRender = mapQuesion[index][1]?.split('-');
      filteredData = questionoption2.filter((el: any) =>
        optionsToRender.includes(el.ddId),
      );
    }
    return filteredData;
  };

  const getdddptions = (
    servicesId: any,
    questionmap: any,
    questionoption3: any,
  ) => {
    debugger;

    let filteredData;
    let selectIquestion = servicesId.split('_')[1];
    const mapQuesion = questionmap
      .split('|')
      .map((element: string) => element.split(':'));
    const index = mapQuesion.findIndex((el: any) => el[0] == selectIquestion);
    if (index === -1) {
      filteredData = [];
      //setServices([]);
    } else {
      const optionsToRender = mapQuesion[index][1]?.split('-');
      filteredData = questionoption3.filter((el: any) =>
        optionsToRender.includes(el.ddId),
      );
    }
    console.log(filteredData);
    return filteredData;
  };

  const handleServicesOffer = (event: any) => {
    setServicesOffer(event.target.value);
  };

  const inputValidate = (value: any, pattern: any) => {
    const reg = pattern;
    if (!reg.test(value)) {
      return false;
    } else {
      return true;
    }
  };

  const handlePrevClick = () => {
    if (jsonData !== '') {
      // @ts-ignore
       document.getElementById("navText").value = jsonData?.data?.footerData?.previousInputId;
      // @ts-ignore
      document.getElementById("forwardbutton").disabled = false;
      // @ts-ignore
      document.getElementById("forwardbutton").click();
    }
  }

  const handleNextClick = () => {
    if (jsonData !== '') {
      // @ts-ignore
       document.getElementById("navText").value = jsonData?.data?.footerData?.forwardInputId;
      // @ts-ignore
      document.getElementById("forwardbutton").disabled = false;
      // @ts-ignore
      document.getElementById("forwardbutton").click();
    }
  };

  return (
    <>
      <PrimaryHeader />
      <div className="gi-container">
        <div className="gi-container__inr">
          <h3 className="gi-heading">{giInfo?.heading}</h3>
          <div className="gi-container__questions">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {/* {questionData()} */}
              {giInfo?.questions.map((genQues: any, index: number) => {
                if (genQues.type === 'txt' || genQues.type === 'num') {
                  return genQues.type === 'txt' ? (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      className="inputCont"
                      sx={{ borderBottom: '1px solid #c4c4c4' }}
                    >
                      <Grid container>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                          <p className="gen-info">{genQues.optionName}</p>
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Tooltip title={genQues?.description} arrow>
                            <InfoIocn className="info-icon" />
                          </Tooltip>
                          <Inputbox
                            className="inputField cutom-input-field"
                            id={genQues.questionId+'_html'}
                            placeholder={genQues.placeholder}
                            type={genQues.type == 'text' ? 'text' : ''}
                            value={genQues.selectedText}
                            onChange={(e: any) =>{
                              // (genQues.selectedText = e.target.value)
                              // // (setJSONData({...jsonData,rightData:{...jsonData.rightData,questions:[...jsonData.rightData.questions,jsonData.rightData.questions[index].selectedText = e.target.value]}}))
                              // (
                              //   inputValidate(e.target.value, /^[A-Za-z ]+$/)
                              //     ? console.log('Valid Input')
                              //     : (e.target.value = ''),
                              // )
                              const updatedQuestionsArray : any[] = [];
                              jsonData.data.rightData.questions.forEach(function(CV:any){
                                if(CV.questionId===genQues.questionId){
                                  CV.selectedText = e.target.value;
                                }
                                updatedQuestionsArray.push(CV)
                              })

                              setJSONData({...jsonData,rightData:{...jsonData.rightData,questions:[...updatedQuestionsArray]}})
                              // @ts-ignore
                              document.getElementById(genQues.questionId).value = e.target.value;
                            }
                              
                            }
                          />
                        </Grid>
                      </Grid>
                      {/* <Divider /> */}
                    </Grid>
                  ) : (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      className="inputCont"
                      sx={{ borderBottom: '1px solid #c4c4c4', pb: 1 }}
                    >
                      <Grid container>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center'}}>
                          <p className="gen-info">{genQues.optionName}</p>
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Tooltip title={genQues?.description} arrow>
                            <InfoIocn className="info-icon" />
                          </Tooltip>
                          <Inputbox
                            className="inputField cutom-input-field"
                            id={genQues.questionId+'_html'}
                            placeholder={genQues.placeholder}
                            type={genQues.type == 'text' ? 'text' : ''}
                            value={genQues.selectedText}
                            // onChange={(e: any) =>
                            //   (genQues.selectedText = e.target.value)(
                            //     inputValidate(e.target.value, /^[0-9]+$/)
                            //       ? console.log('Valid Input')
                            //       : (e.target.value = ''),
                            //   )
                            // }
                            onChange={(e: any) =>{
                              const updatedQuestionsArray : any[] = [];
                              jsonData.data.rightData.questions.forEach(function(CV:any){
                                if(CV.questionId===genQues.questionId){
                                  CV.selectedText = e.target.value;
                                }
                                updatedQuestionsArray.push(CV)
                              })

                              setJSONData({...jsonData,rightData:{...jsonData.rightData,questions:[...updatedQuestionsArray]}})
                              // @ts-ignore
                              document.getElementById(genQues.questionId).value = e.target.value;
                            }
                              
                            }
                          />
                        </Grid>
                      </Grid>
                      {/* <Divider /> */}
                    </Grid>
                  );
                } else if (genQues.type == 'dd' || genQues.type == 'year')
                  return (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      className="inputCont"
                      sx={{ borderBottom: '1px solid #c4c4c4' }}
                    >
                      <Grid container sx={{ alignItems: 'center' }}>
                        <Grid item xs={4}>
                          <p className="gen-info">{genQues.optionName} </p>
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Tooltip title={genQues?.description} arrow>
                            <InfoIocn className="info-icon" />
                          </Tooltip>
                          <FormControl fullWidth>
                            <Select
                              sx={{ p: 0, borderRadius: 0, mb: 1 }}
                              className="inputField cutom-input-field"
                              defaultValue="none"
                              value={getselectedDDName(genQues.options,genQues.selectedId)}
                              onChange={ (e) => {


                                
                                
                                

                                let dropdownId = "";
                                jsonData.data.rightData.questions.forEach((CV:any, idx:number)=>{
                                  if(CV.questionId==genQues.questionId){
                                    CV.options.forEach((option:any) => {
                                      if(option.ddName == e.target.value){
                                        dropdownId = option.ddId;
                                       
                                        document.getElementById(option.ddId)?.click();
                                      }
                                    });
                                  }
                                })

                                // setJSONData({...jsonData,rightData:{...jsonData.rightData,questions:[...updatedQuestionsArray]}})

                                const updatedQuestionsArray : any[] = [];
                                jsonData.data.rightData.questions.forEach(function(CV:any){
                                  if(CV.questionId===genQues.questionId){
                                    CV.selectedId = dropdownId;
                                  }
                                  updatedQuestionsArray.push(CV)
                                })

                                setJSONData({...jsonData,rightData:{...jsonData.rightData,questions:[...updatedQuestionsArray]}})
                        
                                
                              }
                                
                              }
                            >
                              <MenuItem
                                disabled
                                value="none"
                                className="selectItem"
                              >
                                <>{genQues.placeholder}</>
                              </MenuItem>
                              {genQues?.options?.map((elemnt: any) => (
                                <MenuItem
                                  value={elemnt?.ddName}
                                  className="selectItem"
                                >
                                  {elemnt?.ddName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                else if (genQues.type == 'sdd')
                  return (
                    <>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        className="inputCont"
                        sx={{ borderBottom: '1px solid #c4c4c4' }}
                      >
                        <Grid container>
                          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                            <p className="gen-info">{genQues.optionName} </p>
                          </Grid>
                          <Grid
                            item
                            xs={8}
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Tooltip title={genQues?.description} arrow>
                              <InfoIocn className="info-icon" />
                            </Tooltip>
                            <FormControl fullWidth>
                              <Select
                                sx={{ p: 0, borderRadius: 0, mb: 1 }}
                                displayEmpty={true}
                                value={getselectedDDName(genQues.options,genQues.selectedId)}
                                defaultValue="none"
                                className="inputField cutom-input-field"
                                onChange={(event) => {
                                  let dropdownId = "";
                                  jsonData.data.rightData.questions.forEach((CV:any, idx:number)=>{
                                    if(CV.questionId==genQues.questionId){
                                      CV.options.forEach((option:any) => {
                                          if(option.ddName == event.target.value){
                                            dropdownId = option.ddId;
                                          
                                            document.getElementById(option.ddId)?.click();
                                          }
                                        });
                                      }
                                    })
                                    const updatedQuestionsArray : any[] = [];
                                    jsonData.data.rightData.questions.forEach(function(CV:any){
                                      if(CV.questionId===genQues.questionId){
                                        CV.selectedId = dropdownId;
                                      }
                                      updatedQuestionsArray.push(CV)
                                    })

                                    setJSONData({...jsonData,rightData:{...jsonData.rightData,questions:[...updatedQuestionsArray]}})
                                  


                                }
                                }
                              >
                                <MenuItem
                                  disabled
                                  value="none"
                                  className="selectItem"
                                >
                                  <>{genQues.placeholder}</>
                                </MenuItem>
                                {genQues?.options?.map((iteam: any) => (
                                  <MenuItem
                                    value={iteam?.ddName}
                                    className="selectItem"
                                  >
                                    {iteam?.ddName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>

                          

                          {genQues.selectedId !== "" ?
                          
                          (
                            <>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                            <p className="gen-info">{genQues.optionName2} </p>
                          </Grid>

                          <Grid
                          item
                          xs={8}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Tooltip title={genQues?.description2} arrow>
                            <InfoIocn className="info-icon" />
                          </Tooltip>
                          <FormControl
                            sx={{
                              width: '100%',
                              borderRadius: 0,
                              mt: 1,
                              mb: 1,
                            }}
                          >
                            <Select
                              sx={{ p: 0, borderRadius: 0 }}
                              displayEmpty={true}
                              value={getselectedDDName(genQues.options2,genQues.selectedId2)}
                              defaultValue="none"
                              className="inputField"
                              onChange={(event:any) => {
                                let dropdownId = "";
                                  jsonData.data.rightData.questions.forEach((CV:any, idx:number)=>{
                                    if(CV.questionId2==genQues.questionId2){
                                      CV.options2.forEach((option:any) => {
                                          if(option.ddName == event.target.value){
                                            dropdownId = option.ddId;
                                          
                                            document.getElementById(option.ddId)?.click();
                                          }
                                        });
                                      }
                                    })
                                    const updatedQuestionsArray : any[] = [];
                                    jsonData.data.rightData.questions.forEach(function(CV:any){
                                      if(CV.questionId2===genQues.questionId2){
                                        CV.selectedId2 = dropdownId;
                                      }
                                      updatedQuestionsArray.push(CV)
                                    })

                                    setJSONData({...jsonData,rightData:{...jsonData.rightData,questions:[...updatedQuestionsArray]}})
                              }
                              
                              
                              
                              }
                            >
                              <MenuItem
                                disabled
                                value="none"
                                className="selectItem"
                              >
                                <>{genQues.placeholder}</>
                              </MenuItem>
                              {getSddQ2Options(genQues.selectedId,genQues.map,genQues.options2).map((iteam: any) => (
                                <MenuItem
                                  value={iteam?.ddName}
                                  className="selectItem"
                                >
                                  {iteam?.ddName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid> </>  )
                        :null}
                        

                          

                        </Grid>
                      </Grid>
                    </>
                  );
                else if (genQues.type == 'ddd')
                  return (
                    <>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        className="inputCont"
                        sx={{ borderBottom: '1px solid #c4c4c4' }}
                      >
                        <Grid container>
                          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                            <p className="gen-info">{genQues.optionName} </p>
                          </Grid>
                          <Grid
                            item
                            xs={8}
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <InfoIocn className="info-icon" />
                            <FormControl fullWidth>
                              <Select
                                sx={{ mb: 1, borderRadius: 0 }}
                                className="inputField"
                                value={getselectedDDName(genQues.options,genQues.selectedId)}
                                onChange={(event) =>
                                  {
                                    let dropdownId = "";
                                    jsonData.data.rightData.questions.forEach((CV:any, idx:number)=>{
                                      if(CV.questionId==genQues.questionId){
                                        CV.options.forEach((option:any) => {
                                          if(option.ddName == event.target.value){
                                            dropdownId = option.ddId;
                                          
                                            document.getElementById(option.ddId)?.click();
                                          }
                                        });
                                      }
                                    })


                                    const updatedQuestionsArray : any[] = [];
                                    jsonData.data.rightData.questions.forEach(function(CV:any){
                                      if(CV.questionId===genQues.questionId){
                                        CV.selectedId = dropdownId;
                                      }
                                      updatedQuestionsArray.push(CV)
                                    })

                                    setJSONData({...jsonData,rightData:{...jsonData.rightData,questions:[...updatedQuestionsArray]}})
                                  }
                                }
                               
                              >
                                <MenuItem
                                  disabled
                                  value="none"
                                  className="selectItem"
                                >
                                  <>{genQues.placeholder}</>
                                </MenuItem>
                                {genQues?.options?.map((element: any) => (
                                  <MenuItem
                                    value={element?.ddName}
                                    className="selectItem"
                                  >
                                    {element?.ddName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>

                        {genQues.selectedId !== "" ? (
                          <Grid container>
                            <Grid item xs={4}>
                              <p className="gen-info">{genQues.optionName2}</p>
                            </Grid>
                            <Grid
                              item
                              xs={8}
                              sx={{ display: 'flex', alignItems: 'center' }}
                            >
                              <InfoIocn className="info-icon" />
                              <FormControl fullWidth>
                                <Select
                                  sx={{ mb: 1, borderRadius: 0 }}
                                  className="inputField"
                                  value={"Helo"}
                                  
                                  renderValue={(selected:any) =>{
                                    console.log(selected)
                                    return selected.join(', ')
                                  }
                                  }
                                  onChange={(event) =>
                                    {
                                      let dropdownId = "";
                                      jsonData.data.rightData.questions.forEach((CV:any, idx:number)=>{
                                        if(CV.questionId2==genQues.questionId2){
                                          CV.options2.forEach((option:any) => {
                                              if(option.ddName == event.target.value){
                                                dropdownId = option.ddId;
                                                document.getElementById(option.ddId)?.click();
                                              }
                                            });
                                          }
                                        })
                                        const updatedQuestionsArray : any[] = [];
                                        jsonData.data.rightData.questions.forEach(function(CV:any){
                                          if(CV.questionId2===genQues.questionId2){
                                            CV.selectedId2 = dropdownId;
                                          }
                                          updatedQuestionsArray.push(CV)
                                        })

                                        setJSONData({...jsonData,rightData:{...jsonData.rightData,questions:[...updatedQuestionsArray]}})
                                    }
                                  }
                                >
                                  <MenuItem
                                      value={"Demo"}
                                     
                                    >
                                      </MenuItem>
                                  
                                  {genQues.options2.map((element: any) => (
                                    <MenuItem
                                      value={element?.ddName}
                                     
                                    >
                                      <Checkbox
                                        value={element?.ddName}
                                        checked={
                                          //services.indexOf(element?.ddName) > -1
                                          true
                                        }
                                        sx={{
                                          p: 0,
                                          pr: 1,
                                          height: 0.5,
                                          fontSize: '12px',
                                        }}
                                        className="cutom-checkbox"
                                        //onChange={setServicesName(element?.ddName)}
                                      />
                                      <ListItemText
                                        primary={element?.ddName}
                                        sx={{ p: 0, fontSize: '12px' }}
                                        className="list-item"
                                      />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        ) : (
                          ''
                        )}

                        {/* {genQues.selectedId2 !== "" ? (
                          <Grid container>
                            <Grid item xs={4}>
                              <p className="gen-info">{genQues.optionName3}</p>
                            </Grid>
                            <Grid
                              item
                              xs={8}
                              sx={{ display: 'flex', alignItems: 'center' }}
                            >
                              <InfoIocn className="info-icon" />
                              <FormControl fullWidth>
                                <Select
                                  sx={{ mb: 1, borderRadius: 0 }}
                                  className="inputField"
                                  value={serviceOffer}
                                  multiple
                                  onChange={(event) =>
                                    handleServicesOffer(event)
                                  }
                                  renderValue={(selected) =>
                                    selected.join(', ')
                                  }
                                >
                                  <MenuItem
                                  disabled
                                  value="none"
                                  className="selectItem"
                                >
                                  <>{genQues.placeholder}</>
                                </MenuItem>
                                  {getFilterServiceData?.map((element: any) => (
                                    <MenuItem
                                      value={element?.ddName}
                                      //  onClick={() => setServicesId(element?.ddId)}
                                    >
                                      <Checkbox
                                        value={element?.ddName}
                                        checked={
                                          serviceOffer.indexOf(
                                            element?.ddName,
                                          ) > -1
                                        }
                                      />
                                      <ListItemText primary={element?.ddName} />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        ) : (
                          ''
                        )} */}
                      </Grid>
                    </>
                  );
              })}
            </Grid>
          </div>
        </div>
      </div>
      <Footer>
        <div className="button-container">
          {/* <div
          className={
            password && isPasswordValid(password) && password != ""
              ? ""
              : "cursor-block"
          }
        >
          <CustomButton className={
            password && isPasswordValid(password) && password != ""
              ? "submitButton"
              : "submitButton submit-block"
          }
            onClick={handleClick}>
            {startData.data.contentDetails.submitBTnDetails.submitBTnTxt}
          </CustomButton>
        </div> */}
          <div className="button-container">
            <div className="button-inr-btn">
              <CustomButton
                className={'submitButton back-btn'}
                onClick={handlePrevClick}
              >
                {jsonData.data?.footerData?.previousTxt}
              </CustomButton>
              <CustomButton className={'submitButton'} onClick={handleNextClick}>
                {jsonData.data?.footerData?.forwardTxt}
              </CustomButton>
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default GI;
