import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User  {
    userId : string,
    nickname : string,
    accessToken: string,
    refreshToken: string,
}

const initialState = {
    userId : '',
    nickname: '',
    accessToken: '',
    refreshToken: '',
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser(state, action  : PayloadAction<User> ) {
            state.userId = action.payload.userId;
            state.nickname = action.payload.nickname;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
    },
})

export default userSlice;