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
  let errorMessage: any;
  const inputElem: any = document.getElementById(`${startData.data.contentDetails.password.passwordInputId}`);
  let isInvalid: Boolean;
  const errorElem: any = document.getElementById("input-error");
  const backpunchElem: any = document.getElementById("QPassword");

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerHTML)
    );

  }, []);
  errorMessage = jsonData?.data?.contentDetails?.Error;
  isInvalid = jsonData?.data?.contentDetails?.isInvalid;

  document.addEventListener("DOMContentLoaded", function (event) {
    errorElem.innerHTML = errorMessage;

    inputElem.addEventListener("keypress", function (event: any) {

      if (event.key === "Enter") {
        alert(event.key + " " + event.which);
        event.preventDefault();
      }
    });

    inputElem.addEventListener("keyup", function (event: any) {
      if (event.target.value.trim() == "") {
        event.target.value = "";
      }
    })
  });

  const handleClick = () => {
    if (jsonData !== "") {

      if (password) {
        backpunchElem.value = password;
        // if (inputElem.value == "") {
        //   // @ts-ignore
        //   // document.getElementById("QPassword").value = "";
        // }
        // if (isInvalid) {
        //   errorMessage = document.getElementById("globalerror_error")?.innerHTML;
        //   errorElem.innerHtml = errorMessage;
        // }
        // else {
        //   errorMessage = document.getElementById("globalerror_error")?.innerHTML;
        //   errorElem.innerHtml = errorMessage;
        //   console.log(errorElem);
        // }
      }


      // @ts-ignore
      document.getElementById("navText").value =
        jsonData["data"]["contentDetails"]["submitBTnDetails"]["forwardInputId"]
      // @ts-ignore
      document.getElementById("forwardbutton").click();

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
  //     document.getElementById("forwardbutton").click();
  //   
  // }
  return (
    <>
      <PrimaryHeader />
      <div className="main-container">
        <h3 className="title">
          {startData.data.contentDetails?.headingTxt}
          {/* {jsonData["data"]["contentDetails"]["headingTxt"]} */}
        </h3>
        <div className="content-area">
          <p >
            {startData.data.contentDetails.content}
            {/* {jsonData["data"]["contentDetails"]["content"]} */}
          </p>
          <Inputbox
            id={startData.data.contentDetails.password.passwordInputId}
            placeholder={startData.data.contentDetails.password.placeholder}
            // placeholder={jsonData["data"]["contentDetails"]["password"]["placeholder"]}
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
          {/* <span
          className="welcome-input-error"
          style={{ opacity: password && !isPasswordValid(password) ? 1 : 0 }}
        >
          {startData.data.contentDetails.password.validationError}
          </span> */}
          <span
            className="input-error" id="input-error"
          >{isInvalid ? errorMessage : ""}
          </span>
          <div className="welcome-helpdesk">
            {startData.data.contentDetails.helpdeskDetails.helpdeskTxt}
            {/* {jsonData["data"]["contentDetails"]["helpdeskDetails"]["helpdeskTxt"]} */}
            <br />
            <a
              href={`mailto:${startData.data.contentDetails.helpdeskDetails.mailTo}`}
            // href={`mailto:${jsonData["data"]["contentDetails"]["helpdeskDetails"]["mailTo"]}`}
            >
              {startData.data.contentDetails.helpdeskDetails.mailTo}
              {/* {jsonData["data"]["contentDetails"]["helpdeskDetails"]["mailTo"]} */}
            </a>
          </div>
        </div>

      </div>
      < Footer  >
        <div className="button-container">
          {/* <div
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
        </div> */}
          <div className="button-container">
            <div>
              <CustomButton className={"submitButton"}
                onClick={handleClick}>
                {startData.data.contentDetails.submitBTnDetails.submitBTnTxt}
                {/* {jsonData["data"]["contentDetails"]["submitBTnDetails"]["submitBTnTxt"]} */}
              </CustomButton>
            </div>
          </div>
        </div>
      </ Footer>
    </>
  );
};

export default Login;
