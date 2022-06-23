import React, { useEffect, useState } from 'react';
import PrimaryHeader from '../Headers/PrimaryHeader/index';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const PanelPage = (props: any) => {
  const [jsonData, setJSONData] = useState<any>('');

  useEffect(() => {
    // @ts-ignore
    // document.getElementById('forwardbutton').disabled = true;
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
  }, []);

  const panelData = jsonData?.data?.panelDetails;

  const handleClick = () => {
    if (jsonData !== '') {
      // @ts-ignore
      // document.getElementById('navText').value =
      //   jsonData['data']['contentDetails']['submitBTnDetails'][
      //     'forwardInputId'
      //   ];
      // // @ts-ignore
      // document.getElementById('forwardbutton').disabled = false;
      // // @ts-ignore
      // document.getElementById('forwardbutton').click();
    }
  };

  console.log(jsonData);
  return (
    <div className="login-container">
      <PrimaryHeader />
      <div className="main-container">
        <div className="content-area main-container">
          <Box className="btn-container">
            {panelData?.map((elm: any, idx: number) => {
              return (
                <>
                  <Button
                    variant="contained"
                    key={idx}
                    className="custom-nav-btn custom-nav-btn-grey"
                  >
                    {elm.text}
                  </Button>
                </>
              );
            })}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default PanelPage;
