import React, { useRef, useEffect, useState } from "react";
import { FAB } from "@rneui/base";

import MainNavbar from "./MainNavbar";
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View, Image } from "react-native";
import { useIsFocused } from '@react-navigation/native'

import axios from 'axios';

import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import UserIcon from "../../components/userIcon";
import Video, { FilterType } from "react-native-video";

function Feeds ({ navigation }) {

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

  const HEADER_HEIGHT = SCREEN_HEIGHT * 0.05;
  const [feeds, setFeeds] = useState([]);

  const isFocused = useIsFocused()
  
  const animationRef = useRef(new Animated.Value(0)).current;
  
  const url = 'http://i7d205.p.ssafy.io/api/'
  const myId = useSelector((state: RootState) => state.user.accessToken)
  
  const translateY = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -HEADER_HEIGHT],
  });
  
  const MainFeed = () => {
    
    useEffect(() => {
      axios.get(
        url + 'board/',
        { headers: { Authorization : `Bearer ${myId}` }}
      ).then (res => {
        setFeeds(res.data)
      }).catch (err => {
        console.log('bad', err)
      })
    },[isFocused])

    const onPressListHandler = (data: object) => {
      navigation.navigate('Main', {screen: 'FeedDetail', params: data})
    };

    const onefeed = ({item}) => one(item)

    const one = (item: object) => {
      const datas = item.files
      console.log(datas)
      let image: object[] = []
      datas.map(data => {
        if (data.fileType === 'IMAGE' || data.fileType === 'VIDEO') {
          // console.log(data.fileType, data.fileName)
          const type: string = data.fileType
          const fileUrl: string = url + 'file/' + `${data.fileType}/` + `${data.fileName}`
          image.push({fileUrl, type})
          // console.log('had image', fileUrl, '&&', data.fileType)
        }
      })
      return (
        <TouchableWithoutFeedback
        style={styles.feed}
        onPress={() => {
          onPressListHandler(item)
        }}
        >
          <View style={ styles.feedItem }>
            { (image[0].type === 'IMAGE') && 
              <Image
                source={{ uri: image[0].fileUrl }}
                style={{
                  width: SCREEN_WIDTH * 0.8,
                  height: SCREEN_HEIGHT * 0.3,
                }}
              />
            }
            {/* { (image[0].type === 'IMAGE') ?
              <Image
                source={{ uri: image[0].fileUrl }}
                style={{
                  width: SCREEN_WIDTH * 0.8,
                  height: SCREEN_HEIGHT * 0.4,
                  resizeMode: 'cover'
                }}
                // key={}
              />
            : 
              <Video
                source={{ uri: image[0].fileUrl }}
                style={{
                  width: SCREEN_WIDTH * 0.8,
                  height: SCREEN_HEIGHT * 0.4,
                  }}
              />
            } */}
            <View style={ styles.underBar }>
              <View style={styles.userIcon}><UserIcon /></View>
              <View style={styles.textBox}><Text style={styles.text}>{item.boardTitle}</Text></View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        )
      }

    return (
      <Animated.FlatList
      data={feeds.reverse()}
      renderItem={onefeed}
      style={{
        backgroundColor: "white",
        transform: [{ translateY: translateY }],
        elevation: 8,
      }}
      nestedScrollEnabled
      ></Animated.FlatList>
    )
  }

  return (
    <>
      <MainNavbar />
      <MainFeed />
      <FAB

        onPress={() => {navigation.navigate('NewFeedScreen')}}
        placement="right"
        icon={{ name: 'add', color: 'white'}}
        color="red"
        />
    </>
  )
}

const styles = StyleSheet.create({
  feed: {
    marginBottom: 10,
  },
  feedItem : {
    flexDirection: 'column',
    backgroundColor : 'lightgrey',
    fontWeight : '900',
    // paddingHorizontal : 10,
    paddingVertical : 10,
    marginHorizontal : 10,
    marginTop : 10,
    borderRadius : 10,
    height : 'auto'
  },
  content : {
    flex : 11,
    backgroundColor : 'white',
    marginHorizontal : 5,
    marginTop : 5,
    borderRadius : 10,
    height : 200
  },
  underBar : {
    flex : 2,
    flexDirection : 'row',
  },
  userIcon : {
    marginHorizontal : 5,
    marginVertical : 5,
  },
  textBox : {
    flex : 1,
    backgroundColor : 'white',
    marginRight : 5,
    marginVertical : 5,
    borderRadius : 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text : {
    textAlign: 'center',
    fontSize: 15
  },
})

export default Feeds