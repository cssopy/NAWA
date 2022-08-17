import React, { useState } from "react";
import {Alert, Text, View} from 'react-native'
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import EncryptedStorage from 'react-native-encrypted-storage';
import { useCallback, useEffect } from "react";
import {useAppDispatch} from '../../store';
import axios from "axios";
import { CheckBox } from "@rneui/themed";


import constants from '../../constants';
import * as Progress from 'react-native-progress';
import { Button } from "@rneui/themed";
import { Dimensions } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import matchingSlice from "../../slices/matching";
import Ionicons from 'react-native-vector-icons/Ionicons';
import WhatCategory from "../../components/WhatCategory";


// firebase 클라우드
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from "react-native-paper";

const Mate4 = () => {
  const dispatch = useAppDispatch();

  const userId = useSelector((state : RootState) => state.user.userId);
  const ment = useSelector((state : RootState) => state.matching.ment);
  const category = useSelector((state : RootState) => state.matching.category);
  const location = useSelector((state : RootState) => state.matching.location);
  const distance = useSelector((state : RootState) => state.matching.distance);
  const target = useSelector((state : RootState) => state.matching.target)
  const accessToken = useSelector((state : RootState) => state.user.accessToken);
  
  const [targetPoint, setTargetPoint] = useState(100);

  const [request, setRequest] = useState(false);
  const [requestN, setRequestN] = useState(0);
  const [myrequest, setMyRequest] = useState(false);
  const [myrequestN, setMyRequestN] = useState(0);


  const userMannerPoint = async () => {
    try {
      const response = await axios({
        method : 'get',
        url : `http://i7d205.p.ssafy.io/api/user/${target.userId}`,
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
      setTargetPoint(response.data.point)
    }
    catch (error) {
      console.log(error)
    }
  }

  // 신청 받았을때
  const checkRequest = async () => {
    try {
      const response = await axios({
        method : 'get',
        url : `http://i7d205.p.ssafy.io/api/add-mate/${userId}`,
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
      const listing = response.data
      console.log('내가 받은 신청 정보', listing)

      listing.forEach(item => {
        if (item.addMateFrom === target.userId) {
          setRequest(true)
          setRequestN(item.addMateId)
        }
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  // 내가 신청 했을때
  const checkMyRequest = async () => {
    try {
      const response = await axios({
        method : 'get',
        url : `http://i7d205.p.ssafy.io/api/add-mate/${target.userId}`,
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
      const listing = response.data
      console.log('상대방이 받은 신청 정보', listing)

      listing.forEach(item => {
        if (item.addMateFrom === userId) {
          setMyRequest(true)
          setMyRequestN(item.addMateId)
        }
      });
    }
    catch (error) {
      console.log(error)
    }
  }

  // 거절
  const reject = async () => {
    try {
      const response = await axios({
        method : 'delete',
        url : `http://i7d205.p.ssafy.io/api/add-mate/${requestN}`,
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
    }
    catch (error) {
      console.log(error)
    }
  }

  // 승낙
  const accept = async () => {
    try {
      const response = await axios({
        method : 'put',
        url : `http://i7d205.p.ssafy.io/api/add-mate/${requestN}`,
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
      const response2 = await axios({
        method : 'put',
        url : `http://i7d205.p.ssafy.io/api/add-mate/${myrequestN}`,
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
    }
    catch (error) {
      console.log(error)
    }
  }

  // 원래 친구인지 확인
  const friend = async () => {
    try {
      const response = await axios({
        method : 'get',
        url : `http://i7d205.p.ssafy.io/api/mate/${userId}`,
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
      console.log('dwd',response.data)
    }
    catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    userMannerPoint()
    checkRequest()
    checkMyRequest()
    friend()

    console.log('reqest!!!!!!!!!', request, requestN)
    console.log('myreqest!!!!!!!!!', myrequest, myrequestN)
  },[])

  const finalCheack = () => {
    if (request && myrequest) {
      accept()
      Alert.alert('나와!', '메이트 성공! 채팅 Open!')
    } else {
      reject()
    }
  }
  finalCheack()

  




  return (
    <View style={{flexDirection:'column', height : SCREEN_HEIGHT - 50, backgroundColor:'lightgrey'}}>
      
      <View style={{flex:1, backgroundColor:'white',borderRadius:10, marginHorizontal:5, marginTop:5}}>
        <View style={{backgroundColor:'rgb(0, 197, 145)', borderRadius:5, elevation:8}}>
          <Text style={{color:'white', fontSize:20, fontWeight:"600", padding:5, textAlign:'center'}}>메이트가 되었을까요 ?</Text>
        </View>
        {request===false && myrequest===false && <Text style={{color:'black', fontSize:20, fontWeight:"600", padding:5, textAlign:'center'}}>Woops! 서로 신청하지 않았어요.. 실패!</Text> }
        {request===true && myrequest===false && <Text style={{color:'black', fontSize:20, fontWeight:"600", padding:5, textAlign:'center'}}>Woops! 한명만 신청했어요.. 실패!</Text> }
        {request===false && myrequest===true && <Text style={{color:'black', fontSize:20, fontWeight:"600", padding:5, textAlign:'center'}}>Woops! 한명만 신청했어요.. 실패!</Text> }
        {request===true && myrequest===true && <Text style={{color:'black', fontSize:20, fontWeight:"600", padding:5, textAlign:'center'}}>Wow! 두명 다 신청했어요! 성공!</Text> }

      </View>
      
      <View style={{flex:3, backgroundColor:'white', borderRadius:10, marginHorizontal:5, marginTop:5}}>
      </View>
      
      <View style={{flex:3, backgroundColor:'white', borderRadius:10, marginHorizontal:5, marginVertical:5}}>
      </View>
{/* 
      
      <Text style={{color:'black'}}></Text>
      <Text style={{color:'black'}}>{targetPoint}</Text> */}
    </View>
  );
}

export default Mate4;