import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "./Slider.scss";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
type SliderProps = {
    // disabled: Boolean;
};

const CustomSlider = (props: SliderProps) => {

    const [disableSlider, setDisableSlider] = useState<boolean>(false);
    const [noneSelectedVal, setNoneSelectedVal] = useState<boolean>(false);
    const [jsonData, setJSONData] = useState<any>("");

    // useEffect(() => {
    //     setNoneSelectedVal(false)
    // }, [noneSelectedVal]);


    useEffect(() => {
        setJSONData(
            // @ts-ignore
            JSON.parse(document.getElementById("jsonData")?.innerText)
        );


    }, []);
    const ratingData: any = jsonData?.data?.rightPanel?.questionsData[0]?.subHeadingText[0]?.subTitle[0]?.sliderOptions?.ratingDetails?.ratingOpt;
    const defaultValueSelected: any = jsonData?.data?.rightPanel?.questionsData[0]?.subHeadingText[0]?.subTitle[0]?.sliderOptions?.ratingDetails?.defaultinputIdOpt;
    const [selectedValue, setselectedValue] = useState<Number>(defaultValueSelected);


    function valuetext(value: number) {
        return `${value}`;
    }

    function valueLabelFormat(value: number) {
        return ratingData?.findIndex((ratingData: any) => ratingData.value === value) + 1;
    }
    // ratingData.forEach((el: any, index: any) => {
    //     // console.log(el)
    // })

    const handleChange = (event: any, inputId: any) => {
        if (event.target.checked === true) {
            setDisableSlider(true);
        }
        setNoneSelectedVal(event.target.checked)
        document.getElementById(inputId)?.click();
    };
    const onSliderChange = (event: any, b: any) => {
        if (disableSlider == true) {
            setDisableSlider(false)
        }
        setselectedValue(event.target.value)
        console.log(selectedValue)
    };
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
                                onChange={onSliderChange}
                                className={disableSlider ? "knob-disabled" : ""}
                            />
                        </Box>
                    </div>
                    <FormControl className='sliderRightPanel' sx={{ width: 300 }}>
                        <RadioGroup
                            row
                            name="position"
                        >
                            <FormControlLabel
                                value="bottom"
                                control={<Radio />}
                                label={jsonData?.data?.rightPanel?.questionsData[0]?.subHeadingText[0]?.subTitle[0]?.sliderOptions?.ratingDetails?.NAOptionTxt}
                                labelPlacement="bottom"
                                onChange={(event: any) => handleChange(event, jsonData?.data?.rightPanel?.questionsData[0]?.subHeadingText[0]?.subTitle[0]?.sliderOptions?.ratingDetails?.NAOptionInputId)}
                                checked={disableSlider ? true : false}
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </>
    );
}
export default CustomSlider;