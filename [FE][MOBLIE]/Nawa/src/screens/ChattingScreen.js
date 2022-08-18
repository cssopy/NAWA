
import React, { useEffect, useState, useRef, useCallback } from 'react';

import store from '../store';
import { Provider } from "react-redux/es/exports";

import { useSelector } from "react-redux";
import { RootState } from '../store/reducer';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChattingMain from './chatting/ChattingMain'
import ChattingRoom from './chatting/ChattingRoom'

const ChattingScreen = () => {
    const Stack = createNativeStackNavigator()
    
    return (
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{headerShown:false}}
        >
          <Stack.Screen name='ChattingMain' component={ChattingMain} />
          <Stack.Screen name='ChattingRoom' component={ChattingRoom} />
        </Stack.Navigator>
      </Provider>
    )
}

export default ChattingScreen;