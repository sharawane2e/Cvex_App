import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../CustomButton';
import { useState } from 'react';
import "./CustomPopup.scss";

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


type CustomPopupProps = {
    buttonText: string, description: string, onClose: () => void;
}
const CustomPopup = (props: CustomPopupProps) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="popup-container">
            <CustomButton className='submitButton' onClick={handleClickOpen}>
                BUTTON
            </CustomButton>
            <CustomDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} >
                    <IconButton
                        aria-label="close"
                        onClick={props?.onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {props?.description}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <CustomButton className='submitButton' onClick={handleClose}>
                        {props?.buttonText}
                    </CustomButton>
                </DialogActions>
            </CustomDialog>
        </div>
    );
}
export default CustomPopup;