import { ReactComponent as Banner } from "../../../assets/svg/header_image.svg";
import React, { useEffect, useState } from "react";

const PrimaryHeader = () => {
  const [jsonData, setJSONData] = useState<any>("");
  // useEffect(() => {
  //   setJSONData(
  //     // @ts-ignore
  //     JSON.parse(document.getElementById("jsonData")?.innerHTML)
  //   );
  // }, []);
  return (
    <>
      <div
        className="primary-header"
        style={{
          backgroundImage:
            "url(https://ui.e2eresearch.com/Mckinsey/assets/svg/BG.svg)",
          // `url(${jsonData["data"]["headerData"]["banner"]})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="logo">
          <img
            src={"https://ui.e2eresearch.com/Mckinsey/assets/svg/logo.svg"}
            // src={jsonData["data"]["headerData"]["logo"]}
            alt="Mckinsey logo"
          />
        </div>
        <div className="header">
          <div className="banner">
            <div className="banner-image">
              <Banner />
            </div>
            <div className="banner-title">
              <h2>Customer Value Execution</h2>
              {/* <h2>{jsonData["data"]["headerData"]["title"]}</h2> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrimaryHeader;
