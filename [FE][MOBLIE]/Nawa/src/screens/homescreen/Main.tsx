import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Feeds from './Feeds'
import FeedDetail from "./FeedDetail";
import ChangeFeedScreen from "./ChangeFeedScreen";


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
      
      <Stack.Screen
        name="ChangeFeedScreen"
        component={ChangeFeedScreen}
      />
      
    </Stack.Navigator>
  )
}

export default Main