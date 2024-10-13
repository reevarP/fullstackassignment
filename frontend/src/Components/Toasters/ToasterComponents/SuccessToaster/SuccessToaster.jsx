import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { toasterController } from "../../../../Redux/Slices/toasterSlice";

const SuccessToaster = () => {
    const dispatch = useDispatch();
    const { successToaster, toasterMessage } = useSelector((state) => state.toaster);
    return (
        <Snackbar
            open={successToaster === true}
            autoHideDuration={4000}
            onClose={() => dispatch(toasterController({ toaster: "successToaster", state: false, message: "" }))}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert severity="success" variant="filled">
                {toasterMessage}
            </Alert>
        </Snackbar>
    );
};

export default SuccessToaster;
