import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileData: {},
};

export const noPersistSlice = createSlice({
    name: "noPersistSlice",
    initialState,
    reducers: {
        saveProfileData: (state, action) => {
            state.profileData = action.payload;
        },
    },
});

export const { saveProfileData } = noPersistSlice.actions;

export default noPersistSlice.reducer;
