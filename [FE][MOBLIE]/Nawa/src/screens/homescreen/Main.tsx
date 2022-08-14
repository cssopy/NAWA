import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dimensions, StyleSheet } from "react-native";

import Feeds from './Feeds'
import FeedDetail from "./FeedDetail";


const Stack = createNativeStackNavigator();

function Main ({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Feeds"
        component={Feeds}
      />

      <Stack.Screen
        name="FeedDetail"
        component={FeedDetail}

      />
      
    </Stack.Navigator>
  )
}

export default Main