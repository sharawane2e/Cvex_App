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
  const [downloadJson, setDownloadJson] = useState<any>('');
  const [ showLoader, setShowLoader] = useState(false);
  const [ showLoadError, setShowLoadError] = useState(false);
  const { leftPanel } = useSelector((state: any) => state);
  const { dispatch } = store;

  let postData:any = {
    heatmap: {},
    outputTemplateSkills: {},
    outputTemplateSubskills: {}
  };

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
    try{
      setDownloadJson(
        // @ts-ignore
        JSON.parse(document.getElementById('downloadjson')?.innerHTML),
      );
    }
    catch{
      console.log("cat")
    }


    //@ts-ignore
    document.getElementById("forwardbutton").disabled = true;

  }, []);

  const toggleLeftPanel = () => {
    const updateToggle = leftPanel?.leftPanelOpen;
    dispatch(setLeftPanelOpenClose(!updateToggle));
    //@ts-ignore
    // document.getElementById(jsonData?.data?.leftPanel?.isNavPanelOpen).value = updateToggle;
    console.log(jsonData?.data?.leftPanel);
  };

  const downloadAPI = (e:any,type:any) => {
    e.preventDefault();
    //@ts-ignore
    document.getElementById("forwardbutton").disabled = true;
    setShowLoadError(false);
    setShowLoader(true);
    try{
      postData['heatmap'] = downloadJson?.heatmap;
      postData['outputTemplateSkills'] = downloadJson?.outputTemplateSkills;
      postData['outputTemplateSubskills'] = downloadJson?.outputTemplateSubskills;
    }
    catch(err){
      console.log("no !", err);
    }
    console.log(postData, type);
    axios.post("https://cvex.ads.mckinsey.com/api/Download/" + type , postData)
    .then((x:any) => {
      console.log("x", x)
        if(type == "ppt"){
          ByteToPPTConvert("Benchmarking.pptx", x.data);
          setShowLoader(false);
        }
        else{
          ByteToPdfConvert("Benchmarking.pdf", x.data);
          setShowLoader(false);
        }
    })
    .catch((error:any) => {
      if (error.response) {
        console.log(error.response.status);
        setShowLoadError(true);
      }
    })
  }

  const loaderCloseReset = () => {
    setShowLoader(false);
    setShowLoadError(false);
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

          {(jsonData?.pageCode?.page == 11 || jsonData?.pageCode?.page == 12 || jsonData?.pageCode?.page == 6 )? 
          <div className='download_btns_container'>

            <Tooltip title="Download PDF">
              <button onClick={(e:any) => downloadAPI(e,"pdf")}>
                <PictureAsPdfIcon/>
              </button>
            </Tooltip>

            <Tooltip title="Download PPT">
              <button className='ml-10' onClick={(e:any) => downloadAPI(e,"ppt")}>
                <ArticleIcon/>
              </button>
            </Tooltip>

          </div>
          : null}

        </div>
      </div>

      <CustomLoader 
        isShow={showLoader} 
        isError={showLoadError} 
        loaderCloseReset={loaderCloseReset}
      />

    </>
  );
};

SecondaryHeader.defaultProps = defaultProps;

export default SecondaryHeader;
