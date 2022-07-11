import { Grid, Box, Divider, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const DynamicTable = () => {

  return (
    <>
       
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
                  <div className="repeat_table">
                      <div className="calculate_table_body gray_color">

                      {/*--- Row */ }
                        <div className="table_row">
                            <div className="table_col first"> Inbound sales </div>
                            <div className="table_col colspan6"> 
                                <div className="table_row">
                                    <div className="table_col col_two align_left">Average Incoming Calls per month</div>
                                    <div className="table_col">dfgdf</div>
                                    <div className="table_col"> 85,158 </div>
                                    <div className="table_col dropdown_select"><select name="" id=""><option value="">Not Selected </option><option value="">Not Selected </option></select> </div>
                                    <div className="table_col">6,000</div>
                                    <div className="table_col">6,000</div>
                                </div>
                                <div className="table_row">
                                    <div className="table_col col_two align_left">Average Incoming Calls per month</div>
                                    <div className="table_col">dfgdf</div>
                                    <div className="table_col"> 85,158 </div>
                                    <div className="table_col dropdown_select"> <select name="" id=""><option value="">Not Selected </option><option value="">Not Selected </option></select></div>
                                    <div className="table_col">6,000</div>
                                    <div className="table_col">6,000</div>
                                </div>
                                <div className="table_row">
                                    <div className="table_col col_two align_left">Average Incoming Calls per month</div>
                                    <div className="table_col">dfgdf</div>
                                    <div className="table_col"> 85,158 </div>
                                    <div className="table_col dropdown_select"><select name="" id=""><option value="">Not Selected </option><option value="">Not Selected </option></select></div>
                                    <div className="table_col">6,000</div>
                                    <div className="table_col">6,000</div>
                                </div>
                                <div className="table_row">
                                    <div className="table_col col_two align_left">Average Incoming Calls per month</div>
                                    <div className="table_col">dfgdf</div>
                                    <div className="table_col"> 85,158 </div>
                                    <div className="table_col dropdown_select"> <select name="" id=""><option value="">Not Selected </option><option value="">Not Selected </option></select> </div>
                                    <div className="table_col">6,000</div>
                                    <div className="table_col">6,000</div>
                                </div>
                                <div className="table_row">
                                    <div className="table_col col_two align_left">Average Incoming Calls per month</div>
                                    <div className="table_col">dfgdf</div>
                                    <div className="table_col"> 85,158 </div>
                                    <div className="table_col dropdown_select"> <select name="" id=""><option value="">Not Selected </option><option value="">Not Selected </option></select></div>
                                    <div className="table_col">6,000</div>
                                    <div className="table_col">6,000</div>
                                </div>
                             </div>
                            <div className="table_col eight"> 85,158 </div>
                            <div className="table_col nine"> 95,000 </div>
                        </div>
                        {/*---END Row */ }

                  </div>
                  </div>
                  <div className="repeat_table">
                      <div className="calculate_table_body gray_color">

                      {/*--- Row */ }
                        <div className="table_row">
                            <div className="table_col first"> Outbound sales </div>
                            <div className="table_col colspan6"> 
                                <div className="table_row">
                                    <div className="table_col col_two align_left">Average Incoming Calls per month</div>
                                    <div className="table_col">dfgdf</div>
                                    <div className="table_col"> 85,158 </div>
                                    <div className="table_col dropdown_select"><select name="" id=""><option value="">Not Selected </option><option value="">Not Selected </option></select> </div>
                                    <div className="table_col">6,000</div>
                                    <div className="table_col">6,000</div>
                                </div>
                                <div className="table_row">
                                    <div className="table_col col_two align_left">Average Incoming Calls per month</div>
                                    <div className="table_col">dfgdf</div>
                                    <div className="table_col"> 85,158 </div>
                                    <div className="table_col dropdown_select"> <select name="" id=""><option value="">Not Selected </option><option value="">Not Selected </option></select></div>
                                    <div className="table_col">6,000</div>
                                    <div className="table_col">6,000</div>
                                </div>
                                <div className="table_row">
                                    <div className="table_col col_two align_left">Average Incoming Calls per month</div>
                                    <div className="table_col">dfgdf</div>
                                    <div className="table_col"> 85,158 </div>
                                    <div className="table_col dropdown_select"><select name="" id=""><option value="">Not Selected </option><option value="">Not Selected </option></select></div>
                                    <div className="table_col">6,000</div>
                                    <div className="table_col">6,000</div>
                                </div>
                                <div className="table_row">
                                    <div className="table_col col_two align_left">Average Incoming Calls per month</div>
                                    <div className="table_col">dfgdf</div>
                                    <div className="table_col"> 85,158 </div>
                                    <div className="table_col dropdown_select"> <select name="" id=""><option value="">Not Selected </option><option value="">Not Selected </option></select> </div>
                                    <div className="table_col">6,000</div>
                                    <div className="table_col">6,000</div>
                                </div>
                                <div className="table_row">
                                    <div className="table_col col_two align_left">Average Incoming Calls per month</div>
                                    <div className="table_col">dfgdf</div>
                                    <div className="table_col"> 85,158 </div>
                                    <div className="table_col dropdown_select"> <select name="" id=""><option value="">Not Selected </option><option value="">Not Selected </option></select></div>
                                    <div className="table_col">6,000</div>
                                    <div className="table_col">6,000</div>
                                </div>
                             </div>
                            <div className="table_col eight"> 85,158 </div>
                            <div className="table_col nine"> 95,000 </div>
                        </div>
                        {/*---END Row */ }

                  </div>
                  </div>
          </div>
        
       
    </>
  );
};
export default DynamicTable;
