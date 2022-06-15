import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';

type HsddInputProps = {
	type: string, optionName: string, placeholder: string, menuItems: any, selectedId: string
}
const HsddInput = (props: HsddInputProps) => {
	const [jsonData, setJSONData] = useState<any>('');

	useEffect(() => {
		setJSONData(
			// @ts-ignore
			JSON.parse(document.getElementById('jsonData')?.innerText),
		);
	}, []);
	console.log(props.menuItems)
	const inputDetails = jsonData?.data?.inputData

	const getselectedDDName = (options: any, selectedId: string) => {
		let selectedDDName = '';
		props.menuItems?.forEach((element: any) => {
			if (element.ddId == selectedId) {
				selectedDDName = element.ddName;
			}
		});
		return selectedDDName;
	};

	const hsddRender = () => {
		if (props.type == "hsdd") {
			return (
				<>
					<Grid container sx={{ alignItems: 'center', }} xs={12} md={4}>
						<Grid item xs={12} md={6} className="single-dropdown-title">
							<p className="gen-info">{props?.optionName}</p>
						</Grid>
						<Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: "20px" }}>
							<FormControl fullWidth>
								<Select
									sx={{ p: 0, borderRadius: 0, mb: 1 }}
									// style={{"padding":0}}
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

													// document
													// 	.getElementById(option.ddId)
													// 	?.click();
													console.log(option)
												}
											})
										}
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
			{hsddRender()}
		</>
	)
}
export default HsddInput;