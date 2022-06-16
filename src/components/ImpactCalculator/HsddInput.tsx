import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';

type HsddInputProps = {
	type: string, optionName: string, placeholder: string, menuItems: any, selectedId: string, questionId: string
}
const HsddInput = (props: HsddInputProps) => {
	// const [jsonData, setJSONData] = useState<any>('');

	// useEffect(() => {
	// 	setJSONData(
	// 		// @ts-ignore
	// 		JSON.parse(document.getElementById('jsonData')?.innerText),
	// 	);
	// }, []);
	// const inputDetails = jsonData?.data?.inputData;

	// const getselectedDDName = (options: any, selectedId: string) => {
	// 	let selectedDDName = '';
	// 	options.forEach((element: any) => {
	// 		if (element.ddId == selectedId) {
	// 			selectedDDName = element.ddName;
	// 		}
	// 	});
	// 	// inputDetails?.forEach((inputDetail: any) => {
	// 	// 	inputDetail?.subHeadingDetails?.forEach((subHeadingDetail: any) => {
	// 	// 		subHeadingDetail?.segmentDetails?.forEach((segmentDetail: any) => {
	// 	// 			segmentDetail?.questions?.forEach((question: any) => {
	// 	// 				question?.options.forEach((option: any) => {
	// 	// 					if (option.ddId == selectedId) {
	// 	// 						selectedDDName = option.ddName;
	// 	// 					}
	// 	// 				})
	// 	// 			});
	// 	// 		});
	// 	// 	});
	// 	// });
	// 	return selectedDDName;
	// };
	// console.log(inputDetails.subHeadingDetails)
	// console.log(props?.selectedId)

	const hsddRender = () => {
		if (props.type == "hsdd") {
			return (
				<>
					<Grid container sx={{ alignItems: 'center', }} xs={12} md={4} lg={4}
					className="input-form-control">
						{/* <Grid item xs={12} md={6} className="single-dropdown-title">
							<p>{props?.optionName}</p>
						</Grid> */}
						<Grid item xs={12} >
						<p className="label-heading">{props?.optionName}</p>
							<FormControl fullWidth>
								<Select
									sx={{ p: 0, borderRadius: 0, mb: 1 }}
									className="inputField cutom-input-field"
									defaultValue="none"
									value={getselectedDDName(
										props.menuItems, props.selectedId
									)}
									onChange={(e) => {
										let dropdownId = '';
										if (props.type == "hsdd") {
											props.menuItems.forEach((option: any) => {
												if (option.ddName == e.target.value) {
													dropdownId = option.ddId;
													// document.getElementById(option.ddId)?.click();
												}
											})
										}
										const updatedQuestionsArray: any[] = [];
										inputDetails?.forEach((inputDetail: any) => {
											inputDetail?.subHeadingDetails.forEach((subHeadingDetail: any) => {
												subHeadingDetail?.segmentDetails.forEach((segmentDetail: any) => {
													segmentDetail?.questions.forEach((question: any) => {
														if (props.type == "hsdd") {
															if (question.questionId === props.questionId) {
																question.selectedId = dropdownId;
															}
															updatedQuestionsArray.push(inputDetail);
														}
													});
												});
											});
										});
										setJSONData({
											...jsonData, data: { ...jsonData.rightData, inputData: [...updatedQuestionsArray] }
										});
									}}
								>
									<MenuItem
										disabled
										value="none"
										className="selectItem"
									>
										<>Select Option</>
									</MenuItem>
									{props?.menuItems?.map((menuOption: any) => (
										<MenuItem
											value={menuOption?.ddName}
											className="selectItem"
										>
											{menuOption?.ddName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</>
			)
		}
	}



	return (
		<>
			<Grid container sx={{ alignItems: 'center', }} xs={12} md={4} className="input-form-control">
				{/* <Grid item xs={12} md={6} className="single-dropdown-title">
							<p>{props?.optionName}</p>
						</Grid> */}
				<Grid item xs={12} >
					<p className="label-heading">{props?.optionName}</p>
					<FormControl fullWidth>
						<Select
							sx={{ p: 0, borderRadius: 0, mb: 1 }}
							className="inputField cutom-input-field"
							defaultValue="none"
							value={"Hello"}
							onChange={(e) => {
								// let dropdownId = '';
								// if (props.type == "hsdd") {
								// 	props.menuItems.forEach((option: any) => {
								// 		if (option.ddName == e.target.value) {
								// 			dropdownId = option.ddId;
								// 			// document.getElementById(option.ddId)?.click();
								// 		}
								// 	})
								// }
								// const updatedQuestionsArray: any[] = [];
								// inputDetails?.forEach((inputDetail: any) => {
								// 	inputDetail?.subHeadingDetails.forEach((subHeadingDetail: any) => {
								// 		subHeadingDetail?.segmentDetails.forEach((segmentDetail: any) => {
								// 			segmentDetail?.questions.forEach((question: any) => {
								// 				if (props.type == "hsdd") {
								// 					if (question.questionId === props.questionId) {
								// 						question.selectedId = dropdownId;
								// 					}
								// 					updatedQuestionsArray.push(inputDetail);
								// 				}
								// 			});
								// 		});
								// 	});
								// });
								// setJSONData({
								// 	...jsonData, data: { ...jsonData.rightData, inputData: [...updatedQuestionsArray] }
								// });
							}}
						>
							<MenuItem
								disabled
								value="none"
								className="selectItem"
							>
								<>Select Option</>
							</MenuItem>
							{props?.menuItems?.map((menuOption: any) => (
								<MenuItem
									value={menuOption?.ddName}
									className="selectItem"
								>
									{menuOption?.ddName}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</>
	)
}
export default HsddInput;