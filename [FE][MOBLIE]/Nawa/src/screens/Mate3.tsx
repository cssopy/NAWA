import React, { useEffect, useRef, useState  } from "react";
import {Text, View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, SafeAreaView, TextInput} from 'react-native'

import constants from '../constants';
import {useAppDispatch} from '../store';
import * as Progress from 'react-native-progress';
import { Button } from "@rneui/themed";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootState } from '../store/reducer';
import { useSelector } from 'react-redux';
import { Dimensions } from "react-native";
import NaverMapView, {Circle, Marker} from "react-native-nmap";

// firebase 클라우드
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from "react-native-paper";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// web RTC
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  mediaDevices,
} from 'react-native-webrtc';



const Mate3 = ( {navigation} ) => {
  const dispatch = useAppDispatch();
  // Online matching
  const [realTime, setRealTime] = useState([]);
  const [sortedUser, setSortedUser] = useState([]);
  const [online, setOnline] = useState(false);
  const [onAir, setOnAir] = useState(false);
  
  const nickname = useSelector((state : RootState) => state.user.nickname);
  console.log(nickname)
  // const nickname = 'phone'
  const category = useSelector((state : RootState) => state.matching.category);
  const location = useSelector((state : RootState) => state.matching.location);
  const distance = useSelector((state : RootState) => state.matching.distance);
  const [onLocation, setOnLocation] = useState({longitude : location.longitude , latitude : location.latitude});
  
  // web RTC
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [channelId, setChannelId] = useState('');

  const pc = useRef();

  // 서버 설정 stun
  const servers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10, // 훕 10개 까지만
  };

  const startCall = async (targetname) => {
    pc.current = new RTCPeerConnection(servers);
    const local = await mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    pc.current.addStream(local);
    setLocalStream(local);

    const remote = new MediaStream();
    setRemoteStream(remote);

    // Push tracks from local stream to peer connection
    local.getTracks().forEach(track => {
      pc.current.getLocalStreams()[0].addTrack(track);
    });

    // Pull tracks from peer connection, add to remote video stream
    pc.current.ontrack = event => {
      event.streams[0].getTracks().forEach(track => {
        remote.addTrack(track);
      });
    };

    pc.current.onaddstream = event => {
      setRemoteStream(event.stream);
    };

    const channelDoc = firestore().collection('MATCHING_GUMI').doc(targetname);
    const offerCandidates = channelDoc.collection('offerCandidates');
    const answerCandidates = channelDoc.collection('answerCandidates');

    setChannelId(targetname);

    pc.current.onicecandidate = async event => {
      if (event.candidate) {
        await offerCandidates.add(event.candidate.toJSON());
      }
    };

    //create offer
    const offerDescription = await pc.current.createOffer();
    await pc.current.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await channelDoc.set({offer});

    // Listen for remote answer
    channelDoc.onSnapshot(async snapshot => {
      const data = snapshot.data();
      if (!pc.current.currentRemoteDescription && data?.answer) {
        console.log('set remote description :', data.answer)
        const answerDescription = new RTCSessionDescription(data.answer);
        await pc.current.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    answerCandidates.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const data = change.doc.data();
          pc.current.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };
  

  const joinCall = async () => {
    pc.current = new RTCPeerConnection(servers);
    const local = await mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    pc.current.addStream(local);
    setLocalStream(local);

    const remote = new MediaStream();
    setRemoteStream(remote);

    // Push tracks from local stream to peer connection
    local.getTracks().forEach(track => {
      pc.current.getLocalStreams()[0].addTrack(track);
    });

    // Pull tracks from peer connection, add to remote video stream
    pc.current.ontrack = event => {
      event.streams[0].getTracks().forEach(track => {
        remote.addTrack(track);
      });
    };

    pc.current.onaddstream = event => {
      setRemoteStream(event.stream);
    };
    

    const channelDoc = firestore().collection('MATCHING_GUMI').doc(nickname);
    const offerCandidates = channelDoc.collection('offerCandidates');
    const answerCandidates = channelDoc.collection('answerCandidates');
    
    setChannelId(nickname);

    pc.current.onicecandidate = async event => {
      if (event.candidate) {
        await answerCandidates.add(event.candidate.toJSON());
      }
    };

    const channelDocument = await channelDoc.get();
    const channelData = channelDocument.data();

    const offerDescription = channelData.offer;
    console.log(offerDescription)


    await pc.current.setRemoteDescription(
      new RTCSessionDescription(offerDescription),
    );

    const answerDescription = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await channelDoc.update({answer});

    offerCandidates.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const data = change.doc.data();
          pc.current.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };




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

  const disconnecting = async () => {
    firestore()
      .collection('MATCHING_GUMI')
      .doc(channelId)
      .delete()
      .then( () => {
        setOnline(false);
        console.log('화상채팅 종료 !')
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
      // Alert.alert('알림', '누군가 당신에게 나와! 라고 외쳤습니다. 곧 화상채팅이 연결 됩니다.')
      return
    }
  }

  // useEffect( () => {
  //     function onResult(QuerySnapshot) {
  //       getData2()
  //     }
  //     function onError(error) {
  //       console.error(error);
  //     }
  //     firestore().collection('MATCHING_GUMI').onSnapshot(onResult, onError);
  // },[])


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

  const conncting = async (targetUser) => {
    userOut(nickname); 
    userOut(targetUser);
    startCall(targetUser)
    // const onWaiting = firestore().collection('MATCHING_GUMI').doc(targetUser);
    // await onWaiting.set({
    //   offer : nickname,
    //   target : targetUser
    // }).then( () => {});
  }



  return (
    <View style={{height:SCREEN_HEIGHT}}>
      {!onAir ?
      <>
        <View style={styles.topBox}>
          <View style={styles.infoBox}>
            <Ionicons style={{marginLeft:2}} onPress={() => navigation.navigate('Mate2')} size={22} name='arrow-back-outline' color='white' />
            <Text style={{color:'black'}}>난입 준비</Text>
            <Ionicons size={20} name='arrow-forward-outline' color='rgb(0, 197, 145)' />
          </View>
          <Progress.Bar style={{marginHorizontal:4, borderColor: 'rgb(0, 197, 145)'}} progress ={0.75} width={constants.width - 10} height={6} unfilledColor={'white'} />
        </View>  


        <View style={{height:SCREEN_HEIGHT/2, borderRadius:20}}>
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
                    return <Marker key={idx} coordinate={userData.location} caption={{ text:`${userData.nickname} 님`, textSize:15}}/>
                    }
                  )
                  :
                  <></>
                }
          </NaverMapView>
          <View style={{flexDirection:"row", position:"absolute", top:SCREEN_HEIGHT/2 - 50, borderRadius:30, padding:5 , marginLeft:5 }}>
            {online ?
            <>
              
              <Button buttonStyle={{}}>
                <ActivityIndicator size={"small"} color="black" ></ActivityIndicator>
                <Text style={{justifyContent:'center', fontSize:19, color:'black'}}>
                  매칭중... 현재 {realTime.length} 명
                </Text>
              </Button>
            </>
            :
              <Text style={{alignItems:"baseline", fontSize:19, color:'black'}} > 매칭 대기열에 입장하세요 </Text>
            }
          </View>
        </View>
        {!online  ? 
          <Button onPress={() => {userInit(); setOnline(true);}} >대기열 입장</Button>
          : 
          <Button onPress={() => {userOut(nickname); setOnline(false);}} >대기열 취소</Button>
        }        
        {online ?
        <ScrollView style={{marginTop:4}}>
        {sortedUser.map((item, idx) => {
          if (item.nickname !== nickname) {
          return (
          <View key={idx} style={{flexDirection:"row" , justifyContent:'center', width:constants.width}}>
            <Button style={{flex:5 }} onPress={() => changingTarget(item.location)}>{item.nickname}님 / {(((location.latitude - item.location.latitude)**2 + (location.longitude - item.location.longitude)**2)**0.5).toFixed(3)} km</Button>
            <Button color='red' style={{flex:2}} onPress={() => {conncting(item.nickname); }}>시작하기</Button>
          </View>
          )  
        }
        })}
        </ScrollView> : <></>}
      <Button onPress={() => {joinCall(); setOnAir(true);}}> 연결확인 </Button>
      </>
      :
      <>
      <KeyboardAvoidingView style={styles.body} behavior="position">
        <SafeAreaView>
          {localStream && (
            <RTCView
              streamURL={localStream?.toURL()}
              objectFit="cover"
              mirror
            />
          )}

          {remoteStream && ( 
            <RTCView
              streamURL={remoteStream?.toURL()}
              style={styles.remoteStream}
              objectFit="cover"
              mirror
            />
          )}
        </SafeAreaView>
      </KeyboardAvoidingView>
          <Button style={{position:"absolute"}} onPress={() => {disconnecting(); setOnAir(false)}}>종료</Button>
      </>
      }

      </View>
    );
  }


const styles = StyleSheet.create({
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