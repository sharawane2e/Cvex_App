export const hideShowSections = (impactJson: any) => {
  const updatedInputData = JSON.parse(JSON.stringify(impactJson));

  const allSHowNumQuestionIds: string[] = [];
  const showNumQuestionIds: string[] = [];

  updatedInputData?.data?.inputData?.map(
    (inputDataEl: any, inputDataIndex: number) => {
      inputDataEl.subHeadingDetails?.map(
        (subHeading: any, subHeadingIndex: number) => {
          subHeading.segmentDetails?.map(
            (segment: any, segmentIndex: number) => {
              segment.questions?.map((question: any, questionIndex: number) => {
                if (
                  question.type == 'hsdd' &&
                  question.enableQuestionIds.length
                ) {
                  allSHowNumQuestionIds.push(...question.enableQuestionIds);
                }
                if (
                  question.type == 'hsdd' &&
                  question.selectedId != '' &&
                  question.enableQuestionIds.length
                ) {
                  question.options?.map((option: any) => {
                    if (
                      option.ddId === question.selectedId &&
                      option.enableIds
                    ) {
                      showNumQuestionIds.push(...question.enableQuestionIds);
                    }
                  });
                }
              });
            },
          );
        },
      );
    },
  );

  // headers.length = 0;
  updatedInputData?.data?.inputData?.map(
    (inputDataEl: any, inputDataIndex: number) => {
      // console.log(inputDataIndex)
      // console.log(inputDataEl.headingText)
      const subHeadersBooleanCnd: boolean[] = [];
      inputDataEl.subHeadingDetails?.map(
        (subHeading: any, subHeadingIndex: number) => {
          const segmentsBooleanCnd: boolean[] = [];
          subHeading.segmentDetails?.map(
            (segment: any, segmentIndex: number) => {
              const questionsBooleanCnd: boolean[] = [];
              // debugger
              segment.questions?.map((question: any, questionIndex: number) => {
                
                if (
                  question.type == 'num' &&
                  allSHowNumQuestionIds.indexOf(question.questionId) != -1
                ) {
                  //   console.log("inside num")
                  if (showNumQuestionIds.indexOf(question.questionId) != -1) {
                    questionsBooleanCnd.push(true);
                    question.isShow = true;
                  }

                  if (showNumQuestionIds.indexOf(question.questionId) == -1) {
                    questionsBooleanCnd.push(false);
                    question.isShow = false;
                    question.selectedText = '';
                    //@ts-ignore
                    document.getElementById(question.questionId).value = '';
                  }
                }
              });

              console.log("questions",questionsBooleanCnd)
              console.log(questionsBooleanCnd)
              if (
                questionsBooleanCnd.indexOf(true) != -1 ||
                questionsBooleanCnd.length == 0
              ) {
                segment.isShow = true;
                segmentsBooleanCnd.push(true);
              } else {
                segment.isShow = false;
                segmentsBooleanCnd.push(false);
              }
              //   if (questionsBooleanCnd.indexOf(false) != -1) {
              //     segment.isShow = false;
              //     segmentsBooleanCnd.push(false);
              //   }
            },
          );

          // console.log("segments",segmentsBooleanCnd)

          if (segmentsBooleanCnd.indexOf(true) != -1) {
            subHeading.isShow = true;
            subHeadersBooleanCnd.push(true);
          } else {
            subHeading.isShow = false;
            subHeadersBooleanCnd.push(false);
          }
          // if (segmentsBooleanCnd.indexOf(false) != -1) {
          //   subHeading.isShow = false;
          //   subHeadersBooleanCnd.push(false);
          // }
        },
      );
      //   console.log("subHeaders",subHeadersBooleanCnd)

      if (subHeadersBooleanCnd.indexOf(true) != -1) {
        inputDataEl.isShow = true;
      } else {
        inputDataEl.isShow = false;
      }
      //   if (subHeadersBooleanCnd.indexOf(false) != -1) {
      //     inputDataEl.isShow = false;
      //   }
    },
  );

  // console.log(updatedInputData)

  return updatedInputData;
};
