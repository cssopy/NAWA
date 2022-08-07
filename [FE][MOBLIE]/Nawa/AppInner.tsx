import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import { Alert } from 'react-native';
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
import ProfileScreen from './src/screens/ProfileScreen';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import { useAppDispatch } from './src/store';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, { AxiosError } from 'axios';
import userSlice from './src/slices/user';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';


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
  const isLoggedIn = useSelector((state : RootState) => !!state.user.accessToken)
  const nickname = useSelector((state : RootState) => state.user.nickname)
  
  // 자동 로그인
  useEffect(() => {


    const getTokenAndRefresh = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId')
        const accessToken = await AsyncStorage.getItem('accessToken')
        const refreshToken = await EncryptedStorage.getItem('refreshToken')
        if (!accessToken) {
          SplashScreen.hide();
          return;
        }
        const response = await axios.put(
          'http://i7d205.p.ssafy.io:8080/user/reissue',/////////////////////
          {
            accessToken: accessToken,
            refreshToken: refreshToken,
            userId: userId
          },
        );
        dispatch(
          userSlice.actions.setUser({ // redux state는 값이 변하면, useselector로 참조하고 있는 모든 컴포넌트가 다시 렌더링.
            userId : userId,
            nickname : nickname,
            accessToken : accessToken,
          }),
        );

      } catch (error) {
        console.log('error : ', error)
        Alert.alert('알림', '다시 로그인 해주세요');

        const accessToken = await AsyncStorage.getItem('accessToken')
        console.log(accessToken)
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
        {!isLoggedIn ? (
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
            tabBarActiveTintColor : 'rgb(0, 197, 145)', // 활성화된 탭 색
            tabBarInactiveTintColor : 'grey',  // 활성화 안된 탭 색
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
          // jh 상단 헤더 없애기
          <Stack.Navigator screenOptions={{headerShown: false}}>  
                <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{title: '로그인'}}
                />
                <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{title: '회원가입', headerShown:true ,headerStyle:{backgroundColor:'rgb(0, 197, 145)'}}}
                />
                
            </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

export default AppInner;