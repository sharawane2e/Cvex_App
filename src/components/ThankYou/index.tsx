import PrimaryHeader from '../Headers/PrimaryHeader/index';
import thankyoupageData from '../../mock/thankyoupageData.json';
import Parser from 'html-react-parser';
import { Footer } from '../Footer';
import CustomButton from '../UI/CustomButton';
import React, { useEffect, useState } from 'react';
import { ReactComponent as ThankyouImage } from '../../assets/svg/thankyou_image.svg';
import { getParsedData } from '../../utils/parserUtil';

type Props = {};

const ThankYou = (props: Props) => {
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
      // document.getElementById("navText").value =
      //   jsonData["data"]["contentDetails"]["submitBTnDetails"]["forwardInputId"]
      // // @ts-ignore
      // document.getElementById("forwardbutton").click();
    }
  };
  return (
    <div>
      <PrimaryHeader />
      <div className="main-container thank-you-page">
        <div className="thankyou-container">
          <ThankyouImage />

          <h3 className="title">
            {getParsedData(jsonData.data?.contentDetails?.headingTxt)}
          </h3>
          <div className="content-area">
            {getParsedData(jsonData.data?.contentDetails?.content)}
          </div>
        </div>

        {
          jsonData?.data?.contentDetails?.contactDetails?.contactHeading.length == 0 && jsonData?.data?.contentDetails?.contactDetails?.contactTxt.length == 0 ?
          null
          :
          <div className="helpdesk">
            {getParsedData(
              jsonData?.data?.contentDetails?.contactDetails?.contactHeading
            )}
            {getParsedData(
              jsonData?.data?.contentDetails?.contactDetails?.contactTxt
            )}

          </div>
        }

        {/* <div className="helpdesk">
            <p>Details of the CVEx team</p>
            <p><strong>LEADERSHIP :</strong> Konstantin Pell, Thomas, Ternai, and Arian Meyer</p><p><strong>For practical questions :</strong> Esther de Zeeuw</p>
        </div> */}

      <Footer>
        {
          (jsonData?.data?.contentDetails?.resultBTnDetails?.resultBTnTxt)?
          <div className="button-container">
            <div className="show-btn">
              <CustomButton className="submitButton" onClick={handleClick}>
                {getParsedData(
                  jsonData?.data?.contentDetails?.resultBTnDetails?.resultBTnTxt,
                )}
              </CustomButton>
            </div>
          </div> :null
        }
        
      </Footer>
      </div>

     
    </div>
  );
};
export default ThankYou;
