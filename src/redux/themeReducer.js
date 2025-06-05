import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    parametr : 'celsius',
    region : 'Tashkent'
}

const themeSlice = createSlice({
    name: 'parametr',
    initialState,
    reducers: {
        changeParametr: (state, action) => {
            state.parametr = action.payload
        },

        changeRegion: (state, action) => {
            state.region = action.payload
        }
    }
})

export const { changeParametr, changeRegion } = themeSlice.actions;
const parametrReducer = themeSlice.reducer;

export default parametrReducer