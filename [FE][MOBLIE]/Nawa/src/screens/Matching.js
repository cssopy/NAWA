import React from "react";
import {Text, View, StyleSheet} from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import constants from "../constants";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';

import Mate1 from './Mate1';
import Mate2 from './Mate2';
import Mate3 from './Mate3';
import Mate4 from './Mate4';


const Stack = createNativeStackNavigator()


const renderPagination = (index, total, context) => {
  const title = ['위치 설정', '운동 설정', '기타 설정', '나 와!']
  const percent = [0.25, 0.5, 0.75, 1]

  return (
    <View style={styles.topBox}>
      <View style={styles.infoBox}>
        <Text style={{color:'black'}}>{title[index]}</Text>
      </View>
      <Progress.Bar style={{marginHorizontal:3}} progress ={percent[index]} width={constants.width - 6} height={6} unfilledColor={'lightgrey'} />
    </View>  
  )
}


const MatingScreen = () => {
  return (
      <Swiper
        width={constants.width}
        renderPagination={renderPagination}
        bounces={true}
        loop={false}
        showsButtons={true}
      >
        <Mate1 />
        <Mate2 />
        <Mate3 />
        <Mate4 />
      </Swiper>

    );
  }

  const styles = StyleSheet.create({
    topBox : {
      backgroundColor:'white',
      shadowColor: "black", //그림자색
      shadowOpacity: 1,//그림자 투명도
      shadowOffset: { width: 0, height: 2 },
      elevation: 8,
      width: constants.width,
      height : 45,
    },
    infoBox : {
      flexDirection : 'row',
      justifyContent : "center",
      alignItems : 'center',
      marginHorizontal : 3,
      marginBottom : 2,
      width : constants.width - 6,
      height : 30
    },
  })


export default MatingScreen;