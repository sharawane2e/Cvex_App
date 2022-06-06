import "./SecondaryHeader.scss";
import React, { useEffect, useState } from "react";
import { ReactComponent as Hamburger } from "../../../assets/svg/hamburger.svg";
// import Logo from "../../../assets/svg/logo.svg";

const SecondaryHeader = () => {
  const [jsonData, setJSONData] = useState<any>("");
  // useEffect(() => {
  //   setJSONData(
  //     // @ts-ignore
  //     JSON.parse(document.getElementById("jsonData")?.innerHTML)
  //   );
  // }, []);
  return (
    <>
      <div className="secondary-header" style={{
        backgroundImage:
          "url(https://ui.e2eresearch.com/Mckinsey/assets/svg/BG.svg)",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="logo">
          <div className="hamburger-toggle"><Hamburger /></div>
          <img
            src={"https://ui.e2eresearch.com/Mckinsey/assets/svg/logo.svg"}
            alt="Mckinsey logo"
          />
        </div>
        <div className="title">
          <h2>Customer Value Execution (CVEx) diagnostic</h2>
        </div>
      </div>
    </>
  );
};

export default SecondaryHeader;
