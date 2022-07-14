import { Grid, Box, Divider, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setPageJson } from "../../../redux/actions/JsonDataActions";
import store from "../../../redux/store";
import { numberWithCommas } from "../../../utils/HelperFunctions";

const DynamicTable = () => {

  const [ jsonData, setJSONData] = useState<any>("");
  const { ReduxPageJson } = useSelector((state: any) => state);
  const [ totalIF, setTotalIF] = useState<any>(0);
  const [ totalIV, setTotalIV] = useState<any>(0);

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

  useEffect(() => {
    updateImpFactor(jsonData);
    console.log("check", getAllQuartiles("table_4"));



  },[])

  const updateReduxJson = (json:any) => {
    dispatch(setPageJson(json));
  }

  // const getAllQuartiles = (data:any, saleName:any) => {
  //   let arr:any = [];
  //   let tableIndex = ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.tbody.findIndex((x:any) => x.theading == saleName);
  //   data?.data?.inputData?.SalesTables?.tbody[tableIndex]?.tbodyDetails?.map((row:any, ri:any) => {

  //     if(ri==0){
  //       if(row?.rowDetails[5].selectedText?.length>0 && ((row?.rowDetails[5]?.selectedText) > row?.rowDetails[4]?.text)){
  //         arr?.push(Number(row?.rowDetails[5]?.selectedText));
  //       }
  //       else{
  //         arr?.push(row?.rowDetails[4]?.text);
  //       }
  //     }
  //     else{
  //       if(row?.rowDetails[5].selectedText?.length>0 && (((row?.rowDetails[5]?.selectedText)/100) > row?.rowDetails[4]?.text)){
  //         arr?.push((row?.rowDetails[5]?.selectedText)/100);
  //       }
  //       else{
  //         arr?.push(row?.rowDetails[4]?.text);
  //       }
  //     }

  //   });
  //   arr.forEach((ele:any) => {ele = Number(ele)});
  //   // console.log(arr);
  //   return arr;
  // }

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
    data?.data?.inputData?.SalesTables?.tbody?.map((table:any) => {

      let allQuartiles = getAllQuartiles(table.tableId);
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
    // console.log(data);
    // updateReduxJson(data);
  }

  const getAllQuartiles = (tableId:any) => {
    let tableobj:any = ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody.filter((X:any) => X.tableId == tableId)[0];
    let arr:any = [];
    if(tableobj?.qbValue != null){
      arr.push(tableobj?.qbValue);
    }
    tableobj?.tbodyDetails.map((row:any) => {
      let selectedOpt = row.rowDetails[3].selectedId;
      let optObj = row.rowDetails[3].options.filter((x:any) => x.ddId == selectedOpt)[0];
      let val = optObj.ddValue;
      let inputVal = row.rowDetails[5].selectedText;
      // debugger

      if(optObj.afterText == "%"){
        if(inputVal?.length > 0 && ((Number(inputVal)/100) > val)){
          arr.push((Number(inputVal) / 100));
        }
        else{
          arr.push(val);
        }
      }
      else{
        if(inputVal?.length > 0 && (Number(inputVal) > val)){
          arr.push(Number(inputVal));
        }
        else{
          arr.push(val);
        }
      }
    });
    // console.log(arr)
    return arr;
  }

  const getIF = (tableId:any, type:any) => {

    let tableQuartiles = getAllQuartiles(tableId);
    // console.log(tableQuartiles)
    if(type == "if"){
      return Math.round(tableQuartiles.reduce((a:any, b:any) => a*b));
    }
    else{
      return Math.round((tableQuartiles.reduce((a:any, b:any) => a*b))*ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.ARPU);
    }
  }

  const getTotalIF = (type:any) => {
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson.JsonData));
    let allTableQ:any = [];
    let total = 0;
    data.data.inputData.SalesTables.tbody.map((table:any) => {
      let allQuartile = getAllQuartiles(table.tableId);
      let sum = allQuartile.reduce((a:any, b:any) => a*b);
      allTableQ.push(sum);
    })
    total = allTableQ.reduce((a:any, b:any) => a+b);
    if(type == "if"){
      return Math.round(total);
    }
    else{
      return Math.round(total * ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.ARPU);
    }
  }

  const saleDDChange = (ddId:any, tableIndex:any, ri:any, detailIndex:any) => {
    let data:any = {};
    data = JSON.parse(JSON.stringify(ReduxPageJson.JsonData));
    //@ts-ignore
    data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[detailIndex].selectedId = ddId;
    let val = data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[3].options.filter((x:any) => x.ddId == ddId)[0].ddValue;
    data.data.inputData.SalesTables.tbody[tableIndex].tbodyDetails[ri].rowDetails[4].text = val;

    data.data?.inputData?.SalesTables?.tbody.map((x:any, i:any) => {
      x.ImpactValue = x.Impactfactor * data.data?.inputData?.SalesTables.ARPU;
      data.data.inputData.periodTableData.rowDetails[2].tbodyDetails[i+1] = x.ImpactValue;
    });

    // updateImpFactor(data);
    
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

    // data.data.inputData.SalesTables.tbody.map((table:any) => {
    //   let allQuartiles = getAllQuartiles(data.data.inputData.SalesTables.tbody[tableIndex].tableId);
    //   console.log(allQuartiles)
    //   let calValue:any = 0; 
    //   if(allQuartiles.length > 0){
    //     calValue = allQuartiles?.reduce((a:any,b:any) => a*b);
    //   }
    //   table.Impactfactor = Math.round(calValue);
    //   table.ImpactValue = Math.round(calValue * data.data.inputData.SalesTables.ARPU)
    // })

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

  const inputValidate = (value: any, pattern: any) => {
    const reg = pattern;
    let res = "";

    for (let i = 0; i < value.length; i++) {
      if (value[0] == " ") return "";

      if (reg.test(value[i])) res += value[i];
    }

    return res;
  };

  const numInputValidate = (
    value: any,
    pattern: any,
    minRange: number,
    maxRange: number
  ) => {
    const reg = pattern;
    let res = "";
    for (let i = 0; i < value.length; i++) {
      if (value[0] == " ") return "";
      if (reg.test(value[i])) res += value[i];
    }
    var tempNum = Number(res);
    if (tempNum > maxRange) res = res.slice(0, -1);
    if (tempNum < minRange) {
      tempNum = minRange;
      res = tempNum.toString();
    }
    // progressUpdate();
    return res;
  };

  return (
    <>
        <div className="calculate_table_container">
          <div className="calculate_table_head">
            {ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.theaders?.map((head:any, hi:any) => (
              <div className="table_row">
                {head.rowDetails.map((detail:any, di:any) => {
                  // (
                  //   <div className="table_col">{detail}</div>
                  // )
                  // if(detail == ""){
                  //   return (
                  //     <div className="table_col"></div>
                  //   )
                  // }
                  if(hi == 0 && di == 8){
                    return (
                      <div className="table_col">{numberWithCommas(getTotalIF("if"))}</div>
                      // <div className="table_col">{ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody?.map((x:any) => x.Impactfactor)?.reduce((a:any,b:any) => a+b)}</div>
                    )
                  }
                  else if(hi == 0 && di == 9){
                    return (
                      <div className="table_col">{numberWithCommas(getTotalIF("iv"))}</div>
                      // <div className="table_col">{ReduxPageJson?.JsonData?.data?.inputData?.SalesTables?.tbody?.map((x:any) => x.ImpactValue)?.reduce((a:any,b:any) => a+b)}</div>
                    )
                  }
                  else if(hi == 1 && di == 3){
                    return (
                      <div className="table_col gray_color">{detail}</div>
                    )
                  }
                  else if(hi == 1 && di == 4){
                    return (
                      <div className="table_col pouring_Copper_color">{detail}</div>
                    )
                  }
                  else if(hi == 1 && di == 5){
                    return (
                      <div className="table_col blue_color">{detail}</div>
                    )
                  }
                  else if(detail == ""){
                    return (
                      <div className="table_col border_0"></div>
                    )
                  }
                  else{
                    return (
                      <div className="table_col">{detail}</div>
                    )
                  }}
                )}
              </div>
            ))

            }
          </div>

          {ReduxPageJson.JsonData?.data?.inputData?.SalesTables?.tbody?.map((table: any, tableIndex: any) => (

            <div key={tableIndex} className="repeat_table">
              <div className={table.disable ? "calculate_table_body disabled" : "calculate_table_body gray_color"}>
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
                                  <input className="quartile_input" 
                                  value={detail?.selectedText}
                                  placeholder={detail?.placeholder}
                                  onChange={(e:any) => {
                                    e.target.value = numInputValidate(e.target.value.trim(), /^[0-9]+$/, detail?.minRange, detail?.maxRange)
                                    updateText(e, tableIndex, ri, detailIndex)
                                  }}
                                  />
                                </div>)
                                :
                                detail.type == "Number" ?
                                (
                                  // <div className="table_col">
                                  //   {(String(detail.text)).split(".").length > 1 && detailIndex > 3 ? 
                                  //     <span>{Math.round(detail.text * 100) + String(row?.rowDetails[3]?.options?.filter((x:any) => x.ddId == row?.rowDetails[3]?.selectedId)[0]?.afterText)}</span>
                                  //     :
                                  //     Number(detail.text) == 1 && detailIndex > 3 ? 
                                  //     <span>{"100%"}</span>
                                  //     :
                                  //     <span>{Math.round(detail.text)}</span>
                                  //   }
                                  // </div>
                                  <div className="table_col">
                                    {String(row?.rowDetails[3]?.options?.filter((x:any) => x.ddId == row?.rowDetails[3]?.selectedId)[0]?.afterText).length > 0 ? 
                                      (Number(detail.text) == 1 ? <span>{"100%"}</span> : <span>{Math.round(detail.text * 100) + String(row?.rowDetails[3]?.options?.filter((x:any) => x.ddId == row?.rowDetails[3]?.selectedId)[0]?.afterText)}</span>)
                                      :
                                      <span>{Math.round(detail.text)}</span>
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
                    {/* <div className="table_col eight"> {table.Impactfactor} </div>
                    <div className="table_col nine"> {table.ImpactValue} </div> */}
                    <div className="table_col eight"> {table.disable == false ? (numberWithCommas(getIF(table.tableId, "if"))) : ""} </div>
                    <div className="table_col nine"> {table.disable == false ? (numberWithCommas(getIF(table.tableId, "iv"))) : ""} </div>
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
