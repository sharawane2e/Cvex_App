// @flow
import React, { useState, useEffect } from "react";
import PrimaryHeader from "../Headers/PrimaryHeader";
import generalData from "../../mock/giData.json";
import "./GI.scss";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Inputbox } from "../UI/Input";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Footer } from "../Footer";
import CustomButton from "../UI/CustomButton";


const GI = () => {
  const [state, setState] = useState(0);
  const [jsonData, setJSONData] = useState<any>("");

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerHTML)
    );

  }, []);

  const getSddQ2Options = (ques: any) => {
    const answer1 = ques.selectedId.split("_")[1];
    const map = ques.map.split("|").map((i: string) => i.split(":"));
    const index = map.findIndex((i: any) => i[0] == answer1);
    const optionsToRender = map[index][1].split("-");
    return [
      ...ques.options2.filter((i: any) => optionsToRender.includes(i.ddId)),
      { ddId: "", ddName: ques.placeholder2 },
    ];
  };

  const getDddQ2Options = (ques: any) => {
    const answers = ques.selectedId.split("_") as any[];
    const answer1: any[] = [];
    for (let i in answers) {
      if (parseInt(i) % 2 == 1) answer1.push(answers[i]);
    }
    const indices = [];
    const map = ques.map.split("|").map((i: string) => i.split(":"));
    for (let i in map) {
      const val = map[i];
      if (answer1.includes(val[0])) indices.push(i);
    }
    if (indices.length == 0) return [];
    const optionsToRender: any[] = [];

    for (let i of indices) {
      optionsToRender.push(...map[i][1].split("-"));
    }
    return ques.options2.filter((i: any) => optionsToRender.includes(i.ddId));
  };

  const getDddQ3Options = (ques: any) => {
    const answers = ques.selectedId2.split("_") as any[];
    const answer2: any[] = [];
    for (let i in answers) {
      if (parseInt(i) % 2 == 1) answer2.push(answers[i]);
    }
    const indices = [];
    const map = ques.map2.split("|").map((i: string) => i.split(":"));
    for (let i in map) {
      const val = map[i];
      if (answer2.includes(val[0])) indices.push(i);
    }
    if (indices.length == 0) return [];
    const optionsToRender: any[] = [];

    for (let i of indices) {
      optionsToRender.push(...map[i][1].split("-"));
    }
    console.log(answers);
    console.log(optionsToRender);
    console.log(
      ques.options3.filter((i: any) => optionsToRender.includes(i.ddId))
    );
    return ques.options3.filter((i: any) => optionsToRender.includes(i.ddId));
  };

  const nextHandleClick = (event: any) => {
    if (jsonData !== "") {
      // @ts-ignore
      document.getElementById("navText").value =
        jsonData.data?.footerData?.forwardInputId
      // @ts-ignore
      document.getElementById("forwardbutton").click();

    }
  }
  const previousHandleClick = (event: any) => {
    if (jsonData !== "") {
      // @ts-ignore
      document.getElementById("navText").value =
        jsonData.data?.footerData?.previousInputId
      // @ts-ignore
      document.getElementById("forwardbutton").click();
    }
  }


  return (
    <>
      <PrimaryHeader />
      <div className="general-container">
        {jsonData?.data?.rightData.map((genData: any) => {
          {/* {generalData?.data?.rightData.map((genData: any) => { */ }
          return (
            <>
              <h3 className="general-heading">{genData.heading}</h3>
              <div className="form-flex">
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  {genData.questions.map((genQues: any) => {

                    if (genQues.type === "txt" || genQues.type === "num") {
                      return (
                        <Grid item xs={12} md={6}>
                          <Grid container>
                            <Grid item xs={3}>
                              <p>{genQues.optionName}</p>
                            </Grid>
                            <Grid item xs={8} >
                              <Inputbox
                                className=""
                                id={genQues.questionId}
                                placeholder={genQues.placeholder}
                                type={genQues.type == "num" ? "number" : ""}
                                onChange={(e: any) =>
                                  (genQues.selectedText = e.target.value)
                                }
                              />
                            </Grid>
                          </Grid>
                          {/* <Divider /> */}
                        </Grid>
                      );
                    } else if (genQues.type == "dd" || genQues.type == "year")
                      return (
                        <Grid item xs={12} md={6}>
                          <Grid container>
                            <Grid item xs={3}>
                              <p>{genQues.optionName}</p>
                            </Grid>
                            <Grid item xs={8}>
                              <FormControl fullWidth>
                                <Select
                                  value={genQues.selectedId}
                                  placeholder={genQues.placeholder}
                                  onClick={(e: any) => {
                                    genQues.selectedId = e.target.dataset.value;
                                    setState((state + 1) % 10);
                                  }}
                                >
                                  {genQues?.options?.map((i: any) => (
                                    <MenuItem value={i?.ddId}>
                                      {i?.ddName}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>

                        </Grid>
                      );

                    else if (genQues.type == "sdd")
                      return (
                        <>
                          <Grid item xs={12} md={6}>
                            <Grid container>
                              <Grid item xs={3}>
                                <p>{genQues.optionName}</p>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    value={genQues.selectedId || ""}
                                    placeholder={genQues.placeholder}
                                    onClick={(e: any) => {
                                      genQues.selectedId =
                                        e.target.dataset.value;
                                      setState((state + 1) % 10);
                                    }}
                                  >
                                    {genQues?.options?.map((i: any) => (
                                      <MenuItem value={i?.ddId}>
                                        {i?.ddName}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} md={6}>
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
                          </Grid>
                        </>
                      );
                    else if (genQues.type == "ddd")
                      return (
                        <>
                          <Grid item xs={12} md={6}>
                            <Grid container>
                              <Grid item xs={3}>
                                <p>{genQues.optionName}</p>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    value={genQues.selectedId.split(",") || ""}
                                    placeholder={genQues.placeholder}
                                    onClick={(e: any) => {
                                      let arr = genQues.selectedId.split(",");
                                      const index = arr.indexOf(
                                        e.target.dataset.value
                                      );
                                      if (index != -1) {
                                        arr.splice(index, 1);
                                      } else arr.push(e.target.dataset.value);
                                      arr = arr.filter((i: any) => i);
                                      genQues.selectedId = arr.join(",");
                                      setState((state + 1) % 10);
                                    }}
                                    multiple
                                  >
                                    {genQues?.options?.map((i: any) => (
                                      <MenuItem value={i?.ddId}>
                                        {i?.ddName}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Grid container>
                              <Grid item xs={3}>
                                <p>{genQues.optionName2}</p>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    value={genQues.selectedId2.split(",") || ""}
                                    placeholder={genQues.placeholder}
                                    onClick={(e: any) => {
                                      let arr = genQues.selectedId2.split(",");
                                      const index = arr.indexOf(
                                        e.target.dataset.value
                                      );
                                      if (index != -1) {
                                        arr.splice(index, 1);
                                      } else arr.push(e.target.dataset.value);
                                      arr = arr.filter((i: any) => i);
                                      genQues.selectedId2 = arr.join(",");
                                      setState((state + 1) % 10);
                                    }}
                                    multiple
                                  >
                                    {genQues?.selectedId &&
                                      getDddQ2Options(genQues)?.map(
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
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Grid container>
                              <Grid item xs={3}>
                                <p>{genQues.optionName3}</p>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    value={genQues.selectedId3.split(",") || ""}
                                    placeholder={genQues.placeholder}
                                    onClick={(e: any) => {
                                      let arr = genQues.selectedId3.split(",");
                                      const index = arr.indexOf(
                                        e.target.dataset.value
                                      );
                                      if (index != -1) {
                                        arr.splice(index, 1);
                                      } else arr.push(e.target.dataset.value);
                                      arr = arr.filter((i: any) => i);
                                      genQues.selectedId3 = arr.join(",");
                                      setState((state + 1) % 10);
                                    }}
                                    multiple
                                  >
                                    {genQues?.selectedId2 &&
                                      getDddQ3Options(genQues)?.map(
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
                          </Grid>

                        </>
                      );

                  })}

                </Grid>
              </div>
            </>
          );
        })}

      </div>
      < Footer  >
        <div className="button-container">
          <div>
            <CustomButton className={"submitButton previous-button"}
              onClick={(e: any) => previousHandleClick(e)}>
              {generalData.data.footerData.previousTxt}
              {/* {jsonData["data"]["contentDetails"]["submitBTnDetails"]["submitBTnTxt"]} */}
            </CustomButton>
          </div>
          <div >
            <CustomButton className={"submitButton next-button"}
              onClick={(e: any) => nextHandleClick(e)}>
              {generalData.data.footerData.forwardTxt}
              {/* {jsonData["data"]["contentDetails"]["submitBTnDetails"]["submitBTnTxt"]} */}
            </CustomButton>
          </div>
        </div>
      </ Footer>
    </>
  );
};

export default GI;
