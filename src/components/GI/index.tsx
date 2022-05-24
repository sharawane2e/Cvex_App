// @flow
import * as React from "react";
import PrimaryHeader from "../Headers/PrimaryHeader";
import generalData from "../../mock/giData.json";
type Props = {};
const GI = (general_data: Props) => {
  {
    generalData?.data?.rightData.map((i: any) => {
      console.log(i);
    });
  }
  return (
    <>
      <PrimaryHeader />
      <div className="general-container"></div>
    </>
  );
};

export default GI;
