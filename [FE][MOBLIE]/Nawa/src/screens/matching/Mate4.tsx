import React, { useState, useTransition } from "react";
import {Alert, Modal, Text, TextInput, View} from 'react-native'
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

import userSlice from "../../slices/user";

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
  const [friendly, setFriendly] = useState(false)

  const [visible, setVisible] = useState(false);
  
  const check = useSelector((state : RootState) => state.matching.check)
  const [check2, setCheck2] = useState(false);



  const userMannerPoint = async () => {
    const dispatch = useAppDispatch()
    try {
      const response = await axios({
        method : 'get',
        url : `http://i7d205.p.ssafy.io/api/user/${target.userId}`,
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
      setTargetPoint(response.data.point + 50)
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
                accessToken : '',
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

console.log(userId)
  // 신청 받았을때
  const checkRequest = async () => {
    try {
      const response = await axios({
        method : 'get',
        url : `http://i7d205.p.ssafy.io/api/add-mate/${userId}`,
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
      const listing = response.data.allMateRequest
      console.log('내가 받은 신청 정보', listing)

      listing.forEach(item => {
        if (item.addMateFrom === target.userId) {
          setRequest(true)
          setRequestN(item.addMateId)
        }
      });
    }
    catch (error) {
      console.log(error,'weqeoiuhwq')
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
        catch {
        }
      }
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
      const listing = response.data.allMateRequest
      console.log('상대방이 받은 신청 정보', listing)

      listing.forEach(item => {
        if (item.addMateFrom === userId) {
          setMyRequest(true)
          setMyRequestN(item.addMateId)
        }
      });
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
                accessToken : '',
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


  // 거절

  const accept = async () => {
    try {
    const response = await axios({
      method : 'post',
      url : 'http://i7d205.p.ssafy.io/api/add-mate',
      data : {
        addMateFrom : userId,
        addMateTo : target.userId
      },
      headers : {"Authorization" : `Bearer ${accessToken}`}
    });
      Alert.alert('알림', '전송완료 이제 서로 메이트 입니다!')
  } catch (error) {

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
              accessToken : '',
            }),
          );
          EncryptedStorage.removeItem('userId')
          EncryptedStorage.removeItem('accessToken')
          EncryptedStorage.removeItem('refreshToken')
        }
      }
    }
    else if (error.response.status === 406) {
      Alert.alert('알림', '이미 메이트 랍니다!')
    }
    else {
      Alert.alert('알림', '이미 신청했습니다! 상대방이 수락시 메이트가 됩니다.')
    }
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
      const data = response.data.mateList
      data.forEach(item => {
        if (item.userid === target.userId) {
          setFriendly(true)
          return
        }
      });
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
                accessToken : '',
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


  const pointing1 = async () => {
    try {
      const response = await axios({
        method : 'post',
        url : `http://i7d205.p.ssafy.io/api/user/point`,
        data : {
          "evalType": "나쁨",
          "userId": target.userId
        },
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
      console.log('평가', response.data)
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
                accessToken : '',
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
  const pointing2 = async () => {
    try {
      const response = await axios({
        method : 'post',
        url : `http://i7d205.p.ssafy.io/api/user/point`,
        data : {
          "evalType": "보통",
          "userId": target.userId
        },
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
      console.log('평가', response.data)
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
                accessToken : '',
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
  const pointing3 = async () => {
    try {
      const response = await axios({
        method : 'post',
        url : `http://i7d205.p.ssafy.io/api/user/point`,
        data : {
          "evalType": "좋음",
          "userId": target.userId
        },
        headers : {"Authorization" : `Bearer ${accessToken}`}
      });
      console.log('평가', response.data)
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
                accessToken : '',
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


  const LargeTextInput = (props) => {
    return (
      <TextInput
        {...props}
        editable={false}
      />
    );
  }

    userMannerPoint()
    checkRequest()
    checkMyRequest()
    friend()


  useEffect(() => {
    if (request === true) {
      setVisible(true)
    }
  }, [request])


console.log(check)
  return (
    <View style={{flexDirection:'column', height : SCREEN_HEIGHT - 50, backgroundColor:'lightgrey'}}>
     
     <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        >
        <View style={{position:"absolute", flexDirection:"column",alignItems:'center', width:SCREEN_WIDTH/4*3, height:250, top:SCREEN_HEIGHT/2 - 100, backgroundColor:'white', elevation:10, borderRadius:10, alignSelf:'center'}}>
          <Text style={{flex:1, color:'black', fontSize:20, textAlign:"center"}}>{target.nickname}님의</Text>
          <Text style={{flex:1, color:'black', fontSize:20, textAlign:"center", marginTop:-10}}>메이트 요청이 도착했습니다.</Text>
          <View style={{flex:1, flexDirection:'row', marginTop:10}}>
            <Button containerStyle={{marginHorizontal:5}} onPress={() => {accept(); setVisible(false);}} title={'승낙하기'}></Button>
            <Button containerStyle={{marginHorizontal:5}} onPress={() => setVisible(false)} title={'거절하기'}></Button>
          </View>
        </View>
      </Modal>


      <View style={{flex:1, backgroundColor:'white',borderRadius:10, marginHorizontal:5, marginTop:5}}>
        <View style={{flex:1, backgroundColor:'rgb(0, 197, 145)', borderRadius:5, elevation:8}}>
          <Text style={{color:'white', fontSize:20, fontWeight:"600", padding:5, textAlign:'center'}}>메이트 신청</Text>
        </View>
        <View style={{flex:2, justifyContent:'center'}}>
          {!friendly && request===false && myrequest===false && <Text style={{color:'black', fontSize:20, fontWeight:"600", marginTop:5, padding:5, textAlign:'center'}}>NO! 서로 신청하지 않았어요..</Text> }
          {!friendly && request===true && myrequest===false && <Text style={{color:'black', fontSize:20, fontWeight:"600", marginTop:5, textAlign:'center'}}>메이트 신청 도착!</Text> }
          {!friendly && request===false && myrequest===true && <Text style={{color:'black', fontSize:20, fontWeight:"600", marginTop:5, textAlign:'center'}}>상대방이 수락시 메이트가 됩니다!</Text> }
          {friendly && request===false && myrequest===false && <Text style={{color:'black', fontSize:20, fontWeight:"600", marginTop:5, textAlign:'center'}}>서로 신청 성공! 채팅방이 생성되었어요!</Text> }
        </View>
      </View>
      
      <View style={{flex:3, backgroundColor:'white', borderRadius:10, marginHorizontal:5, marginTop:5}}>
        
        <View style={{flex:1, backgroundColor:'rgb(0, 197, 145)', borderRadius:5, elevation:8}}>
          <Text style={{color:'white', fontSize:20, fontWeight:"600", padding:5, textAlign:'center'}}>상대방 정보</Text>
        </View>
        
        <View style={{flex:7, padding:7}}>
          <View style={{flex:1, flexDirection:'row', alignItems:'center', marginHorizontal:10}}>
            <View style={{flex:1, backgroundColor:'white', elevation:8, zIndex:5, borderRadius:10, marginRight:10}}>
              <Text style={{color:'black', fontSize:15, fontWeight:"600", padding:5, textAlign:'center'}}>{target.nickname} 님</Text>
            </View>  
            <View style={{flex:1, flexDirection:"row"}}>
                {target.category.map((item, idx) => {
                  return (WhatCategory(item, idx))
                })}
            </View>
          </View>    

          <View style={{flex:2, justifyContent:'center', flexDirection:'column', backgroundColor:'white', elevation:8, zIndex:8, marginHorizontal:3, borderRadius:10, padding:2, marginBottom:10}}>
            <Text style={{flex:1, color:'black', fontSize:20, fontWeight:"600", padding:5, textAlign:'center'}}>매너 Rank Point : {targetPoint} 점</Text>
            {targetPoint <= 20 &&
            <View style={{flex:3, flexDirection:'row', margin:5}}>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'rgb(0, 197, 145)', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>최악!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>0 ~ 20</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>나쁨!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>20 ~ 40</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>보통!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>40 ~ 60</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>좋음!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>60 ~ 80</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>최고!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>80 ~ 99</Text></View>
              </View>

            </View>
            }
            {20 < targetPoint && targetPoint <= 40 &&
            <View style={{flex:3, flexDirection:'row', margin:5}}>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>최악!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>0 ~ 20</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'rgb(0, 197, 145)', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>나쁨!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>20 ~ 40</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>보통!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>40 ~ 60</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>좋음!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>60 ~ 80</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>최고!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>80 ~ 99</Text></View>
              </View>

            </View>
            }
            {40 < targetPoint && targetPoint <= 60 &&
            <View style={{flex:3, flexDirection:'row', margin:5}}>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>최악!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>0 ~ 20</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>나쁨!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>20 ~ 40</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'rgb(0, 197, 145)',elevation:8, borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>보통!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>40 ~ 60</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>좋음!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>60 ~ 80</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>최고!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>80 ~ 99</Text></View>
              </View>

            </View>
            }
            {60 < targetPoint && targetPoint <= 80 &&
            <View style={{flex:3, flexDirection:'row', margin:5}}>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>최악!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>0 ~ 20</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>나쁨!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>20 ~ 40</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>보통!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>40 ~ 60</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'rgb(0, 197, 145)', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>좋음!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>60 ~ 80</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>최고!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>80 ~ 99</Text></View>
              </View>

            </View>
            }
            {80 < targetPoint &&
            <View style={{flex:3, flexDirection:'row', margin:5}}>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>최악!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>0 ~ 20</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>나쁨!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>20 ~ 40</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>보통!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>40 ~ 60</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'grey', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>좋음!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>60 ~ 80</Text></View>
              </View>
              <View style={{flex:1, flexDirection:'column', backgroundColor:'rgb(0, 197, 145)', borderRadius:10, margin:2, padding:5}}>
                <View style={{flex:1}}><Text style={{color:'white', fontWeight:'500', alignSelf:'center'}}>최고!</Text></View>
                <View style={{flex:1}}><Text style={{color:'white', alignSelf:'center'}}>80 ~ 99</Text></View>
              </View>

            </View>
            }




          </View>  
        </View>

      </View>
      
      <View style={{flex:2, backgroundColor:'white', borderRadius:10, marginHorizontal:5, marginVertical:5}}>
        <View style={{flex:1, backgroundColor:'rgb(0, 197, 145)', borderRadius:5, elevation:8}}>
          <Text style={{color:'white', fontSize:20, fontWeight:"600", padding:5, textAlign:'center'}}>평가하기</Text>
        </View>
        <View style={{flex:4, flexDirection:'column', backgroundColor:'white'}}>
          <View style={{flex:1}}><Text style={{color:'black', fontSize:15, fontWeight:'500', alignSelf:'center', padding:10}}>상대방의 매너는 어땠나요? 하나 골라주세요</Text></View>
          {!check2 ?
            <View style={{flex:2, flexDirection:'row', marginHorizontal:20}}>
              <View style={{flex:1}}><Button onPress={() => {pointing1(); dispatch(matchingSlice.actions.setCheck(true)); setCheck2(true)}} buttonStyle={{padding:15, margin:5, borderRadius:10}} title={'나빴어요'}></Button></View>
              <View style={{flex:1}}><Button onPress={() => {pointing2(); dispatch(matchingSlice.actions.setCheck(true)); setCheck2(true)}} buttonStyle={{padding:15, margin:5, borderRadius:10}} title={'괜찮아요'}></Button></View>
              <View style={{flex:1}}><Button onPress={() => {pointing3(); dispatch(matchingSlice.actions.setCheck(true)); setCheck2(true)}} buttonStyle={{padding:15, margin:5, borderRadius:10}} title={'좋았어요'}></Button></View>
            </View>
          :
          <View style={{flex:2}}>
              <View style={{flex:1}}><Button disabled={true} buttonStyle={{padding:15, margin:10, borderRadius:10}} title={'이미 평가를 진행했어요 !'}></Button></View>
            </View>
          }
          <View style={{flex:1, backgroundColor:'white', borderRadius:10, justifyContent:'center'}}>
            <Text style={{color:'grey', textAlign:'center'}}>감사합니다. 언제! 어디서나! 나와! 하세요</Text>
          </View>
        </View>
      </View>
{/* 
      
      <Text style={{color:'black'}}></Text>
      <Text style={{color:'black'}}>{targetPoint}</Text> */}
    </View>
  );
}

export default Mate4;