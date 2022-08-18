import React, { useState } from "react";
import {Alert, Text, View} from 'react-native'

import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

import EncryptedStorage from 'react-native-encrypted-storage';
import { useCallback, useEffect } from "react";
import { Button } from "@rneui/themed";
import axios from "axios";



const ChattingMain = ({ navigation }) => {
  const userId = useSelector((state : RootState) => state.user.userId)
  const accessToken = useSelector((state : RootState) => state.user.accessToken)
  const [frieds, setFriends] = useState([]);

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
  },[])

  console.log(frieds)

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>대화 목록!</Text>
      {frieds.map((item, idx) => {
        return (
        <Button key={idx} onPress={() => navigation.navigate('ChattingRoom', {targetname : item.nickname})} title={'ChattingRoom'}>{item.nickname} 님</Button>
        )
      })}        
    </View>
  );
}

export default ChattingMain;