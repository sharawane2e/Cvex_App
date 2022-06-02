import "./SecondaryHeader.scss";
// import Logo from "../../../assets/svg/logo.svg";

const SecondaryHeader = () => {
  return (
    <>
      <div className="secondary-header" style={{
        backgroundImage:
          "url(https://ui.e2eresearch.com/Mckinsey/assets/svg/BG.svg)",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="logo">
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
