import PrimaryHeader from "../Headers/PrimaryHeader/index";
import { jsonData as introData } from "../../mock/introData";
import Parser from "html-react-parser";
import "./Introduction.scss";
import CustomButton from "../UI/CustomButton";
import { Footer } from "../Footer";
import React, { useEffect, useState } from "react";
import "../Login/Login.scss";

type Props = {};
export function Introduction(props: Props) {
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
  // uncomment below code for mock json
  useEffect(() => {
    setJSONData(introData.data.contentDetails.forwardBTnDetails.forwardInputId);
  }, []);


  const handleClick = () => {
    if (jsonData !== "") {
      // @ts-ignore
      document.getElementById("someID").value = jsonData
      // @ts-ignore
      document.getElementById("navText").click();
    }
  }
  return (
    <>
      <PrimaryHeader />
      <div className="introduction-main">
        <h3 className="introduction-heading">
          {introData.data.contentDetails.headingTxt}
          {/* {jsonData["data"]["contentDetails"]["headingTxt"]} */}
        </h3>
        <p className="introduction-content">
          {Parser(introData.data.contentDetails.content)}
          {/* {Parser(jsonData["data"]["contentDetails"]["content"])} */}
        </p>
      </div>
      < Footer  >
        <div className="button-container">
          <div>
            <CustomButton className="submitButton"
              onClick={handleClick}>
              {introData.data.contentDetails.forwardBTnDetails.forwardBTnTxt}
              {/* {jsonData["data"]["contentDetails"]["forwardBTnDetails"]["forwardBTnTxt"]} */}
            </CustomButton>
          </div>
        </div>
      </ Footer>
      {/* <input type="hidden" id="someID" /> */}
    </>
  );
}
