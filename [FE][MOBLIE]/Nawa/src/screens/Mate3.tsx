import React, { useEffect, useRef, useState  } from "react";
import {Text, View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, SafeAreaView, TextInput} from 'react-native'

import constants from '../constants';
import {useAppDispatch} from '../store';
import * as Progress from 'react-native-progress';
import { Button } from "@rneui/themed";
import { RootState } from '../store/reducer';
import { useSelector } from 'react-redux';
import { Dimensions } from "react-native";
import NaverMapView, {Circle, Marker, Path} from "react-native-nmap";

import matchingSlice from "../slices/matching";
import Swiper from "react-native-swiper";
import Ionicons from 'react-native-vector-icons/Ionicons';

import WhatCateGory from "../components/WhatCategory";

// firebase 클라우드
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from "react-native-paper";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");





const Mate3 = ( {navigation} ) => {
  const dispatch = useAppDispatch();
  // Online matching
  const [realTime, setRealTime] = useState([]);
  const [sortedUser, setSortedUser] = useState([]);
  const [online, setOnline] = useState(false);
  const [onAir, setOnAir] = useState(false);
  
  const nickname = useSelector((state : RootState) => state.user.nickname);
  const category = useSelector((state : RootState) => state.matching.category);
  const location = useSelector((state : RootState) => state.matching.location);
  const distance = useSelector((state : RootState) => state.matching.distance);
  const [onLocation, setOnLocation] = useState({longitude : location.longitude , latitude : location.latitude});
  
  const [target, setTarget] = useState({longitude : location.longitude , latitude : location.latitude})
 
  

  const userMannerPoint = () => {

  }

  const userInit = async () => { 
      const onWaiting = firestore().collection('waitingRoom').doc(nickname);
      await onWaiting.set({
        nickname : nickname,
        distance : distance,
        location : location,
        category : category
      }).then( () => {
        setOnline(true);
      }
      );
    }

  const userOut = async (targetName) => {
    firestore()
      .collection('waitingRoom')
      .doc(targetName)
      .delete()
      .then( () => {
        setOnline(false);
        console.log(`${targetName} 유저가 대기열을 떠났습니다.`)
      })
  }


  
  
  
  // 대기열 등록
  const getData = async () => {
    const onWaiting = await firestore().collection('waitingRoom').get();
    const temp = []
    onWaiting.forEach(element => {
      if (element.data().nickname != nickname)
      temp.push(element.data())
    });
    setRealTime(temp)
    // console.log(realTime)
  }
  useEffect( () => {
      function onResult(QuerySnapshot) {
        getData()
      }
      function onError(error) {
        console.error(error);
      }
      firestore().collection('waitingRoom').onSnapshot(onResult, onError);
  },[])
  

  // 매칭 성사
  

  const getData2 = async () => {
    const onWaiting = await firestore().collection('MATCHING_GUMI').doc(nickname).get();
    // console.log(onWaiting.data())
    if (onAir) return 

    if (!!onWaiting.data()) {
      setOnAir(true)
      Alert.alert('알림', '누군가 당신에게 나와! 라고 외쳤습니다. 곧 화상채팅이 연결 됩니다.')
      dispatch(
        matchingSlice.actions.setS({
          settings : nickname
        })
      )      
      navigation.navigate('JoinRTC')
    }
  }

  useEffect( () => {
      function onResult(QuerySnapshot) {
        getData2()
      }
      function onError(error) {
        console.error(error);
      }
      firestore().collection('MATCHING_GUMI').onSnapshot(onResult, onError);
  },[])


  // 자동정렬 (거리)
  useEffect( () => {
    const sort_item = realTime.sort((a, b) => {
      const aa = location.latitude - a.location.latitude; 
      const bb = location.longitude - b.location.longitude; 
      if ( aa > bb) {
        return 1;
      }
      if ( aa < bb) {
        return -1;
      }
      return 0
    });
    setSortedUser(sort_item)
    
  }, [realTime])

  const zooming = (distance) => {
    if (distance < 130) {
      return 17;
    } else if (distance < 200) {
      return 16;
    } else if (distance < 350) {
      return 15;
    } else if (distance < 600) {
      return 14;
    } else if (distance < 1200) {
      return 13;
    } else if (distance < 2300) {
      return 12;
    } else {
      return 11;
    }
  }

  const changingTarget = (location) => {
    setOnLocation(location)
  }




  return (
    <View style={{height:SCREEN_HEIGHT - 50}}>
        <View style={styles.topBox}>
          <View style={styles.infoBox}>
            <Ionicons style={{marginLeft:2}} onPress={() => navigation.navigate('Mate2')} size={22} name='arrow-back-outline' color='white' />
            <Text style={{color:'white'}}>난입 준비</Text>
            <Ionicons size={20} name='arrow-forward-outline' color='rgb(0, 197, 145)' />
          </View>
          <Progress.Bar style={{marginHorizontal:4, borderColor: 'rgb(0, 197, 145)'}} progress ={0.75} width={constants.width - 10} height={6} unfilledColor={'white'} />
        </View>  


        <View style={{height:SCREEN_HEIGHT - 50}}>
          <NaverMapView style={{width: '100%', height: '100%', zIndex:-2}}
            center={{...onLocation, zoom: zooming(distance)}}
            onCameraChange={e =>  {setOnLocation({longitude : e.longitude , latitude : e.latitude})}}
            showsMyLocationButton={false}
            compass={false}
            zoomControl={false}
          >
                <Marker coordinate={location} caption={{ text:`${nickname} 님`, textSize:15}}/>
                { online ? 
                  sortedUser.map( (userData, idx) => {
                    return <Marker pinColor="blue" key={idx} coordinate={userData.location} caption={{ text:`${userData.nickname} 님`, textSize:15}}/>
                    }
                  )
                  :
                  <></>
                }
          </NaverMapView>
          <View style={{flexDirection:"row", position:"absolute", top:0, borderRadius:30, padding:5 , marginLeft:5 }}>
            {online ?
              <Button onPress={() => {userOut(nickname); setOnline(false);}} buttonStyle={{borderRadius:20}} containerStyle={{elevation:8}}>
                <Text style={{justifyContent:'center', fontSize:19, color:'white'}}>매칭중...   </Text>
                <ActivityIndicator size={"small"} color="white" ></ActivityIndicator>
              </Button>
            :
            <Button onPress={() => {userInit(); setOnline(true);}} buttonStyle={{borderRadius:20}} containerStyle={{elevation:8}}>
              <Text style={{alignItems:"baseline", fontSize:19 , color:'white'}} > 실시간 대기열 입장 </Text>
            </Button>}
            <Button onPress={() => setOnLocation(location)}>
              <Ionicons  style={{flex:1 ,textAlign:"center",alignSelf:"flex-end" }}  name='locate' size={35} color='red' />
            </Button>

          </View>
          
          {online &&
          <View style={{bottom:30, position:'absolute', width:SCREEN_WIDTH, height:200}}>
            <Swiper style={{ borderRadius:50 }} showsButtons={true} onIndexChanged={(index) => {console.log(index)}} >
              
              {sortedUser.map((item, idx) => {
                  return (
                    <View key={idx} style={styles.slider}>
                      <View style={{flex:1, flexDirection:"row", backgroundColor:'white', borderRadius:10, justifyContent:'center', alignItems:'center'}}>
                        <View style={{backgroundColor:'rgb(0, 197, 145)', borderRadius:20,  elevation:8}}><Text style={{fontSize:18, color:'white', padding:5}}>{item.nickname}</Text></View>
                        <View style={{backgroundColor:'white', borderRadius:20, elevation:8}}><Text style={{fontSize:18, color:'black', padding:4}}>{(((location.latitude - item.location.latitude)**2 + (location.longitude - item.location.longitude)**2)**0.5).toFixed(2)} km</Text></View>
                        
                        
                        {item.category.map((item, idx) => {
                          return (WhatCateGory(item, idx))
                        })}
                      
                      </View>
                      <View style={{flex:3, backgroundColor:'grey', borderRadius:10}}>

                      </View>
                    </View>
                  )
              })}
            </Swiper>
          </View>
          }
        </View>

        {online ?
        <ScrollView style={{marginTop:4}}>
        {sortedUser.map((item, idx) => {
          if (item.nickname !== nickname) {
          return (
          <View key={idx} style={{flexDirection:"row" , justifyContent:'center', width:constants.width}}>
            <Button style={{flex:5 }} onPress={() => changingTarget(item.location)}>{item.nickname}님 / {(((location.latitude - item.location.latitude)**2 + (location.longitude - item.location.longitude)**2)**0.5).toFixed(3)} km</Button>
            <Button color='red' style={{flex:2}} 
              onPress={() => {
                dispatch(
                  matchingSlice.actions.setS({
                    settings : item.nickname
                  })
                  )
                  userOut(nickname)
                  userOut(item.nickname)
                navigation.navigate('OpenRTC');
              }}>시작하기</Button>
          </View>
          )  
        }
        })}
        </ScrollView> : <></>}
      </View>
    );
  }


const styles = StyleSheet.create({
  slider : {
    flexDirection:'column',
    height:170,
    margin : 10,
    elevation:8
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold'
  },
  topBox : {
    backgroundColor:'rgb(0, 197, 145)',
    shadowColor: "black", //그림자색
    shadowOpacity: 1,//그림자 투명도
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
    width: constants.width,
    height : 35,
  },
  infoBox : {
    flexDirection : 'row',
    justifyContent : "space-between",
    alignItems : 'center',
    marginHorizontal : 0,
    marginBottom : 2,
    width : constants.width - 6,
    height : 20,
    zIndex:5
  },
  body: {
    backgroundColor: '#fff',

    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFill,
  },
  remoteStream: {
    width: constants.width,
    height: constants.height,
    borderColor:'white'
  },
  localStream : {
    position : "absolute",
    backgroundColor:'black',
    borderRadius:20,
    width:150,
    height:180,
    left:constants.width/14
  },
  buttons: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
})

export default Mate3;