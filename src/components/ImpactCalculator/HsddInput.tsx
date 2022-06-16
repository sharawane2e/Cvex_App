import { FormControl, Grid, MenuItem, Select } from '@mui/material';

type HsddInputProps = {
	type: string, optionName: string, placeholder: string, menuItems: any
}
const HsddInput = (props: HsddInputProps) => {
	


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