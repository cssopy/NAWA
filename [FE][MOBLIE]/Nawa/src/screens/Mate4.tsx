import React, { useRef, useState,  } from "react";
import {Text, View, StyleSheet} from 'react-native'

import constants from '../constants';
import {useAppDispatch} from '../store';
import * as Progress from 'react-native-progress';
import { Button } from "@rneui/themed";
import Ionicons from 'react-native-vector-icons/Ionicons';





const Mate2 = ( {navigation} ) => {
  const dispatch = useAppDispatch();
    return (
      <>
        <View style={styles.topBox}>
          <View style={styles.infoBox}>
            <Ionicons onPress={() => navigation.navigate('Mate2')} size={25} name='arrow-back-outline' color='black' />
            <Text style={{color:'black'}}>최종 확인</Text>
            <Ionicons name='arrow-forward-outline' color='white'size={25} />
          </View>
          <Progress.Bar style={{marginHorizontal:4, borderColor: 'rgb(0, 197, 145)'}} progress ={0.9} width={constants.width - 10} height={6} unfilledColor={'white'} />
      </View>  
        <View style={{ backgroundColor:'lightgrey'}}>
          <Button
            title="Click"
          />
        </View>
      </>
    );
  }


const styles = StyleSheet.create({
  topBox : {
    backgroundColor:'rgb(0, 197, 145)',
    shadowColor: "black", //그림자색
    shadowOpacity: 1,//그림자 투명도
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
    width: constants.width,
    height : 35,
  },
  infoBox : {
    flexDirection : 'row',
    justifyContent : "space-between",
    alignItems : 'center',
    marginHorizontal : 0,
    marginBottom : 2,
    width : constants.width - 6,
    height : 20
  },
})

export default Mate2;