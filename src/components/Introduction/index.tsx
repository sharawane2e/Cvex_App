import PrimaryHeader from '../Headers/PrimaryHeader/index';
import './Introduction.scss';
import CustomButton from '../UI/CustomButton';
import { Footer } from '../Footer';
import React, { useEffect, useState } from 'react';
import '../Login/Login.scss';
import { getParsedData } from '../../utils/parserUtil';

type Props = {};
export function Introduction(props: Props) {
  const [jsonData, setJSONData] = useState<any>('');

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerText),
    );
  }, []);

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
  console.log(jsonData?.data?.contentDetails);
  return (
    <>
      <PrimaryHeader />
      <div className="introduction-main">
        <h3 className="introduction-heading">
          {getParsedData(jsonData?.data?.contentDetails?.headingTxt)}
        </h3>
        <p className="introduction-content">
          {getParsedData(jsonData?.data?.contentDetails?.content)}
        </p>
      </div>
      <Footer>
        <div className="button-container">
          <CustomButton
            className="submitButton forword-btn"
            onClick={handleClick}
          >
            {getParsedData(
              jsonData?.data?.contentDetails?.submitBTnDetails?.forwardBTnTxt,
            )}
          </CustomButton>
        </div>
      </Footer>
    </>
  );
}
