import React, { useState } from "react";
import startData from "../../mock/startPageData.json";
import { isPasswordValid } from "../../utils";
import PrimaryHeader from "../Headers/PrimaryHeader/index";
import { Inputbox } from "../UI/Input";
import "./Login.scss";
import Link from "../Link/index";
const Login = () => {
  const [password, setPassword] = useState("");
  {
    console.log(password && !isPasswordValid(password));
  }
  return (
    <>
      <PrimaryHeader />
      <div className="welcome-main">
        <h3 className="welcome-heading">
          {startData.data.contentDetails.headingTxt}
        </h3>
        <p className="welcome-content">
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
        <div
          className={
            password && !isPasswordValid(password)
              ? "welcome-submit cursor-block"
              : "welcome-submit"
          }
          id={startData.data.contentDetails.submitBTnDetails.forwardInputId}
        >
          <Link
            href="/cvex-intro"
            className={
              password && !isPasswordValid(password)
                ? "welcome-link link-block"
                : "welcome-link"
            }
          >
            {startData.data.contentDetails.submitBTnDetails.submitBTnTxt}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
