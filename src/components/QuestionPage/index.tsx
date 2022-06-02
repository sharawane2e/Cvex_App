import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import CustomSlider from "../UI/CustomSlider";
import SecondaryHeader from "../Headers/SecondaryHeader";
import ProgressBar from "../ProgressBar";
import SideBar from "../Sidebar";
import { Footer } from "../Footer";
import "./QuestionPage.scss";
import CustomButton from "../UI/CustomButton";
const QuestionPage = () => {
    const [jsonData, setJSONData] = useState<any>("");
    // useEffect(() => {
    //     setJSONData(
    //         // @ts-ignore
    //         JSON.parse(document.getElementById("jsonData")?.innerHTML)
    //     );

    // }, []);
    const handleClick = (event: any) => {
        if (jsonData !== "") {

            // @ts-ignore
            document.getElementById("navText").value =
                jsonData["data"]["contentDetails"]["submitBTnDetails"]["forwardInputId"]
            // @ts-ignore
            document.getElementById("forwardbutton").click();

        }
    }
    return (
        <>
            <SecondaryHeader />
            <div className="main-container">
                <div className="left-panel"><SideBar /></div>
                <div className="right-panel">
                    <div>
                        <ProgressBar />
                    </div>
                    {/* <CustomSlider /> */}
                    < Footer  >
                        <div className="button-container">
                            <div>
                                <CustomButton className={"submitButton previous-button"}
                                    onClick={(e: any) => handleClick(e)}>
                                    {/* {generalData.data.footerData.previousTxt} */}
                                    {/* {jsonData["data"]["contentDetails"]["submitBTnDetails"]["submitBTnTxt"]} */}
                                </CustomButton>
                            </div>
                            <div >
                                <CustomButton className={"submitButton next-button"}
                                    onClick={(e: any) => handleClick(e)}>
                                    {/* {generalData.data.footerData.forwardTxt} */}
                                    {/* {jsonData["data"]["contentDetails"]["submitBTnDetails"]["submitBTnTxt"]} */}
                                </CustomButton>
                            </div>
                        </div>
                    </ Footer>
                </div>
            </div>
        </>
    )
}

export default QuestionPage;