import React, { useEffect, useState } from 'react';
import startData from '../../mock/startPageData.json';
import { isPasswordValid } from '../../utils';
import SecondaryHeader from '../Headers/SecondaryHeader/index';
import { Inputbox } from '../UI/Input';
import CustomButton from '../UI/CustomButton';
import { Footer } from '../Footer';
import "./ImpactCalculator.scss";
import { getParsedData } from '../../utils/parserUtil';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl, Grid, MenuItem, Select, Tooltip } from '@mui/material';

const PanelPage = (props: any) => {

  const [jsonData, setJSONData] = useState<any>("");

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

  console.log(jsonData)
  return (
    <div className="impact-calculator-container">
      <SecondaryHeader />
      <div className="main-container">
        <div className="content-area main-container">
          <Box className= "content-container">
            <div className="single-dropdown-section">
                <div className="single-dropdown-section--header">
                    <p className="header-text">Essential input (mandatory):</p>
                </div>
                <div className="single-dropdown-section--body">
                    <div className="title-container">
                        <p>Company specific data</p>
                    </div>
                    <div className="dropdown-container">
                        <Grid
                        item
                        xs={4}
                        md={4}
                        className="inputCont"
                        sx={{  mr: 5  }}
                        >
                        <Grid container sx={{ alignItems: 'center' }}>
                            <Grid item xs={12} className="single-dropdown-title">
                            <p className="gen-info">Customers in the market</p>
                            </Grid>
                            <Grid
                            item
                            xs={12}
                            //   sx={{ display: 'flex', alignItems: 'center' }}
                            >
                            <FormControl fullWidth>
                                <Select
                                sx={{ p: 0, borderRadius: 0, mb: 1 }}
                                // style={{"padding":0}}
                                className="inputField cutom-input-field"
                                defaultValue="none"
                                value={"Hello"}
                                //   onChange={}
                                >
                                <MenuItem
                                    disabled
                                    value="none"
                                    className="selectItem"
                                >
                                    <>Select Option</>
                                </MenuItem>
                                {/* {genQues?.options?.map((elemnt: any) => (
                                    <MenuItem
                                    value={elemnt?.ddName}
                                    className="selectItem"
                                    >
                                    {elemnt?.ddName}
                                    </MenuItem>
                                ))} */}
                                    <MenuItem>
                                        Option 1
                                    </MenuItem>
                                    <MenuItem>
                                        Option 2
                                    </MenuItem>
                                    <MenuItem>
                                        Option 3
                                    </MenuItem>
                                    <MenuItem>
                                        Option 4
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                        </Grid>
                        </Grid>

                        <Grid
                        item
                        xs={4}
                        md={4}
                        className="inputCont"
                        sx={{  mr: 5  }}
                        >
                        <Grid container sx={{ alignItems: 'center' }}>
                            <Grid item xs={12} className="single-dropdown-title">
                            <p className="gen-info">Customers in the market</p>
                            </Grid>
                            <Grid
                            item
                            xs={12}
                            //   sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                {/* <div className="demo"></div> */}
                            <FormControl fullWidth>
                                <Select
                                sx={{ p: 0, borderRadius: 0, mb: 1 }}
                                className="inputField cutom-input-field"
                                defaultValue="none"
                                value={"Hello"}
                                //   onChange={}
                                >
                                <MenuItem
                                    disabled
                                    value="none"
                                    className="selectItem"
                                >
                                    <>"Hello"</>
                                </MenuItem>
                                {/* {genQues?.options?.map((elemnt: any) => (
                                    <MenuItem
                                    value={elemnt?.ddName}
                                    className="selectItem"
                                    >
                                    {elemnt?.ddName}
                                    </MenuItem>
                                ))} */}
                                    <MenuItem>
                                        Option 1
                                    </MenuItem>
                                    <MenuItem>
                                        Option 2
                                    </MenuItem>
                                    <MenuItem>
                                        Option 3
                                    </MenuItem>
                                    <MenuItem>
                                        Option 4
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                        </Grid>
                        </Grid>

                        <Grid
                        item
                        xs={4}
                        md={4}
                        className="inputCont"
                        sx={{  mr: 5  }}
                        >
                        <Grid container sx={{ alignItems: 'center' }}>
                            <Grid item xs={12} className="single-dropdown-title">
                            <p className="gen-info">Customers in the market</p>
                            </Grid>
                            <Grid
                            item
                            xs={12}
                            //   sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                {/* <div className="demo"></div> */}
                            <FormControl fullWidth>
                                <Select
                                sx={{ p: 0, borderRadius: 0, mb: 1 }}
                                className="inputField cutom-input-field"
                                defaultValue="none"
                                value={"Hello"}
                                //   onChange={}
                                >
                                <MenuItem
                                    disabled
                                    value="none"
                                    className="selectItem"
                                >
                                    <>"Hello"</>
                                </MenuItem>
                                {/* {genQues?.options?.map((elemnt: any) => (
                                    <MenuItem
                                    value={elemnt?.ddName}
                                    className="selectItem"
                                    >
                                    {elemnt?.ddName}
                                    </MenuItem>
                                ))} */}
                                    <MenuItem>
                                        Option 1
                                    </MenuItem>
                                    <MenuItem>
                                        Option 2
                                    </MenuItem>
                                    <MenuItem>
                                        Option 3
                                    </MenuItem>
                                    <MenuItem>
                                        Option 4
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                        </Grid>
                        </Grid>

                        <Grid
                        item
                        xs={4}
                        md={4}
                        className="inputCont"
                        sx={{  mr: 5  }}
                        >
                        <Grid container sx={{ alignItems: 'center' }}>
                            <Grid item xs={12} className="single-dropdown-title">
                            <p className="gen-info">Customers in the market</p>
                            </Grid>
                            <Grid
                            item
                            xs={12}
                            //   sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                {/* <div className="demo"></div> */}
                            <FormControl fullWidth>
                                <Select
                                sx={{ p: 0, borderRadius: 0, mb: 1 }}
                                className="inputField cutom-input-field"
                                defaultValue="none"
                                value={"Hello"}
                                //   onChange={}
                                >
                                <MenuItem
                                    disabled
                                    value="none"
                                    className="selectItem"
                                >
                                    <>"Hello"</>
                                </MenuItem>
                                {/* {genQues?.options?.map((elemnt: any) => (
                                    <MenuItem
                                    value={elemnt?.ddName}
                                    className="selectItem"
                                    >
                                    {elemnt?.ddName}
                                    </MenuItem>
                                ))} */}
                                    <MenuItem>
                                        Option 1
                                    </MenuItem>
                                    <MenuItem>
                                        Option 2
                                    </MenuItem>
                                    <MenuItem>
                                        Option 3
                                    </MenuItem>
                                    <MenuItem>
                                        Option 4
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                        </Grid>
                        </Grid>

                        <Grid
                        item
                        xs={4}
                        md={4}
                        className="inputCont"
                        sx={{  mr: 5  }}
                        >
                        <Grid container sx={{ alignItems: 'center' }}>
                            <Grid item xs={12} className="single-dropdown-title">
                            <p className="gen-info">Customers in the market</p>
                            </Grid>
                            <Grid
                            item
                            xs={12}
                            //   sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                {/* <div className="demo"></div> */}
                            <FormControl fullWidth>
                                <Select
                                sx={{ p: 0, borderRadius: 0, mb: 1 }}
                                className="inputField cutom-input-field"
                                defaultValue="none"
                                value={"Hello"}
                                //   onChange={}
                                >
                                <MenuItem
                                    disabled
                                    value="none"
                                    className="selectItem"
                                >
                                    <>"Hello"</>
                                </MenuItem>
                                {/* {genQues?.options?.map((elemnt: any) => (
                                    <MenuItem
                                    value={elemnt?.ddName}
                                    className="selectItem"
                                    >
                                    {elemnt?.ddName}
                                    </MenuItem>
                                ))} */}
                                    <MenuItem>
                                        Option 1
                                    </MenuItem>
                                    <MenuItem>
                                        Option 2
                                    </MenuItem>
                                    <MenuItem>
                                        Option 3
                                    </MenuItem>
                                    <MenuItem>
                                        Option 4
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                        </Grid>
                        </Grid>

                        <Grid
                        item
                        xs={4}
                        md={4}
                        className="inputCont"
                        sx={{  mr: 5  }}
                        >
                        <Grid container sx={{ alignItems: 'center' }}>
                            <Grid item xs={12} className="single-dropdown-title">
                            <p className="gen-info">Customers in the market</p>
                            </Grid>
                            <Grid
                            item
                            xs={12}
                            //   sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                {/* <div className="demo"></div> */}
                            <FormControl fullWidth>
                                <Select
                                sx={{ p: 0, borderRadius: 0, mb: 1 }}
                                className="inputField cutom-input-field"
                                defaultValue="none"
                                value={"Hello"}
                                //   onChange={}
                                >
                                <MenuItem
                                    disabled
                                    value="none"
                                    className="selectItem"
                                >
                                    <>"Hello"</>
                                </MenuItem>
                                {/* {genQues?.options?.map((elemnt: any) => (
                                    <MenuItem
                                    value={elemnt?.ddName}
                                    className="selectItem"
                                    >
                                    {elemnt?.ddName}
                                    </MenuItem>
                                ))} */}
                                    <MenuItem>
                                        Option 1
                                    </MenuItem>
                                    <MenuItem>
                                        Option 2
                                    </MenuItem>
                                    <MenuItem>
                                        Option 3
                                    </MenuItem>
                                    <MenuItem>
                                        Option 4
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                        </Grid>
                        </Grid>

                    </div>
                
                
                
                  
                </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default PanelPage;