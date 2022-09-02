import { ReactComponent as Hamburger } from '../../../assets/svg/hamburger.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setLeftPanelOpenClose } from '../../../redux/actions/LeftPanelActions';
import { useState, useEffect } from 'react';
import store from '../../../redux/store';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import { ByteToPdfConvert, ByteToPPTConvert } from '../../../utils/HelperFunctions';
import CustomLoader from '../../CustomLoader';

type headerProps = {
  sidebar?: boolean;
};

const defaultProps: headerProps = {
  sidebar: true,
};

const SecondaryHeader = (props: headerProps) => {
  const [jsonData, setJSONData] = useState<any>('');
  const [ showLoader, setShowLoader] = useState(false);
  const { leftPanel } = useSelector((state: any) => state);
  const { dispatch } = store;

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
    //@ts-ignore
    // console.log("_outputTemplateSubskills", _outputTemplateSubskills);
  }, []);

  const toggleLeftPanel = () => {
    const updateToggle = leftPanel?.leftPanelOpen;
    dispatch(setLeftPanelOpenClose(!updateToggle));
    //@ts-ignore
    // document.getElementById(jsonData?.data?.leftPanel?.isNavPanelOpen).value = updateToggle;
    console.log(jsonData?.data?.leftPanel);
  };

  var postData = {
    //@ts-ignore
    heatmap: _heatmap,
    //@ts-ignore
    outputTemplateSkills: _outputTemplateSkills,
    //@ts-ignore
    outputTemplateSubskills: _outputTemplateSubskills
  };

  const downloadAPI = (type:any) => {
    setShowLoader(true);
    console.log(postData, type);
    axios.post("https://cvex.ads.mckinsey.com/api/Download/" + type , postData)
    .then((x:any) => {
        if(type == "ppt"){
          ByteToPPTConvert("Benchmarking.pptx", x.data);
          setShowLoader(false);
        }
        else{
          ByteToPdfConvert("Benchmarking.pdf", x.data);
          setShowLoader(false);
        }
    });
  }

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

          {jsonData?.pageCode?.page == 11 ? 
          <div className='download_btns_container'>

            <Tooltip title="Download PDF">
              <button onClick={() => downloadAPI("pdf")}>
                <PictureAsPdfIcon/>
              </button>
            </Tooltip>

            <Tooltip title="Download PPT">
              <button className='ml-10' onClick={() => downloadAPI("ppt")}>
                <ArticleIcon/>
              </button>
            </Tooltip>

          </div>
          : null}

        </div>
      </div>
      <CustomLoader isShow={showLoader}/>
    </>
  );
};

SecondaryHeader.defaultProps = defaultProps;

export default SecondaryHeader;
