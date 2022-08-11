import React, { useEffect, useRef, useState,  } from "react";
import {Text, View, StyleSheet, Alert} from 'react-native'

import constants from '../constants';
import {useAppDispatch} from '../store';
import * as Progress from 'react-native-progress';

import { FAB } from '@rneui/themed';
import { CheckBox } from '@rneui/themed';

import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import matchingSlice from "../slices/matching";


const checkList = ['헬스', '배드민턴', '러닝', '애견산책', '산책', '등산', '자전거', '수영', '볼링', '당구', '농구', '풋살']
import Ionicons from 'react-native-vector-icons/Ionicons';
import Materiallcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';


const Mate2 = ( {navigation} ) => {
  const dispatch = useAppDispatch();
  const [gage, setGage] = useState(0.33);
  const [visible, setVisible] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [box, setBox] = useState<String[]>([]);
  // const where = useSelector((state:RootState) => state.matching.location)
  // const distance = useSelector((state:RootState) => state.matching.distance)


  const boxing = (target : String) => {
    if (box.includes(target)) {
      let newBox = box.filter((item) => item !== target)
      setBox(newBox)
    } else {
      setBox([...box, target])
    }
  }
  
  const stored = async () => {
    dispatch(
      matchingSlice.actions.setC({
        category : box
      })
    )
  };

  useEffect(() => {
    if (box.length === 3) {
      setDisabled(true)
      setVisible(true)
      setGage(0.66)
    } else {
      setGage(0.33)
    }}, [box.length])
  

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

        <View style={{ backgroundColor:'lightgrey', width:constants.width, height:constants.height - 100}}>
          <View style={{backgroundColor:'white', borderRadius:20, alignItems:'center', marginHorizontal:3, marginVertical:4}}>
            <Text style={{fontSize: 18, color:'black'}}>원하는 운동 3가지를 골라주세요 !</Text>
            <Text style={{fontSize: 18, color:'black'}}>같은 운동을 선택한 메이트를 먼저 찾아 줍니다 !</Text>
            <Text style={{fontSize: 30, color:'black'}}>{box.length} / 3</Text>
          </View>
          

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <CheckBox
            center
            title={<><Ionicons size={20} name='barbell' color='black' /><Text> {checkList[0]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={box.includes('헬스')}
            onPress={() => boxing('헬스')}
            disabled={disabled}
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
            checked={box.includes('배드민턴')}
            onPress={() => boxing('배드민턴')}
            disabled={disabled}
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
            checked={box.includes('러닝')}
            onPress={() => boxing('러닝')}
            disabled={disabled}
          />
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <CheckBox
            center
            title={<><MaterialCommunityIcons size={20} name='dog-side' color='black' /><Text> {checkList[3]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={box.includes('애견산책')}
            onPress={() => boxing('애견산책')}
            disabled={disabled}
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
            checked={box.includes('산책')}
            onPress={() => boxing('산책')}
            disabled={disabled}
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
            checked={box.includes('등산')}
            onPress={() => boxing('등산')}
            disabled={disabled}
          />
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <CheckBox
            center
            title={<><Ionicons size={20} name='bicycle' color='black' /><Text> {checkList[6]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={box.includes('자전거')}
            onPress={() => boxing('자전거')}
            disabled={disabled}
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
            checked={box.includes('수영')}
            onPress={() => boxing('수영')}
            disabled={disabled}
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
            checked={box.includes('볼링')}
            onPress={() => boxing('볼링')}
            disabled={disabled}
          />
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <CheckBox
            center
            title={<><MaterialCommunityIcons size={20} name='baseball-bat' color='black' /><Text> {checkList[9]}  </Text></>}
            containerStyle={{backgroundColor:'white'}}
            iconType="material"
            iconRight
            checkedIcon="check"
            uncheckedIcon="add"
            checkedColor="rgb(0, 197, 145)"
            checked={box.includes('당구')}
            onPress={() => boxing('당구')}
            disabled={disabled}
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
            checked={box.includes('농구')}
            onPress={() => boxing('농구')}
            disabled={disabled}
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
            checked={box.includes('풋살')}
            onPress={() => boxing('풋살')}
            disabled={disabled}
          />
          </View>
        <View style={{zIndex:2, flexDirection:"row", justifyContent:'center'}}>
          {box.map((item, idx) => {
            return (
            <View key={idx} style={{borderRadius: 20, padding:14, margin:10, backgroundColor: 'lightgreen', elevation:8 }}>
              <Text style={{fontSize:25}}>{item}</Text>
            </View>
            )
          })}
        </View>
        </View>



        <View style={{position:"absolute", flexDirection:"row", bottom:10, alignSelf:'center'}}>
          <FAB
                style={{marginHorizontal:2}}
                onPress={() => {setBox([]); setDisabled(false); setVisible(false); setGage(0.25); } }
                visible={visible}
                disabled={!visible}
                title="다시 !"
                icon={{
                  name: 'refresh',
                  color: 'white',
                }}
                />
          <FAB
                style={{marginHorizontal:2}}
                onPress={() => {stored(); navigation.navigate('Mate3'); }}
                visible={visible}
                disabled={!visible}
                title="완료 !"
                icon={{
                  name: 'check',
                  color: 'white',
                }}
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
    height : 20,
    zIndex:5
  },
})

export default Mate2;