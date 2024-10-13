import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainFormulaFieldsArray: [],
};

export const persistSlice = createSlice({
    name: "persistSlice",
    initialState,
    reducers: {
        saveMainFormulaFieldsArray: (state, action) => {
            state.mainFormulaFieldsArray = [...state.mainFormulaFieldsArray, action.payload];
        },
    },
});

export const { saveMainFormulaFieldsArray } = persistSlice.actions;

export default persistSlice.reducer;
