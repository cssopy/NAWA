import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface initialState {
    location : object;
    distance : number;
    category : Array<String>;
    settings : string;
    ment : string;
    target : object;
    check : boolean;
}

const initialState = {
    location : {longitude : 0, latitude : 0},
    distance : 0,
    category : [],
    settings : '',
    ment : '',
    target : {
        userId : '선택된 유저가 없습니다.',
        nickname : '선택된 유저가 없습니다.',
        distance : 0,
        location : {latitude : 0, longitude:0},
        category : [],
        ment : '선택된 유저가 없습니다.'
    },
    check : false
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
            state.ment = action.payload.ment;
        },
        setS(state, action) {
            state.settings = action.payload.settings;
        },
        setTarget(state, action) {
            state.target = action.payload.target;
        },
        setCheck(state, action) {
            state.check = action.payload.check;
        }
    },
})

export default matchingSlice;