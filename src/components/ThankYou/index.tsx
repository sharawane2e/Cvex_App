import PrimaryHeader from "../Headers/PrimaryHeader/index";
import thankyoupageData from "../../mock/thankyoupageData.json";
import Parser from "html-react-parser";

type Props = {};

const ThankYou = (props: Props) => {
  return (
    <div>
      <PrimaryHeader />
      <div className="introduction-main">
        <h3 className="introduction-heading">
          {thankyoupageData.data.contentDetails.headingTxt}
        </h3>
        <p className="introduction-content">
          {Parser(thankyoupageData.data.contentDetails.content)}
        </p>
        <div
          className="introduction-submit"
          id={
            thankyoupageData.data.contentDetails.resultBTnDetails.forwardInputId
          }
        ></div>
      </div>
    </div>
  );
};
export default ThankYou;
