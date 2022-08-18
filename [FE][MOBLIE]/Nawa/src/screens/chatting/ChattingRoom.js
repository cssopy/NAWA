import React, { useEffect, useState, useCallback, useRef } from "react";
import {Alert, KeyboardAvoidingView, ScrollView, Text, TextInput, View} from 'react-native'

import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

import { Button } from "@rneui/themed";


import {Dimensions} from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

import { firebase } from '@react-native-firebase/database';
import { SafeAreaProvider } from "react-native-safe-area-context";
import DismissKeyboardView from "../../components/DismissKeyboardView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



const ChattingMain = ({ route }) => {
    const targetname = route.params.targetname
    const nickname = useSelector((state : RootState) => state.user.nickname)
    // console.log(nickname)
    const [chattings, setChattings] = useState([]);
    const chattingss = useSelector((state : RootState) => state.user.chatting)
    
    const [texting, setTexting] = useState([]);
    
    const onChangeText = useCallback(text => {
        setTexting(text);
    });

     // realtime database 등록
    const reference = firebase
        .app()
        .database('https://nawa-firebase-webrtc-default-rtdb.asia-southeast1.firebasedatabase.app/')
        

    useEffect(() => {
        setChattings([]);
            reference
            .ref(`/users`)
            .once('value')
            .then((snapshot) => {
                const data = snapshot.toJSON()
                const case2 = []
                for (var prop in data) {    
                    if (data[prop].to === targetname && data[prop].from === nickname) {
                        case2.push(data[prop])
                    } else if (data[prop].to === nickname && data[prop].from === targetname) {
                        case2.push(data[prop])
                    }
                }
                setChattings(case2.sort((a, b) => new Date(a.time) - new Date(b.time)))
            })
        }, [chattingss])



    // 전송 하기
    const send = (targetname) => {
        const data = {
            from : nickname,
            to : targetname,
            content : texting,
            time : Date(),
            read : false
        }

        const newreference = reference.ref(`/users`).push()
        newreference
        .set( data )
        .then(() => {console.log('전송완료')})
        setTexting('');
    }
   
    // _scrollToInput = (reactNode) => {
    //     this.scroll.props.scrollToFocusedInput(reactNode)
    // }

// 작성내용 없으면 전송 안되도록 버튼 만들기
    return (
        <SafeAreaProvider>
            <View style={{flexDirection:'column', width:SCREEN_WIDTH, height:SCREEN_HEIGHT - 50}}>
            <View style={{flex:1, flexDirection:'row', backgroundColor:'rgb(0, 197, 145)'}}>
                <View style={{flex:3}}><Text>{targetname} 님</Text></View>
                <View style={{flex:1}}><Text>신고</Text></View> 
                <View style={{flex:1}}><Text>차단</Text></View>
            </View>


            <KeyboardAvoidingView style={{flex:10, flexDirection:'column', backgroundColor:'lightgrey'}} behavior={"padding"}>
                <View style={{flex:10}}>
                    <ScrollView>
                    {!!chattings &&
                        chattings.map((item, idx) =>
                                <View style={{flexDirection:'column', marginVertical:5, width:SCREEN_WIDTH * 0.8}}key={idx}>
                                    <Text style={{fontSize:20, color:'black'}}>{item.from} 님</Text>
                                    
                                    <View style={{flexDirection:'row', backgroundColor:'white', borderRadius:10, elevation:8 }}>
                                        <Text style={{fontSize:20, color:'black'}}>{item.content}</Text>
                                    </View>
                                    <Text style={{fontSize:10, alignSelf:"flex-end", marginLeft:5, color:'grey'}}>{item.time}</Text>
                                </View>
                        )
                    }
                    </ScrollView>
                </View>

                <View style={{flex:1, flexDirection:'row', borderRadius:20, marginBottom:20}}>
                    <TextInput
                        style={{flex:6, backgroundColor: 'white', color:'black', fontSize:20, paddingLeft: 10}}
                        onChangeText={onChangeText}
                        value={texting}
                    />
                    <Button onPress={() => {send(targetname)}} containerStyle={{flex:1, borderRadius:10}} title={'전송'}></Button>
                </View>
            </KeyboardAvoidingView>

        </View>

        </SafeAreaProvider>
    )
}

export default ChattingMain;