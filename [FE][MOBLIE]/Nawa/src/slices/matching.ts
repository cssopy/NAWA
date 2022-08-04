import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Matching  {
    location : string,
    category1 : string,
    category2 : string,
    category3 : string,
    settings1 : string,
    settings2 : string,
    settings3 : string,
}

const initialState = {
    location : '',
    category1 : '',
    category2 : '',
    category3 : '',
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
        },
        setC1(state, action : PayloadAction<Matching> ) {
            state.category1 = action.payload.category1;
            state.category2 = action.payload.category2;
            state.category3 = action.payload.category3;
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