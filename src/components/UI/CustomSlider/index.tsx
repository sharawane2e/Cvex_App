import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './Slider.scss';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';
import { setAnswerCount } from '../../../redux/actions/QuestionPageAction';
type SliderProps = {
  inputId: any;
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
  const defaultValueSelected: any =
    jsonData?.data?.rightPanel?.questionsData[0]?.subHeadingText[0]?.subTitle[0]
      ?.sliderOptions?.ratingDetails?.defaultinputIdOpt;

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
    }
    setNoneSelectedVal(event.target.checked);
    document.getElementById(inputId)?.click();
  };

  const onSliderChange = (event: any, inputId: any, el: any) => {
    if (disableSlider == true) {
      setDisableSlider(false);
    }
  };

  const sliderchecked = (event: any, inputId: any) => {
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
      // @ts-ignore
      element = document.getElementById(`${sliderId}`);
      element.checked = true;
    }
    setNoneSelectedVal(false);

    sliderChecked(element.checked === true, inputId);
  };
  //console.log(answerCount);

  const sliderChecked = (elemntCheked: any, inputId: any) => {
    let count = 0;
    if (elemntCheked) {
      // debugger;
      setSelectedAnswer(inputId.length);
      if (inputId.length > 0) {
        setAnswerCountdata(answerCount + 1);
        dispatch(setAnswerCount(answerCount + 1));
        // count++;
        //count = count + count;
      }
    }
  };
  // const dataArr: any = [];
  // dataArr.push(SelectedAnswer);

  // console.log('SelectedAnswer', dataArr);

  const sliderClick = (inputId: any) => {
    const curentID = sliderchecked('', inputId);
    console.log(curentID);
  };
  // console.log(answerCount);

  return (
    <>
      <div className="slider-container">
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
                  onSliderChange(
                    event,
                    props?.inputId,
                    sliderchecked(event, props?.inputId),
                  )
                }
                onClick={() => sliderClick(props?.inputId)}
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
                  jsonData?.data?.rightPanel?.questionsData[0]
                    ?.subHeadingText[0]?.subTitle[0]?.sliderOptions
                    ?.ratingDetails?.NAOptionTxt
                }
                labelPlacement="bottom"
                onChange={(event: any) =>
                  handleChange(
                    event,
                    jsonData?.data?.rightPanel?.questionsData[0]
                      ?.subHeadingText[0]?.subTitle[0]?.sliderOptions
                      ?.ratingDetails?.NAOptionInputId,
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
