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
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as InfoIcon } from '../../../assets/svg/info-icon.svg';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';

type AccordionProps = {

};

export default function CustomAccordion(props: AccordionProps) {
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

  const handleAccordionChange =
    (panel: string, idx: any) =>
      (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
        setCurrCliked(panel);
      };

  const handleSliderChange = (value: string, index: number, matchSubHeadingIndex: number) => {
    // const selectedInput = quesData['subHeadingIndex']?.subTitle[index]?.sliderOptions?.ratingDetails?.SelectedInputId;

    const updatedSubHeadingText = JSON.parse(JSON.stringify([...jsonData.data.rightPanel.questionsData[0]?.subHeadingText]));

    updatedSubHeadingText.map(function (subHeading: any, subHeadingIndex: number) {

      if (subHeadingIndex == matchSubHeadingIndex) {
        jsonData.data.rightPanel.questionsData[0]?.subHeadingText[subHeadingIndex].subTitle.forEach(function (subTitleEl: any, subTitleIndex: number) {
          if (subTitleIndex == index) {
            updatedSubHeadingText[subHeadingIndex].subTitle[subTitleIndex].sliderOptions.ratingDetails.SelectedInputId = value
          }
        })
      }

    })
    const updatedSubheading = updatedSubHeadingText[matchSubHeadingIndex];
    // //console.log(updatedSubHeadingText)
    // setJSONData({ ...jsonData, data: { ...jsonData.data, rightPanel: { ...jsonData.data.rightPanel, questionsData: [{ ...jsonData.data.rightPanel.questionsData[0], subHeadingText: [...updatedSubHeadingText] }] } } })
    // setJSONData({ ...jsonData, data: { ...jsonData.data, rightPanel: { ...jsonData.data.rightPanel, questionsData: [{ ...jsonData.data.rightPanel.questionsData[0], subHeadingText: [{ ...jsonData.data.rightPanel.questionsData[0].updatedSubHeadingText }] }] } } })
    // Object.assign(jsonData, source)
    // console.log(updatedSubHeadingText)
    // console.log({ ...jsonData, data: { ...jsonData.data, rightPanel: { ...jsonData.data.rightPanel, questionsData: [{ ...jsonData.data.rightPanel.questionsData[0], subHeadingText: [{ ...jsonData.data.rightPanel.questionsData[0].updatedSubheading }] }] } } })
    setJSONData({
      "pageCode": {
        "page": 4
      },
      "data": {
        "headerData": {
          "title": "Customer Value Execution",
          "logo": "https://e2eresearch.com/swteam/McKinsey/CVEx_Epr/asmt/mck-logo.svg",
          "banner": "https://e2eresearch.com/swteam/McKinsey/CVEx_Epr/asmt/intro-banner.png"
        },
        "leftPanel": {
          "leftPanelOpen": "false",
          "currentScrollPos": "0",
          "currentSelectedId": "VS1_1",
          "categories": [{
            "optionName": "Value strategy",
            "selectedId": "VS1_1",
            "totalAnswered": "0",
            "outOfTxt": "/",
            "totalQues": "6"
          }, {
            "optionName": "Customer touchpoint design",
            "selectedId": "CTD1_1",
            "totalAnswered": "0",
            "outOfTxt": "/",
            "totalQues": "4"
          }, {
            "optionName": "Governance & Steering",
            "selectedId": "GS1_1",
            "totalAnswered": "0",
            "outOfTxt": "/",
            "totalQues": "6"
          }, {
            "optionName": "Proposition and Campaigning",
            "selectedId": "PC1_1",
            "totalAnswered": "0",
            "outOfTxt": "/",
            "totalQues": "6"
          }, {
            "optionName": "Contact management",
            "selectedId": "CM1_1",
            "totalAnswered": "0",
            "outOfTxt": "/",
            "totalQues": "6"
          }, {
            "optionName": "Frontline management",
            "selectedId": "FM1_1",
            "totalAnswered": "0",
            "outOfTxt": "/",
            "totalQues": "10"
          }, {
            "optionName": "Sales capabilities",
            "selectedId": "SC1_1",
            "totalAnswered": "0",
            "outOfTxt": "/",
            "totalQues": "8"
          }, {
            "optionName": "Sales enablement",
            "selectedId": "SE1_1",
            "totalAnswered": "0",
            "outOfTxt": "/",
            "totalQues": "6"
          }]
        },
        "rightPanel": {
          "currentScrollPos": "0",
          "questionsData": [{
            "capabilityTxt": "Value strategy",
            "subHeadingText": [{
              "skillTitle": "Sales and service strategy",
              "groupAll": "true",
              "subTitle": [{
                "subTitleTxt": "Channel value strategy (what)",
                "tooltipText": "Channel value strategy, which defines the purpose of the channel (e.g. cost-center or value-center); Role of call center on sales (sales contribution)",
                "questionText": "",
                "bestPracticesTxt": "The contact center is embedded in the strategy as a sales center (instead of a cost center) and is perceived and accepted as such by the rest of the organization. The contact center is acting as a profound sales center and is contributing to the overall sales target of the overall organization strategy.",
                "bestPracticesDisable": "false",
                "sliderOptions": {
                  "ratingDetails": {
                    "defaultinputIdOpt": "3",
                    "SelectedInputId": "",
                    "ratingOpt": [{
                      "inputId": "VS1_1_1",
                      "value": 1,
                      "label": "Strongly disagree"
                    }, {
                      "inputId": "VS1_1_2",
                      "value": 2,
                      "label": "Disagree"
                    }, {
                      "inputId": "VS1_1_3",
                      "value": 3,
                      "label": "Neutral (neither disagree nor agree)"
                    }, {
                      "inputId": "VS1_1_4",
                      "value": 4,
                      "label": "Agree"
                    }, {
                      "inputId": "VS1_1_5",
                      "value": 5,
                      "label": "Strongly agree"
                    }],
                    "NAOptionTxt": "Don't Know",
                    "NAOptionInputId": "VS1_1_6"
                  }
                },
                "observationId": "VS1_1_OPEN",
                "obsplaceholder": "",
                "observationTxt": "",
                "observationDisable": ""
              }, {
                "subTitleTxt": "Operating model (how)",
                "tooltipText": "Operating model of the call center and its footprint (e.g. geographical location, opening times, decision on insourcing/outsourcing, team set up, etc.)",
                "questionText": "",
                "bestPracticesTxt": "The operating model is fit for purpose and aligned with strategic priorities. The operating model enables flexibility of workforce (based on volumes) and optimal cost to serve. Elements such as mix of insourcing/outsourcing, opening times, etc. are strategically chosen. The contact center has embedded a culture of continuous innovation and improvement and feels responsible for innovations. Innovation improvements loop back into the wider organization.",
                "bestPracticesDisable": "false",
                "sliderOptions": {
                  "ratingDetails": {
                    "defaultinputIdOpt": "3",
                    "SelectedInputId": "",
                    "ratingOpt": [{
                      "inputId": "VS1_2_1",
                      "value": 1,
                      "label": "Strongly disagree"
                    }, {
                      "inputId": "VS1_2_2",
                      "value": 2,
                      "label": "Disagree"
                    }, {
                      "inputId": "VS1_2_3",
                      "value": 3,
                      "label": "Neutral (neither disagree nor agree)"
                    }, {
                      "inputId": "VS1_2_4",
                      "value": 4,
                      "label": "Agree"
                    }, {
                      "inputId": "VS1_2_5",
                      "value": 5,
                      "label": "Strongly agree"
                    }],
                    "NAOptionTxt": "Don't Know",
                    "NAOptionInputId": "VS1_2_6"
                  }
                },
                "observationId": "VS1_2_OPEN",
                "obsplaceholder": "",
                "observationTxt": "",
                "observationDisable": ""
              }, {
                "subTitleTxt": "Network strategy (where)",
                "tooltipText": "Network and location strategy which defines what service is provided at which call center location, and which activities each call center is responsible for",
                "questionText": "",
                "bestPracticesTxt": "The contact center has a fit for purpose network and location strategy that matches the customer base. The size, complexity, and cost-to-serve of the customer base in a region justify the contact center(s) in that region/location.",
                "bestPracticesDisable": "false",
                "sliderOptions": {
                  "ratingDetails": {
                    "defaultinputIdOpt": "3",
                    "SelectedInputId": "",
                    "ratingOpt": [{
                      "inputId": "VS1_3_1",
                      "value": 1,
                      "label": "Strongly disagree"
                    }, {
                      "inputId": "VS1_3_2",
                      "value": 2,
                      "label": "Disagree"
                    }, {
                      "inputId": "VS1_3_3",
                      "value": 3,
                      "label": "Neutral (neither disagree nor agree)"
                    }, {
                      "inputId": "VS1_3_4",
                      "value": 4,
                      "label": "Agree"
                    }, {
                      "inputId": "VS1_3_5",
                      "value": 5,
                      "label": "Strongly agree"
                    }],
                    "NAOptionTxt": "Don't Know",
                    "NAOptionInputId": "VS1_3_6"
                  }
                },
                "observationId": "VS1_3_OPEN",
                "obsplaceholder": "",
                "observationTxt": "",
                "observationDisable": ""
              }]
            }, {
              "skillTitle": "Service and customer segment strategy",
              "groupAll": "true",
              "subTitle": [{
                "subTitleTxt": "Customer segmentation and target groups",
                "tooltipText": "Customer segmentation & defined target groups",
                "questionText": "",
                "bestPracticesTxt": "The contact center has good understanding of the different customer segments. A handful of persons is defined (not more than 10) and a clear list of criteria per persona is set up to distinguish the personas and determine to which group each customer belongs. Additionally, 1 or 2 personas are favored and prioritized above other personas. This decision is documented and known in the contact center to keep focus.",
                "bestPracticesDisable": "false",
                "sliderOptions": {
                  "ratingDetails": {
                    "defaultinputIdOpt": "3",
                    "SelectedInputId": "",
                    "ratingOpt": [{
                      "inputId": "VS2_1_1",
                      "value": 1,
                      "label": "Strongly disagree"
                    }, {
                      "inputId": "VS2_1_2",
                      "value": 2,
                      "label": "Disagree"
                    }, {
                      "inputId": "VS2_1_3",
                      "value": 3,
                      "label": "Neutral (neither disagree nor agree)"
                    }, {
                      "inputId": "VS2_1_4",
                      "value": 4,
                      "label": "Agree"
                    }, {
                      "inputId": "VS2_1_5",
                      "value": 5,
                      "label": "Strongly agree"
                    }],
                    "NAOptionTxt": "Don't Know",
                    "NAOptionInputId": "VS2_1_6"
                  }
                },
                "observationId": "VS2_1_OPEN",
                "obsplaceholder": "",
                "observationTxt": "",
                "observationDisable": ""
              }, {
                "subTitleTxt": "Channel mix",
                "tooltipText": "Defining the optimal channel mix",
                "questionText": "",
                "bestPracticesTxt": "The contact center has clearly defined which customer segments are best served via which channel. The preferred channels (~2 channels) are clearly defined and known in the contact center. Customers are steered towards the preferred channel.",
                "bestPracticesDisable": "false",
                "sliderOptions": {
                  "ratingDetails": {
                    "defaultinputIdOpt": "3",
                    "SelectedInputId": "",
                    "ratingOpt": [{
                      "inputId": "VS2_2_1",
                      "value": 1,
                      "label": "Strongly disagree"
                    }, {
                      "inputId": "VS2_2_2",
                      "value": 2,
                      "label": "Disagree"
                    }, {
                      "inputId": "VS2_2_3",
                      "value": 3,
                      "label": "Neutral (neither disagree nor agree)"
                    }, {
                      "inputId": "VS2_2_4",
                      "value": 4,
                      "label": "Agree"
                    }, {
                      "inputId": "VS2_2_5",
                      "value": 5,
                      "label": "Strongly agree"
                    }],
                    "NAOptionTxt": "Don't Know",
                    "NAOptionInputId": "VS2_2_6"
                  }
                },
                "observationId": "VS2_2_OPEN",
                "obsplaceholder": "",
                "observationTxt": "",
                "observationDisable": ""
              }, {
                "subTitleTxt": "Sales and service segment strategy",
                "tooltipText": "Service strategy which defines how each target group and customer segment are being served and what is sold to them ",
                "questionText": "",
                "bestPracticesTxt": "The contact center has clearly defined what the mode of selling is, e.g. regarding discounting and bundling. It is clear who is responsible for reaching the sales targets (Contact Center Manager or Sales Department Manager). Additionally, there is a clear services strategy, which explains how the customer is serviced, including: what are the core services for which customer group, via what channel, service level agreeements, client expectations, etc.",
                "bestPracticesDisable": "false",
                "sliderOptions": {
                  "ratingDetails": {
                    "defaultinputIdOpt": "3",
                    "SelectedInputId": "",
                    "ratingOpt": [{
                      "inputId": "VS2_3_1",
                      "value": 1,
                      "label": "Strongly disagree"
                    }, {
                      "inputId": "VS2_3_2",
                      "value": 2,
                      "label": "Disagree"
                    }, {
                      "inputId": "VS2_3_3",
                      "value": 3,
                      "label": "Neutral (neither disagree nor agree)"
                    }, {
                      "inputId": "VS2_3_4",
                      "value": 4,
                      "label": "Agree"
                    }, {
                      "inputId": "VS2_3_5",
                      "value": 5,
                      "label": "Strongly agree"
                    }],
                    "NAOptionTxt": "Don't Know",
                    "NAOptionInputId": "VS2_3_6"
                  }
                },
                "observationId": "VS2_3_OPEN",
                "obsplaceholder": "",
                "observationTxt": "",
                "observationDisable": ""
              }]
            }]
          }]
        },
        "footerData": {
          "previousBtn": {
            "previousInputId": "A1",
            "previousDisabled": "false",
            "previousBtnTxt": "Previous"
          },
          "forwardBtn": {
            "forwardInputId": "CTD1_1",
            "forwardDisabled": "false",
            "forwardBtntxt": "Forward"
          }
        },
        "progressBarData": {
          "progressBarDetails": {
            "indicators": {
              "1": "Not Started",
              "2": "In progress",
              "3": "Completed"
            },
            "answeredTxt": "Answered",
            "totalAnswered": "1",
            "ofTxt": "of",
            "totalQues": "6",
            "bracketOne": "(",
            "percentage": "%",
            "bracketTwo": ")"
          },
          "saveBtn": {
            "saveBtnTxt": "Save",
            "saveId": "VS1_1"
          },
          "submitBtn": {
            "inputId": "",
            "submitDisabled": "true",
            "submitBtntxt": "Submit"
          }
        }
      }
    })
    // console.log("updated", jsonData)
  }

  const handleTextArea = (currentText: string, textAreaId: string) => {
    // let textAreaElem = document.getElementById(textAreaId)
    // if (text != "") {
    // @ts-ignore
    document.getElementById(textAreaId).value = currentText;
    // }
  }

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
              onChange={handleAccordionChange('panel' + index2, index2)}
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
                        <Tooltip title={elm.subTitleTxt} arrow>
                          <InfoIcon className="info-icon" />
                        </Tooltip>
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
                        inputId={elm3?.sliderOptions?.ratingDetails?.ratingOpt}
                        subHeadingIndex={index2} sliderIndex={index3} defaultValue={elm3?.sliderOptions?.ratingDetails?.defaultinputIdOpt} NAOptionTxt={elm3?.sliderOptions?.ratingDetails?.NAOptionTxt} NAoptionId={elm3?.sliderOptions?.ratingDetails?.NAOptionInputId} selectedInputId={elm3?.sliderOptions?.ratingDetails?.SelectedInputId} ratingData={elm3?.sliderOptions?.ratingDetails?.ratingOpt}
                        handleSliderChange={handleSliderChange}
                      />
                      {/* <TextField
                        id="outlined-multiline-flexible"
                        label={elm?.obsplaceholder}
                        multiline
                        maxRows={4}
                        // value={value}
                        // onChange={handleChange}
                        fullWidth
                      /> */}
                      <TextareaAutosize
                        aria-label="minimum height"
                        minRows={2}
                        defaultValue={elm3?.observationTxt}
                        onChange={(event: any) =>
                          (handleTextArea(event.target.value, elm3?.observationId))}
                        placeholder={elm3?.obsplaceholder}
                        style={{ width: "100%", marginTop: 20, padding: 5, resize: "none" }}
                      />
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
