import { Grid, Box, Divider, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const DynamicTable = () => {

  return (
    <>
        <div className="customized_impact_calculator_table">
           <table className="table table_head">
             <thead>
               <tr>
                  <th colSpan={7} className="colspan7 border_0"></th>
                  <th>32,0000</th>
                  <th>32,0000</th>
               </tr>
               <tr>
                  <th colSpan={2} className="colspan2 border_0"></th>
                  <th colSpan={2} className="colspan2 gray_color">Client/Baseline</th>
                  <th colSpan={3} className="colspan3 pouring_Copper_color">Custom Quartile and Benchmark</th>
                  <th colSpan={2}className="colspan2 blue_color"> Customized Impact</th>
               </tr>
               <tr>
                  <th colSpan={2} className="colspan2 border_0"></th>
                  <th>Original Baseline</th>
                  <th>Revised Baseline</th>
                  <th>Quartile to move</th>
                  <th>Custom Benchmark</th>
                  <th>Custom Benchmark</th>
                  <th>Impact factor</th>
                  <th>Impact Value</th>
               </tr>
             </thead>
           </table>

           <table className="table repeat_table gray_color">
             <tbody>
               <tr>
                  <td>
                  Inbound sales
                  </td>
                  <td colSpan={6} className="colspan6 padding_0">
                        <table>
                          <tr>
                              <td className="align_left"> Average Incoming Calls per month </td>
                              <td > Not Selected </td>
                              <td> Not Selected </td>
                              <td className="dropdown_select"> 
                                <select name="" id="">
                                  <option value="">Not Selected </option>
                                  <option value="">Not Selected </option>
                                </select>
                                </td>
                              <td>32,000</td>
                              <td> 65,1248</td>
                          </tr>
                          <tr>
                              <td className="align_left"> Touchpoints (Contact rate) </td>
                              <td> Not Selected  </td>
                              <td> Not Selected </td>
                              <td className="dropdown_select"> 
                                <select name="" id="">
                                  <option value="">sdfggfds</option>
                                  <option value="">frgt</option>
                                </select>
                                </td>
                              <td>32,000</td>
                              <td> 96% </td>
                          </tr>
                          <tr>
                              <td className="align_left"> Offer potential (Eligibility rate) </td>
                              <td> Not Selected  </td>
                              <td> Not Selected </td>
                              <td className="dropdown_select"> 
                                <select name="" id="">
                                  <option value="">sdfggfds</option>
                                  <option value="">frgt</option>
                                </select>
                                </td>
                              <td>32,000</td>
                              <td> 69% </td>
                          </tr>
                          <tr>
                              <td className="align_left"> Offers (Attempt rate) </td>
                              <td> Not Selected  </td>
                              <td> Not Selected </td>
                              <td className="dropdown_select"> 
                                <select name="" id="">
                                  <option value="">sdfggfds</option>
                                  <option value="">frgt</option>
                                </select>
                                </td>
                              <td>32,000</td>
                              <td> 74%</td>
                          </tr>
                          <tr>
                              <td className="align_left"> Sales / Retention (Conversion rate) </td>
                              <td> Not Selected  </td>
                              <td> Not Selected </td>
                              <td className="dropdown_select"> 
                                <select name="" id="">
                                  <option value="">sdfggfds</option>
                                  <option value="">frgt</option>
                                </select>
                                </td>
                              <td>32,000</td>
                              <td> 60%</td>
                          </tr>
                          <tr>
                              <td className="align_left"> Eff. Sales (1- Cancelation rate) </td>
                              <td> Not Selected  </td>
                              <td> Not Selected </td>
                              <td className="dropdown_select"> 
                                <select name="" id="">
                                  <option value="">sdfggfds</option>
                                  <option value="">frgt</option>
                                </select>
                                </td>
                              <td>32,000</td>
                              <td> 73%</td>
                          </tr>
                        </table>
                  </td>
                  <td> 78,000 </td>
                  <td> 65,2158</td>
               </tr>
             </tbody>
           </table>

           <table className="table repeat_table">
             <tbody>
               <tr>
                  <td>
                  Outbound sales
                  </td>
                  <td colSpan={6} className="colspan6 padding_0">
                        <table>
                          <tr>
                              <td className="align_left"> Average Incoming Calls per month </td>
                              <td > Not Selected </td>
                              <td> Not Selected </td>
                              <td className="dropdown_select"> 
                                <select name="" id="">
                                  <option value="">Not Selected </option>
                                  <option value="">Not Selected </option>
                                </select>
                                </td>
                              <td>32,000</td>
                              <td> 65,1248</td>
                          </tr>
                          <tr>
                              <td className="align_left"> Touchpoints (Contact rate) </td>
                              <td> Not Selected  </td>
                              <td> Not Selected </td>
                              <td className="dropdown_select"> 
                                <select name="" id="">
                                  <option value="">sdfggfds</option>
                                  <option value="">frgt</option>
                                </select>
                                </td>
                              <td>32,000</td>
                              <td> 96% </td>
                          </tr>
                          <tr>
                              <td className="align_left"> Offer potential (Eligibility rate) </td>
                              <td> Not Selected  </td>
                              <td> Not Selected </td>
                              <td className="dropdown_select"> 
                                <select name="" id="">
                                  <option value="">sdfggfds</option>
                                  <option value="">frgt</option>
                                </select>
                                </td>
                              <td>32,000</td>
                              <td> 69% </td>
                          </tr>
                          <tr>
                              <td className="align_left"> Offers (Attempt rate) </td>
                              <td> Not Selected  </td>
                              <td> Not Selected </td>
                              <td className="dropdown_select"> 
                                <select name="" id="">
                                  <option value="">sdfggfds</option>
                                  <option value="">frgt</option>
                                </select>
                                </td>
                              <td>32,000</td>
                              <td> 74%</td>
                          </tr>
                          <tr>
                              <td className="align_left"> Sales / Retention (Conversion rate) </td>
                              <td> Not Selected  </td>
                              <td> Not Selected </td>
                              <td className="dropdown_select"> 
                                <select name="" id="">
                                  <option value="">sdfggfds</option>
                                  <option value="">frgt</option>
                                </select>
                                </td>
                              <td>32,000</td>
                              <td> 60%</td>
                          </tr>
                          <tr>
                              <td className="align_left"> Eff. Sales (1- Cancelation rate) </td>
                              <td> Not Selected  </td>
                              <td> Not Selected </td>
                              <td className="dropdown_select"> 
                                <select name="" id="">
                                  <option value="">sdfggfds</option>
                                  <option value="">frgt</option>
                                </select>
                                </td>
                              <td>32,000</td>
                              <td> 73%</td>
                          </tr>
                        </table>
                  </td>
                  <td> 78,000 </td>
                  <td> 65,2158</td>
               </tr>
             </tbody>
           </table>
        </div>
    </>
  );
};
export default DynamicTable;
