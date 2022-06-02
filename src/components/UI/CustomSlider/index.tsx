import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "./Slider.scss"
import questionData from "../../../mock/questionData.json";

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
    return (
        <div className="slider-container">
            <Box className="slider" sx={{ width: 600 }}>
                <Slider
                    aria-label="Restricted values"
                    defaultValue={defaultValueSelected}
                    valueLabelFormat={valueLabelFormat}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="on"
                    marks={ratingData}
                    min={1}
                    max={5}
                    track={false}
                // disabled={true ? props.disabled : false}
                />
            </Box>
        </div>
    );
}
export default CustomSlider;