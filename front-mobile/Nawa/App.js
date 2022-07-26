import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStack } from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';



function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function MatingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mating!</Text>
    </View>
  );
}
function ChattingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chatting!</Text>
    </View>
  );
}
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Mating') {
                  iconName = focused ? 'people' : 'people-outline';
                } else if (route.name === 'Chatting') {
                  iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor : 'black', // 활성화된 탭 색
              tabBarInactiveTintColor : 'grey',  // 활성화 안된 탭 색
              tabBarActiveBackgroundColor : 'lightgrey', // 개별 탭 색
              headerShown : false,
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Mating" component={MatingScreen} />
            <Tab.Screen name="Chatting" component={ChattingScreen} options={{ tabBarBadge: 10 }} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}