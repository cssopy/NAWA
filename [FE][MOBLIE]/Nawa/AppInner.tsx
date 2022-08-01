import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import MatingScreen from './src/screens/MatingScreen';
import ChattingScreen from './src/screens/ChattingScreen';
import SettingScreen from './src/screens/SettingScreen';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';

export type LoggedInParamList = {  //다른 곳에서도 쓸꺼니까 export
  Home: undefined;
  Mating: undefined;
  Chatting: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();


function AppInner() {
  const isLoggedIn = useSelector((state : RootState) => !!state.user.userId)
  return (
    <>
      <NavigationContainer>
        {/* <Drawer.Navigator>
        </Drawer.Navigator> */}
        {isLoggedIn ? (
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
            tabBarHideOnKeyboard : true,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Mating" component={MatingScreen} />
          <Tab.Screen name="Chatting" component={ChattingScreen} options={{ tabBarBadge: 10 }} />
          <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
        ) : (
          <Stack.Navigator>
                <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{title: '로그인'}}
                />
                <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{title: '회원가입'}}
                />
            </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

export default AppInner;