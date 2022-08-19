import React,  {useRef, useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
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

import axios from 'axios';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import constants from '../../constants';
import { Dimensions } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

import { Button } from '@rneui/base/dist/Button';

import { useAppDispatch } from '../../store';
import userSlice from '../../slices/user';
import EncryptedStorage from 'react-native-encrypted-storage';

const JoinRTC = ({navigation}) => {
  const dispatch = useAppDispatch()

  const [remoteStream, setRemoteStream] = useState(null);
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [onAir, setOnAir] = useState(false);
  const pc = useRef();
  
  // 상호 통신 데이터
  const [final, setFinal] = useState(false);
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


  const joinCall = async () => {
    Alert.alert('알림', '상대방이 준비되면 시작할 수 있어요! 잠시 후에 다시 시도 해주세요!')

    const channelDoc = firestore().collection('MATCHING_GUMI').doc(roomInfo);
    const offerCandidates = channelDoc.collection('offerCandidates');
    const answerCandidates = channelDoc.collection('answerCandidates');



    pc.current.onicecandidate = async event => {
      if (event.candidate) {
        await answerCandidates.add(event.candidate.toJSON());
      }
    };

    const channelDocument = await channelDoc.get();
    const channelData = channelDocument.data();
    const offerDescription = channelData.offer;

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
    })
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
    }

  
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
      if (response.status === 200) {
        Alert.alert('알림', '신청완료! 영상통화 종료시 결과를 확인할 수 있어요!')
      }
      if (response.status === 201) {
        Alert.alert('알림', '서로 신청했어요! 이제 둘은 메이트랍니다!')
      }
  
    } catch (error) {
      console.log(error.response.status)
  
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
                userId : '',
                accessToken : '',
                nickname : ''
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
  
    const reporting = () => {
      Alert.alert('알림', '신고가 접수 되었습니다. 영상통화를 종료 합니다.')
      endCall()
    }
  



    return (
        <SafeAreaView>
          <View style={{flexDirection:'column', width:constants.width, height:SCREEN_HEIGHT}}>            
            <View style={{flex : 1, flexDirection:'row', position:'absolute',top:10, zIndex:2, justifyContent:'center',alignSelf:'center', alignItems:'center'}}>
    
              {!webcamStarted ? <Button  title="당신을 서버에 연결해드릴게요!" onPress={() => startWebcam()} />
              :
              webcamStarted && !onAir && <Button title="준비 완료되면 시작하세요!" onPress={() => joinCall()} disabled={!!onAir} />
              }
              { webcamStarted && onAir && <Button onPress={() => sendFriend()} title={'마음에 들면 메이트 신청!'}></Button> }
              <Button onPress={() => reporting()} color={'grey'} buttonStyle={{borderRadius:50, marginLeft:50, elevation:8}} titleStyle={{textAlign:'center'}} title='신고'></Button>
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


export default JoinRTC;
