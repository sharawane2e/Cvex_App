import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';

type HsddInputProps = {
	question: any
	onChange: any
}
const HsddInput = (props: HsddInputProps) => {

	const { optionName, type, placeholder, description, questionId, selectedId, enableQuestionIds, options, onChange } = props.question;
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

	// const hsddRender = () => {
	// 	if (props.type == "hsdd") {
	// 		return (
	// 			<>

	// 			</>
	// 		)
	// 	}
	// }

	const getDDvalue = () => {
		let ddName = ""
		options.forEach((option: any) => {
			if (option.ddId === selectedId) {
				ddName = option.ddName
			}
		})

		return ddName;
	}



	return (
		<>
			<Grid container sx={{ alignItems: 'center', }} xs={12} md={4} className="input-form-control">
				{/* <Grid item xs={12} md={6} className="single-dropdown-title">
							<p>{props?.optionName}</p>
						</Grid> */}
				<Grid item xs={12} >
					<p className="label-heading">{optionName}</p>
					<FormControl fullWidth>
						<Select
							sx={{ p: 0, borderRadius: 0, mb: 1 }}
							className="inputField cutom-input-field"
							defaultValue="none"
							value={getDDvalue()}
							onChange={(e) => {
								console.log(e);
								props.onChange()
							}}
						>
							<MenuItem
								disabled
								value="none"
								className="selectItem"
							>
								<>{placeholder}</>
							</MenuItem>
							{options?.map((option: any) => (
								<MenuItem
									value={option?.ddId}
									className="selectItem"
								>
									{option?.ddName}
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