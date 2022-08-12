import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface initialState {
    location : object;
    distance : number;
    category : Array<String>;
    settings : Array<String>;
}

const initialState = {
    location : {longitude : 0, latitude : 0},
    distance : 0,
    category : [],
    settings : [],
};

const matchingSlice = createSlice({
    name : 'matching',
    initialState,
    reducers : {
        setL(state, action) {
            state.location = action.payload.location;
            state.distance = action.payload.distance;
        },
        setC(state, action) {
            state.category = action.payload.category;
        },
        setS(state, action) {
            state.settings = action.payload.settings;
        },
    },
})

export default matchingSlice;