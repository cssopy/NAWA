import React from "react";
import {Alert, Text, View} from 'react-native'
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import EncryptedStorage from 'react-native-encrypted-storage';
import { useCallback, useEffect } from "react";

// await AsyncStorage.setItem(
//   'userId',
//   userId
// );
// await AsyncStorage.setItem(
//   'accessToken',
//   response.data.accessToken
// );
// await EncryptedStorage.setItem(
//   'refreshToken',
//   response.data.refreshToken,
// );

const SettingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>세팅!</Text>
    </View>
  );
}

export default SettingScreen;