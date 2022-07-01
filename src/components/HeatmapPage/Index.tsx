import React, { useEffect, useState } from "react";
import SecondaryHeader from "../Headers/SecondaryHeader";
import Coaching from "../../assets/svg/heatmapSvg/Coaching.svg";
import { Footer } from "../Footer";
import CustomButton from "../UI/CustomButton";

const HeatmapPage = () => {
  const [jsonData, setJSONData] = useState<any>("");

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerText)
    );
    // @ts-ignore
    document.getElementById("forwardbutton").disabled = true;
    // console.log(jsonData.data.inputData.capabilities)
  }, []);

  const previousHandleClick = (event: any) => {
    if (jsonData !== '') {
      // @ts-ignore
      document.getElementById('navText').value =
        jsonData.data?.footerData?.previousInputId;
      // @ts-ignore
      document.getElementById('forwardbutton').disabled = false;
      // @ts-ignore
      document.getElementById('forwardbutton').click();
    }
  };

  const handleForwardClick = () => {
    if (jsonData !== "") {
      // @ts-ignore
      document.getElementById("navText").value =
        jsonData?.data?.footerData?.forwardInputId;
      // @ts-ignore
      document.getElementById("forwardbutton").disabled = false;
      // @ts-ignore
      document.getElementById("forwardbutton").click();
    }
  };

  return (
    <div className="heatmap-wrapper">
      <SecondaryHeader sidebar={false} />
      <div className="heatmap-container">
        <div className="custom_middle_container">
          <div className="Illustrative_content">
            <div className="Illustrative">
              <b>Illustrative</b>
            </div>

            <div className="checkbox_container">
              <div className="checkbox">
                <div className="least-grey checkbox-box"></div>
                <label htmlFor="potential">With improvement potential</label>
              </div>
              <div className="checkbox">
                <div className="light-grey checkbox-box"></div>
                <label htmlFor="growth">Improvement for further growth</label>
              </div>
              <div className="checkbox ">
                <div className="dark-grey checkbox-box"></div>
                <label htmlFor="market">Market leading</label>
              </div>
            </div>
          </div>
        </div>

        <div className="markers">
          <div className="div-marker marker-one">
            <b>Right set up to...</b>
          </div>
          <div className="div-marker marker-two">
            <b>...target customers...</b>
          </div>
          <div className="div-marker marker-three">
            <b>...and convert the lead!</b>
          </div>
        </div>

        <div className="silde_container">
          <div className="track">
            <div className="marker-ball circle_one"></div>
            <div className="marker-ball circle_two"></div>
            <div className="marker-ball circle_three"></div>
          </div>
        </div>

        <div className="table_container">
          <div className="custom-table">
            {jsonData?.data?.inputData?.capabilities?.map(
              (cap: any, i: any) => (
                <div key={i} className="custom-row">
                  <div
                    className="custom-col-head"
                    id={
                      i + 1 == 1
                        ? "headOne"
                        : i + 1 == 2
                        ? "headTwo"
                        : i + 1 == 3
                        ? "headThree"
                        : i + 1 == 4
                        ? "headFour"
                        : i + 1 == 5
                        ? "headFive"
                        : i + 1 == 6
                        ? "headSix"
                        : i + 1 == 7
                        ? "headSeven"
                        : "headEight"
                    }
                  >
                    <span className="headingSerialNo">{cap.serialNumber}</span>
                    <p>{cap.capability}</p>
                  </div>
                  {cap.skills.map((skill: any) => (
                    <div
                      className={
                        skill.colorLabel == 1
                          ? "custom-col bg-lightgray"
                          : skill.colorLabel == 2
                          ? "custom-col bg-midgray"
                          : "custom-col bg-darkgray"
                      }
                    >
                      <div className="custom_image">
                        <img
                          className={
                            skill.colorLabel == 1
                              ? "color-darkgray"
                              : skill.colorLabel == 2
                              ? "color-midgray"
                              : "color-lightgray"
                          }
                          src={`${skill.skillImageUrl}`}
                        />
                      </div>
                      <div className="context">{skill.skillName}</div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      
      <Footer>
        <div className="button-container">
          <div className="button-container">
            <div className="button-inr-btn">
              {(jsonData?.data?.footerData?.previousTxt)?
                <CustomButton
                className="submitButton  mar-right"
                onClick={previousHandleClick}
              >
                {jsonData.data?.footerData?.previousTxt}
              </CustomButton> : null
            }

            {
              (jsonData?.data?.footerData?.forwardTxt)?
              <CustomButton className="submitButton " onClick={handleForwardClick}>
              {jsonData.data?.footerData?.forwardTxt}
            </CustomButton> : null
            }
            </div>
          </div>
        </div>
      </Footer> 
    </div>
  );
};

export default HeatmapPage;
