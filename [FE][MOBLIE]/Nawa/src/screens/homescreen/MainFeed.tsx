import React, { useRef, useEffect, useState } from "react";
import { Animated, View, StyleSheet, Image, Dimensions } from "react-native";

import axios from 'axios';

import FeedItem from '../../components/FeedItem';
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const HEADER_HEIGHT = SCREEN_HEIGHT * 0.05;

function MainFeed() {
  const [offset, setOffset] = useState(0);
  const [scrollUp, setScrollUp] = useState(true);
  const [feeds, setFeeds] = useState([]);

  const animationRef = useRef(new Animated.Value(0)).current;

  const url = 'http://i7d205.p.ssafy.io:8080/'
  const myId = useSelector((state: RootState) => state.user.accessToken)

  const translateY = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -HEADER_HEIGHT],
  });

  const onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    setScrollUp(offset >= currentOffset);
    setOffset(currentOffset);
  };

  useEffect(() => {
    Animated.timing(animationRef, {
      toValue: scrollUp ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [scrollUp]);

  useEffect(() => {
    axios.get(
      url + 'board/',
      { headers: { Authorization : `Bearer ${myId}` }}
    ).then (res => {
      console.log(res)
    }).catch (err => {
      console.log(err)
    })
  },[])

  return (
      <Animated.ScrollView
        onScroll={onScroll}
        // style={{
        //   transform: [{ translateY: translateY }],
        //   marginBottom: HEADER_HEIGHT,
        // }}
        scrollEventThrottle={16}
        bounces={false}
      >
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
      </Animated.ScrollView>
  )
}

export default MainFeed