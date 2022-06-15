import  { useEffect, useState } from 'react';
import { Inputbox } from '../UI/Input';
import { FormControl, Grid, MenuItem, Select} from '@mui/material';

const HsddInput = (props: any) => {

	const [jsonData, setJSONData] = useState<any>("");

	useEffect(() => {
		// @ts-ignore
		// document.getElementById('forwardbutton').disabled = true;
		setJSONData(
			// @ts-ignore
			JSON.parse(document.getElementById('jsonData')?.innerHTML),
		);
	}, []);

	const inputData = jsonData?.data?.inputData;
const hsddRender=()=>{
	 inputData?.map((inputDetails:any) => {
	 inputDetails?.subHeadingDetails?.map((subHeadingDetail: any) =>{
		 subHeadingDetail?.segmentDetails?.map((segmentDetail: any) => {

			     segmentDetail?.questions?.map((question: any) => {
					 if (question.type == "hsdd") {
						 return (
							<>
							<Grid container sx={{ alignItems: 'center', }} xs={12} md={4}>
								<Grid item xs={12} md={6} className="single-dropdown-title">
									<p className="gen-info">{question?.optionName}</p>
								</Grid>
								<Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: "20px" }}>
									<FormControl fullWidth>
										<Select
											sx={{ p: 0, borderRadius: 0, mb: 1 }}
											// style={{"padding":0}}
											className="inputField cutom-input-field"
											defaultValue="none"
											value={"Hello"}
										//   onChange={}
										>
											<MenuItem
												disabled
												value="none"
												className="selectItem"
											>
												<>Select Option</>
											</MenuItem>
											{question?.options?.map((element: any) => (
												<MenuItem
													value={element?.ddName}
													className="selectItem"
												>
													{element?.ddName}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</>
						 )
					 }
				 })
			 })
		 })
	 })
	}
return(
    <>
       {hsddRender()}
    </>
)
}
export default HsddInput;