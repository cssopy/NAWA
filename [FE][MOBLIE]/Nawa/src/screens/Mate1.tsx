import React, { useRef, useState,  } from "react";
import {Text, View, StyleSheet, StatusBar} from 'react-native'

import constants from '../constants';
import {useAppDispatch} from '../store';
import * as Progress from 'react-native-progress';
import { Button, Icon } from "@rneui/themed";
import Ionicons from 'react-native-vector-icons/Ionicons';
import matchingSlice from "../slices/matching";

import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { FAB } from '@rneui/themed';



const Mate1 = ( {navigation} ) => {
  const dispatch =  useAppDispatch();
  const [location, setLocation] = useState('');
  const [visible, setVisible] = useState(false);
  const [gage, setGage] = useState(0);

  const whereI = useSelector((state : RootState) => state.matching.location)
  console.log(whereI)

  const storing = (data) => {
    dispatch(
      matchingSlice.actions.setL({
        location : data,
      })
    )
  }
  
    return (
      <>
        <View style={styles.topBox}>
          <View style={styles.infoBox}>
            <Text style={{color:'black', fontWeight:"bold"}}>위치 설정</Text>
          </View>
          <Progress.Bar style={{marginHorizontal:4, borderColor: 'rgb(0, 197, 145)'}} progress ={gage} width={constants.width - 10} height={6} unfilledColor={'white'} />
        </View>  

        <View style={{ backgroundColor:'lightgrey', width:constants.width, height:constants.height, flexDirection:"column" }}>
          <View>
            <Text onPress={() => {
                storing('Gumi');
                setVisible(!visible)
                gage === 0.25 ? setGage(0) : setGage(0.25)
              }}>지도 띄우는 곳</Text>
          </View>
          <View style={{flex:1, backgroundColor:'secondarysecondary', borderRadius:3}}>
          </View>
          <FAB
              style={{ position:'absolute', bottom : 165, alignSelf:"center"  }}
              onPress={() => {navigation.navigate('Mate2')}}
              visible={visible}
              title="NEXT"
              icon={{
                name: 'check',
                color: 'white',
              }}
              disabled={!visible}
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
    justifyContent : "center",
    alignItems : 'center',
    marginHorizontal : 0,
    marginBottom : 2,
    width : constants.width - 6,
    height : 20
  },
})

export default Mate1;