import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toasterMessage: "",
    successToaster: false,
    errorToaster: false,
};

export const toasterSlice = createSlice({
    name: "toasterSlice",
    initialState,
    reducers: {
        toasterController: (state, action) => {
            state[action.payload.toaster] = action.payload.state;
            state.toasterMessage = action.payload.message;
        },
    },
});

export const { toasterController } = toasterSlice.actions;

export default toasterSlice.reducer;
