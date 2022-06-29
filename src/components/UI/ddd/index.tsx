import {
  Checkbox,
  FormControl,
  Grid,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { ReactComponent as InfoIcon } from "../../../assets/svg/info-icon.svg";
import React, { useState, useEffect } from "react";

interface dddProps {
  genQues: any;
  showError: boolean;
  index: number;
}

const defaultProps: dddProps = {
  genQues: {},
  showError: false,
  index: 0,
};

const DDD = (props: dddProps) => {
  const { genQues, showError, index } = props;
  const [jsonData, setJSONData] = useState<any>("");
  const [serviceOffer, setServicesOffer] = useState<any>([]);
  //   const [showError, setShowError] = useState(false);
  const [open, setOpen] = useState(false);

  const [currQues, setCurrQues] = useState<any>("");

  useEffect(() => {
    // @ts-ignore
    let data = JSON.parse(document.getElementById("jsonData")?.innerHTML);
    setJSONData(data);
    console.log(data?.data?.rightData?.questions[index]);
    setCurrQues(data?.data?.rightData?.questions[index]);
  }, []);

  const getselectedDDName = (options: any, selectedId: string) => {
    let selectedDDName = "";
    options?.forEach((element: any) => {
      if (element.ddId == selectedId) {
        selectedDDName = element.ddName;
      }
    });
    console.log(jsonData?.data?.rightData?.questions[index].selectedId);
    return selectedDDName;
  };

  const mapContainsId = (map: any, selectedId: any) => {
    selectedId = selectedId?.split("_")[1];
    const allMapIndex: string[] = [];
    map?.split("|").forEach((element: any) => {
      allMapIndex.push(element.split(":")[0]);
    });

    if (allMapIndex.indexOf(selectedId) != -1) {
      return true;
    }

    return false;
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
    console.log("ok");
  };

  const getselectedDDNameMulti = (options: any, selectedId: string) => {
    let selectedDDName: string[] = [];
    let selectedIdArr = selectedId?.split(",");

    options?.forEach(function (option: any) {
      if (selectedIdArr.indexOf(option.ddId) != -1) {
        selectedDDName.push(option["ddName"]);
      }
    });

    console.log(selectedId);

    return selectedDDName;
  };

  const mapContainsId2 = (map: any, selectedId: any) => {
    var selectedIdNumArr: string[] = [];
    var selectedIdArr: string[] = selectedId?.split(",");
    let isCondition = false;
    selectedIdArr?.forEach((elm: any) => {
      selectedIdNumArr.push(elm.split("_")[1]);
    });
    const allMapIndex: string[] = [];
    map?.split("|").forEach((element: any) => {
      allMapIndex.push(element.split(":")[0]);
    });

    selectedIdNumArr?.forEach((currSelectedIdNum: string) => {
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
        ?.split("|")
        .map((element: string) => element.split(":"));
      const index = mapQuesion?.findIndex(
        (el: any) => el[0] == selectIquestion
      );
      if (index === -1) {
        filteredData = [];
      } else {
        const optionsToRender = mapQuesion[index][1]?.split("-");
        filteredData = questionoption2.filter((el: any) =>
          optionsToRender?.includes(el.ddId)
        );
      }
      return filteredData;
    }
  };

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
          <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            <p className="gen-info">{currQues.optionName} </p>
          </Grid>
          <Grid item xs={8} sx={{ display: "flex", alignItems: "center" }}>
            <InfoIcon className="info-icon" />
            <FormControl fullWidth>
              <Select
                sx={{ mb: 1, borderRadius: 0 }}
                className="inputField"
                displayEmpty
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <>{currQues?.placeholder}</>;
                  }
                  return selected;
                }}
                value={getselectedDDName(currQues.options, currQues.selectedId)}
                onChange={(event) => {
                  let dropdownId = "";
                  jsonData.data.rightData.questions.forEach(
                    (CV: any, idx: number) => {
                      if (CV?.type == currQues?.type) {
                        CV.selectedId2 = "";
                        CV.selectedId3 = "";
                        if (CV.questionId == currQues.questionId) {
                          CV.options.forEach((option: any) => {
                            if (option.ddName == event.target.value) {
                              dropdownId = option.ddId;

                              document.getElementById(option.ddId)?.click();
                              uncheckCheckboxes(currQues.options2);
                              uncheckCheckboxes(currQues.options3);
                            }
                          });
                        }
                      }
                    }
                  );

                  const updatedQuestionsArray: any[] = [];
                  jsonData.data.rightData.questions.forEach(function (CV: any) {
                    if (CV.questionId === currQues.questionId) {
                      CV.selectedId = dropdownId;
                    }
                    updatedQuestionsArray.push(CV);
                  });

                  setJSONData({
                    ...jsonData,
                    rightData: {
                      ...jsonData.rightData,
                      questions: [...updatedQuestionsArray],
                    },
                  });
                }}
                error={
                  showError && currQues.selectedId == "" && currQues.isRequired
                }
              >
                <MenuItem disabled value="none" className="selectItem">
                  <>{currQues.placeholder}</>
                </MenuItem>
                {currQues?.options?.map((element: any) => (
                  <MenuItem value={element?.ddName} className="selectItem">
                    {element?.ddName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {currQues?.selectedId !== "" &&
        mapContainsId(currQues.map, currQues.selectedId) ? (
          <Grid container>
            <Grid item xs={4}>
              <p className="gen-info">{currQues.optionName2}</p>
            </Grid>
            <Grid item xs={8} sx={{ display: "flex", alignItems: "center" }}>
              <InfoIcon className="info-icon" />
              <FormControl fullWidth>
                <Select
                  sx={{ mb: 1, borderRadius: 0 }}
                  className="inputField"
                  displayEmpty
                  // value={"A7_6"}
                  value={getselectedDDNameMulti(
                    currQues.options2,
                    currQues.selectedId2
                  )} // genQues.selectedId2.split(", ")
                  multiple
                  renderValue={(selected: any) => {
                    if (selected.length === 0) {
                      return <>{currQues?.placeholder}</>;
                    }
                    return selected.join(",");
                    // return ["hello",",hello2"]
                  }}
                  onChange={(event) => {
                    uncheckCheckboxes(currQues.options2);
                    uncheckCheckboxes(currQues.options3);
                    let dropdownIdsArr: string[] = [];
                    jsonData.data.rightData.questions.forEach(
                      (CV: any, idx: number) => {
                        CV.selectedId3 = "";
                        if (CV.questionId2 == currQues.questionId2) {
                          let arr = currQues.selectedId2.split(",");
                          CV.options2.forEach((option: any) => {
                            const shownOptions = getSddQ2Options(
                              currQues.selectedId,
                              currQues.map,
                              currQues.options2
                            );
                            const shownIds = shownOptions.map(
                              (x: any) => x.ddId
                            );
                            // const ddSelectedIndex =
                            //   event.target.value.indexOf(
                            //     option.ddName
                            //   );
                            // if (ddSelectedIndex != -1) {
                            //   dropdownIdsArr.push(option.ddId);
                            // }
                            if (
                              event.target.value.includes(option.ddName) &&
                              shownIds.includes(option.ddId)
                            ) {
                              dropdownIdsArr.push(option.ddId);
                            }
                          });
                          checkCheckboxes(dropdownIdsArr);
                        }
                      }
                    );

                    console.log(event.target);

                    const updatedQuestionsArray: any[] = [];
                    jsonData.data.rightData.questions.forEach(function (
                      CV: any
                    ) {
                      if (CV.questionId2 === currQues.questionId2) {
                        CV.selectedId2 = dropdownIdsArr.join();
                      }
                      updatedQuestionsArray.push(CV);
                    });

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
                    currQues.selectedId == "" &&
                    currQues.isRequired
                  }
                >
                  {getSddQ2Options(
                    currQues.selectedId,
                    currQues.map,
                    currQues.options2
                  ).map((element: any) => (
                    <MenuItem value={element?.ddName}>
                      <Checkbox
                        value={element?.ddName}
                        checked={
                          currQues.selectedId2.includes(element.ddId)
                            ? true
                            : false
                        }
                        sx={{
                          p: 0,
                          pr: 1,
                          height: 0.5,
                          fontSize: "12px",
                        }}
                        className="cutom-checkbox"
                      />
                      <ListItemText
                        primary={element?.ddName}
                        sx={{ p: 0, fontSize: "12px" }}
                        className="list-item"
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        ) : null}

        {currQues?.selectedId2 !== "" &&
        mapContainsId2(currQues?.map2, currQues?.selectedId2) ? (
          <Grid container>
            <Grid item xs={4}>
              <p className="gen-info">{currQues.optionName3}</p>
            </Grid>
            <Grid item xs={8} sx={{ display: "flex", alignItems: "center" }}>
              <InfoIcon className="info-icon" />
              <FormControl fullWidth>
                <Select
                  sx={{ mb: 1, borderRadius: 0 }}
                  className="inputField"
                  displayEmpty
                  renderValue={(selected: any) => {
                    if (selected.length === 0) {
                      return <>{currQues?.placeholder}</>;
                    }
                    return selected.join(",");
                    //return ["hello",",hello2"]
                  }}
                  value={getselectedDDNameMulti(
                    currQues.options3,
                    currQues.selectedId3
                  )} // genQues.selectedId2.split(", ")
                  multiple
                  onChange={(event) => {
                    uncheckCheckboxes(currQues.options3);
                    let dropdownIdsArr: string[] = [];
                    jsonData.data.rightData.questions.forEach(
                      (CV: any, idx: number) => {
                        if (CV.questionId3 == currQues.questionId3) {
                          CV.options3.forEach((option: any) => {
                            const ddSelectedIndex = event.target.value.indexOf(
                              option.ddName
                            );
                            if (ddSelectedIndex != -1) {
                              dropdownIdsArr.push(option.ddId);

                              document.getElementById(option.ddId)?.click();
                            }
                          });
                        }
                      }
                    );

                    const updatedQuestionsArray: any[] = [];
                    jsonData.data.rightData.questions.forEach(function (
                      CV: any
                    ) {
                      if (CV.questionId3 === currQues.questionId3) {
                        CV.selectedId3 = dropdownIdsArr.join(",");
                      }
                    });

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
                    currQues.selectedId == "" &&
                    currQues.isRequired
                  }
                >
                  <MenuItem disabled value="none" className="selectItem">
                    <>{currQues.placeholder}</>
                  </MenuItem>
                  {getSddQ2Options(
                    currQues.selectedId2,
                    currQues.map2,
                    currQues.options3
                  ).map((element: any) => (
                    <MenuItem
                      value={element?.ddName}
                      //  onClick={() => setServicesId(element?.ddId)}
                    >
                      <Checkbox
                        value={element?.ddName}
                        sx={{
                          p: 0,
                          pr: 1,
                          height: 0.5,
                          fontSize: "12px",
                        }}
                        className="cutom-checkbox"
                        checked={
                          currQues.selectedId3.indexOf(element.ddId) != -1
                            ? true
                            : false
                        }
                      />
                      <ListItemText
                        primary={element?.ddName}
                        sx={{ p: 0, fontSize: "12px" }}
                        className="list-item"
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
};

DDD.defaultProps = defaultProps;

export default DDD;
