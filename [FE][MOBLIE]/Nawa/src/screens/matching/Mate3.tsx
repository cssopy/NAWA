import React, { useCallback, useEffect, useRef, useState  } from "react";
import {Text, View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, SafeAreaView, TextInput, Modal} from 'react-native'

import constants from '../../constants';
import {useAppDispatch} from '../../store';
import * as Progress from 'react-native-progress';
import { Button } from "@rneui/themed";
import { RootState } from '../../store/reducer';
import { useSelector } from 'react-redux';
import { Dimensions } from "react-native";
import NaverMapView, {Circle, Marker, Path} from "react-native-nmap";

import matchingSlice from "../../slices/matching";
import Swiper from "react-native-swiper";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import WhatCategory from "../../components/WhatCategory";

// firebase 클라우드
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");





const Mate3 = ( {navigation} ) => {
  const dispatch = useAppDispatch();
  // Online matching
  const [realTime, setRealTime] = useState([]);
  const [sortedUser, setSortedUser] = useState([]);
  const [online, setOnline] = useState(false);
  const [onAir, setOnAir] = useState(false);
  
  
  const nickname = useSelector((state : RootState) => state.user.nickname);
  const userId = useSelector((state : RootState) => state.user.userId);
  const ment = useSelector((state : RootState) => state.matching.ment);
  const category = useSelector((state : RootState) => state.matching.category);
  const location = useSelector((state : RootState) => state.matching.location);
  const distance = useSelector((state : RootState) => state.matching.distance);
  const [offerState, setOfferState] = useState({
    userId : '선택된 유저가 없습니다.',
    nickname : '선택된 유저가 없습니다.',
    distance : 0,
    location : {latitude : 0, longitude:0},
    category : [],
    ment : '선택된 유저가 없습니다.'
});
  const [cancleTarget, setCalcelTarget] = useState('');

  const [onLocation, setOnLocation] = useState({longitude : location.longitude , latitude : location.latitude});
  const [nawaDistance, setNawaDistance] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);


  const [target, setTarget] = useState({longitude : location.longitude , latitude : location.latitude})


  const LargeTextInput = (props) => {
    return (
      <TextInput
        {...props}
        editable={false}
      />
    );
  }


  const userInit = async () => { 
      const onWaiting = firestore().collection('waitingRoom').doc(nickname);
      await onWaiting.set({
        userId : userId,
        nickname : nickname,
        distance : distance,
        location : location,
        category : category,
        ment : ment
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
    setOnLocation(location)
    setNawaDistance(0)
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
  }

  // 실시간 매칭 유저 조회
  useEffect( () => {
      function onResult(QuerySnapshot) {
        getData()
      }
      function onError(error) {
        console.error(error);
      }
      firestore().collection('waitingRoom').onSnapshot(onResult, onError);
  },[])
  



  // 상대방 콜하기
  const callTarget = async (target) => {
    setCalcelTarget(target)
    setOnline(true);
    setModalVisible(true);
    userOut(nickname);

    const onWaiting = firestore().collection('dataChannel').doc(target);
    await onWaiting.set({
      offer : {
        userId : userId,
        nickname : nickname,
        distance : distance,
        location : location,
        category : category,
        ment : ment
      },
      waiting : null
    })
    
    async function onResult(QuerySnapshot) {
      const changing = await firestore().collection('dataChannel').doc(target).get();
      const data = changing.data()
      if (data.waiting === false) {
        const rejected = async (targetName) => {
          firestore()
            .collection('dataChannel')
            .doc(targetName)
            .delete()
            .then( () => {
              setOnline(false);
              userInit()
              setModalVisible(false);
              setModalVisible2(false);
            })
        }
        rejected(target)
        return ;
      }
      if (data.waiting === true) {
        dispatch(
          matchingSlice.actions.setTarget({
            target : data.answer
          }));

        dispatch(
          matchingSlice.actions.setS({
            settings : target
          }));

          setOnline(false);
          setModalVisible(false);
        navigation.navigate('OpenRTC');
      }
    }
    function onError(error) {
      console.error(error);
    }
    firestore().collection('dataChannel').doc(target).onSnapshot(onResult, onError);
  }
  

  // 요청 정보 보기
  useEffect( () => {
      async function onResult(QuerySnapshot) {
        if (onAir) return 
        
        // 나에대한 요청이 존재하는지
        const changing = await firestore().collection('dataChannel').doc(nickname).get();
        const data = changing.data()
        if (!!data) { 
          console.log('존재한다!!!')
          
          // 상대정보 저장
          const offer = await firestore().collection('dataChannel').doc(nickname).get();
          const offerInfo = offer.data()
          dispatch(
            matchingSlice.actions.setTarget({
              target : offerInfo.offer
            })
          )
          setOfferState(offerInfo.offer)
          userOut(nickname)
          setOnAir(true)
          setModalVisible2(true)
        }
      }
      function onError(error) {
        console.error(error);
      }

      firestore().collection('dataChannel').doc(nickname).onSnapshot(onResult, onError);
  },[])
  
  // 요청 승낙
  const accentCall = async () => {

    const onWaiting = firestore().collection('dataChannel').doc(nickname);
      await onWaiting.update({
        answer : {
          userId : userId,
          nickname : nickname,
          distance : distance,
          location : location,
          category : category,
          ment : ment
        },
        waiting : true
      }).then( () => {
        setOnline(true);
      });

    const changing = await firestore().collection('dataChannel').doc(nickname).get();
    const data = changing.data()

    dispatch(
      matchingSlice.actions.setS({
        settings : nickname
      })
    );
    dispatch(
      matchingSlice.actions.setTarget({
        target : data.offer
      })
    );
    setOnAir(false)
    setModalVisible2(false)
    navigation.navigate('JoinRTC')  
  }

  //요청 거절
  const rejectCall = async () => {
    setModalVisible2(false)
    const onWaiting = firestore().collection('dataChannel').doc(nickname);
    if (onWaiting) {
      await onWaiting.update({
        waiting : false
      }).then( () => {
      });

      dispatch(
        matchingSlice.actions.setS({
          settings : ''
        })
      );
      dispatch(
        matchingSlice.actions.setTarget({
          target : ''
        })
      );
    }
      setOnAir(false)
      setModalVisible2(false)
  }



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

  const changingTarget = (targetLocation) => {
    const distance = (((location.latitude - targetLocation.latitude)**2 + (location.longitude - targetLocation.longitude)**2)**0.5*100).toFixed(2)
    setNawaDistance(distance)
    setOnLocation(targetLocation)
  }

  // 매칭 대기열 정리하기
  useFocusEffect(
    useCallback(() => {
      //대기열 정리
      userOut(nickname)
      // 매칭요청 정리
      firestore()
        .collection('dataChannel')
        .doc(nickname)
        .delete()
        .then()
      // RTC 요청 정리
      const db = firestore();
      const roomRef = db.collection('MATCHING_GUMI').doc(nickname);
      roomRef.delete().then();
      const roomRef2 = db.collection('MATCHING_GUMI').doc(cancleTarget);
      roomRef2.delete().then();
      setModalVisible(false)
      setModalVisible2(false)
      
      return () => {
        //대기열 정리
        userOut(nickname)
        // 매칭요청 정리
        firestore()
          .collection('dataChannel')
          .doc(nickname)
          .delete()
          .then()
        // RTC 요청 정리
        const db = firestore();
        const roomRef = db.collection('MATCHING_GUMI').doc(nickname);
        roomRef.delete().then();
        const roomRef2 = db.collection('MATCHING_GUMI').doc(cancleTarget);
        roomRef2.delete().then();
        setModalVisible(false)
        setModalVisible2(false)
      }
    }, [])
  );




  return (
    <View style={{height:SCREEN_HEIGHT - 50}}>
      {/* 콜할때 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <View style={{position:"absolute",justifyContent:'center', flexDirection:"column",alignItems:'center', width:SCREEN_WIDTH/4*3, height:150, top:SCREEN_HEIGHT/2 - 100, backgroundColor:'white', elevation:10, borderRadius:10, alignSelf:'center'}}>
          <ActivityIndicator size={"large"} color="rgb(0, 197, 145)" ></ActivityIndicator>
          <Text style={{ color:'black', textAlign:"center", margin:5, fontSize:25}}>상대방의 수락을</Text>
          <Text style={{ color:'black', textAlign:"center", margin:5, fontSize:25}}>기다리는 중이에요.</Text>
        </View>
      </Modal>


      {/* 받을때 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        >
        {offerState &&
        <View style={{position:"absolute", flexDirection:"column",alignItems:'center', width:SCREEN_WIDTH/4*3, height:250, top:SCREEN_HEIGHT/2 - 100, backgroundColor:'white', elevation:10, borderRadius:10, alignSelf:'center'}}>
          <Text style={{flex:1, color:'black', fontSize:20, textAlign:"center"}}>{offerState.nickname}님의</Text>
          <Text style={{flex:1, color:'black', fontSize:20, textAlign:"center", marginTop:-10}}>나와! 요청이 도착했습니다.</Text>

          <View style={{flex:1, flexDirection:'row', alignItems:'center', marginLeft:4}}>
            <View style={{flexDirection:"row"}}>
              {offerState.category.map((item, idx) => {
                return (WhatCategory(item, idx))
              })}
            </View>
          </View>                        

          <View style={{flex:1, borderRadius:10, backgroundColor:'lightgrey', marginHorizontal:10}}>
            <LargeTextInput
              multiline
              numberOfLines={2}
              value={offerState.ment}
              color={'black'}
              margin={5}
              marginHorizontal={12}
              fontSize={15}
            />
          </View>

          <View style={{flex:1, flexDirection:'row', marginTop:10}}>
            <Button containerStyle={{marginHorizontal:5}} onPress={() => accentCall()} title={'승낙하기'}></Button>
            <Button containerStyle={{marginHorizontal:5}} onPress={() => rejectCall()} title={'거절하기'}></Button>
          </View>
        </View>
        }
      </Modal>


        <View style={styles.topBox}>
          <View style={styles.infoBox}>
            <Ionicons style={{marginLeft:2}} onPress={() => navigation.navigate('Mate2')} size={22} name='arrow-back-outline' color='white' />
            <Text style={{color:'white'}}> 나와 광장</Text>
            <Ionicons size={20} name='arrow-forward-outline' color='rgb(0, 197, 145)' />
          </View>
          <Progress.Bar style={{marginHorizontal:4, borderColor: 'rgb(0, 197, 145)'}} progress ={1} width={constants.width - 10} height={6} unfilledColor={'white'} />
        </View>  


        <View style={{height:SCREEN_HEIGHT - 50}}>
        {(modalVisible || modalVisible2) && <View style={{position:"absolute", width:SCREEN_WIDTH, height:SCREEN_HEIGHT,backgroundColor:'black', opacity:0.3, zIndex:6}}></View>}

          <NaverMapView style={{width: '100%', height: '100%', zIndex:-2}}
            center={{...onLocation, zoom: zooming(distance)}}
            onCameraChange={e =>  {setTarget({longitude : e.longitude , latitude : e.latitude})}}
            showsMyLocationButton={false}
            compass={false}
            zoomControl={false}
            mapType={4}
          >
            <Marker width={30} height={40} coordinate={location} pinColor={'blue'} caption={{ text:`나의 위치`, textSize:15, color:'red'}}/>
            { online ? 
            <>
              <Path coordinates={[location, onLocation]} color={'rgb(0, 197, 145)'} width={2}/>
              {sortedUser.map( (userData, idx) => {
                    return (
                    <Marker key={idx} width={20} height={25} coordinate={userData.location}>
                      <View style={{backgroundColor:'white', zIndex:5, borderRadius:10}}></View>
                    </Marker>
                    )
                  }
                )
              }
            </>
            :
              <></>
            }
            {!!nawaDistance && online && <Marker width={40} height={50} pinColor={'red'}  coordinate={onLocation} caption={{ text:`나와 ${nawaDistance} km 거리 `, textSize:19}}/>}
          </NaverMapView>

          <View style={{flexDirection:"row", justifyContent:'space-between', position:"absolute", top:0, borderRadius:30, padding:5 , marginLeft:5 }}>
            {online ?
              <Button onPress={() => {userOut(nickname); setOnline(false);}} buttonStyle={{borderRadius:20}} containerStyle={{flex:1, elevation:8}}>
                <Text style={{justifyContent:'center', fontSize:19, color:'white'}}>매칭중. . .   현재 {realTime.length} 명   </Text>
                <ActivityIndicator size={"small"} color="white" ></ActivityIndicator>
              </Button>
            :
              <Button onPress={() => {userInit(); setOnline(true);}} buttonStyle={{borderRadius:20}} containerStyle={{flex:1, elevation:8}}>
                <Text style={{alignItems:"baseline", fontSize:19 , color:'white'}} > 실시간 대기열 입장 </Text>
              </Button>
            }

            <Button onPress={() => {setOnLocation(location); setNawaDistance(0);}}
            buttonStyle = {{ borderRadius:50, elevation:9 }}
              title={<Ionicons  style={{textAlign:"center" }}  name='locate' size={25} color='white' />}
            >
            </Button>

          </View>
          
          {online &&
          <View style={{bottom:30, position:'absolute', width:SCREEN_WIDTH, height:175, zIndex:5}}>
            <Swiper style={{ borderRadius:50 }}  
              showsPagination={false}
              showsButtons={true} 
              loop={false} 
              onIndexChanged={(idx) => {
                changingTarget(sortedUser[idx].location);
                }}
            >
              
              {sortedUser.map((item, idx) => {
                  return (
                    <View key={idx} style={styles.slider}>
                      <View style={{flex:2, flexDirection:"row", backgroundColor:'white', borderRadius:10, alignItems:'center', justifyContent:'space-between', elevation:3}}>
                      
                        <View style={{ borderRadius:10, backgroundColor:'rgb(0, 197, 145)', marginLeft:3}}><Text style={{fontSize:17, color:'white', padding:7}}>{item.nickname} 님</Text>
                        </View>

                        <View style={{flexDirection:'row', alignItems:'center', marginLeft:4}}>
                          <View style={{flexDirection:"row"}}>
                          {item.category.map((item, idx) => {
                            return (WhatCategory(item, idx))
                          })}
                          </View>
                        </View>

                      </View>
                        

                      <View style={{flex:4, borderRadius:10}}>
                        <LargeTextInput
                          multiline
                          numberOfLines={2}
                          value={item.ment}
                          color={'black'}
                          margin={5}
                          marginHorizontal={12}
                          fontSize={15}
                        />
                      </View>


                      <Button onPress={() => callTarget(item.nickname)} containerStyle={{flex:2}} title={'나와! (영상통화)'}></Button>

                    </View>
                  )
              })}
            </Swiper>
          </View>
          }
        </View>

      
      </View>
    );
  }


const styles = StyleSheet.create({
  slider : {
    flexDirection:'column',
    height:150,
    margin : 10,
    backgroundColor:'white',
    borderRadius:20,
    elevation : 9
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
    zIndex:10
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