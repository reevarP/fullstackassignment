import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import noPersistSlice from "./Slices/noPersistSlice";
import persistSlice from "./Slices/persistSlice";
import toasterSlice from "./Slices/toasterSlice";

const reducers = combineReducers({
    persist: persistSlice,
    nopersist: noPersistSlice,
    toaster: toasterSlice,
});
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["persist"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
