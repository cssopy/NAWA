import React, { useState } from "react";
import {Alert, StyleSheet, Text, View } from 'react-native'

import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

import EncryptedStorage from 'react-native-encrypted-storage';
import { useCallback, useEffect } from "react";
import { Button, normalize } from "@rneui/themed";
import axios from "axios";
import { Dimensions } from "react-native";
import { black } from "react-native-paper/lib/typescript/styles/colors";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


const ChattingMain = ({ navigation }) => {
  const userId = useSelector((state : RootState) => state.user.userId)
  const accessToken = useSelector((state : RootState) => state.user.accessToken)
  const [friends, setFriends] = useState([]);

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

  console.log(friends)

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#ddd' }}>
      <Text style={{fontSize: 20, color: "black", marginTop: SCREEN_HEIGHT*0.03, marginBottom: SCREEN_HEIGHT*0.03, }}>Nawa 친구 목록</Text>
      {friends.map((item, idx) => {
        return (
        <Button buttonStyle={styles.chatButton} key={idx} onPress={() => navigation.navigate('ChattingRoom', {targetname : item.nickname})} title={'ChattingRoom'} titleStyle={styles.chatText}>
          {item.nickname} 
        </Button>
        )
      })}
    </View>
  );
}

export default ChattingMain;

const styles = StyleSheet.create({
  chatButton: {
    backgroundColor: "white",
    width: SCREEN_WIDTH*0.95,
    height: SCREEN_WIDTH*0.15,
  },
  chatText: {
    color: "black",
    fontSize: 18,
    fontWeights: "100",
  }
})