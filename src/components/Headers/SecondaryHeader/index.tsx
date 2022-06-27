import { ReactComponent as Hamburger } from '../../../assets/svg/hamburger.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setLeftPanelOpenClose } from '../../../redux/actions/LeftPanelActions';
import { useState, useEffect } from 'react';
import store from '../../../redux/store';

type headerProps = {
  sidebar?: boolean;
};

const defaultProps: headerProps = {
  sidebar: true,
};

const SecondaryHeader = (props: headerProps) => {
  const [jsonData, setJSONData] = useState<any>('');

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
    // console.log(document.getElementById('jsonData')?.innerHTML)
  }, []);
  const { leftPanel } = useSelector((state: any) => state);
  const { dispatch } = store;

  const toggleLeftPanel = () => {
    const updateToggle = leftPanel?.leftPanelOpen;
    dispatch(setLeftPanelOpenClose(!updateToggle));
    //@ts-ignore
    // document.getElementById(jsonData?.data?.leftPanel?.isNavPanelOpen).value = updateToggle;
    console.log(jsonData?.data?.leftPanel);
  };

  return (
    <>
      <div
        className={
          leftPanel?.leftPanelOpen
            ? 'secondary-header hamburger-toggle'
            : ' secondary-header hamburger-toggle-active'
        }
        style={{
          backgroundImage:
            'url(https://ui.e2eresearch.com/Mckinsey/assets/svg/BG.svg)',

          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={props?.sidebar ? 'logo' : 'logo jc-center'}>
          {/* {
            props?.sidebar && <div className="hamburger-menu" >
              <Hamburger onClick={() => toggleLeftPanel()} />
            </div>
          } */}

          {props?.sidebar && (
            <div
              className={
                leftPanel?.leftPanelOpen ? 'menu btn15 open' : 'menu btn15'
              }
              data-menu="15"
              onClick={() => toggleLeftPanel()}
            >
              <div className="icon"></div>
            </div>
          )}

          <img
            src={'https://ui.e2eresearch.com/Mckinsey/assets/svg/logo.svg'}
            alt="Mckinsey logo"
          />
        </div>
        <div className="title">
          <h2>{jsonData?.data?.headerData?.title}</h2>
        </div>
      </div>
    </>
  );
};

SecondaryHeader.defaultProps = defaultProps;

export default SecondaryHeader;
