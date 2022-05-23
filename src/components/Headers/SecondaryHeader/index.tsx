import React from "react";
// import "./Sample.scss";
import Logo from "../../../assets/svg/logo.svg";
const Sample = () => {
  return (
    <>
      <div className="primary-header">
        <div className="logo">
          <img src={Logo} alt="Mckinsey logo" />
        </div>
        <div className="title">
          <h2>Customer Value Execution</h2>
        </div>
      </div>
    </>
  );
};

export default Sample;
