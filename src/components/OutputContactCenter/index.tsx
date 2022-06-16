import { Grid, FormControl, Select, MenuItem } from "@mui/material";
import SecondaryHeader from "../Headers/SecondaryHeader";
import "./OutputContactCenter.scss";


const OutputContactCenter = () => {

    return (
        <div className="contactpage-container">
            <SecondaryHeader />
            <div className="contactpage-container__inr">
                <div className="dropdown-container">
                    <Grid container sx={{ alignItems: 'center', }} xs={12} md={4}>
                        <Grid item xs={12} md={6} className="single-dropdown-title">
                            <p className="gen-info">{ } </p>
                        </Grid>
                        <Grid item xs={12} sx={{ paddingRight: '20px', }}>
                            <FormControl fullWidth>
                                <Select sx={{ p: 0, borderRadius: 0, mb: 1, }}
                                    // style={{"padding":0}}       
                                    className="inputField cutom-input-field" value={'Hello'}
                                //   onChange={}     
                                >
                                    <MenuItem disabled value="none" className="selectItem">
                                        <>Select Option</>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
                <div className="single-dropdown-section">
                    <div className="single-dropdown-section__header">
                        <p className="header-text">sdf</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OutputContactCenter;