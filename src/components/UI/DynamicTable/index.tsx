import { Grid, Box, Divider, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setPageJson } from "../../../redux/actions/JsonDataActions";
import store from "../../../redux/store";

const DynamicTable = () => {

  const [ jsonData, setJSONData] = useState<any>("");
  const { ReduxPageJson } = useSelector((state: any) => state);
  const [ impactfactor, setImpactfactor] = useState<any>(0);

  const { dispatch } = store;

  useEffect(() => {
    // console.log("ReduxPageJson from DT", ReduxPageJson.JsonData);
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerHTML)
    );
    onLoadChanges();
    // setJSONData(ReduxPageJson.JsonData)
  }, []);

  useEffect(() => {
    setTimeout(() => {
      onLoadChanges();
    },0)
  },[jsonData])

  const updateReduxJson = (json:any) => {
    dispatch(setPageJson(json));
  }

  const getAllQuartiles = (data:any, saleName:any) => {
    let arr:any = [];
    let tableIndex = ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.tbody.findIndex((x:any) => x.theading == saleName);
    data?.data?.inputData?.SalesTables?.tbody[tableIndex]?.tbodyDetails?.map((row:any, ri:any) => {

      if(ri==0){
        if(row?.rowDetails[5].selectedText?.length>0 && ((row?.rowDetails[5]?.selectedText) > row?.rowDetails[4]?.text)){
          arr?.push(Number(row?.rowDetails[5]?.selectedText));
        }
        else{
          arr?.push(row?.rowDetails[4]?.text);
        }
      }
      else{
        if(row?.rowDetails[5].selectedText?.length>0 && (((row?.rowDetails[5]?.selectedText)/100) > row?.rowDetails[4]?.text)){
          arr?.push((row?.rowDetails[5]?.selectedText)/100);
        }
        else{
          arr?.push(row?.rowDetails[4]?.text);
        }
      }

    });
    arr.forEach((ele:any) => {ele = Number(ele)});
    // console.log(arr);
    return arr;
  }

  const getImpactFactor = (saleName:any) =>{
    let allQuartiles:any = [];

    // allQuartiles = getAllQuartiles(saleName)

    let calValue:any = 0; 
    if(allQuartiles.length > 0){
      calValue = allQuartiles?.reduce((a:any,b:any) => a*b);
    }
    return Math.round(calValue);
  }

  const updateImpFactor = (data:any) => {
    // let data:any = {};
    // data = JSON.parse(JSON.stringify(ReduxPageJson.JsonData));
    data.data.inputData.SalesTables.tbody.map((table:any) => {

      let allQuartiles = getAllQuartiles(data,table.theading);
      console.log(allQuartiles)
      let calValue:any = 0; 
      if(allQuartiles.length > 0){
        calValue = allQuartiles?.reduce((a:any,b:any) => a*b);
      }
      table.Impactfactor = Math.round(calValue);
      table.ImpactValue = Math.round(calValue * data.data.inputData.SalesTables.ARPU)

      table.tbodyDetails.map((saletable:any) => {
        let selected = saletable.rowDetails[3].selectedId;
        let val = saletable.rowDetails[3].options.filter((x:any) => x.ddId == selected)[0].ddValue;
        saletable.rowDetails[4].text = val;
      })
    });
    console.log(data);
    // updateReduxJson(data);
  }

  const saleDDChange = (ddId:any, tableIndex:any, ri:any, detailIndex:any) => {
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson.JsonData));
    //@ts-ignore
    data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[detailIndex].selectedId = ddId;
    let val = data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[3].options.filter((x:any) => x.ddId == ddId)[0].ddValue;
    data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[4].text = val;

    updateImpFactor(data);
    
    if(data != undefined && data != ""){
      updateReduxJson(data);
      // onLoadChanges();
      // updateImpFactor();
    }
    // updateSegTable();
  }

  const updateText = (e:any, tableIndex:any, ri:any, detailIndex:any) => {
    let data = JSON.parse(JSON.stringify(ReduxPageJson.JsonData));
    //@ts-ignore
    data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[detailIndex].selectedText = e.target.value;

    data.data.inputData.SalesTables.tbody.map((table:any) => {
      let allQuartiles = getAllQuartiles(data,table.theading);
      console.log(allQuartiles)
      let calValue:any = 0; 
      if(allQuartiles.length > 0){
        calValue = allQuartiles?.reduce((a:any,b:any) => a*b);
      }
      table.Impactfactor = Math.round(calValue);
      table.ImpactValue = Math.round(calValue * data.data.inputData.SalesTables.ARPU)
    })

    updateReduxJson(data);
  }

  const onLoadChanges = () => {
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson.JsonData));
    // console.log("hh",data)

    data.data?.inputData?.SalesTables?.tbody?.map((tbody:any, tindex:any) => {
      tbody?.tbodyDetails?.map((detail:any) => {
        // detail?.rowDetails?.map((row:any, ri:any) => {
          let quartile = detail?.rowDetails[3]?.selectedId;
          let qVal = detail?.rowDetails[3]?.options.filter((x:any) => x.ddId == quartile)[0]?.ddValue;
          detail.rowDetails[4].text = qVal;
          // console.log("data", qVal);
        // })
      })
    });

    // if(data != undefined && data != ""){
      updateReduxJson(data);
    // }
  }

  const getQuartileValue = (tindex:any, dindex:any) => {
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson.JsonData));
    let row = data.data?.inputData?.SalesTables?.tbody[tindex].tbodyDetails[dindex];
    let quartile = row.rowDetails[3]?.selectedId;
    let qVal = row.rowDetails[3]?.options.filter((x:any) => x.ddId == quartile)[0]?.ddValue;
    data.data.inputData.SalesTables.tbody[tindex].tbodyDetails[dindex].rowDetails[4].text = qVal;
    // updateReduxJson(data);
    console.log("data", qVal);
    return qVal;
  }

  return (
    <>
      {/* <button onClick={() => updateImpFactor()}>Clickkkk</button> */}
      {/* <div className="contactpage-container__inr__section">
          {ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.tbody?.map((table: any, tableIndex: any) => (
            <>
              <button onClick={() => onLoadChanges()}>OnLoad Chages</button>
              <Box className="outputTable-container" sx={{ mb: 5 }}>
                <div className="outputTable-container__inr">
                  <div>{table.theading}</div>
                  <div>{"Impact factor : " + getImpactFactor(table.theading)}</div>
                  <div>{"Impact Value : " + (getImpactFactor(table.theading) * ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.ARPU)}</div>

                  <div className="outputTable-container__inr__body">
                    {table.tbodyDetails?.map((row: any, ri: any) => (
                      <div className="table-col" key={ri}>
                        {row.rowDetails.map((detail: any, detailIndex: any) => (
                          <div className="table-row">
                            {(detail.type == "String") ? (
                              <span>{detail.text}</span>
                            )
                          :
                          detail.type == "Select" ? 
                          (
                            <Select
                              sx={{ p: 0, borderRadius: 0, mb: 1 ,width:"100%"}}
                              className="inputField cutom-input-field"
                              defaultValue={detail.selectedId}
                              displayEmpty
                              renderValue={(selected) => {
                                if (selected?.length === 0) {
                                  return <>{"Select"}</>;
                                }
                                return selected;
                              }}
                              value={detail.options.filter((x:any) => x.ddId == detail?.selectedId)[0]?.ddName}
                              onChange={(e) => saleDDChange(e, tableIndex, ri, detailIndex, detail.options)}
                              error={false}
                            >
                              <MenuItem disabled value="none" className="selectItem">
                                <>{"Select"}</>
                              </MenuItem>
                              {detail?.options?.map((option: any) => (
                                <MenuItem value={option?.ddId} className="selectItem">
                                  {option?.ddName}
                                </MenuItem>
                              ))}
                            </Select>
                          )
                          :
                          detail.type == "Input" ?
                          (<>
                            <input value={detail?.selectedText}
                            onChange={(e:any) => updateText(e, tableIndex, ri, detailIndex)}
                            />
                          </>)
                          :
                          detail.type == "Number" ?
                          (
                            <>
                              {(String(detail.text)).split(".").length > 1 ? 
                                <span>{Math.round(detail.text * 100) + "%"}</span>
                                :
                                <span>{detail.text}</span>
                            }
                            </>
                          )
                          :
                          ""
                          }
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </Box>
            </>
          ))}
        </div> */}

        <div className="calculate_table_container">
          <div className="calculate_table_head">
              <div className="table_row">
                <div className="table_col border_0"></div>
                <div className="table_col border_0 col_two"></div>
                <div className="table_col border_0"></div>
                <div className="table_col border_0"></div>
                <div className="table_col border_0"></div>
                <div className="table_col border_0"></div>
                <div className="table_col border_0"></div>
                <div className="table_col"> 25,0000</div>
                <div className="table_col">36,0000 </div>
              </div>
              <div className="table_row">
                <div className="table_col border_0"></div>
                <div className="table_col border_0 col_two"></div>
                <div className="table_col gray_color"> Client/Baseline </div>
                <div className="table_col pouring_Copper_color"> Custom Quartile and Benchmark </div>
                <div className="table_col blue_color">Customized Impact </div>
              </div>
              <div className="table_row">
                <div className="table_col border_0"></div>
                <div className="table_col border_0 col_two"></div>
                <div className="table_col">Original Baseline</div>
                <div className="table_col">Revised Baseline</div>
                <div className="table_col">Quartile to move</div>
                <div className="table_col">Custom Benchmark</div>
                <div className="table_col">Quartile benchmark</div>
                <div className="table_col"> Impact factor</div>
                <div className="table_col">Impact Value </div>
              </div>
          </div>

          {ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.tbody?.map((table: any, tableIndex: any) => (

            <div className="repeat_table">
              <div className="calculate_table_body gray_color">
                  {/*--- Row */ }
                  <div className="table_row">

                    <div className="table_col first"> {table.theading} </div>

                    <div className="table_col colspan6">
                      {table.tbodyDetails?.map((row: any, ri: any) => (
                        <div className="table_row">

                          {row.rowDetails.map((detail: any, detailIndex: any) => (
                            <>
                              {/* <div className="table_col col_two align_left">Average Incoming Calls per month</div>
                              <div className="table_col">dfgdf</div>
                              <div className="table_col"> 85,158 </div>
                              <div className="table_col dropdown_select">
                                  <select name="" id="">
                                    <option value="">Not Selected </option>
                                    <option value="">Not Selected </option>
                                  </select>
                              </div>
                              <div className="table_col">6,000</div>
                              <div className="table_col">6,000</div> */}

                                {
                                (detail.type == "String" && detailIndex == 0) ? (
                                    <div className="table_col col_two align_left">{detail.text}</div>
                                  )
                                :
                                (detail.type == "String") ? (
                                    <div className="table_col">{detail.text}</div>
                                )
                                :
                                detail.type == "Select" ? 
                                (
                                  <div className="table_col dropdown_select">
                                    <Select
                                      sx={{ p: 0, borderRadius: 0, mb: 1 ,width:"100%"}}
                                      className="inputField cutom-input-field"
                                      defaultValue={detail.selectedId}
                                      displayEmpty
                                      renderValue={(selected) => {
                                        if (selected?.length === 0) {
                                          return <>{"Select"}</>;
                                        }
                                        return selected;
                                      }}
                                      value={detail.options.filter((x:any) => x.ddId == detail?.selectedId)[0]?.ddName}
                                      onChange={(e) => saleDDChange(e.target.value, tableIndex, ri, detailIndex)}
                                      error={false}
                                    >
                                      <MenuItem disabled value="none" className="selectItem">
                                        <>{"Select"}</>
                                      </MenuItem>
                                      {detail?.options?.map((option: any) => (
                                        <MenuItem value={option?.ddId} className="selectItem">
                                          {option?.ddName}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                )
                                :
                                detail.type == "Input" ?
                                (<div className="table_col">
                                  <input className="quartile_input" value={detail?.selectedText}
                                  onChange={(e:any) => updateText(e, tableIndex, ri, detailIndex)}
                                  />
                                </div>)
                                :
                                detail.type == "Number" ?
                                (
                                  <div className="table_col">
                                    {(String(detail.text)).split(".").length > 1 ? 
                                      <span>{Math.round(detail.text * 100) + "%"}</span>
                                      :
                                      <span>{detail.text}</span>
                                  }
                                  </div>
                                )
                                :
                                ""
                                }
                            </>
                          ))}
                        </div>
                      ))}

                    </div>
                    <div className="table_col eight"> {table.Impactfactor} </div>
                    <div className="table_col nine"> {table.ImpactValue} </div>
                  </div>
                  {/*---END Row */ }
              </div>
            </div>
          ))}

        </div>
        
    </>
  );
};
export default DynamicTable;
