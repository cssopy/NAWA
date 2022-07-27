import React, { useRef, useEffect, useState } from "react";
import { SafeAreaView, Text, Animated, View, StyleSheet } from "react-native";

import FeedItem from '../components/FeedItem';
import Search from "../components/Search";
import UserIcon from "../components/userIcon";


const HEADER_HEIGHT = 60;

const HomeScreen = () => {
  const [offset, setOffset] = useState(0);
  const [scrollUp, setScrollUp] = useState(true);

  const animationRef = useRef(new Animated.Value(0)).current;

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

  return (
    <SafeAreaView>
      <View>
        <Animated.View
          
          style={{
            height: HEADER_HEIGHT,
            backgroundColor: "white",
            transform: [{ translateY: translateY }],
            flexDirection : 'row',
            backgroundColor: "white", 
            shadowColor: "black", //그림자색
            shadowOpacity: 1,//그림자 투명도
            shadowOffset: { width: 0, height: 2 },
            elevation: 8,
          }}
        >
          <View style={{ flex:1, backgroundColor:'rgb(153, 204, 255)', justifyContent:'center', alignItems:'center' }}>
            <Text style={styles.first}>나와</Text>
          </View>
          <View style={{ flex:4, backgroundColor:'rgb(153, 204, 255)', justifyContent:'center', alignItems:'center'}}>
            <Search />
          </View>
          <View style={{ flex:1, backgroundColor:'rgb(153, 204, 255)', justifyContent:'center', alignItems:'center' }}>
            <UserIcon />
          </View>
        </Animated.View>

        <Animated.ScrollView
          onScroll={onScroll}
          style={{
            transform: [{ translateY: translateY }],
            marginBottom: HEADER_HEIGHT,
          }}
          scrollEventThrottle={16}
          bounces={false}
        >
          <FeedItem />
          <FeedItem />
          <FeedItem />
          <FeedItem />
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  first: {
    color : 'black',
    fontSize : 18,
    fontWeight : '900',
  }
})






export default HomeScreen;