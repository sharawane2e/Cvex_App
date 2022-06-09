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

type SliderProps = {
    inputId: any,
    defaultValue: any,
    sliderIndex: any,
    NAOptionTxt: any,
    NAoptionId: any;
};

const CustomSlider = (props: SliderProps) => {
    const [disableSlider, setDisableSlider] = useState<boolean>(false);
    const [noneSelectedVal, setNoneSelectedVal] = useState<boolean>(true);
    const [jsonData, setJSONData] = useState<any>('');
    const [SelectedAnswer, setSelectedAnswer] = useState<any>([]);
    const [answerCount, setAnswerCountdata] = useState<any>(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setDisableSlider(true);
        setNoneSelectedVal(false);
        setJSONData(
            // @ts-ignore
            JSON.parse(document.getElementById('jsonData')?.innerText),
        );
    }, []);

    const ratingData: any =
        jsonData?.data?.rightPanel?.questionsData[0]?.subHeadingText[0]?.subTitle[0]
            ?.sliderOptions?.ratingDetails?.ratingOpt;
    let defaultValueSelected: any = props?.defaultValue;
    const selectedInputId = jsonData?.data?.rightPanel?.questionsData[0]?.subHeadingText[0]?.subTitle[0]
        ?.sliderOptions?.ratingDetails?.SelectedInputId;
    const [selectedValue, setselectedValue] =
        useState<Number>(defaultValueSelected);

    function valuetext(value: number) {
        return `${value}`;
    }

    function valueLabelFormat(value: number) {
        return (
            ratingData?.findIndex((ratingData: any) => ratingData.value === value) + 1
        );
    }

    console.log(defaultValueSelected)

    const handleChange = (event: any, inputId: any) => {
        if (event.target.checked === true) {
            setDisableSlider(true);
        }
        setNoneSelectedVal(event.target.checked);
        document.getElementById(inputId)?.click();
        handleSliderValue("")
        // @ts-ignore
        // document.getElementById(props.NAoptionId).value =
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
            document.getElementById(`${selectedInputId}`).value = sliderId
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
                                defaultValue={defaultValueSelected}
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
