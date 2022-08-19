import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import { Alert, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import MatingScreen from './src/screens/MatchingScreen';
import ChattingScreen from './src/screens/ChattingScreen';
import SettingScreen from './src/screens/SettingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignUp from './src/screens/startApp/SignUp';
import SignIn from './src/screens/startApp/SignIn';
import FindInfo from './src/screens/startApp/FindInfo';
import { useAppDispatch } from './src/store';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, { AxiosError } from 'axios';
import userSlice from './src/slices/user';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { firebase } from '@react-native-firebase/database';
import { useState } from 'react';




SplashScreen.show()

export type LoggedInParamList = {  //다른 곳에서도 쓸꺼니까 export
  Home: undefined;
  Mating: undefined;
  Chatting: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  FindInfo: undefined;
};



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function AppInner() {
  const dispatch = useAppDispatch()
  const accessToken = useSelector((state : RootState) => state.user.accessToken)
  const nickname = useSelector((state : RootState) => state.user.nickname)

  // realtime database 등록
  const reference = firebase
    .app()
    .database('https://nawa-firebase-webrtc-default-rtdb.asia-southeast1.firebasedatabase.app/')

  // 내 채널 구독
  reference
    .ref(`/users`)
    .on('child_added', snapshot => {
      const newData = snapshot.val();
      if (newData.time >= Date()) {
        if (newData.to === nickname && newData.from !== nickname) {
//           Alert.alert('알림', '새로운 메세지가 도착했습니다.');
          dispatch(userSlice.actions.addChatting(newData));
          return ;
        } 
        if (newData.to !== nickname && newData.from === nickname) {
          dispatch(userSlice.actions.addChatting(newData));
          return ;
        }
      }
    })
      
    
 
  useEffect(() => {
      reference
        .ref(`/users`)
        .once('value')
        .then((snapshot) => {
            const data = snapshot.toJSON()
            dispatch(
              userSlice.actions.setChatting({
                chatting : [data]
              })
            )
        })
  }, [])



  // 자동 로그인
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const userId = await EncryptedStorage.getItem('userId');
        const refreshToken = await EncryptedStorage.getItem('refreshToken');
        let accessToken = await EncryptedStorage.getItem('accessToken');
        const nickname = await AsyncStorage.getItem('nickname');
        if (!accessToken) {
          SplashScreen.hide();
          return;
        }

        const response = await axios({
          method : 'put',
          url : 'http://i7d205.p.ssafy.io/api/user/autoLogin',
          data : {
            userId: userId,
            refreshToken: refreshToken
          },
          headers : {"Authorization" : `Bearer ${accessToken}`}
        });
        dispatch(
          userSlice.actions.setUser({
            userId : response.data.userId,
            accessToken : response.data.accessToken,
            nickname : response.data.nickname
          }),
        );
        EncryptedStorage.setItem(
          'accessToken',
          response.data.accessToken
        )
        EncryptedStorage.setItem(
          'refreshToken',
          response.data.refreshToken
        )

      } catch (error) {
         // 정지유저 400
          if (error.response.status === 400) {
            dispatch(
              userSlice.actions.setUser({
                userId : '',
                accessToken : '',
                nickname : ''
              }),
            );
            EncryptedStorage.removeItem('userId')
            EncryptedStorage.removeItem('accessToken')
            EncryptedStorage.removeItem('refreshToken')
            Alert.alert('알림', '사용이 정지된 회원입니다. 고객센터를 통해 문의 해주세요')
          }
          // access토큰 만료시 403
          if (error.response.status === 403) {
            try {
              const userId = await EncryptedStorage.getItem('userId');
              const refreshToken = await EncryptedStorage.getItem('refreshToken');
              const response = await axios({
                method : 'post',
                url : 'http://i7d205.p.ssafy.io/api/checktoken',
                data : {
                  userId: userId,
                  refreshToken: refreshToken
                }
              });
              // accessToken 신규 발급
              await EncryptedStorage.setItem('accessToken', response.data)
              dispatch(
                userSlice.actions.setUser({
                  accessToken : response.data
                })
              )
            } catch {
              if (error.response.status === 403) {
                dispatch(
                  userSlice.actions.setUser({
                    userId : '',
                    accessToken : '',
                    nickname : ''
                  }),
                );
                EncryptedStorage.removeItem('userId')
                EncryptedStorage.removeItem('accessToken')
                EncryptedStorage.removeItem('refreshToken')
              }
            } finally {
              SplashScreen.hide();
            }
          }

      } finally {
            SplashScreen.hide();
      }
    }
    getTokenAndRefresh();
  }, [dispatch]);


 
  return (
    <>
      <NavigationContainer>
        {accessToken ? (
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
            tabBarActiveTintColor : 'rgb(0, 197, 145)',
            tabBarInactiveTintColor : 'grey',
            headerShown : false,
            tabBarHideOnKeyboard : true,
            tabBarStyle : {height:50}
          })}
        >
          <Tab.Screen name="홈" component={HomeScreen} />
          <Tab.Screen name="채팅" component={ChattingScreen} />
          <Tab.Screen name="매칭" component={MatingScreen} />
          <Tab.Screen name="프로필" component={ProfileScreen} />
          <Tab.Screen name="설정" component={SettingScreen} />
      </Tab.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>  
                <Stack.Screen
                name="SignIn"
                component={SignIn}
                />
                <Stack.Screen
                name="SignUp"
                component={SignUp}
                />
                <Stack.Screen
                name="FindInfo"
                component={FindInfo}
                />
            </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

export default AppInner;