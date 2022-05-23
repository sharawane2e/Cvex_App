import PrimaryHeader from "../Headers/PrimaryHeader/index";
import introData from "../../mock/introData.json";
import Parser from "html-react-parser";
import "./index.scss";
type Props = {};
export function Introduction(props: Props) {
  return (
    <div>
      <PrimaryHeader />
      <div className="introduction-main">
        <h3 className="introduction-heading">
          {introData.data.contentDetails.headingTxt}
        </h3>
        <p className="introduction-content">
          {Parser(introData.data.contentDetails.content)}
        </p>
        <div
          className="introduction-submit"
          id={introData.data.contentDetails.forwardBTnDetails.forwardInputId}
        >
          {introData.data.contentDetails.forwardBTnDetails.forwardBTnTxt}
        </div>
      </div>
    </div>
  );
}
