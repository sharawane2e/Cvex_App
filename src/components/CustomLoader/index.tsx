import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const CustomLoader = ({...props}) => {

    const { isShow } = props;

    return isShow ? (
        <>
            <div className='backdrop'>Backdrop</div>
            <div className='loader_container'>
                <CircularProgress />
            </div>
        </>
    )
    : null;
}

export default CustomLoader;