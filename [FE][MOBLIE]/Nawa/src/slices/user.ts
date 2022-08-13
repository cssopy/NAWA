import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User  {
    userId : string,
    nickname : string,
    accessToken: string,
}

const initialState = {
    userId : '',
    nickname: '',
    accessToken: '',
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser(state, action  : PayloadAction<User> ) {
            state.userId = action.payload.userId;
            state.nickname = action.payload.nickname;
            state.accessToken = action.payload.accessToken;
        },
    },
})

export default userSlice;