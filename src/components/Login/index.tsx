import React, { useEffect, useState } from "react";
import startData from "../../mock/startPageData.json";
import { isPasswordValid } from "../../utils";
import PrimaryHeader from "../Headers/PrimaryHeader/index";
import { Inputbox } from "../UI/Input";
import "./Login.scss";
import CustomButton from "../UI/CustomButton";
import pageCode from "../../enums/pageCode";
import { Footer } from "../Footer";

const Login = (props: any) => {
  const [password, setPassword] = useState("");
  const [jsonData, setJSONData] = useState<any>("");

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerHTML)
    );
  }, []);


  const handleClick = () => {
    if (jsonData !== "") {
      // @ts-ignore
      document.getElementById("navText").value =
        jsonData["data"]["contentDetails"]["submitBTnDetails"]["forwardInputId"]
      // @ts-ignore
      document.getElementById("qIntro").click();
    }
  }
  // uncomment below code for mock json
  // useEffect(() => {
  //   setJSONData(startData.data.contentDetails.submitBTnDetails.forwardInputId);
  // }, []);


  // const handleClick = () => {
  //   if (jsonData !== "") {
  //     // @ts-ignore
  //     document.getElementById("navText").value = jsonData;
  //     // @ts-ignore
  //     document.getElementById("qIntro").click();
  //   }
  // }
  return (
    <>
      <PrimaryHeader />
      <div className="main-container">
        <h3 className="title">
          {startData.data.contentDetails?.headingTxt}
        </h3>
        <div className="content-area">
          <p >
            {startData.data.contentDetails.content}
          </p>
          <Inputbox
            id={startData.data.contentDetails.password.passwordInputId}
            placeholder={startData.data.contentDetails.password.placeholder}
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <span
            className="welcome-input-error"
            style={{ opacity: password && !isPasswordValid(password) ? 1 : 0 }}
          >
            {startData.data.contentDetails.password.validationError}
          </span>
          <div className="welcome-helpdesk">
            {startData.data.contentDetails.helpdeskDetails.helpdeskTxt}
            <br />
            <a
              href={`mailto:${startData.data.contentDetails.helpdeskDetails.mailTo}`}
            >
              {startData.data.contentDetails.helpdeskDetails.mailTo}
            </a>
          </div>
        </div>

      </div>
      < Footer  >
        <div className="button-container">
          <div
            className={
              password && isPasswordValid(password) && password != ""
                ? ""
                : "cursor-block"
            }
          >
            <CustomButton className={
              password && isPasswordValid(password) && password != ""
                ? "submitButton"
                : "submitButton submit-block"
            }
              onClick={handleClick}>
              {startData.data.contentDetails.submitBTnDetails.submitBTnTxt}
            </CustomButton>
          </div>
        </div>
      </ Footer>
    </>
  );
};

export default Login;
