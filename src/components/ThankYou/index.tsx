import PrimaryHeader from "../Headers/PrimaryHeader/index";
import thankyoupageData from "../../mock/thankyoupageData.json";
import Parser from "html-react-parser";
import { Footer } from "../Footer";
import CustomButton from "../UI/CustomButton";
import React, { useEffect, useState } from "react";
import "../Login/Login.scss";
import "./ThankYou.scss";
import { ReactComponent as ThankyouImage } from "../../assets/svg/thankyou_image.svg";

type Props = {};

const ThankYou = (props: Props) => {
  const [jsonData, setJSONData] = useState<any>("");

  // useEffect(() => {
  //   setJSONData(
  //     // @ts-ignore
  //     JSON.parse(document.getElementById("jsonData")?.innerHTML)
  //   );
  // }, []);


  // const handleClick = () => {
  //   if (jsonData !== "") {
  //     // @ts-ignore
  //     document.getElementById("navText").value =
  //       jsonData["data"]["contentDetails"]["submitBTnDetails"]["forwardInputId"]
  //     // @ts-ignore
  //     document.getElementById("forwardbutton").click();
  //   }
  // }
  useEffect(() => {
    setJSONData(thankyoupageData.data.contentDetails.resultBTnDetails.forwardInputId);
  }, []);


  const handleClick = () => {
    if (jsonData !== "") {
      // @ts-ignore
      document.getElementById("navText").value = jsonData
      // @ts-ignore
      document.getElementById("forwardbutton").click();
    }
  }
  return (
    <div>
      <PrimaryHeader />
      <div className="main-container">
        <div className="thankyou-container">
          <ThankyouImage />

          <h3 className="title">
            {/* {thankyoupageData.data.contentDetails.headingTxt} */}
            {jsonData.data?.contentDetails?.headingTxt}
          </h3>
          <div className="content-area">
            {/* {Parser(thankyoupageData.data.contentDetails.content)} */}
            {Parser(jsonData.data?.contentDetails?.content)}
          </div>
        </div>
      </div>
      <div className="helpdesk">
        {/* {Parser(thankyoupageData.data.contentDetails.contactDetails.contactHeading)}
        {Parser(thankyoupageData.data.contentDetails.contactDetails.contactTxt)} */}
        {Parser(jsonData?.data?.contentDetails?.contactDetails?.contactHeading)}
        {Parser(jsonData?.data?.contentDetails?.contactDetails?.contactTxt)}
      </div>
      < Footer  >
        <div className="button-container">
          <div>
            <CustomButton className="submitButton"
              onClick={handleClick}>
              {/* {thankyoupageData.data.contentDetails.resultBTnDetails.resultBTnTxt} */}
              {jsonData?.data?.contentDetails?.resultBTnDetails?.resultBTnTxt}
            </CustomButton>
          </div>
        </div>
      </ Footer>
      {/* <input type="text" id="someID" /> */}
    </div>
  );
};
export default ThankYou;
