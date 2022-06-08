import "./SecondaryHeader.scss";
import React, { useEffect, useState } from "react";
import { ReactComponent as Hamburger } from "../../../assets/svg/hamburger.svg";
import store from "../../../redux/store";
import { setSideBar } from "../../../redux/actions/SideBarAction";
// import Logo from "../../../assets/svg/logo.svg";

const SecondaryHeader = () => {
  const [jsonData, setJSONData] = useState<any>("");
  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerHTML)
    );
  }, []);
  const { dispatch } = store;

  const handleToggle = () => {
    dispatch(setSideBar(true));
  }

  return (
    <>
      <div className="secondary-header" style={{
        backgroundImage:
          "url(https://ui.e2eresearch.com/Mckinsey/assets/svg/BG.svg)",
        // `url(${jsonData?.data?.headerData?.banner})`,
        backgroundRepeat: "no-repeat",
      }}>
        <div className="logo">
          <div className="hamburger-toggle" onClick={handleToggle}><Hamburger /></div>
          <img
            src={"https://ui.e2eresearch.com/Mckinsey/assets/svg/logo.svg"}
            // src={jsonData?.data?.headerData?.logo}
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
