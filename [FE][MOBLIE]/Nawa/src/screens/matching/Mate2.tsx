import React, { useEffect, useRef, useState,  } from "react";
import {Text, View, StyleSheet, TextInput, KeyboardAvoidingView , Keyboard} from 'react-native'
import { Button, CheckBox } from "@rneui/themed";


import constants from '../../constants';
import {useAppDispatch} from '../../store';
import * as Progress from 'react-native-progress';

import { FAB } from '@rneui/themed';

import matchingSlice from "../../slices/matching";


const checkList = ['헬스', '배드민턴', '러닝', '애견산책', '산책', '등산', '자전거', '수영', '볼링', '당구', '농구', '풋살']
import Ionicons from 'react-native-vector-icons/Ionicons';
import Materiallcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

//멘트 작성
const LargeTextInput = (props) => {
  return (
    <TextInput
      {...props}
      editable
      maxLength={50}
      placeholder='오늘 운동 땡기는 사람 다 나와 !'
      placeholderTextColor={'lightgrey'}
      returnKeyType='next'
      textContentType="username"
      autoCapitalize="none"
    />
  );
}



const Mate2 = ( {navigation} ) => {
  const dispatch = useAppDispatch();
  const [gage, setGage] = useState(0.33);
  const [visible, setVisible] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [box, setBox] = useState<String[]>([]);
  // const where = useSelector((state:RootState) => state.matching.location)
  // const distance = useSelector((state:RootState) => state.matching.distance)
  const [value, onChangeText] = React.useState('');

  const [finalText, setFinalText] = useState('');
  const [canGoNext, setCanGoNext] = useState(false);
  const [readWarnings, setReadWarnings] = useState(false);


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
        category : box,
        ment : value
      }),
    )
    navigation.navigate('Mate3')
  };

  useEffect(() => {
    let gage = 0.33
    if (1 <= box.length && box.length <= 3) {
      gage += 0.22
    }
    if (value.length >= 10) {
      gage += 0.22
    }
    if (readWarnings) {
      gage += 0.23
    }
    setGage(gage)
    }, [box.length, value, readWarnings])
  
  // 승인 버튼
  useEffect(() => {
    if (box.length === 0) {
      setFinalText('운동을 최소 1개 이상 선택하세요')
      setCanGoNext(false)
    } else if (box.length >= 4) {
      setFinalText('운동은 최대 3개 까지 선택해주세요')
      setCanGoNext(false)
    } else if ( value.trim().length < 10) {
      setFinalText('소개 멘트를 최소 10자 이상 작성하세요')
      setCanGoNext(false)
    } else if ( !readWarnings ) {
      setFinalText('주의사항을 읽고 하단에 체크 해주세요')
      setCanGoNext(false)
    } else {
      setFinalText('나와 광장 입장하기 !')
      setCanGoNext(true)

    }
  },[box, value, readWarnings])



    return (
      <>
        <View style={styles.topBox}>
          <View style={styles.infoBox}>
            <Ionicons style={{marginLeft:2}} onPress={() => navigation.navigate('Mate1')} size={22} name='arrow-back-outline' color='white' />
            <Text style={{color:'white'}}>운동 및 멘트 설정하기</Text>
            <Ionicons size={20} name='arrow-forward-outline' color='rgb(0, 197, 145)' />
          </View>
          <Progress.Bar style={{marginHorizontal:4, borderColor: 'rgb(0, 197, 145)'}} progress ={gage} width={constants.width - 10} height={6} unfilledColor={'white'} />
        </View>  
        <ScrollView onTouchStart={() =>Keyboard.dismiss() }>
        <View style={{ backgroundColor:'lightgrey', width:SCREEN_WIDTH}}>
        { !!!box.length && (
          <View style={{flexDirection:"row", borderRadius:10, backgroundColor:'rgb(0, 197, 145)',justifyContent:'center',  height:50, margin:6, elevation:5}}>
            <Text style={{fontSize:20, color:'white', alignSelf:'center', fontWeight:"500"}}>운동 선택</Text>
            <Text style={{fontSize:15, color:'white', alignSelf:"center"}}>  (최대 3개)</Text>
          </View>
          )
        }
          <View style={{zIndex:2, flexDirection:"row", justifyContent:'center'}}>
            {box.map((item, idx) => {
              return (
              <View key={idx} style={{borderRadius: 20, padding:14, margin:7, backgroundColor: 'rgb(0, 197, 145)', elevation:8 }}>
                <Text style={{fontSize:15, color:'white', fontWeight:"600"}}>{item}</Text>
              </View>
              )
            })}
          </View>
        
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <CheckBox
            center
            title={<><Ionicons size={20} name='barbell' color='black' /><Text style={{color:'black'}}> {checkList[0]}  </Text></>}
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
            title={<><MaterialCommunityIcons size={20} name='badminton' color='black' /><Text style={{color:'black'}}> {checkList[1]}  </Text></>}
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
            title={<><Materiallcons size={20} name='directions-run' color='black' /><Text style={{color:'black'}}> {checkList[2]}  </Text></>}
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
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <CheckBox
            center
            title={<><MaterialCommunityIcons size={20} name='dog-side' color='black' /><Text style={{color:'black'}}> {checkList[3]}  </Text></>}
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
            title={<><Materiallcons size={20} name='directions-walk' color='black' /><Text style={{color:'black'}}> {checkList[4]}  </Text></>}
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
            title={<><Foundation size={20} name='mountains' color='black' /><Text style={{color:'black'}}> {checkList[5]}  </Text></>}
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
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <CheckBox
            center
            title={<><Ionicons size={20} name='bicycle' color='black' /><Text style={{color:'black'}}> {checkList[6]}  </Text></>}
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
            title={<><MaterialCommunityIcons size={20} name='swim' color='black' /><Text style={{color:'black'}}> {checkList[7]}  </Text></>}
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
            title={<><MaterialCommunityIcons size={20} name='bowling' color='black' /><Text  style={{color:'black'}}> {checkList[8]}  </Text></>}
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
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <CheckBox
            center
            title={<><MaterialCommunityIcons size={20} name='baseball-bat' color='black' /><Text style={{color:'black'}}> {checkList[9]}  </Text></>}
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
            title={<><MaterialCommunityIcons size={20} name='basketball' color='black' /><Text style={{color:'black'}}> {checkList[10]}  </Text></>}
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
            title={<><Ionicons size={20} name='football' color='black' /><Text style={{color:'black'}}> {checkList[11]}  </Text></>}
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
       
        
        <View style={{borderRadius:10, backgroundColor:'rgb(0, 197, 145)',justifyContent:'center',  height:50, margin:7,marginTop:35, elevation:8}}>
          <Text style={{fontSize:20, color:'white', alignSelf:'center', fontWeight:"500"}}>소개 멘트 작성</Text>
        </View>
        <View style={{borderRadius:10, backgroundColor:'white',justifyContent:'center', marginHorizontal:15}}  >
            <LargeTextInput
              multiline
              numberOfLines={2}
              onChangeText={text => onChangeText(text)}
              value={value}
              style={{padding: 10}}
              color={'black'}
            />
        </View>

        <View style={{borderRadius:10, backgroundColor:'rgb(0, 197, 145)',justifyContent:'center',  height:50, margin:7,marginTop:35, elevation:8}}>
          <Text style={{fontSize:20, color:'white', alignSelf:'center', fontWeight:"500"}}>주의사항</Text>
        </View>
        <View style={{borderRadius:10, backgroundColor:'white',justifyContent:'center', marginHorizontal:15, marginBottom:50, padding:10}}>
          <Text style={{ fontSize:17,color:'black', marginTop:10}}>1. 다른 나와인들을 따뜻하게 대해 주세요.</Text>
          <Text style={{ fontSize:17,color:'black', marginTop:10}}>2. 부적절한 닉네임이나 소개멘트는</Text>
          <Text style={{ fontSize:17,color:'black'}}>    제재 대상입니다.</Text>
          <Text style={{ fontSize:17,color:'black', marginTop:10}}>3. 신고 누적 5회시 7일 정지 입니다.</Text>
          <Text style={{ fontSize:17,color:'black', marginTop:10}}>4. 신고 누적 10회시 20년 정지 입니다.</Text>
          <Text style={{ fontSize:17,color:'black', marginTop:10}}>5. 악의적인 신고 역시 검토 후</Text>
          <Text style={{ fontSize:17,color:'black'}}>    제재 대상입니다.</Text>
          <Text style={{ fontSize:17,color:'black', marginTop:10}}>6. 신고 상대방의 의사에 따라 법적 대응이</Text>
          <Text style={{ fontSize:17,color:'black'}}>    이루어 질 수도 있습니다.</Text>
          <CheckBox
            center
            title="매너있는 나와인으로 함께 할게요 !"
            checked={readWarnings}
            onPress={() => setReadWarnings(!readWarnings)}
            containerStyle={{marginTop:30}}
          />
        </View>

        
          
        </View>
      </ScrollView>
        <View style={{position:"absolute", flexDirection:"row", bottom:300, alignSelf:'center'}}>
          <FAB
                style={{marginHorizontal:2}}
                color='red'
                onPress={() => {setBox([]); setDisabled(false); setVisible(false); setGage(0.25); } }
                visible={visible}
                disabled={!visible}
                title="최대 3개까지만 선택해주세요 !"
                icon={{
                  name: 'refresh',
                  color: 'white',
                }}
                />
        </View>
        <Button onPress={() => stored()} title={finalText} disabled={!canGoNext} type="solid" size="lg"disabledTitleStyle={{color:'red'}} containerStyle={{position:'absolute', bottom:0, width:SCREEN_WIDTH, borderTopLeftRadius:10, borderTopRightRadius:10}}/>
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