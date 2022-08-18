import React, { useRef } from "react";
import { Animated, View, Image, StyleSheet, Dimensions, Text } from "react-native";

import Search from "../../components/Search";
import constants from '../../constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const HEADER_HEIGHT = SCREEN_HEIGHT * 0.08;

function MainNavbar () {

  const animationRef = useRef(new Animated.Value(0)).current;

  const translateY = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -HEADER_HEIGHT],
  });

  return (
    <Animated.View
      style={{
        height: HEADER_HEIGHT,
        backgroundColor: "white",
        transform: [{ translateY: translateY }],
        flexDirection : 'row',
        justifyContent: 'center',
        shadowColor: "black", //그림자색
        shadowOpacity: 1,//그림자 투명도
        shadowOffset: { width: 0, height: 2 },
        elevation: 8,
      } }
    >
      <View style={{
        flex:1,
        backgroundColor:'rgb(0, 197, 145)',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center' }}>
          <View
            style={styles.content}
          >
            <Image
              source={require('../../assets/nawa_white.png')}
              style={styles.logoImage}
            />
          </View>
          {/* <View
            style={styles.content}
          >
            <Text
              style={styles.contentText}
            >나와</Text>
          </View> */}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SCREEN_WIDTH * 0.02,
  },
  contentText: {
    color: 'white',
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: 'bold',
  },
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
    resizeMode : 'contain',
    
    width : 50,
    height : 50,
  },
  map : {
    marginTop : 7,
    resizeMode : 'contain',
    
    width : 60,
    height : 60,
  }
})

export default MainNavbar