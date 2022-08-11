<<<<<<< HEAD
import React, { useRef, useEffect, useState } from "react";
import { SafeAreaView, Text, Animated, View, StyleSheet, Image, Keyboard } from "react-native";
=======
import React from "react";
import { SafeAreaView } from "react-native";
>>>>>>> newfeed

import { createNativeStackNavigator } from "@react-navigation/native-stack";

<<<<<<< HEAD
import DismissKeyboardView from "../components/DismissKeyboardView";

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
    if (currentOffset < 0) return;
    setScrollUp(offset >= currentOffset);
    setOffset(currentOffset);
  };

  useEffect(() => {
    Keyboard.dismiss()
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
            elevation: 8,
            zIndex:100
          }}
        >
          <View style={{ flex:1, backgroundColor:'rgb(0, 197, 145)', justifyContent:'center', alignItems:'center' }}>
            <Image
              source={require('../assets/nawa_white.png')}
              style={styles.logoImage}
            /> 
          </View>
          <View style={{ flex:4, backgroundColor:'rgb(0, 197, 145)', justifyContent:'center'}}>
            <Search width={constants.width * 0.65} string='언제 어디서나 나와!' />
          </View>
          <View style={{ flex:1, backgroundColor:'rgb(0, 197, 145)', justifyContent:'center', alignItems:'center' }}>
          <Image
              source={require('../assets/map.png')}
              style={styles.map}
            /> 
          </View>
        </Animated.View>
=======
import NewFeedScrren from './homescreen/NewFeedScreen';
import Main from './homescreen/Main'

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    // <SafeAreaView>
    //   <Main />
      
    // </SafeAreaView>
    <Stack.Navigator
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: "피드"
        }}
      />
>>>>>>> newfeed

      <Stack.Screen
        name="NewFeedScrren"
        component={NewFeedScrren}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;