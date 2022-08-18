import React, { useState } from "react";
import {Alert, Text, View} from 'react-native'

import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

import EncryptedStorage from 'react-native-encrypted-storage';
import { useCallback, useEffect } from "react";
import { Button } from "@rneui/themed";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch } from "../../store";
import userSlice from "../../slices/user";

const ChattingMain = ({ navigation }) => {

  const dispatch = useAppDispatch
  const userId = useSelector((state : RootState) => state.user.userId)
  const accessToken = useSelector((state : RootState) => state.user.accessToken)
  const [frieds, setFriends] = useState([]);


  const friend = async () => {
    try {
      const response = await axios({
        method : 'get',
        url : `http://i7d205.p.ssafy.io/api/mate/${userId}`,
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
      setFriends(response.data.mateList);
    }
    catch (error) {
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
          // accessToken 신규 발급 > 화면 유지
          await EncryptedStorage.setItem('accessToken', response.data)
          dispatch(
            userSlice.actions.setUser({
              accessToken : response.data
            })
            )
        } 
        catch { //refresh 만료 > 로그인화면
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
        }
      }
    }
  }


  useFocusEffect(
    React.useCallback(() => {
      friend()
    }, [])
  );


  useEffect(() => {
    const friend = async () => {
      try {
        const response = await axios({
          method : 'get',
          url : `http://i7d205.p.ssafy.io/api/mate/${userId}`,
          headers : {"Authorization" : `Bearer ${accessToken}`}
        });
        setFriends(response.data.mateList);
      }
      catch (error) {
        console.log(error)
      }
    }
    friend()
  },[userId])


  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{color : 'black'}}>대화 목록!</Text>
      {frieds.map((item, idx) => {
        return (
        <Button key={idx} onPress={() => navigation.navigate('ChattingRoom', {targetname : item.nickname})} title={'ChattingRoom'}>{item.nickname} 님</Button>
        )
      })}        
    </View>
  );
}

export default ChattingMain;