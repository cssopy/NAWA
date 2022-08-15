import React, { useRef, useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useIsFocused } from '@react-navigation/native'

import axios from 'axios';

import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import UserIcon from "../../components/userIcon";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const HEADER_HEIGHT = SCREEN_HEIGHT * 0.05;

function MainFeed({ navigation }) {
  const [feeds, setFeeds] = useState([]);

  const isFocused = useIsFocused()

  const animationRef = useRef(new Animated.Value(0)).current;

  const url = 'http://i7d205.p.ssafy.io:8080/'
  const myId = useSelector((state: RootState) => state.user.accessToken)

  const translateY = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -HEADER_HEIGHT],
  });

  const onPressListHandler = (data: object) => {
    navigation.navigate('FeedDetail', data)
    console.log(data)
  };

  const onefeed = ({item}) => one(item)

  const one = (item: object) => {
    // console.log(Object.keys(item))
    return (
      <TouchableWithoutFeedback
      style={styles.feed}
      onPress={() => {
        onPressListHandler(item)
      }}
    >
      <View style={ styles.feedItem }>
        <View style={ styles.content }><Text style={{ textAlign:'center'}}>영상 쇼츠</Text></View>
        <View style={ styles.underBar }>
          <View style={styles.userIcon}><UserIcon /></View>
          <View style={styles.textBox}><Text style={styles.text}>{item.boardTitle}</Text></View>
        </View>
      </View>
    </TouchableWithoutFeedback>
    )
  }

  useEffect(() => {
    axios.get(
      url + 'board/',
      { headers: { Authorization : `Bearer ${myId}` }}
    ).then (res => {
      console.log('nice data')
      // console.log(res.data[0])
      setFeeds(res.data)
    }).catch (err => {
      console.log('bad', err)
    })
  },[isFocused])

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