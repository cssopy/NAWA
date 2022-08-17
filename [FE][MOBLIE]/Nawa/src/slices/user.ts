import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User  {
    userId : string,
    nickname : string,
    accessToken: string,
    chatting : [],
    counting : number,
}

const initialState = {
    userId : '',
    nickname: '',
    accessToken: '',
    chatting : [],
    counting : 0
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser(state, action  : PayloadAction<User> ) {
            state.userId = action.payload.userId;
            state.nickname = action.payload.nickname;
            state.accessToken = action.payload.accessToken;
            state.counting = action.payload.accessToken;
        },
        addChatting(state, action : PayloadAction<User> ) {
            state.chatting.push(action.payload);
        }
    },
})

export default userSlice;