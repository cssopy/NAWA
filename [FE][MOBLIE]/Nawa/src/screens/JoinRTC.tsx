import React,  {useRef, useEffect } from 'react';
import {
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
import { RootState } from '../store/reducer';
import constants from '../constants';
import { Dimensions } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

import { Button } from '@rneui/base/dist/Button';



const JoinRTC = ({navigation}) => {
  const [remoteStream, setRemoteStream] = useState(null);
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [channelId, setChannelId] = useState(null);
  const [onAir, setOnAir] = useState(false);
  const pc = useRef();

  // 유저 정보 가져와라
  const roomInfo = useSelector((state : RootState) => state.matching.settings)
    console.log(roomInfo)

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
      console.log(pc.current.getLocalStreams());
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
    const channelDoc = firestore().collection('MATCHING_GUMI').doc(roomInfo);
    const offerCandidates = channelDoc.collection('offerCandidates');
    const answerCandidates = channelDoc.collection('answerCandidates');

     // 데이터 채널 개설
     const dataChannel = pc.current.createDataChannel();

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
      pc.current.close()

      const db = firestore();
      const roomRef = db.collection('MATCHING_GUMI').doc(roomInfo);
      const calleeCandidates = await roomRef.collection('calleeCandidates').get();
      calleeCandidates.forEach(async candidate => {
        await candidate.ref.delete();
      });

      const callerCandidates = await roomRef.collection('offerCandidates').get();
      callerCandidates.forEach(async candidate => {
        await candidate.ref.delete();
      });

      await roomRef.delete();

      // const channelDoc = firestore().collection('MATCHING_GUMI').doc(roomInfo).delete()
      navigation.navigate('Mate3');
    }



    return (
        <SafeAreaView>
          <View style={{flexDirection:'column', width:constants.width, height:SCREEN_HEIGHT - 50}}>
            
            <View style={{flexDirection:'row', flex : 1,position:'absolute',top:10, zIndex:2, justifyContent:'center',alignSelf:'center', alignItems:'center'}}>
    
              {!webcamStarted ? <Button  title="당신을 서버에 연결해드릴게요!" onPress={() => startWebcam()} />
              :
              webcamStarted && <Button title="준비 완료되면 시작하세요!" onPress={() => joinCall()} disabled={!!onAir} />
              }
              <Button color={'grey'} buttonStyle={{borderRadius:50, marginLeft:50, elevation:8}} titleStyle={{textAlign:'center'}} title='신고'></Button>
              <Button onPress={() => endCall()} color={'error'} buttonStyle={{borderRadius:50, marginHorizontal:4, elevation:8}} titleStyle={{textAlign:'center'}} title='종료'></Button>
    
            </View>
    
    
            <View style={{flex : 10}}>
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
        width: 130,
        height: 150,
        bottom : 25,
        left : 2
    
    
      },
      buttons: {
        alignItems: 'flex-start',
        flexDirection: 'column',
      },
    });


export default JoinRTC;
