import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "./Slider.scss";
import Radio from '@mui/material/Radio';
import questionData from "../../../mock/questionData.json";
import { Typography } from '@mui/material';

type SliderProps = {
    // disabled: Boolean;
};

const CustomSlider = (props: SliderProps) => {

    const jsonData: any = questionData;
    const ratingData: any = jsonData.data.rightPanel.questionsData[0].subHeadingText[0].subTitle[0].sliderOptions.ratingDetails.ratingOpt;
    const defaultValueSelected: any = jsonData.data.rightPanel.questionsData[0].subHeadingText[0].subTitle[0].sliderOptions.ratingDetails.defaultinputIdOpt;

    function valuetext(value: number) {
        return `${value}`;
    }

    function valueLabelFormat(value: number) {
        return ratingData.findIndex((ratingData: any) => ratingData.value === value) + 1;
    }
    ratingData.forEach((el: any, index: any) => {
        // console.log(el)
    })

    // const onSliderChange = (e: any, b: any) => {

    // };
    return (
        <>
            <div className="slider-container">
                <div className="slider-container-inner">
                    <div className='sliderOuter'>
                        <Box className="slider" >
                            <Slider
                                aria-label="Restricted values"
                                defaultValue={defaultValueSelected}
                                valueLabelFormat={valueLabelFormat}
                                getAriaValueText={valuetext}
                                valueLabelDisplay="off"
                                marks={ratingData}
                                min={1}
                                max={5}
                                track={false}
                            // onChange={onSliderChange}
                            // disabled={true ? props.disabled : false}
                            />
                        </Box>
                    </div>
                    <Box className='sliderRightPanel' sx={{ width: 300 }}>
                        <Radio
                            value="a"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <Typography>
                            Don't Know
                    </Typography>
                    </Box>
                </div>
            </div>
        </>
    );
}
export default CustomSlider;