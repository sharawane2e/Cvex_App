import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './Slider.scss';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';
import { setAnswerCount } from '../../../redux/actions/ProgressBarAction';
import { FALSE } from 'node-sass';

type SliderProps = {
    inputId: any,
    defaultValue: any,
    sliderIndex: any,
    NAOptionTxt: any,
    NAoptionId: any,
    selectedInputId: any;
};

const CustomSlider = (props: SliderProps) => {
    const [disableSlider, setDisableSlider] = useState<boolean>(false);
    const [noneSelectedVal, setNoneSelectedVal] = useState<boolean>(false);
    const [jsonData, setJSONData] = useState<any>('');
    const [selectedAnswer, setSelectedAnswer] = useState<any>([]);
    const [answerCount, setAnswerCountdata] = useState<any>(0);
    const dispatch = useDispatch();

    let defaultValueSelected: any = props?.defaultValue;

    const [selectedValue, setselectedValue] = useState<Number>(defaultValueSelected);

    const ratingData: any =
        jsonData?.data?.rightPanel?.questionsData[0]?.subHeadingText[0]?.subTitle[0]
            ?.sliderOptions?.ratingDetails?.ratingOpt;

    const selectedInputId = props?.selectedInputId;
    const NAselectedInputId = props?.NAoptionId;
    const backpunchsliderId = selectedInputId?.split('_')[2];
    const backpunchsliderIdNA = NAselectedInputId?.split('_')[2];

    const backpunchHandle = () => {
        if (selectedInputId !== "") {
            setDisableSlider(false)
            if (backpunchsliderId == backpunchsliderIdNA) {
            }
        }
        else {
            setDisableSlider(true);
            setNoneSelectedVal(false);
        }
    }
    useEffect(() => {
        if (selectedInputId == "") {
            setDisableSlider(true);
            setNoneSelectedVal(false);
        }
        else {
            backpunchHandle()
            optionNACheck()
        }
        setJSONData(
            // @ts-ignore
            JSON.parse(document.getElementById('jsonData')?.innerText),
        );
    }, []);

    function valuetext(value: number) {
        return `${value}`;
    }

    function valueLabelFormat(value: number) {
        return (
            ratingData?.findIndex((ratingData: any) => ratingData.value === value) + 1
        );
    }

    const handleChange = (event: any, inputId: any) => {
        if (event.target.checked === true) {
            setDisableSlider(true);
            if (selectedInputId !== "" && NAselectedInputId === selectedInputId) {
                setNoneSelectedVal(true);
            }
        }
        setNoneSelectedVal(event.target.checked);
        document.getElementById(inputId)?.click();
        handleSliderValue("")

    };
    const optionNACheck = () => {
        if (selectedInputId !== "" && NAselectedInputId === selectedInputId) {
            setNoneSelectedVal(true);
            setDisableSlider(true);
            return true
        }
        else {
            return false
        }
    };
    const onSliderChange = (value: any, inputId: any) => {
        if (disableSlider == true) {
            setDisableSlider(false);
        }
    };

    const sliderChecked = (event: any, inputId: any) => {
        let sliderId: any;
        inputId.map((el: any, index: any) => {
            const inputIdData = el?.inputId.split('_')[2];
            if (inputIdData == event.target.value) {
                const currentID: any = el?.inputId;
                sliderId = currentID;
                return currentID;
            }
        });
        const curentsliderId = sliderId.split('_')[2];
        let element: any;

        if (curentsliderId == event.target.value) {
            element = document.getElementById(`${sliderId}`);
            element.checked = true;
            // @ts-ignore
            document.getElementById(sliderId).click();
        }
        handleSliderValue(event.target.value)
        setNoneSelectedVal(false);
    };

    const handleSliderValue = (value: any) => {
        if (disableSlider == true) {
            defaultValueSelected = value;
        }
    }


    return (
        <>
            <div className="slider-container" id={props.sliderIndex}>
                <div className="slider-container-inner">
                    <div className="sliderOuter">
                        <Box className="slider">
                            <Slider
                                key={`slider-${defaultValueSelected}`}
                                aria-label="Restricted values"
                                defaultValue={selectedInputId !== "" ? backpunchsliderId == backpunchsliderIdNA ? defaultValueSelected : backpunchsliderId : defaultValueSelected}
                                valueLabelFormat={valueLabelFormat}
                                getAriaValueText={valuetext}
                                valueLabelDisplay="off"
                                marks={ratingData}
                                min={1}
                                max={5}
                                track={false}
                                onChange={(event: any, value: any) =>
                                    onSliderChange(event, sliderChecked(event, props?.inputId))
                                }
                                className={disableSlider ? 'knob-disabled' : ''}
                            />
                        </Box>
                    </div>
                    <FormControl className="sliderRightPanel" sx={{ width: 300 }}>
                        <RadioGroup row name="position">
                            <FormControlLabel
                                value="bottom"
                                control={<Radio />}
                                label={
                                    props?.NAOptionTxt
                                }
                                labelPlacement="bottom"
                                onChange={(event: any) =>
                                    handleChange(
                                        event,
                                        props?.NAoptionId
                                    )
                                }
                                checked={noneSelectedVal}
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </>
    );
};
export default CustomSlider;
