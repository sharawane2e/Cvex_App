import { ReactComponent as Banner } from "../../../assets/svg/header_image.svg";
const PrimaryHeader = () => {
  return (
    <>
      <div
        className="primary-header"
        style={{
          backgroundImage: `url(https://ui.e2eresearch.com/Mckinsey/assets/svg/BG.svg)`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="logo">
          <img
            src={"https://ui.e2eresearch.com/Mckinsey/assets/svg/logo.svg"}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrimaryHeader;
