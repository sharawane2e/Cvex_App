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
import store from '../../../redux/store';
import clsx from "clsx";
import { isDisabled } from '@testing-library/user-event/dist/utils';
import { updateCapabilityDetails } from '../../../redux/actions/RightPanelActions';
import { updateLeftPanelCategories } from '../../../redux/actions/LeftPanelActions';
import { useSelector } from 'react-redux';

type SliderProps = {
  capabilityDetailIndex: number,
  subTitleIndex: number
};

const CustomSlider = (props: SliderProps) => {
  // const [disableSlider, setDisableSlider] = useState<boolean>(false);
  // const [noneSelectedVal, setNoneSelectedVal] = useState<boolean>(false);

  const { rightPanel, leftPanel } = useSelector((state: any) => state);
  const { dispatch } = store;

  const isDisabled = () => {
    let disableSlider = false;

    if (sliderOptions.selectedInputId === "") {
      disableSlider = true;
    }

    if (sliderOptions.selectedInputId === sliderOptions.NAOptionInputId) {
      disableSlider = true;
    }

    return disableSlider
  }

  const updateSliderState = (selectedInputId: any) => {
    const updatedCapabilityDetails = JSON.parse(JSON.stringify(rightPanel.questionsData.capabilityDetails));
    updatedCapabilityDetails[props.capabilityDetailIndex].subTitleDetails[props.subTitleIndex].sliderOptions.selectedInputId = selectedInputId;
    dispatch(updateCapabilityDetails(updatedCapabilityDetails))
    // updateTotalAnswered();
  }

  const sliderDefaultValue = () => {

    let defaultSliderValue = parseInt(sliderOptions.defaultinputIdOpt);
    if (sliderOptions.selectedInputId !== "" && sliderOptions.selectedInputId !== sliderOptions.NAOptionInputId) {
      defaultSliderValue = sliderOptions.selectedInputId.split("_")[2]
    }
    return defaultSliderValue;
  }


  // const updateTotalAnswered = () => {
  //   let updatedTotalAnswered = 0;

  //   rightPanel?.questionsData?.capabilityDetails?.forEach((capabilityDetail: any) => {
  //     capabilityDetail.subTitleDetails.forEach((subTitleDetail: any) => {
  //       if (subTitleDetail.sliderOptions.selectedInputId != "") {
  //         updatedTotalAnswered++
  //       }
  //     })

  //     const categories = JSON.parse(JSON.stringify(leftPanel.categories));

  //     categories.forEach((category: any) => {
  //       if (category.selectedId === leftPanel.currentSelectedId) {
  //         category.totalAnswered =  updatedTotalAnswered;
  //       }
  //     })

  //     dispatch(updateLeftPanelCategories(categories))

  //   })
  // }

  // let defaultValueSelected: any = props?.defaultValue;
  const sliderOptions = rightPanel?.questionsData.capabilityDetails[props.capabilityDetailIndex].subTitleDetails[props.subTitleIndex].sliderOptions

  // const [selectedValue, setselectedValue] =
  //   useState<Number>(defaultValueSelected);

  // const ratingData: any = sliderOptions.ratingOpt;

  // const selectedInputId = props?.selectedInputId;
  // const NAselectedInputId = props?.NAoptionId;
  // const backpunchsliderId = selectedInputId?.split('_')[2];
  // const backpunchsliderIdNA = NAselectedInputId?.split('_')[2];

  const backpunchHandle = () => {
    // if (selectedInputId !== '') {
    //   // setDisableSlider(false);
    //   if (backpunchsliderId == backpunchsliderIdNA) {
    //   }
    // } else {
    //   // setDisableSlider(true);
    //   setNoneSelectedVal(false);
    // }
  };
  // useEffect(() => {
  //   if (selectedInputId == '') {
  //     // setDisableSlider(true);
  //     setNoneSelectedVal(false);
  //   } else {
  //     backpunchHandle();
  //     optionNACheck();
  //   }
  // }, []);

  function valuetext(value: number) {
    return `${value}`;
  }

  function valueLabelFormat(value: number) {
    return (
      sliderOptions.ratingOpt?.findIndex((ratingData: any) => ratingData.value === value) + 1
    );
  }

  const optionNACheck = () => {
    // if (selectedInputId !== '' && NAselectedInputId === selectedInputId) {
    //   setNoneSelectedVal(true);
    //   // setDisableSlider(true);
    //   return true;
    // } else {
    //   return false;
    // }
  };
  const onSliderChange = (value: any, inputId: any) => {
    // if (disableSlider == true) {
    //   // setDisableSlider(false);
    // }
  };

  const sliderChecked = (event: any, inputId: any) => {
    // let sliderId: any;
    // debugger
    // inputId.map((el: any, index: any) => {
    //   const inputIdData = el?.inputId.split('_')[2];
    //   if (inputIdData == event.target.value) {
    //     const currentID: any = el?.inputId;
    //     sliderId = currentID;
    //     return currentID;
    //   }
    // });
    // const curentsliderId = sliderId.split('_')[2];
    // // let element: any;
    // if (curentsliderId == event.target.value) {
    //   //element = document.getElementById(`${sliderId}`);
    //   //element.checked = true;
    //   // @ts-ignore
    //   document.getElementById(sliderId).click();
    // }
    // handleSliderValue(event.target.value);
    // setNoneSelectedVal(false);
  };

  const handleSliderValue = (value: any) => {
    // if (disableSlider == true) {
    //   defaultValueSelected = value;
    // }
  };

  return (
    <>
      <div className="slider-container" id={"" + props.capabilityDetailIndex}>
        <div className="slider-container-inner">
          <div className="sliderOuter">
            <Box className="slider">
              <Slider
                // key={`slider-${defaultValueSelected}`}
                aria-label="Restricted values"
                value={sliderDefaultValue()}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                valueLabelDisplay="off"
                marks={sliderOptions.ratingOpt}
                min={1}
                max={5}
                track={false}
                onChange={(event: any, value: any) => {
                  let selectedInputId = "";
                  sliderOptions.ratingOpt.forEach((ratingOp: any, ratingIndex: number) => {
                    if (ratingOp.value === value) {
                      selectedInputId = ratingOp.inputId
                    }
                  })

                  //@ts-ignore
                  document.getElementById(selectedInputId)?.click();

                  updateSliderState(selectedInputId);
                }}
                className={clsx({ 'knob-disabled': isDisabled() })}
              />
            </Box>
          </div>
          <FormControl className="sliderRightPanel" sx={{ width: 300 }}>
            <RadioGroup row name="position" className="dont-btn">
              <FormControlLabel
                value="bottom"
                control={<Radio />}
                label={sliderOptions?.NAOptionTxt}
                labelPlacement="bottom"
                onChange={(event: any) => {

                  updateSliderState(sliderOptions?.NAOptionInputId);
                  //@ts-ignore
                  document.getElementById(sliderOptions?.NAOptionInputId)?.click();
                }

                }
                checked={sliderOptions.selectedInputId === sliderOptions.NAOptionInputId}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </>
  );
};
export default CustomSlider;


