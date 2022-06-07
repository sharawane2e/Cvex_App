import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./accordion.scss";
import questionData from "../../../mock/questionData.json";
import { ConstructionOutlined } from '@mui/icons-material';
import CustomSlider from "../CustomSlider";
import Parser from "html-react-parser";

export default function CustomAccordion() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expandIconState, setExpandIconState] = useState(<AddIcon />);
  const [currClicked, setCurrCliked] = useState("");


  const quesData = questionData.data.rightPanel.questionsData;
  const subHeadingTextArr: any = quesData[0].subHeadingText; // Array with 2 objs
  // console.log(subHeadingTextArr);
  //   console.log(quesData);
  const handleChange =
    (panel: string, idx: any) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      //   setExpandIconState(isExpanded ?  <RemoveIcon /> : <AddIcon />);
      //   console.log(event.currentTarget);
      setCurrCliked(panel);
      //   console.log(currClicked);
      //   {
      //     quesData.map(function(ques, index) {
      //         console.log(ques.capabilityTxt);
      //         console.log(ques.subHeadingText);
      //     })
      //     }
    };

  // console.log(acoudionSumarry())

  return (
    <>

      {
        subHeadingTextArr.map((elm: any, index2: any) => {
          let title = elm.subTitle;
          return (
            <>
              <Accordion key={index2} expanded={expanded === 'panel' + (index2)} className="accordBlock" onChange={handleChange('panel' + index2, index2)}>
                <AccordionSummary
                  className="accordHead"
                  expandIcon={expanded == 'panel' + index2 ? <RemoveIcon /> : <AddIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 700 }}>
                    {elm.skillTitle}
                  </Typography>
                </AccordionSummary>

                {
                  title.map((elm3: any, index3: any) => {
                    return (
                      <>
                        <AccordionDetails key={index3} className="accordDetail">
                          <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 600 }}>
                            {elm3.subTitleTxt}
                          </Typography>

                          <Typography className="question-text" sx={{ mt: "10px", flexShrink: 0 }}>
                            {elm3.questionText}
                          </Typography>
                          <Typography className="bestpractices-text" sx={{ mt: "10px", flexShrink: 0 }}>
                            {Parser(elm3.bestPracticesTxt)}
                          </Typography>
                          <CustomSlider />
                        </AccordionDetails>
                      </>
                    )
                  })
                }
              </Accordion>
            </>
          )

        })

      }


    </>
  );
}

