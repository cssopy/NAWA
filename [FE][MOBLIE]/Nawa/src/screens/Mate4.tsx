import React from "react";
import {Alert, Text, View} from 'react-native'
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import EncryptedStorage from 'react-native-encrypted-storage';
import { useCallback, useEffect } from "react";


const Mate4 = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>세팅!</Text>
    </View>
  );
}

export default Mate4;