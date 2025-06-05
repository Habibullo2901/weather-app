import { configureStore } from "@reduxjs/toolkit";
import parametrReducer from "./themeReducer";

export const store = configureStore({
    reducer: {
        statusParametr: parametrReducer
    },
})