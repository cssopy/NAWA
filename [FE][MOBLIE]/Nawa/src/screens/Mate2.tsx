import React, { useRef, useState,  } from "react";
import {Text, View, StyleSheet} from 'react-native'

import constants from '../constants';
import {useAppDispatch} from '../store';
import * as Progress from 'react-native-progress';

import { FAB } from '@rneui/themed';
import { CheckBox, Icon } from '@rneui/themed';

import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import matchingSlice from "../slices/matching";


const checkList = ['헬스', '배드민턴', '러닝', '애견산책', '산책', '등산', '자전거', '수영', '볼링', '당구', '농구', '풋살']
const indexList = []
import Ionicons from 'react-native-vector-icons/Ionicons';
import Materiallcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';


const Mate2 = ( {navigation} ) => {
  const dispatch = useAppDispatch();
  const [gage, setGage] = useState(0.25);
  const [visible, setVisible] = useState(['헬스',false]);
  const [check0, setCheck0] = useState(['배드민턴',false]);
  const [check1, setCheck1] = useState(['러닝',false]);
  const [check2, setCheck2] = useState(['애견산책',false]);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [check7, setCheck7] = useState(false);
  const [check8, setCheck8] = useState(false);
  const [check9, setCheck9] = useState(false);
  const [check10, setCheck10] = useState(false);
  const [check11, setCheck11] = useState(false);
  const first = useSelector((state : RootState) =>matchingSlice.actions.setC1)
  const second = useSelector((state : RootState) =>matchingSlice.actions.setC2)
  const third = useSelector((state : RootState) =>matchingSlice.actions.setC3)
  const countTrue = 0
  const count = () => {
    let i
    for (i = 0; i < 12; i++) {
      
    }
  }


    return (
      <>
        <View style={styles.topBox}>
          <View style={styles.infoBox}>
            <Ionicons style={{marginLeft:2}} onPress={() => navigation.navigate('Mate1')} size={22} name='arrow-back-outline' color='white' />
            <Text style={{color:'black'}}>운동 설정</Text>
            <Ionicons size={20} name='arrow-forward-outline' color='rgb(0, 197, 145)' />
          </View>
          <Progress.Bar style={{marginHorizontal:4, borderColor: 'rgb(0, 197, 145)'}} progress ={gage} width={constants.width - 10} height={6} unfilledColor={'white'} />
        </View>  

        <View style={{ backgroundColor:'lightgrey', width:constants.width, height:constants.height }}>
          <Text>{checkList[0]} : {check0 ? 'yes':''}</Text>
          <Text>{checkList[1]} : {check1 ? 'yes':''}</Text>
          <Text>{checkList[2]} : {check2 ? 'yes':''}</Text>
          <Text>{checkList[3]} : {check3 ? 'yes':''}</Text>
          <Text>{checkList[4]} : {check4 ? 'yes':''}</Text>
          <Text>{checkList[5]} : {check5 ? 'yes':''}</Text>
          <Text>{checkList[6]} : {check6 ? 'yes':''}</Text>
          <Text>{checkList[7]} : {check7 ? 'yes':''}</Text>
          <Text>{checkList[8]} : {check8 ? 'yes':''}</Text>
          <Text>{checkList[9]} : {check9 ? 'yes':''}</Text>
          <Text>{checkList[10]} : {check10 ? 'yes':''}</Text>
          <Text>{checkList[11]} : {check11 ? 'yes':''}</Text>
          <Text>뒤지기 싫으면 3개 골라라</Text>
          

          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <CheckBox
            center
            title={<><Ionicons size={20} name='barbell' color='black' /><Text> {checkList[0]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={check0}
            onPress={() => setCheck0(!check0)}
          />
          <CheckBox
            center
            title={<><Materiallcons size={20} name='sports-tennis' color='black' /><Text> {checkList[1]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={check1}
            onPress={() => setCheck1(!check1)}
          />
          <CheckBox
            center
            title={<><Materiallcons size={20} name='directions-run' color='black' /><Text> {checkList[2]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={check2}
            onPress={() => setCheck2(!check2)}
          />
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <CheckBox
            center
            title={<><MaterialCommunityIcons size={20} name='dog-side' color='black' /><Text> {checkList[3]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={check3}
            onPress={() => setCheck3(!check3)}
          />
          <CheckBox
            center
            title={<><Materiallcons size={20} name='directions-walk' color='black' /><Text> {checkList[4]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={check4}
            onPress={() => setCheck4(!check4)}
          />
          <CheckBox
            center
            title={<><Foundation size={20} name='mountains' color='black' /><Text> {checkList[5]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={check5}
            onPress={() => setCheck5(!check5)}
          />
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <CheckBox
            center
            title={<><Ionicons size={20} name='bicycle' color='black' /><Text> {checkList[6]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={check6}
            onPress={() => setCheck6(!check6)}
          />
          <CheckBox
            center
            title={<><MaterialCommunityIcons size={20} name='swim' color='black' /><Text> {checkList[7]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={check7}
            onPress={() => setCheck7(!check7)}
          />
          <CheckBox
            center
            title={<><MaterialCommunityIcons size={20} name='bowling' color='black' /><Text> {checkList[8]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={check8}
            onPress={() => setCheck8(!check8)}
          />
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <CheckBox
            center
            title={<><MaterialCommunityIcons size={20} name='baseball-bat' color='black' /><Text> {checkList[9]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={check9}
            onPress={() => setCheck9(!check0)}
          />
          <CheckBox
            center
            title={<><MaterialCommunityIcons size={20} name='basketball' color='black' /><Text> {checkList[10]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={check10}
            onPress={() => setCheck10(!check10)}
          />
          <CheckBox
            center
            title={<><Ionicons size={20} name='football' color='black' /><Text> {checkList[11]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={check11}
            onPress={() => setCheck11(!check11)}
          />
          </View>
        </View>
        <FAB
              style={{ position:'absolute', bottom : 3, alignSelf: "center"}}
              onPress={() => {navigation.navigate('Mate2')}}
              visible={!visible}
              title="NEXT"
              icon={{
                name: 'check',
                color: 'white',
              }}
        />
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