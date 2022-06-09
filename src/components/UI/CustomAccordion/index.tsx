import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './accordion.scss';
import CustomSlider from '../CustomSlider';
import { getParsedData } from '../../../utils/parserUtil';

export default function CustomAccordion() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expandIconState, setExpandIconState] = useState(<AddIcon />);
  const [currClicked, setCurrCliked] = useState('');
  const [jsonData, setJSONData] = useState<any>('');

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerText),
    );
  }, []);

  const quesData = jsonData?.data?.rightPanel?.questionsData[0]?.subHeadingText;

  const handleChange =
    (panel: string, idx: any) =>
      (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
        setCurrCliked(panel);
      };

  return (
    <>
      {quesData?.map((elm: any, index2: any) => {
        let title = elm.subTitle;
        return (
          <>
            <Accordion
              key={index2}
              expanded={expanded === 'panel' + index2}
              className="accordBlock"
              onChange={handleChange('panel' + index2, index2)}
            >
              <AccordionSummary
                className="accordHead"
                expandIcon={
                  expanded == 'panel' + index2 ? <RemoveIcon /> : <AddIcon />
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ m: 0, minHeight: 0 }}
              >
                <Typography
                  sx={{ width: '33%', flexShrink: 0, fontWeight: 700 }}
                >
                  {elm.skillTitle}
                </Typography>
              </AccordionSummary>

              {title.map((elm3: any, index3: any) => {
                return (
                  <>
                    <AccordionDetails key={index3} className="accordDetail">
                      <Typography
                        sx={{ width: '33%', flexShrink: 0, fontWeight: 600 }}
                      >
                        {elm3.subTitleTxt}
                      </Typography>

                      <Typography
                        className="question-text"
                        sx={{ mt: '10px', flexShrink: 0 }}
                      >
                        {elm3.questionText}
                      </Typography>
                      <Typography
                        className="bestpractices-text"
                        sx={{ mt: '10px', flexShrink: 0 }}
                      >
                        {getParsedData(elm3.bestPracticesTxt)}
                      </Typography>
                      {/* {elm3?.sliderOptions?.ratingDetails?.ratingOpt.map(
                        (el: any) => {
                          return <CustomSlider inputId={el?.inputId} />;
                        },
                      )} */}
                      { }
                      <CustomSlider
                        inputId={elm3?.sliderOptions?.ratingDetails?.ratingOpt} sliderIndex={index3} defaultValue={elm3?.sliderOptions?.ratingDetails?.defaultinputIdOpt} NAOptionTxt={elm3?.sliderOptions?.ratingDetails?.NAOptionTxt} NAoptionId={elm3?.sliderOptions?.ratingDetails?.NAOptionInputId}
                      />
                      {/* <div className="slider-container" id={index3}>
                        <div className="slider-container-inner">
                          <div className="sliderOuter">
                            <Box className="slider">
                              <Slider
                                key={`slider-${defaultValueSelected}`}
                                aria-label="Restricted values"
                                defaultValue={elm3?.sliderOptions?.ratingDetails?.defaultinputIdOpt}
                                valueLabelFormat={(value: any) => {
                                  let ratingOptions = elm3?.sliderOptions?.ratingDetails?.ratingOpt;
                                  console.log(
                                    ratingOptions?.findIndex((ratingData: any) => ratingData.value === value) + 1
                                  );
                                  return (
                                    ratingOptions?.findIndex((ratingData: any) => ratingData.value === value) + 1
                                  );
                                }}
                                getAriaValueText={valuetext}
                                valueLabelDisplay="off"
                                marks={ratingData}
                                min={1}
                                max={5}
                                track={false}
                                onChange={(event: any, value: any) =>
                                  onSliderChange(event, sliderChecked(event, elm3?.sliderOptions?.ratingDetails?.ratingOpt.inputId))
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
                                  elm3?.sliderOptions?.ratingDetails?.NAOptionTxt
                                }
                                labelPlacement="bottom"
                                onChange={(event: any) =>
                                  handleChange1(
                                    event,
                                    elm3?.sliderOptions?.ratingDetails?.NAOptionInputId,
                                  )
                                }
                                checked={noneSelectedVal}
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </div> */}
                    </AccordionDetails>
                  </>
                );
              })}
            </Accordion>
          </>
        );
      })}
    </>
  );
}
