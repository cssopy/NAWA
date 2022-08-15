
import React from 'react';
import { View, Text, TextInput, Pressable } from "react-native"
import { useSelector } from "react-redux";
import {Form, FormItem} from 'react-native-form-component';
import { Provider } from 'react-native-paper';
import store from '../store';

import { useEffect, useState, useRef, useCallback } from 'react';
import { RootState } from '../store/reducer';


import axios from 'axios';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SockJS from "sockjs-client"
import * as StompJS from '@stomp/stompjs'


const TextEncodingPolyfill = require('text-encoding');

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});


const ChattingScreen = () => {
    const userId = useSelector((state : RootState) => state.user.userId)
    const accessToken = useSelector((state : RootState) => state.user.accessToken)
    const [roomId, setRoomId] = useState('')
    const [room, setRoom] = useState({})
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const messageRef = useRef(null);




    const client = new StompJS.Client({
        brokerURL: 'ws://i7d205.p.ssafy.io:8080/nawa/websocket',
        debug: function (str) {
            console.log(str);
        },
        onConnect: () => {
            //subscribe 나 웹소켓 연결됬을때, 실행할 코드 넣으면 됩니다
        }
    });
    client.activate(); //  연결
 
    //  연결해제
    // client.deactivate(); 




    // methods
    const findRoom = () => {
        axios.get('http://i7d205.p.ssafy.io:8080/chat/room/' + roomId).then(response => setRoom(response.data))
    }
    const findChats = () => {
        axios.get('http://i7d205.p.ssafy.io:8080/chat/message/'+ roomId).then(response => setMessages([...messages, ...response.data]))
    }
    const sendMessage = () => {
        ws.send("http://i7d205.p.ssafy.io:8080/pub/chat/message", {}, JSON.stringify({roomId:roomId, userName:userId, chatContent:message, chatDate:new Date()}));
        setMessage('');
    }
    const recvMessage = (recv) => {
        setMessages([...messages, {"userName":recv.userName,"chatContent":recv.chatContent, "chatDate":recv.chatDate}])
    }

    function connect() {
        // pub/sub event
        ws.connect({}, function(frame) {
            ws.subscribe("/sub/chat/room/" + roomId, function(message) {
                var recv = JSON.parse(message.body);
                recvMessage(recv);
            });
            ws.send("http://i7d205.p.ssafy.io:8080/pub/chat/message", {}, JSON.stringify({roomId:vm.$data.roomId, userName:'system', chatContent:vm.$data.userName+"님이 입장하셨습니다.", chatDate:new Date()}));
        }, function(error) {
            console.log(error)
            // if(reconnect++ <= 5) {
            //     setTimeout(function() {
            //         console.log("connection reconnect");
            //         sock = new SockJS("http://i7d205.p.ssafy.io:8080/ws-stomp");
            //         ws = Stomp.over(sock);
            //         connect();
            //     },10*1000);
            // }
        });
    }

    // useEffect(() => {
    //     const func1 = () => {
    //         // findRoom();
    //         // findChats();
    //         connect();
    //     }
    //     func1()
    //     return 
    // })

    const Stack = createNativeStackNavigator()
    return (
        <View>
            <Text>{ room.name } | {userId}</Text>


        </View>






        // <Provider store={store}>
        //     <Stack.Navigator
        //         screenOptions={{headerShown:false}}
        //     >
        //         <Stack.Screen name='Main' component={ChattingMain} />
        //         <Stack.Screen name='room' component={ChattingRoom} />
                
        //     </Stack.Navigator>
        // </Provider>
    )
}

export default ChattingScreen;