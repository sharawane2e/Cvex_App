import React, { useEffect, useState } from 'react';
import startData from '../../mock/startPageData.json';
import { isPasswordValid } from '../../utils';
import PrimaryHeader from '../Headers/PrimaryHeader/index';
import { Inputbox } from '../UI/Input';
import './Panel.scss';
import CustomButton from '../UI/CustomButton';
import { Footer } from '../Footer';
import { getParsedData } from '../../utils/parserUtil';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Login = (props: any) => {
  const [password, setPassword] = useState('');
  const [jsonData, setJSONData] = useState<any>('');
  let errorMessage: any;
  const inputElem: any = document.getElementById(
    `${startData.data.contentDetails.password.passwordInputId}`,
  );
  let isInvalid: Boolean;
  const errorElem: any = document.getElementById('input-error');
  const backpunchElem: any = document.getElementById('QPassword');

  useEffect(() => {
    // @ts-ignore
    document.getElementById('forwardbutton').disabled = true;
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
  }, []);
  errorMessage = jsonData?.data?.contentDetails?.Error;
  isInvalid = jsonData?.data?.contentDetails?.isInvalid;

  document.addEventListener('DOMContentLoaded', function (event) {
    errorElem.innerHTML = errorMessage;
  });

  const handleClick = () => {
    if (jsonData !== '') {
      // @ts-ignore
      document.getElementById('navText').value =
        jsonData['data']['contentDetails']['submitBTnDetails'][
        'forwardInputId'
        ];

      // @ts-ignore
      document.getElementById('forwardbutton').disabled = false;
      // @ts-ignore
      document.getElementById('forwardbutton').click();
    }
  };

  const handleKeyUp = (e: any) => {
    if (e.key == 'Enter') {
      handleClick();
    }
  };

  const handleOnChange = (e: any) => {
    setPassword(e.target.value);
    backpunchElem.value = e.target.value;
  };

  return (
    <div className="login-container">
      <PrimaryHeader />
      <div className="main-container">
        <div className="content-area main-container">
          <Box className="btn-cont">
            <Button variant="contained" className="nav-btn nav-btn-blue" >Impact Calculator</Button>
            <Button variant="contained" className="nav-btn nav-btn-grey">CVEx 1.0</Button>
            <Button variant="contained" className="nav-btn nav-btn-grey">CVEx 2.0</Button>
          </Box>
        </div>
      </div>
      <Footer>
        <div className="button-container">
          {/* <div
          className={
            password && isPasswordValid(password) && password != ""
              ? ""
              : "cursor-block"
          }
        >
          <CustomButton className={
            password && isPasswordValid(password) && password != ""
              ? "submitButton"
              : "submitButton submit-block"
          }
            onClick={handleClick}>
            {startData.data.contentDetails.submitBTnDetails.submitBTnTxt}
          </CustomButton>
        </div> */}
        </div>
      </Footer>
    </div>
  );
};

export default Login;
