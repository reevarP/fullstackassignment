import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { toasterController } from "../../../../Redux/Slices/toasterSlice";

const ErrorToaster = () => {
    const dispatch = useDispatch();
    const { errorToaster, toasterMessage } = useSelector((state) => state.toaster);
    return (
        <Snackbar
            open={errorToaster === true}
            autoHideDuration={4000}
            onClose={() => dispatch(toasterController({ toaster: "errorToaster", state: false, message: "" }))}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert severity="error" variant="filled">
                {toasterMessage}
            </Alert>
        </Snackbar>
    );
};

export default ErrorToaster;
