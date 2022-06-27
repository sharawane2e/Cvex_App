import React, { useEffect, useState } from "react";
import SecondaryHeader from "../Headers/SecondaryHeader";
import Coaching from "../../assets/svg/heatmapSvg/Coaching.svg";

const HeatmapPage = () => {
  const [jsonData, setJSONData] = useState<any>("");

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerHTML)
    );
    // console.log(jsonData.data.inputData.capabilities)
  }, []);

  return (
    <div className="question-wrapper">
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
                  <div className="custom-col-head" id="headOne">
                    {cap.capability}
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
    </div>
  );
};

export default HeatmapPage;
