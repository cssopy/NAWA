import { combineReducers } from "@reduxjs/toolkit";

import matchingSlice from "../slices/matching";
import userSlice from '../slices/user';

const rootReducer = combineReducers({
    user : userSlice.reducer,
    matching : matchingSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;