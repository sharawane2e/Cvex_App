import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../CustomButton";
import { useState } from "react";
import "./CustomPopup.scss";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface CustomPopupProps {
  buttonText: string;
  description: string;
  open: boolean;
  handleClose?: (value: any) => void;
}
// type CustomPopupProps = {
//     buttonText: string, description: string, handleClose: boolean;
// }
const CustomPopup: React.FC<CustomPopupProps> = (props) => {
  const { open = true, buttonText, description, handleClose } = props;
  return (
    <div className="popup-container">
      <CustomDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        className="popup-container__inr"
      >
        <DialogTitle
          sx={{ m: 0, p: 2, display: "flex", justifyContent: "end" }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: "0", top: "0" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography className="popup-description" gutterBottom>
            {description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <CustomButton className="submitButton" onClick={handleClose}>
            {buttonText}
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    </div>
  );
};
export default CustomPopup;
