import React, { useEffect, useState } from 'react';
import startData from '../../mock/startPageData.json';
import { isPasswordValid } from '../../utils';
import PrimaryHeader from '../Headers/PrimaryHeader/index';
import { Inputbox } from '../UI/Input';
import CustomButton from '../UI/CustomButton';
import { Footer } from '../Footer';
import { getParsedData } from '../../utils/parserUtil';

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
    console.log(document.getElementById('jsonData')?.innerHTML)
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
        <div className="content-area">
          <h3 className="title">
            {getParsedData(jsonData.data?.contentDetails?.headingTxt)}
          </h3>
          <p>{getParsedData(jsonData.data?.contentDetails?.content)}</p>
          <Inputbox
            className="startData.data.contentDetails.password.passwordInputId"
            id={startData.data.contentDetails.password.passwordInputId}
            placeholder={jsonData.data?.contentDetails?.password?.placeholder}
            type="password"
            onChange={(e: any) => handleOnChange(e)}
            onKeyUp={(e: any) => handleKeyUp(e)}
          />

          <span className="input-error" id="input-error">
            {isInvalid ? errorMessage : ''}
          </span>
          <div className="welcome-helpdesk">
            {getParsedData(
              jsonData.data?.contentDetails?.helpdeskDetails?.helpdeskTxt,
            )}
            <br />
            <a
              href={`mailto:${getParsedData(
                jsonData.data?.contentDetails?.helpdeskDetails?.mailTo,
              )}`}
            >
              {getParsedData(
                jsonData.data?.contentDetails?.helpdeskDetails?.mailTo,
              )}
            </a>
          </div>
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
          <div className="button-container">
            <div>
              <CustomButton className={'submitButton'} onClick={handleClick}>
                {jsonData.data?.contentDetails?.submitBTnDetails?.submitBTnTxt}
              </CustomButton>
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default Login;
