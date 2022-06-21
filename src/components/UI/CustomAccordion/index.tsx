import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import './accordion.scss';
import CustomSlider from '../CustomSlider';
import { getParsedData } from '../../../utils/parserUtil';
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as InfoIcon } from '../../../assets/svg/info-icon.svg';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import store from '../../../redux/store';
import { updateCapabilityDetails } from '../../../redux/actions/RightPanelActions';
import { useSelector } from 'react-redux';

type AccordionProps = {};

export default function CustomAccordion(props: AccordionProps) {
  const { rightPanel } = useSelector((state: any) => state);
  const { dispatch } = store;
  const [expanded, setExpanded] = useState<string | false>(false);
  const [jsonData, setJSONData] = useState<any>('');

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerText),
    );
  }, []);

  const quesData = jsonData?.data?.rightPanel?.questionsData?.capabilityDetails;

  const handleAccordionChange = (
    capabilityDetail: any,
    capabilityDetailIndex: number,
  ) => {
    const updatedCapabilityDetails = JSON.parse(
      JSON.stringify(rightPanel.questionsData.capabilityDetails),
    );
    console.log(updatedCapabilityDetails);
    updatedCapabilityDetails[capabilityDetailIndex].groupAll =
      !updatedCapabilityDetails[capabilityDetailIndex].groupAll;
    //@ts-ignore
    // document.getElementById(
    //   updatedCapabilityDetails[capabilityDetailIndex].groupToggleId,
    // ).value = updatedCapabilityDetails[capabilityDetailIndex].groupAll;
    dispatch(updateCapabilityDetails(updatedCapabilityDetails));
  };

  const handleSliderChange = (
    value: string,
    index: number,
    matchSubHeadingIndex: number,
  ) => {
    // const selectedInput = quesData['subHeadingIndex']?.subTitle[index]?.sliderOptions?.ratingDetails?.SelectedInputId;

    const updatedSubHeadingText = JSON.parse(
      JSON.stringify([
        ...jsonData.data.rightPanel.questionsData?.capabilityDetails,
      ]),
    );

    updatedSubHeadingText?.map(function (
      subHeading: any,
      subHeadingIndex: number,
    ) {
      if (subHeadingIndex == matchSubHeadingIndex) {
        jsonData.data.rightPanel.questionsData?.capabilityDetails[
          subHeadingIndex
        ].subTitle.forEach(function (subTitleEl: any, subTitleIndex: number) {
          if (subTitleIndex == index) {
            updatedSubHeadingText[subHeadingIndex].subTitle[
              subTitleIndex
            ].sliderOptions.selectedInputId = value;
          }
        });
      }
    });

    const updatedSubheading = updatedSubHeadingText[matchSubHeadingIndex];
    setJSONData({
      ...jsonData,
      data: {
        ...jsonData?.data,
        rightPanel: {
          ...jsonData?.data?.rightPanel,
          questionsData: [
            {
              ...jsonData?.data.rightPanel.questionsData,
              subHeadingText: [...updatedSubHeadingText],
            },
          ],
        },
      },
    });
  };

  const handleTextArea = (currentText: string, textAreaId: string) => {
    // let textAreaElem = document.getElementById(textAreaId)
    // if (text != "") {
    // @ts-ignore
    document.getElementById(textAreaId).value = currentText;
    // }
  };

  const capabilityDetails = rightPanel?.questionsData?.capabilityDetails;
  // console.log(capabilityDetails)

  return (
    <>
      {capabilityDetails?.map(
        (capabilityDetail: any, capabilityDetailIndex: any) => {
          const subTitleDetails = capabilityDetail.subTitleDetails;
          return (
            <>
              <Accordion
                // key={capabilityDetailIndex}
                expanded={capabilityDetail.groupAll}
                className="accordBlock"
                onChange={() =>
                  handleAccordionChange(capabilityDetail, capabilityDetailIndex)
                }
              >
                <AccordionSummary
                  className="accordHead"
                  expandIcon={
                    capabilityDetail.groupAll === true ? (
                      <RemoveIcon />
                    ) : (
                      <AddIcon />
                    )
                  }
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{ m: 0, minHeight: 0 }}
                >
                  <Typography
                    sx={{ width: '33%', flexShrink: 0, fontWeight: 700 }}
                  >
                    {capabilityDetail.skillTitle}
                  </Typography>
                </AccordionSummary>
                {subTitleDetails?.map(
                  (subTitleDetail: any, subTitleIndex: any) => {
                    return (
                      <>
                        <AccordionDetails
                          key={subTitleIndex}
                          className="accordDetail"
                        >
                          <Typography
                            sx={{
                              width: '33%',
                              flexShrink: 0,
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'Center',
                            }}
                          >
                            {subTitleDetail.subTitleTxt}
                            <Tooltip
                              style={{ marginLeft: 5 }}
                              title={subTitleDetail?.tooltipText}
                              arrow
                            >
                              <InfoIcon className="info-icon" />
                            </Tooltip>
                          </Typography>
                          <Typography
                            className="question-text"
                            sx={{ mt: '10px', flexShrink: 0 }}
                          >
                            {subTitleDetail.questionText}
                          </Typography>
                          <Typography
                            className="bestpractices-text"
                            sx={{ mt: '10px', flexShrink: 0 }}
                          >
                            {getParsedData(subTitleDetail.bestPracticesTxt)}
                          </Typography>
                          <CustomSlider
                            capabilityDetailIndex={capabilityDetailIndex}
                            subTitleIndex={subTitleIndex}
                          />
                          <TextareaAutosize
                            aria-label="minimum height"
                            className="custom-text-area"
                            minRows={2}
                            defaultValue={subTitleDetail?.observationTxt}
                            onChange={(event: any) =>
                              handleTextArea(
                                event.target.value,
                                subTitleDetail?.observationId,
                              )
                            }
                            placeholder={subTitleDetail?.obsplaceholder}
                            style={{
                              width: '100%',
                              marginTop: 20,
                              padding: 5,
                              resize: 'none',
                            }}
                          />
                        </AccordionDetails>
                      </>
                    );
                  },
                )}
              </Accordion>
            </>
          );
        },
      )}
    </>
  );
}
