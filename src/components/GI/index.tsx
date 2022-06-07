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

const GI = () => {
  const [state, setState] = useState(0);
  const [jsonData, setJSONData] = useState<any>('');
  const [geography, setGeography] = useState('none');
  const [country, setCountry] = useState('none');
  const [sector, setSector] = useState('none');
  const [services, setServices] = useState<string[]>([]);
  const [getFilterCountry, setFilterCountry] = useState([]);
  const [getFilterService, setFilterService] = useState([]);

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
  }, []);

  const giInfo = jsonData?.data?.rightData[0];

  // const CountryDropdown = () => {
  //   generalData?.data?.rightData.map((genData: any) => {
  //     genData.questions.map((genQues: any) => {

  //     })
  //   })
  // }

  // const getSddQ2Options = (ques: any) => {
  //   const answer1 = ques.selectedId.split("_")[1];
  //   const map = ques.map.split("|").map((i: string) => i.split(":"));
  //   const index = map.findIndex((i: any) => i[0] == answer1);
  //   const optionsToRender = map[index][1].split("-");
  //   return [
  //     ...ques.options2.filter((i: any) => optionsToRender.includes(i.ddId)),
  //     { ddId: "", ddName: ques.placeholder2 },
  //   ];
  // };

  // const getDddQ2Options = (ques: any) => {
  //   const answers = ques.selectedId.split('_') as any[];
  //   const answer1: any[] = [];
  //   for (let i in answers) {
  //     if (parseInt(i) % 2 == 1) answer1.push(answers[i]);
  //   }
  //   const indices = [];
  //   const map = ques.map.split('|').map((i: string) => i.split(':'));
  //   for (let i in map) {
  //     const val = map[i];
  //     if (answer1.includes(val[0])) indices.push(i);
  //   }
  //   if (indices.length == 0) return [];
  //   const optionsToRender: any[] = [];

  //   for (let i of indices) {
  //     optionsToRender.push(...map[i][1].split('-'));
  //   }
  //   return ques.options2.filter((i: any) => optionsToRender.includes(i.ddId));
  // };

  const getDddQ3Options = (ques: any) => {
    const answers = ques.selectedId2.split('_') as any[];
    const answer2: any[] = [];
    for (let i in answers) {
      if (parseInt(i) % 2 == 1) answer2.push(answers[i]);
    }
    const indices = [];
    const map = ques.map2.split('|').map((i: string) => i.split(':'));
    for (let i in map) {
      const val = map[i];
      if (answer2.includes(val[0])) indices.push(i);
    }
    if (indices.length == 0) return [];
    const optionsToRender: any[] = [];

    for (let i of indices) {
      optionsToRender.push(...map[i][1].split('-'));
    }

    return ques.options3.filter((i: any) => optionsToRender.includes(i.ddId));
  };
  const handlegeography = (
    event: any,
    questionmap: any,
    questionoption2: any,
  ) => {
    setGeography(event.target.value);
    const filterCountry = getSddQ2Options(event, questionmap, questionoption2);
    setFilterCountry(filterCountry);
  };

  const handleCountry = (event: any) => {
    setCountry(event.target.value);
  };
  const handleSector = (event: any, questionmap: any, questionoption2: any) => {
    setSector(event.target.value);
    const selectedSector = getSddQ2Options(event, questionmap, questionoption2);
    setFilterService(selectedSector);
  };

  const handleServices = (
    event: any,
    questionmap2: any,
    questionoption3: any,
    ddId: any,
  ) => {
    const {
      target: { value },
    } = event;
    setServices(typeof value === 'string' ? value.split(',') : value);

    // const selectedServices = getdddptions(event, questionmap2);

    console.log(ddId);
    // console.log(ddId);
  };

  const getSddQ2Options = (
    event: any,
    questionmap: any,
    questionoption2: any,
  ) => {
    let filteredData;
    let selectIquestion = event.target.value.split('_')[1];
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

  const getdddptions = (event: any, questionmap2: any) => {
    debugger;
    const answers = event.target.value.split('_') as any[];
    const answer1: any[] = [];
    for (let i in answers) {
      if (parseInt(i) % 2 == 1) answer1.push(answers[i]);
    }
    const indices = [];
    const map = questionmap2.split('|').map((i: string) => i.split(':'));
    for (let i in map) {
      const val = map[i];
      if (answer1.includes(val[0])) indices.push(i);
    }
    if (indices.length == 0) return [];
    const optionsToRender: any[] = [];

    for (let i of indices) {
      optionsToRender.push(...map[i][1].split('-'));
    }
    return questionmap2.filter((i: any) => optionsToRender.includes(i.ddId));
  };

  //console.log(giInfo);
  return (
    <>
      <PrimaryHeader />
      <div className="general-container gi-container">
        <h3 className="general-heading gi-heading">{giInfo?.heading}</h3>
        <div className="gi-container__questions">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {/* {questionData()} */}
            {giInfo?.questions.map((genQues: any, index: number) => {
              if (genQues.type === 'txt' || genQues.type === 'num') {
                return (
                  <Grid item xs={12} md={6} className="inputCont">
                    <Grid container>
                      <Grid item xs={4}>
                        <p>{genQues.optionName}</p>
                      </Grid>
                      <Grid item xs={8}>
                        <Inputbox
                          className="inputField cutom-input-field"
                          id={genQues.questionId}
                          placeholder={genQues.placeholder}
                          type={genQues.type == 'num' ? 'number' : ''}
                          onChange={(e: any) =>
                            (genQues.selectedText = e.target.value)
                          }
                        />
                      </Grid>
                    </Grid>
                    {/* <Divider /> */}
                  </Grid>
                );
              } else if (genQues.type == 'dd' || genQues.type == 'year')
                return (
                  <Grid item xs={12} md={6} className="inputCont">
                    <Grid container sx={{ alignItems: 'center' }}>
                      <Grid item xs={4}>
                        <p>{genQues.optionName}</p>
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl fullWidth>
                          <Select
                            sx={{ p: 0, borderRadius: 0, mb: 1 }}
                            className="inputField"
                            value={genQues.selectedId}
                            // placeholder={genQues.placeholder}

                            // onClick={(e: any) => {
                            // genQues.selectedId = e.target.dataset.value;
                            // setState((state + 1) % 10);
                            // }}
                          >
                            {genQues?.options?.map((i: any) => (
                              <MenuItem value={i?.ddId} className="selectItem">
                                {/* {i?.ddName} */}
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
                    <Grid item xs={12} md={6} className="inputCont">
                      <Grid container>
                        <Grid item xs={4}>
                          <p>{genQues.optionName} </p>
                        </Grid>
                        <Grid item xs={8}>
                          <FormControl fullWidth>
                            <Select
                              displayEmpty={true}
                              value={geography}
                              defaultValue="none"
                              className="inputField"
                              onChange={(event) =>
                                handlegeography(
                                  event,
                                  genQues?.map,
                                  genQues?.options2,
                                )
                              }
                            >
                              <MenuItem disabled value="none">
                                <>{genQues.placeholder}</>
                              </MenuItem>
                              {genQues?.options?.map((i: any) => (
                                <MenuItem value={i?.ddId}>{i?.ddName}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                          <p>{genQues.optionName2} </p>
                        </Grid>
                        <Grid item xs={8}>
                          <FormControl
                            sx={{
                              width: '100%',
                              borderRadius: 0,
                              mt: 1,
                              mb: 1,
                            }}
                          >
                            {/* <Select
                  displayEmpty={true}
                  className="inputField"
                  //value={genQues.selectedId2 || ""}
                  value={geography}
                  //placeholder={genQues.placeholder}
                  // onClick={(e: any) => {
                  //     genQues.selectedId2 =
                  //     e.target.dataset.value;
                  //     setState((state + 1) % 10);
                  // }}
                 // onChange={handleCountry}
                  >
                  {genQues?.selectedId &&
                      getSddQ2Options(genQues)?.map(
                      (i: any) => (
                          <MenuItem value={i?.ddId}>
                          {i?.ddName}
                          </MenuItem>
                      )
                      )}
                  </Select> */}

                            <Select
                              displayEmpty={true}
                              value={country}
                              defaultValue="none"
                              className="inputField"
                              onChange={handleCountry}
                            >
                              <MenuItem disabled value="none">
                                <>{genQues.placeholder}</>
                              </MenuItem>
                              {getFilterCountry.map((el: any) => (
                                <MenuItem value={el?.ddId}>
                                  {el?.ddName}
                                </MenuItem>
                              ))}
                              {/* {genQues?.selectedId &&
                                getSddQ2Options(genQues)?.map((elm: any) => (
                                  <MenuItem value={elm?.ddId}>
                                    {elm?.ddName}
                                  </MenuItem>
                                ))} */}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* <Grid item xs={12} md={6}>
        <Grid container>
            <Grid item xs={3}>
            <p>{genQues.optionName2}</p>
            </Grid>
            <Grid item xs={8}>
            <FormControl sx={{ m: 1, width: "100%" }}>
                <Select
                value={genQues.selectedId2 || ""}
                placeholder={genQues.placeholder}
                onClick={(e: any) => {
                    genQues.selectedId2 =
                    e.target.dataset.value;
                    setState((state + 1) % 10);
                }}
                >
                {genQues?.selectedId &&
                    getSddQ2Options(genQues)?.map(
                    (i: any) => (
                        <MenuItem value={i?.ddId}>
                        {i?.ddName}
                        </MenuItem>
                    )
                    )}
                </Select>
            </FormControl>
            </Grid>
        </Grid>
        </Grid> */}
                  </>
                );
              else if (genQues.type == 'ddd')
                return (
                  <>
                    <Grid item xs={12} md={6} className="inputCont">
                      <Grid container>
                        <Grid item xs={4}>
                          <p>{genQues.optionName} ffff</p>
                        </Grid>
                        <Grid item xs={8}>
                          <FormControl fullWidth>
                            <Select
                              sx={{ mb: 1, borderRadius: 0 }}
                              className="inputField"
                              value={sector}
                              onChange={(event) =>
                                handleSector(
                                  event,
                                  genQues?.map,
                                  genQues?.options2,
                                )
                              }
                            >
                              <MenuItem disabled value="none">
                                <>{genQues.placeholder}</>
                              </MenuItem>
                              {genQues?.options?.map((i: any) => (
                                <MenuItem value={i?.ddId}>{i?.ddName}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={4}>
                          <p>{genQues.optionName2}</p>
                        </Grid>
                        <Grid item xs={8}>
                          {/* {console.log(genQues)} */}
                          <FormControl fullWidth>
                            <Select
                              sx={{ mb: 1, borderRadius: 0 }}
                              className="inputField"
                              value={services}
                              multiple
                              onChange={(event) =>
                                handleServices(
                                  event,
                                  genQues?.map2,
                                  genQues?.options3,
                                  genQues?.options3,
                                )
                              }
                              renderValue={(selected) => selected.join(', ')}
                            >
                              {getFilterService?.map((element: any) => (
                                <MenuItem
                                  value={element?.ddName}
                                  data-id={element?.ddId}
                                >
                                  <Checkbox
                                    checked={
                                      services.indexOf(element?.ddName) > -1
                                    }
                                  />
                                  <ListItemText primary={element?.ddName} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={4}>
                          <p>{genQues.optionName3}</p>
                        </Grid>
                        <Grid item xs={8}>
                          <FormControl fullWidth>
                            <Select
                              sx={{ mb: 1, borderRadius: 0 }}
                              className="inputField"
                              value={genQues.selectedId3.split(',') || ''}
                              placeholder={genQues.placeholder}
                              onClick={(e: any) => {
                                let arr = genQues.selectedId3.split(',');
                                const index = arr.indexOf(
                                  e.target.dataset.value,
                                );
                                if (index != -1) {
                                  arr.splice(index, 1);
                                } else arr.push(e.target.dataset.value);
                                arr = arr.filter((i: any) => i);
                                genQues.selectedId3 = arr.join(',');
                                setState((state + 1) % 10);
                              }}
                              multiple
                            >
                              {/* {genQues?.selectedId2 &&
                    getDddQ3Options(genQues)?.map(
                    (i: any) => (
                        <MenuItem value={i?.ddId}>
                        {i?.ddName}
                        </MenuItem>
                    )
                    )} */}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                );
            })}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default GI;
