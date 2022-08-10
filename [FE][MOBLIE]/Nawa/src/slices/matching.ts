import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Matching  {
    location : object,
    distance : number,
    category1 : [],
    settings1 : string,
    settings2 : string,
    settings3 : string,
}

const initialState = {
    location : {longitude:0, latitude:0},
    distance : 0,
    category : [],
    settings1 : '',
    settings2 : '',
    settings3 : '',
};

const matchingSlice = createSlice({
    name : 'matching',
    initialState,
    reducers : {
        setL(state, action : PayloadAction<Matching> ) {
            state.location = action.payload.location;
            state.distance = action.payload.distance;
        },
        setC1(state, action : PayloadAction<Matching> ) {
            state.category = action.payload.category;

        },
        setS1(state, action : PayloadAction<Matching> ) {
            state.settings1 = action.payload.settings1;
        },
        setS2(state, action : PayloadAction<Matching> ) {
            state.settings2 = action.payload.settings2;
        },
        setS3(state, action : PayloadAction<Matching> ) {
            state.settings3 = action.payload.settings3;
        },
    },
})

export default matchingSlice;