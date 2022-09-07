import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import puff from "../../assets/svg/puff.svg";

interface CustomLoaderProps {
    isShow: boolean;
    isError: boolean;
    loaderCloseReset?: (value: any) => void;
  }

const CustomLoader: React.FC<CustomLoaderProps> = ({...props}) => {

    const { isShow, isError, loaderCloseReset } = props;
    const [ boxWidth, setBoxWidth] = useState('100px');
    const [ boxHeight, setBoxHeight] = useState('100px');

    useEffect(() => {
        //@ts-ignore
        document.getElementById("forwardbutton").disabled = true;
    },[])

    useEffect(() => {
        console.log("error changed");
        if(isError == true){
            setBoxWidth('300px');
            setBoxHeight('200px');
        }
        else{
            setBoxWidth('100px');
            setBoxHeight('100px');
        }
    }, [isError]);

    return isShow ? (
        <>
            <div className='backdrop'>Backdrop</div>
            {isError == true ? 
                <div className={isError ? 'loader_container request-error' : 'loader_container request-loading'} style={{'width': boxWidth, 'height': boxHeight}}>
                    <div className='loadheader'>
                        <IconButton onClick={loaderCloseReset}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <ErrorOutlineIcon sx={{ fontSize: 60 }} color="error"/>
                    <div className='loader-message'>Some Error Occured !</div>
                </div>
            :
                <div className="pre-loader-Block ">
                    <img src='data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+DQo8c3ZnIHdpZHRoPSI0NCIgaGVpZ2h0PSI0NCIgdmlld0JveD0iMCAwIDQ0IDQ0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0cm9rZT0iI2ZmZiI+DQogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utd2lkdGg9IjIiPg0KICAgICAgICA8Y2lyY2xlIGN4PSIyMiIgY3k9IjIyIiByPSIxIj4NCiAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiDQogICAgICAgICAgICAgICAgYmVnaW49IjBzIiBkdXI9IjEuOHMiDQogICAgICAgICAgICAgICAgdmFsdWVzPSIxOyAyMCINCiAgICAgICAgICAgICAgICBjYWxjTW9kZT0ic3BsaW5lIg0KICAgICAgICAgICAgICAgIGtleVRpbWVzPSIwOyAxIg0KICAgICAgICAgICAgICAgIGtleVNwbGluZXM9IjAuMTY1LCAwLjg0LCAwLjQ0LCAxIg0KICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KICAgICAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLW9wYWNpdHkiDQogICAgICAgICAgICAgICAgYmVnaW49IjBzIiBkdXI9IjEuOHMiDQogICAgICAgICAgICAgICAgdmFsdWVzPSIxOyAwIg0KICAgICAgICAgICAgICAgIGNhbGNNb2RlPSJzcGxpbmUiDQogICAgICAgICAgICAgICAga2V5VGltZXM9IjA7IDEiDQogICAgICAgICAgICAgICAga2V5U3BsaW5lcz0iMC4zLCAwLjYxLCAwLjM1NSwgMSINCiAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4NCiAgICAgICAgPC9jaXJjbGU+DQogICAgICAgIDxjaXJjbGUgY3g9IjIyIiBjeT0iMjIiIHI9IjEiPg0KICAgICAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciINCiAgICAgICAgICAgICAgICBiZWdpbj0iLTAuOXMiIGR1cj0iMS44cyINCiAgICAgICAgICAgICAgICB2YWx1ZXM9IjE7IDIwIg0KICAgICAgICAgICAgICAgIGNhbGNNb2RlPSJzcGxpbmUiDQogICAgICAgICAgICAgICAga2V5VGltZXM9IjA7IDEiDQogICAgICAgICAgICAgICAga2V5U3BsaW5lcz0iMC4xNjUsIDAuODQsIDAuNDQsIDEiDQogICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+DQogICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2Utb3BhY2l0eSINCiAgICAgICAgICAgICAgICBiZWdpbj0iLTAuOXMiIGR1cj0iMS44cyINCiAgICAgICAgICAgICAgICB2YWx1ZXM9IjE7IDAiDQogICAgICAgICAgICAgICAgY2FsY01vZGU9InNwbGluZSINCiAgICAgICAgICAgICAgICBrZXlUaW1lcz0iMDsgMSINCiAgICAgICAgICAgICAgICBrZXlTcGxpbmVzPSIwLjMsIDAuNjEsIDAuMzU1LCAxIg0KICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KICAgICAgICA8L2NpcmNsZT4NCiAgICA8L2c+DQo8L3N2Zz4=' width="50" alt=""/>
                </div>
            }

        </>
    )
    : null;
}

export default CustomLoader;