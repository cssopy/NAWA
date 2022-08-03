import React from "react";
import {Text, View, StyleSheet, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Progress from 'react-native-progress';
import constants from '../constants';

const Mate3 = ( {navigation} ) => {
    return (
      <View style={{ backgroundColor:'lightgrey', width:constants.width, height:constants.height }}>
        <View style={styles.topBox}>

          <View style={styles.infoBox}>
            <Ionicons onPress={() => {navigation.goBack()}} name={'md-caret-back-circle-sharp'} size={30} color={'black'} />
            <Text style={{color:'black'}}>기타 설정</Text>
            <Ionicons onPress={() => {navigation.push('Mate4')}} name={'md-caret-forward-circle'} size={30} color={'black'} />
          </View>

          <Progress.Bar style={{marginHorizontal:3}} progress ={0.9} width={constants.width - 6} height={6} unfilledColor={'lightgrey'} />
        
        </View>        
      </View>
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
    borderBottomLeftRadius: 7,
    borderBottomEndRadius: 7,
  },
  infoBox : {
    flexDirection : 'row',
    justifyContent : "space-between",
    alignItems : 'center',
    marginHorizontal : 3,
    marginBottom : 2,
    width : constants.width - 6,
    height : 30
  },
})


export default Mate3;