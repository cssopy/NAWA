import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User  {
    userId : string,
    nickname : string,
    accessToken: string,
    chatting : [],
    get201 : boolean,
}

const initialState = {
    userId : '',
    nickname: '',
    accessToken: '',
    chatting : [],
    get201 : false,
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser(state, action  : PayloadAction<User> ) {
            state.userId = action.payload.userId;
            state.nickname = action.payload.nickname;
            state.accessToken = action.payload.accessToken;
            state.get201 = action.payload.get201;
        },
        setChatting(state, action : PayloadAction<User> ) {
            state.chatting = action.payload.chatting;
        },
        addChatting(state, action : PayloadAction<User> ) {
            state.chatting.push(action.payload.chatting)
        }
    },
})

export default userSlice;