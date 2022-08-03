import React, { useRef, useEffect, useState } from "react";
import { SafeAreaView, Text, Animated, View, StyleSheet, Image } from "react-native";

import FeedItem from '../components/FeedItem';
import Search from "../components/Search";
import constants from '../constants';

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
        {/* <View style={styles.fixedBox}></View> */}
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
          <View style={{ flex:1, backgroundColor:'lightgrey', justifyContent:'center', alignItems:'center' }}>
            <Image
              source={require('../assets/nawa_white.png')}
              style={styles.logoImage}
            /> 
          </View>
          <View style={{ flex:4, backgroundColor:'lightgrey', justifyContent:'center', alignItems:'center'}}>
            <Search />
          </View>
          <View style={{ flex:1, backgroundColor:'lightgrey', justifyContent:'center', alignItems:'center' }}>
          <Image
              source={require('../assets/map.png')}
              style={styles.map}
            /> 
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
  fixedBox : {
    backgroundColor : 'black',
    width : constants.width,
    height : 30,
  },
  first: {
    color : 'black',
    fontSize : 18,
    fontWeight : '900',
  },
  logoImage : {
    width : 50,
    height : 50,
    resizeMode : 'contain',
  },
  map : {
    width : 60,
    height : 60,
    resizeMode : 'contain',
    marginTop : 7,
  }
})






export default HomeScreen;