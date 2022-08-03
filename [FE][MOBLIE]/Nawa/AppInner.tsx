import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import { Alert, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import MatingScreen from './src/screens/Matching';
import ChattingScreen from './src/screens/ChattingScreen';
import SettingScreen from './src/screens/SettingScreen';
import ProfileScreen from './src/screens/profileScreen';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import { useAppDispatch } from './src/store';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, { AxiosError } from 'axios';
import userSlice from './src/slices/user';
import SplashScreen from 'react-native-splash-screen';

StatusBar.setBackgroundColor("lightgrey");

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
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector((state : RootState) => !!state.user.userId)
  
  // 자동 로그인
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          SplashScreen.hide();
          return;
        }
        const response = await axios.post(
          'http://10.0.2.2:3105/refreshToken',/////////////////////
          {},
          {
            headers : {
              authorization : `Bearer ${token}`,//////////////////
            },
          },
        );
        dispatch(
          userSlice.actions.setUser({ // redux state는 값이 변하면, useselector로 참조하고 있는 모든 컴포넌트가 다시 렌더링.
            userId : response.data.data.userId,
            nickname : response.data.data.email,
            accessToken : response.data.data.accessToken
          }),
        );
        await EncryptedStorage.setItem(
          'accessToken',
          response.data.data.accessToken,
        );

      } catch (error) {
        if ((error as AxiosError).response?.data.code === 'expired') {
          Alert.alert('알림', '다시 로그인 해주세요');
        }
      } finally {
        SplashScreen.hide();
      }
    };
    getTokenAndRefresh();
  }, [dispatch]);
  
  
  return (
    <>
      <NavigationContainer>
        {/* <Drawer.Navigator>
        </Drawer.Navigator> */}
        {isLoggedIn ? (
        // {!isLoggedIn ? (
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === '홈') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === '매칭') {
                iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === '채팅') {
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              } else if (route.name === '설정') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === '프로필') {
                iconName = focused ? 'person' : 'person-outline';
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
          <Tab.Screen name="홈" component={HomeScreen} />
          <Tab.Screen name="채팅" component={ChattingScreen} options={{ tabBarBadge: 10 }} />
          <Tab.Screen name="매칭" component={MatingScreen} />
          <Tab.Screen name="프로필" component={ProfileScreen} />
          <Tab.Screen name="설정" component={SettingScreen} />
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