import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import "../CSS/Error.css";

function Error() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 10000);
        console.log(timer);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <Box className={'top-box'}>
                <Box className={'main-box'}>

                </Box>
                <Box className={'error-box'}>
                    <Typography variant="p" component="div" gutterBottom className={'status-code'}>
                        Oops!
                    </Typography>
                    <div className={'vertical-line'}>
                    </div>
                    <Typography variant="p" component="div" gutterBottom className={'error-message'}>
                        Page Not Found
                    </Typography>
                </Box>
                <Box className={'bottom-box'}>
                    <Typography variant="p" component="div" gutterBottom className={'message'}>
                        Either something went wrong or the page doesn't exist anymore.
                    </Typography>
                    <button className={'return-button'} onClick={() => navigate("/")}>
                        Go Back
                    </button>
                </Box>
            </Box>
        </>
    );
}

export default Error;
