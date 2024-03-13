import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../../app/store";

export interface selectorState {
    start : string,
    end : string,
    color : string,
}

export const selectorSlice = createSlice({
    name : 'selector',
    initialState : {
        start : "",
        end : "",
        color : "red",
    },
    reducers : {
        changeStart : (state, action : PayloadAction<string>) => {
            state.start = action.payload;
        },
        changeEnd : (state, action : PayloadAction<string>) => {
            state.end = action.payload;
        },
        changeColor : (state, action : PayloadAction<string>) => {
            state.color = action.payload;
        }
    }
})

export default selectorSlice.reducer
export const {changeStart, changeEnd, changeColor} = selectorSlice.actions