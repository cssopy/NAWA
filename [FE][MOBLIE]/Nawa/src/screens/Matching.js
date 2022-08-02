import React from "react";
import {Text, View} from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Mate1 from './Mate1';
import Mate2 from './Mate2';
import Mate3 from './Mate3';
import Mate4 from './Mate4';


const Stack = createNativeStackNavigator()


const MatingScreen = () => {
    return (
      <Stack.Navigator
      screenOptions={{headerShown : false}}>
        <Stack.Screen name="Mate1" component={Mate1} />
        <Stack.Screen name="Mate2" component={Mate2} />
        <Stack.Screen name="Mate3" component={Mate3} />
        <Stack.Screen name="Mate4" component={Mate4} />
      </Stack.Navigator>
    );
  }

export default MatingScreen;