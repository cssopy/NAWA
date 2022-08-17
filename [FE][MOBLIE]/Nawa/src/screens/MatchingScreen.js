import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "../store";
import { Provider } from "react-redux/es/exports";

import Mate1 from './matching/Mate1';
import Mate2 from './matching/Mate2';
import Mate3 from './matching/Mate3';
import Mate4 from './matching/Mate4';


import JoinRTC from './matching/JoinRTC';
import OpenRTC from './matching/OpenRTC';



const Stack = createNativeStackNavigator()

const MatingScreen = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator
        screenOptions={{headerShown:false}}
      >
        <Stack.Screen name='Mate1' component={Mate1} />
        <Stack.Screen name='Mate2' component={Mate2} />
        <Stack.Screen name='Mate3' component={Mate3} />
        <Stack.Screen name='JoinRTC' component={JoinRTC} />
        <Stack.Screen name='OpenRTC' component={OpenRTC} />
        <Stack.Screen name='Mate4' component={Mate4} />
      </Stack.Navigator>
    </Provider>
    );
  }

export default MatingScreen;