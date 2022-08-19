import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import EncryptedStorage from 'react-native-encrypted-storage';
import { useCallback, useEffect } from "react";


import Video from 'react-native-video';
import {Alert, Text, View, StyleSheet, Button} from 'react-native'
import { useAppDispatch } from "../store";
import userSlice from "../slices/user";

import axios from "axios";

const SettingScreen = () => {
  const userId = useSelector((state : RootState) => state.user.userId)
  const dispatch = useAppDispatch();
  const logOutHAzaJaHuckAAAAAAAAAA = async () => {
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
  
  


  return (
    <>
      <Button title="로그아웃" onPress={() =>logOutHAzaJaHuckAAAAAAAAAA()}></Button>
    </>
  );
}



var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default SettingScreen;





