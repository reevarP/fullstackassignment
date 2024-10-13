import React from "react";
import ErrorToaster from "./ToasterComponents/ErrorToaster/ErrorToaster";
import SuccessToaster from "./ToasterComponents/SuccessToaster/SuccessToaster";

const ToasterCollection = () => {
    return (
        <React.Fragment>
            <SuccessToaster />
            <ErrorToaster />
        </React.Fragment>
    );
};

export default ToasterCollection;
