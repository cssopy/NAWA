import React, { useRef, useEffect, useState } from "react";
import { FAB } from "@rneui/base";


import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View, Image, ScrollView } from "react-native";
import { useIsFocused } from '@react-navigation/native'

import axios from 'axios';

import { useSelector } from "react-redux";
import { RootState } from "../store/reducer"; 
// import UserIcon from "../../components/userIcon";
import Video from "react-native-video";
import UserImage from "./UserImage";
import { SafeAreaView } from "react-native-safe-area-context";

function ProfileFeeditem ({ navigation }) {

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
  const HEADER_HEIGHT = SCREEN_HEIGHT * 0.05;

  const [feeds, setFeeds] = useState([]);

  const isFocused = useIsFocused()
  
  const animationRef = useRef(new Animated.Value(0)).current;
  
  const url = 'http://i7d205.p.ssafy.io/api/'
  const myId = useSelector((state: RootState) => state.user.accessToken)
  const userId = useSelector((state : RootState) => state.user.userId);
  const translateY = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -HEADER_HEIGHT],
  });
  // console.log(userId)
  axios.get(
    url + `board/${userId}/NEW`,
    // url + `board/${userId}`,
    { headers: { Authorization : `Bearer ${myId}` }}
  ).then (res => {
    setFeeds(res.data)
    // console.log('call all data', res.data)
  }).catch (err => {
    console.log('bad', err)
  })
  useEffect(() => {
  },[])
  
  const MainFeed = () => {
    

    const onPressListHandler = (data: object) => {
      navigation.navigate('Main', {screen: 'FeedDetail', params: data})
    };

    const onefeed = ({item}) => one(item)

    const one = (item: object) => {
      const datas = item?.files
      let image: (string)[] = []
      let imageType: (string)[] = []
      datas.map(data => {
          if (data.fileType === 'IMAGE' || data.fileType === 'VIDEO') {
          // if (data.fileType === 'IMAGE') {
          // console.log('check data', data.fileType, data.fileName)
          const fileUrl: string = url + 'file/' + `${data.fileType}/` + `${data.fileName}`
          const fileType: string = data.fileType
          image.push(fileUrl)
          imageType.push(fileType)
          // console.log('change', fileUrl, fileType)
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
          { (image.length >= 1) &&
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <Text>{ image[0] }</Text>
                <Text>{ imageType[0] }</Text>
                { (imageType[0] === 'IMAGE') ?
                <Image
                  source={{ uri: image[0] }}
                  style={{
                    width: SCREEN_WIDTH * 0.8,
                    height: SCREEN_HEIGHT * 0.3,
                    resizeMode: 'cover',
                  }}
                />
                :
                <Video
                  source={{ uri: image[0] }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                ></Video>
                }
              </View>
            }

            <View style={ styles.underBar }>
              <View style={styles.userIcon}><UserImage /></View>
              <View style={styles.textBox}><Text style={styles.text}>{item.boardTitle}</Text></View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        )
      }

    return (
      // <ScrollView>
      <SafeAreaView>
        <Animated.FlatList
          data={feeds}
          renderItem={onefeed}
          style={{
            backgroundColor: "white",
            transform: [{ translateY: translateY }],
            elevation: 8,
          }}
          nestedScrollEnabled
          ></Animated.FlatList>
        </SafeAreaView>
    )
  }

  return (
    <>
      <MainFeed />
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
    paddingVertical : 10,
    marginHorizontal : 10,
    marginTop : 10,
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

export default ProfileFeeditem