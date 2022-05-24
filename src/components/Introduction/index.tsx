import PrimaryHeader from "../Headers/PrimaryHeader/index";
import introData from "../../mock/introData.json";
import Parser from "html-react-parser";
import "./index.scss";
import Link from "../Link/index";

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
          <Link href="/Thank-You" className="welcome-link">
            {introData.data.contentDetails.forwardBTnDetails.forwardBTnTxt}
          </Link>
        </div>
      </div>
    </div>
  );
}
