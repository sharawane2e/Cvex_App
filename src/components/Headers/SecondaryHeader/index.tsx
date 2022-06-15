import './SecondaryHeader.scss';
import { ReactComponent as Hamburger } from '../../../assets/svg/hamburger.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setLeftPanelOpenClose } from '../../../redux/actions/LeftPanelActions';
// import Logo from "../../../assets/svg/logo.svg";

const SecondaryHeader = () => {

  const dispatch = useDispatch();


  return (
    <>
      <div
        className="secondary-header"
        style={{
          backgroundImage:
            'url(https://ui.e2eresearch.com/Mckinsey/assets/svg/BG.svg)',

          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="logo">
          <div className="hamburger-toggle">
            <Hamburger onClick={() => dispatch(setLeftPanelOpenClose(false))} />

          </div>
          <img
            src={'https://ui.e2eresearch.com/Mckinsey/assets/svg/logo.svg'}

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
