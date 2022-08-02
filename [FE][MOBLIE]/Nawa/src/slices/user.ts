import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId : '',
    nickname : '',
    accessToken : '',
    refreshToken : '',
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser(state, action) {
            state.userId = action.payload.userId;
            state.nickname = action.payload.nickname;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
    },
})

export default userSlice;