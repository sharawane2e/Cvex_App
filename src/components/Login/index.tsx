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

  console.log(password)

  useEffect(() => {
    // @ts-ignore
    document.getElementById("forwardbutton").disabled = true;
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerHTML)
    );


  }, []);
  errorMessage = jsonData?.data?.contentDetails?.Error;
  isInvalid = jsonData?.data?.contentDetails?.isInvalid;

  document.addEventListener("DOMContentLoaded", function (event) {
    errorElem.innerHTML = errorMessage;

    // inputElem.addEventListener("keypress", function (event: any) {

    //   if (event.key === "Enter") {
    //     alert(event.key + " " + event.which);
    //     event.preventDefault();
    //   }
    // });

    // inputElem.addEventListener("keyup", function (event: any) {
    //   if (event.target.value.trim() == "") {
    //     event.target.value = "";
    //   }
    // })
  });

  const handleClick = () => {
    if (jsonData !== "") {
      console.log("handle cliecj hua")

      // if (password) {
      //   backpunchElem.value = password;
      // }


      // @ts-ignore
      document.getElementById("navText").value =
        jsonData["data"]["contentDetails"]["submitBTnDetails"]["forwardInputId"];

      // @ts-ignore
      document.getElementById("forwardbutton").disabled = false;
      // @ts-ignore
      document.getElementById("forwardbutton").click();

    }
  }

  const handleKeyUp = (e: any) => {
    if (e.key == 'Enter') {
      // e.preventDefault();
      handleClick();

    }
  }

  const handleOnChange = (e: any) => {
    setPassword(e.target.value);
    backpunchElem.value = e.target.value;

  }

  return (
    <>
      <PrimaryHeader />
      <div className="main-container">
        <h3 className="title">

          {jsonData.data?.contentDetails?.headingTxt}
        </h3>
        <div className="content-area">
          <p >

            {jsonData.data?.contentDetails?.content}
          </p>
          <Inputbox
            className="startData.data.contentDetails.password.passwordInputId"
            id={startData.data.contentDetails.password.passwordInputId}
            placeholder={jsonData.data?.contentDetails?.password?.placeholder}
            type="password"
            onChange={(e: any) => handleOnChange(e)}
            onKeyUp={(e: any) => handleKeyUp(e)}
          />

          <span
            className="input-error" id="input-error"
          >{isInvalid ? errorMessage : ""}
          </span>
          <div className="welcome-helpdesk">

            {jsonData.data?.contentDetails?.helpdeskDetails?.helpdeskTxt}
            <br />
            <a

              href={`mailto:${jsonData.data?.contentDetails?.helpdeskDetails?.mailTo}`}
            >

              {jsonData.data?.contentDetails?.helpdeskDetails?.mailTo}
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
                {jsonData.data?.contentDetails?.submitBTnDetails?.submitBTnTxt}
              </CustomButton>
            </div>
          </div>
        </div>
      </ Footer>
    </>
  );
};

export default Login;
