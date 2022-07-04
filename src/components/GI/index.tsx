import React, { useState, useEffect } from "react";
import PrimaryHeader from "../Headers/PrimaryHeader";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Checkbox, InputLabel, ListItemText, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Inputbox } from "../UI/Input";
import { Grid } from "@mui/material";
import { Footer } from "../Footer";
import CustomButton from "../UI/CustomButton";
import { ReactComponent as InfoIcon } from "../../assets/svg/info-icon.svg";
import Tooltip from "@mui/material/Tooltip";
import CustomPopup from "../UI/CustomPopup";
import DDD from "../UI/ddd";
import HsddInput from "../ImpactCalculator/HsddInput";

const GI = () => {
  const [jsonData, setJSONData] = useState<any>("");
  const [serviceOffer, setServicesOffer] = useState<any>([]);
  const [showError, setShowError] = useState(false);
  const [open, setOpen] = useState(false);
  const [dddanswered, setDDDAnswered] = useState(false);
  const [unAnsCount, setUnAnsCount] = useState(0);

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerHTML)
    );
    getYears(jsonData?.data?.rightData?.questions[7])
  }, []);

  // useEffect(() => {
  //   console.log(unAnsCount);
  // }, [unAnsCount]);

  useEffect(() => {
    console.log(dddanswered);
  }, [dddanswered]);

  const isReqAnswered = () => {
    let count = 0;
    jsonData?.data?.rightData?.questions.map((ques: any) => {
      if (ques.type != "ddd") {
        // prettier-ignore
        if ((ques.isRequired == true && (ques.selectedId == "" || ques.selectedText == "")) ||
        (ques.isRequired2 == true && (ques.selectedId2 == "" || ques.selectedText2 == ""))
        ) {
          count = count + 1;
        }
      } else if (ques.type == "ddd" && dddanswered == false) {
        count = count + 1;
      }
    });

    setUnAnsCount(count);

    console.log("unanswered : ", count);

    if (count > 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const giInfo = jsonData?.data?.rightData;

  const getselectedDDName = (options: any, selectedId: string) => {
    let selectedDDName = "";
    options?.forEach((element: any) => {
      if (element.ddId == selectedId) {
        selectedDDName = element.ddName;
      }
    });
    return selectedDDName;
  };

  const getselectedDDNameMulti = (options: any, selectedId: string) => {
    let selectedDDName: string[] = [];
    let selectedIdArr = selectedId.split(",");

    options.forEach(function (option: any) {
      if (selectedIdArr.includes(option.ddId)) {
        selectedDDName.push(option["ddName"]);
      }
    });

    // options?.forEach((element: any) => {
    //   if (element.ddId == selectedId) {
    //     selectedDDName.push(element["ddName"]);
    //   }
    // });

    // selectedIdArr.forEach((x: any, i: any) => {
    //   let ind = options.indexOf((opt: any) => opt.ddId == selectedIdArr[i]);
    //   selectedDDName.push(options[ind].ddName);
    // });

    // selectedDDName = ["A7_3", "A7_5"];

    return selectedDDName;
  };

  const uncheckCheckboxes = (options: any[]) => {
    options.forEach((currObj: any) => {
      let elemId = currObj.ddId;
      let elem = document.getElementById(elemId);
      if (elem) {
        // @ts-ignore
        elem.checked = false;
      }
    });
  };

  const checkCheckboxes = (ddIdsArr: any[]) => {
    ddIdsArr.forEach((ddId: any) => {
      let elemId = ddId;
      let elem = document.getElementById(elemId);
      if (elem) {
        // @ts-ignore
        elem.checked = true;
      }
    });
  };

  const mapContainsId = (map: any, selectedId: any) => {
    selectedId = selectedId.split("_")[1];
    const allMapIndex: string[] = [];
    map.split("|").forEach((element: any) => {
      allMapIndex.push(element.split(":")[0]);
    });

    if (allMapIndex.indexOf(selectedId) != -1) {
      return true;
    }

    return false;
  };

  const getMapIds = (map: any) => {
    let mapOptions = map.split("|");
    let currIdOptions = mapOptions.split(":")[1];
    let idsArr = currIdOptions.split("-");

    return idsArr;
  };

  const mapContainsId2 = (map: any, selectedId: any) => {
    var selectedIdNumArr: string[] = [];
    var selectedIdArr: string[] = selectedId.split(",");
    let isCondition = false;
    selectedIdArr.forEach((elm: any) => {
      selectedIdNumArr.push(elm.split("_")[1]);
    });
    const allMapIndex: string[] = [];
    map.split("|").forEach((element: any) => {
      allMapIndex.push(element.split(":")[0]);
    });

    selectedIdNumArr.forEach((currSelectedIdNum: string) => {
      if (allMapIndex.indexOf(currSelectedIdNum) != -1) {
        isCondition = true;
      }
    });

    return isCondition;
  };

  const getSddQ2Options = (
    ddLabel: any,
    questionmap: any,
    questionoption2: any
  ) => {
    let filteredData: string[] = [];
    const DDIdArr: string[] = [];
    const ddLabelArr = ddLabel.split(",");
    if (ddLabelArr.length > 1) {
      ddLabelArr.forEach((elm: any) => {
        let selectIquestion = elm.split("_")[1];
        const mapQuesion = questionmap
          .split("|")
          .map((element: string) => element.split(":")[0]);

        const indexOfSelectIquestion = mapQuesion.indexOf(selectIquestion);
        if (indexOfSelectIquestion != -1) {
          const joinedDDArr = questionmap
            .split("|")
            [indexOfSelectIquestion].split(":")[1];
          joinedDDArr.split("-").forEach((CV: string) => {
            DDIdArr.push(CV);
          });
        }
      });

      DDIdArr.forEach((ddId: any) => {
        const filterIndex = filteredData.findIndex((x: any) => x.ddId === ddId);
        if (filterIndex == -1) {
          const returnedObj = questionoption2.filter((elm: any) => {
            return ddId == elm.ddId;
          });
          filteredData.push(...returnedObj);
        }
      });
      return filteredData;
    } else {
      let selectIquestion = ddLabel.split("_")[1];
      const mapQuesion = questionmap
        .split("|")
        .map((element: string) => element.split(":"));
      const index = mapQuesion.findIndex((el: any) => el[0] == selectIquestion);
      if (index === -1) {
        filteredData = [];
      } else {
        const optionsToRender = mapQuesion[index][1]?.split("-");
        filteredData = questionoption2.filter((el: any) =>
          optionsToRender.includes(el.ddId)
        );
      }
      return filteredData;
    }
  };

  const getdddptions = (
    servicesId: any,
    questionmap: any,
    questionoption3: any
  ) => {
    let filteredData;
    let selectIquestion = servicesId.split("_")[1];
    const mapQuesion = questionmap
      .split("|")
      .map((element: string) => element.split(":"));
    const index = mapQuesion.findIndex((el: any) => el[0] == selectIquestion);
    if (index === -1) {
      filteredData = [];
      //setServices([]);
    } else {
      const optionsToRender = mapQuesion[index][1]?.split("-");
      filteredData = questionoption3.filter((el: any) =>
        optionsToRender.includes(el.ddId)
      );
    }
    return filteredData;
  };

  const handleServicesOffer = (event: any) => {
    setServicesOffer(event.target.value);
  };

  const inputValidate = (value: any, pattern: any) => {
    const reg = pattern;
    let res = "";

    for (let i = 0; i < value.length; i++) {
      if (value[0] == " ") return "";

      if (reg.test(value[i])) res += value[i];
    }

    return res;
  };

  const handlePrevClick = () => {
    if (jsonData !== "") {
      // @ts-ignore
      document.getElementById("navText").value =
        jsonData?.data?.footerData?.previousInputId;
      // @ts-ignore
      document.getElementById("forwardbutton").disabled = false;
      // @ts-ignore
      document.getElementById("forwardbutton").click();
    }
  };

  const handleNextClick = () => {
    if (jsonData !== "") {
      if (isReqAnswered() == true) {
        // @ts-ignore
        document.getElementById("navText").value =
          jsonData?.data?.footerData?.forwardInputId;
        // @ts-ignore
        document.getElementById("forwardbutton").disabled = false;
        // @ts-ignore
        document.getElementById("forwardbutton").click();
        isReqAnswered();
      } else {
        setShowError(true);
        setOpen(true);
      }
    }
  };

  const getYears = (ques:any) => {
    let currOptions = ques?.options.map((year:any) => year.ddName);
    let currYear = new Date().getFullYear();
    let reqYears = [];
    reqYears.push(currYear);

    for(var i=1; i<(Number(ques?.incrementyear)+1); i++){
      reqYears.push(currYear + i);
      reqYears.push(currYear - i);
    }
    reqYears.sort();
    return reqYears.filter((x:any) => currOptions?.findIndex((y:any) => y == x) != -1);
  }

  return (
    <div className="gi-container-outer">
      <PrimaryHeader />
      <div className=" gi-container">
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
                if (genQues.type === "txt" || genQues.type === "num") {
                  return genQues.type === "txt" ? (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      className="inputCont"
                      sx={{ borderBottom: "1px solid #c4c4c4" }}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={4}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <p className="gen-info">{genQues.optionName}</p>
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Tooltip title={genQues?.description} arrow>
                            <InfoIcon className="info-icon" />
                          </Tooltip>
                          <Inputbox
                            className="inputField cutom-input-field"
                            id={genQues.questionId + "_html"}
                            placeholder={genQues.placeholder}
                            type={genQues.type == "text" ? "text" : ""}
                            value={genQues.selectedText}
                            onChange={(e: any) => {
                              // (genQues.selectedText = e.target.value)
                              // // (setJSONData({...jsonData,rightData:{...jsonData.rightData,questions:[...jsonData.rightData.questions,jsonData.rightData.questions[index].selectedText = e.target.value]}}))
                              // (
                              //   inputValidate(e.target.value, /^[A-Za-z ]+$/)
                              //     ? console.log('Valid Input')
                              //     : (e.target.value = ''),
                              // )
                              e.target.value = inputValidate(
                                e.target.value,
                                /^[A-Za-z ]+$/
                              );

                              const updatedQuestionsArray: any[] = [];
                              jsonData.data.rightData.questions.forEach(
                                function (CV: any) {
                                  if (CV.questionId === genQues.questionId) {
                                    CV.selectedText = e.target.value;
                                  }
                                  updatedQuestionsArray.push(CV);
                                }
                              );

                              setJSONData({
                                ...jsonData,
                                rightData: {
                                  ...jsonData.rightData,
                                  questions: [...updatedQuestionsArray],
                                },
                              });
                              let element: any;
                              // @ts-ignore
                              // document.getElementById(
                              //   genQues.questionId,
                              // ).value = e.target.value;
                              element = document.getElementById(
                                `${genQues?.questionId}`
                              );
                              element.value = e.target.value;
                            }}
                            error={showError && genQues.isRequired}
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
                      sx={{ borderBottom: "1px solid #c4c4c4", pb: 1 }}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={4}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <p className="gen-info">{genQues.optionName}</p>
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Tooltip title={genQues?.description} arrow>
                            <InfoIcon className="info-icon" />
                          </Tooltip>
                          <Inputbox
                            className="inputField cutom-input-field"
                            id={genQues.questionId + "_html"}
                            placeholder={genQues.placeholder}
                            type={genQues.type == "text" ? "text" : ""}
                            value={genQues.selectedText}
                            // onChange={(e: any) =>
                            //   (genQues.selectedText = e.target.value)(
                            //     inputValidate(e.target.value, /^[0-9]+$/)
                            //       ? console.log('Valid Input')
                            //       : (e.target.value = ''),
                            //   )
                            // }
                            onChange={(e: any) => {
                              e.target.value = inputValidate(
                                e.target.value.trim(),
                                /^[0-9]+$/
                              );

                              const updatedQuestionsArray: any[] = [];
                              jsonData.data.rightData.questions.forEach(
                                function (CV: any) {
                                  if (CV.questionId === genQues.questionId) {
                                    CV.selectedText = e.target.value;
                                  }
                                  updatedQuestionsArray.push(CV);
                                }
                              );

                              setJSONData({
                                ...jsonData,
                                rightData: {
                                  ...jsonData.rightData,
                                  questions: [...updatedQuestionsArray],
                                },
                              });
                              // @ts-ignore
                              // document.getElementById(
                              //   genQues?.questionId,
                              // )?.value = e.target.value;
                              let element: any;
                              element = document.getElementById(
                                `${genQues?.questionId}`
                              );
                              element.value = e.target.value;
                            }}
                            error={showError && genQues.isRequired}
                          />
                        </Grid>
                      </Grid>
                      {/* <Divider /> */}
                    </Grid>
                  );
                } else if (genQues.type == "dd" || genQues.type == "year")
                  return (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      className="inputCont"
                      sx={{ borderBottom: "1px solid #c4c4c4" }}
                    >
                      <Grid container sx={{ alignItems: "center" }}>
                        <Grid item xs={4}>
                          <p className="gen-info">{genQues.optionName} </p>
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Tooltip title={genQues?.description} arrow>
                            <InfoIcon className="info-icon" />
                          </Tooltip>
                          <FormControl fullWidth>
                            <Select
                              sx={{ p: 0, borderRadius: 0, mb: 1 }}
                              className="inputField cutom-input-field"
                              displayEmpty={true}
                              defaultValue="none"
                              error={
                                showError &&
                                genQues.selectedId == "" &&
                                genQues.isRequired
                              }
                              renderValue={(selected) => {
                                if (selected.length === 0) {
                                  return <>{genQues?.placeholder}</>;
                                }
                                return selected;
                              }}
                              value={getselectedDDName(
                                genQues.options,
                                genQues.selectedId
                              )}
                              onChange={(e) => {
                                let dropdownId = "";
                                jsonData.data.rightData.questions.forEach(
                                  (CV: any, idx: number) => {
                                    if (CV.questionId == genQues.questionId) {
                                      CV.options.forEach((option: any) => {
                                        if (option.ddName == e.target.value) {
                                          dropdownId = option.ddId;

                                          document
                                            .getElementById(option.ddId)
                                            ?.click();
                                        }
                                      });
                                    }
                                  }
                                );

                                // setJSONData({...jsonData,rightData:{...jsonData.rightData,questions:[...updatedQuestionsArray]}})

                                const updatedQuestionsArray: any[] = [];
                                jsonData.data.rightData.questions.forEach(
                                  function (CV: any) {
                                    if (CV.questionId === genQues.questionId) {
                                      CV.selectedId = dropdownId;
                                    }
                                    updatedQuestionsArray.push(CV);
                                  }
                                );

                                setJSONData({
                                  ...jsonData,
                                  rightData: {
                                    ...jsonData.rightData,
                                    questions: [...updatedQuestionsArray],
                                  },
                                });
                              }}
                            >
                              <MenuItem
                                disabled
                                value="none"
                                className="selectItem"
                              >
                                <>{genQues.placeholder}</>
                              </MenuItem>
                              {genQues.type == "year" ? (
                                getYears(genQues).map((year:any) => (
                                  <MenuItem
                                    value={year}
                                    className="selectItem"
                                  >
                                    {year}
                                  </MenuItem>
                                ))
                                ) : (
                              genQues?.options?.map((elemnt: any) => (
                                <MenuItem
                                  value={elemnt?.ddName}
                                  className="selectItem"
                                >
                                  {elemnt?.ddName}
                                </MenuItem>
                              )))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                else if (genQues.type == "sdd")
                  return (
                    <>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        className="inputCont"
                        sx={{ borderBottom: "1px solid #c4c4c4" }}
                      >
                        <Grid container>
                          <Grid
                            item
                            xs={4}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <p className="gen-info">{genQues.optionName} </p>
                          </Grid>
                          <Grid
                            item
                            xs={8}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Tooltip title={genQues?.description} arrow>
                              <InfoIcon className="info-icon" />
                            </Tooltip>
                            <FormControl fullWidth>
                              <Select
                                sx={{ p: 0, borderRadius: 0, mb: 1 }}
                                displayEmpty={true}
                                renderValue={(selected) => {
                                  if (selected.length === 0) {
                                    return <>{genQues?.placeholder}</>;
                                  }

                                  return selected;
                                }}
                                value={getselectedDDName(
                                  genQues.options,
                                  genQues.selectedId
                                )}
                                defaultValue="none"
                                className="inputField cutom-input-field"
                                onChange={(event) => {
                                  let dropdownId = "";
                                  jsonData.data.rightData.questions.forEach(
                                    (CV: any, idx: number) => {
                                      if (CV?.type == genQues?.type) {
                                        CV.selectedId2 = "";
                                        if (
                                          CV.questionId == genQues.questionId
                                        ) {
                                          CV.options.forEach((option: any) => {
                                            if (
                                              option.ddName ==
                                              event.target.value
                                            ) {
                                              dropdownId = option.ddId;

                                              document
                                                .getElementById(option.ddId)
                                                ?.click();
                                              uncheckCheckboxes(
                                                genQues.options2
                                              );
                                            }
                                          });
                                        }
                                      }
                                    }
                                  );
                                  const updatedQuestionsArray: any[] = [];
                                  jsonData.data.rightData.questions.forEach(
                                    function (CV: any) {
                                      if (
                                        CV.questionId === genQues.questionId
                                      ) {
                                        CV.selectedId = dropdownId;
                                      }
                                      updatedQuestionsArray.push(CV);
                                    }
                                  );

                                  setJSONData({
                                    ...jsonData,
                                    rightData: {
                                      ...jsonData.rightData,
                                      questions: [...updatedQuestionsArray],
                                    },
                                  });
                                }}
                                error={
                                  showError &&
                                  genQues.selectedId == "" &&
                                  genQues.isRequired
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

                          {genQues.selectedId !== "" ? (
                            <>
                              <Grid
                                item
                                xs={4}
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <p className="gen-info">
                                  {genQues.optionName2}{" "}
                                </p>
                              </Grid>
                              <Grid
                                item
                                xs={8}
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Tooltip title={genQues?.description2} arrow>
                                  <InfoIcon className="info-icon" />
                                </Tooltip>
                                <FormControl
                                  sx={{
                                    width: "100%",
                                    borderRadius: 0,
                                    mt: 1,
                                    mb: 1,
                                  }}
                                >
                                  <Select
                                    sx={{ p: 0, borderRadius: 0 }}
                                    displayEmpty={true}
                                    renderValue={(selected) => {
                                      if (selected.length === 0) {
                                        return <>{genQues?.placeholder}</>;
                                      }

                                      return selected;
                                    }}
                                    value={getselectedDDName(
                                      genQues.options2,
                                      genQues.selectedId2
                                    )}
                                    defaultValue="none"
                                    className="inputField"
                                    onChange={(event: any) => {
                                      let dropdownId = "";
                                      jsonData.data.rightData.questions.forEach(
                                        (CV: any, idx: number) => {
                                          if (
                                            CV.questionId2 ==
                                            genQues.questionId2
                                          ) {
                                            CV.options2.forEach(
                                              (option: any) => {
                                                if (
                                                  option.ddName ==
                                                  event.target.value
                                                ) {
                                                  dropdownId = option.ddId;

                                                  document
                                                    .getElementById(option.ddId)
                                                    ?.click();
                                                }
                                              }
                                            );
                                          }
                                        }
                                      );
                                      const updatedQuestionsArray: any[] = [];
                                      jsonData.data.rightData.questions.forEach(
                                        function (CV: any) {
                                          if (
                                            CV.questionId2 ===
                                            genQues.questionId2
                                          ) {
                                            CV.selectedId2 = dropdownId;
                                          }
                                          updatedQuestionsArray.push(CV);
                                        }
                                      );

                                      setJSONData({
                                        ...jsonData,
                                        rightData: {
                                          ...jsonData.rightData,
                                          questions: [...updatedQuestionsArray],
                                        },
                                      });
                                    }}
                                    error={
                                      showError &&
                                      genQues.selectedId2 == "" &&
                                      genQues.isRequired2
                                    }
                                  >
                                    <MenuItem
                                      disabled
                                      value="none"
                                      className="selectItem"
                                    >
                                      <>{genQues.placeholder}</>
                                    </MenuItem>
                                    {getSddQ2Options(
                                      genQues.selectedId,
                                      genQues.map,
                                      genQues.options2
                                    ).map((item: any) => (
                                      <MenuItem
                                        value={item?.ddName}
                                        className="selectItem"
                                      >
                                        {item?.ddName}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>{" "}
                            </>
                          ) : null}
                        </Grid>
                      </Grid>
                    </>
                  );
                else if (genQues.type == "ddd")
                  return (
                    <>
                      <DDD
                        genQues={genQues}
                        showError={showError}
                        index={index}
                        setDDDAnswered={setDDDAnswered}
                      />

                      {/* <HsddInput
                        question={genQues}
                        error={showError}
                        onChange={() => console.log("change")}
                      /> */}
                    </>
                  );
              })}
            </Grid>
          </div>
        </div>
      </div>
      <Footer>
        <div className="button-container">
          <div className="button-container">
            <div className="button-inr-btn">
              <CustomButton
                className="submitButton  mar-right"
                onClick={handlePrevClick}
              >
                {jsonData.data?.footerData?.previousTxt}
              </CustomButton>
              <CustomButton className="submitButton " onClick={handleNextClick}>
                {jsonData.data?.footerData?.forwardTxt}
              </CustomButton>
            </div>
          </div>
        </div>
      </Footer>
      <CustomPopup
        buttonText={jsonData?.data?.errorData?.btnText}
        description={jsonData?.data?.errorData?.bodyText}
        handleClose={handleClose}
        open={open}
      />
    </div>
  );
};

export default GI;
