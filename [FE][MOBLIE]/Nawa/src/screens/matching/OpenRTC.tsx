import React,  {useRef, useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  
} from 'react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  mediaDevices,
} from 'react-native-webrtc';
import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import constants from '../../constants';
import { Dimensions } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

import { Button } from '@rneui/base/dist/Button';

import axios from 'axios';


const OpenRTC = ( {navigation} ) => {
  const [remoteStream, setRemoteStream] = useState(null);
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [onAir, setOnAir] = useState(false);
  const pc = useRef();

  // 상호 통신 데이터
  const userId = useSelector((state:RootState) => state.user.userId)
  const nickname = useSelector((state:RootState) => state.user.nickname)
  const accessToken = useSelector((state:RootState) => state.user.accessToken)

  const storing = useSelector((state:RootState) => state.matching.target)


  // 유저 정보 가져와라
  const roomInfo = useSelector((state : RootState) => state.matching.settings)
  // 구글 STUN 서버 설정
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



  const startWebcam = async () => {
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

    // Pull tracks from remote stream, add to video stream
    pc.current.ontrack = event => {
      event.streams[0].getTracks().forEach(track => {
        remote.addTrack(track);
      });
    };

    pc.current.onaddstream = event => {
      setRemoteStream(event.stream);
    };

    setWebcamStarted(true);
  };


    const startCall = async () => {
      const channelDoc = firestore().collection('MATCHING_GUMI').doc(roomInfo);
      const offerCandidates = channelDoc.collection('offerCandidates');
      const answerCandidates = channelDoc.collection('answerCandidates');


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
      channelDoc.onSnapshot(snapshot => {
        const data = snapshot.data();
        if (!pc.current.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.current.setRemoteDescription(answerDescription);
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
      setOnAir(true)
    };


    const endCall = async () => {
      if (!!pc.current) {pc.current.close()}

      const db = firestore();
      const roomRef = db.collection('MATCHING_GUMI').doc(roomInfo);
      const calleeCandidates = await roomRef.collection('answerCandidates').get();
      calleeCandidates.forEach(async candidate => {
        await candidate.ref.delete();
      });

      const callerCandidates = await roomRef.collection('offerCandidates').get();
      callerCandidates.forEach(async candidate => {
        await candidate.ref.delete();
      });

      await roomRef.delete();

      const rejected = async (roomInfo) => {
        firestore()
          .collection('dataChannel')
          .doc(roomInfo)
          .delete()
          .then( () => {
          })
      }
      rejected(roomInfo)


      navigation.navigate('Mate4');
    }



  const sendFriend = async () => {
    try {
    const response = await axios({
      method : 'post',
      url : 'http://i7d205.p.ssafy.io/api/add-mate',
      data : {
        addMateFrom : userId,
        addMateTo : storing.userId
      },
      headers : {"Authorization" : `Bearer ${accessToken}`}
    });
    Alert.alert('알림', '신청완료! 영상통화 종료시 결과를 확인할 수 있어요!')
  } catch (error) {
      Alert.alert('알림', '이미 신청되었어요! 결과는 영상통화 종료시 확인할 수 있어요!')
    }
  }


  return (
    <SafeAreaView>
          <View style={{flexDirection:'column', width:constants.width, height:SCREEN_HEIGHT}}>
            
            <View style={{flexDirection:'row', flex : 1,position:'absolute',top:10, zIndex:2, justifyContent:'center',alignSelf:'center', alignItems:'center'}}>
    
            {!webcamStarted ? <Button  title="당신을 서버에 연결해드릴게요!" onPress={() => startWebcam()} />
              :
              webcamStarted && !onAir && <Button title="준비 완료되면 시작하세요!" onPress={() => startCall()} disabled={!!onAir} />
              }
              { webcamStarted && onAir && <Button onPress={() => sendFriend()} title={'마음에 들면 메이트 신청!'}></Button> }
              <Button color={'grey'} buttonStyle={{borderRadius:50, marginLeft:50, elevation:8}} titleStyle={{textAlign:'center'}} title='신고'></Button>
              <Button onPress={() => endCall()} color={'error'} buttonStyle={{borderRadius:50, marginHorizontal:4, elevation:8}} titleStyle={{textAlign:'center'}} title='종료'></Button>
    
            </View>
    
    
            <View style={{flex : 9}}>
                {remoteStream?  (
                    <RTCView
                    streamURL={remoteStream?.toURL()}
                    style={styles.target}
                    objectFit="cover"
                    mirror
                    />)
                :
                <View></View>  
                }
                </View>
    
                {localStream && (
                <RTCView
                    streamURL={localStream?.toURL()}
                    style={styles.my}
                    objectFit="cover"
                    mirror
                    zOrder={1}
                  />)}
    
          </View>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  target: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 50
  },
  my : {
    position:'absolute',
    width: 120,
    height: 140,
    bottom : 52,
    left : 2


  },
  buttons: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
});
export default OpenRTC;