import React, { useCallback, useRef, useState,  } from "react";
import {Text, View, StyleSheet, StatusBar, Keyboard, Alert, PermissionsAndroid, ActivityIndicator, Modal, Pressable, ScrollView, FlatList} from 'react-native'

import constants from '../../constants';
import {useAppDispatch} from '../../store';
import * as Progress from 'react-native-progress';
import { Button, Icon } from "@rneui/themed";
import Ionicons from 'react-native-vector-icons/Ionicons';
import matchingSlice from "../../slices/matching";
import { Slider } from "@rneui/themed";

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { FAB } from '@rneui/themed';
import NaverMapView,{ NaverMapViewProps, Circle, Marker, Path, Polyline, Polygon,  } from 'react-native-nmap'
import location from 'react-native-nmap'
import { ScreenHeight, SearchBar } from "@rneui/base";
import { Animated } from "react-native";
import { useEffect } from "react";
import Geolocation from 'react-native-geolocation-service';
import {Dimensions} from 'react-native';
import axios, { AxiosError } from "axios";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");



export interface Coord {
  latitude: number;
  longitude: number;
}
export interface Region extends Coord {
  latitudeDelta: number;
  longitudeDelta: number;
}
export interface Rect {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

const Mate1 = ( {navigation} ) => {
  const dispatch =  useAppDispatch();
  const [mylocation, setMyLocation] = useState({latitude : 0, longitude : 0});
  const [pickLocation, setPickLocation] = useState({latitude : 0, longitude : 0});
  const [visible, setVisible] = useState(false);
  const [distance, setDistance] = useState(300);
  const [zoom, setZoom] = useState(16);
  const [gage, setGage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [searchingResult, setSearchingResult] = useState([]);
  const [mapLoading, setMapLoading] = useState(false);
  const [ButtonLoading, setButtonLoading] = useState(false);

  const userId = useSelector((state : RootState) => state.user.userId);
  const accessToken = useSelector((state : RootState) => state.user.accessToken);
  const [loc, setLoc] = useState([]);


  const searching = async () => {
    try {
      const response1 = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchValue}&y=${pickLocation.latitude}&x=${pickLocation.longitude}`,
        {headers : {
          Authorization: `KakaoAK a14f94dccce1dded817582d33cea359d`
          }
        },
      );
      const results = response1.data.documents
      setSearchingResult(results)
    } catch (error) {
      Alert.alert('알림', '다시 진행 해주세요')
    }
  }

  const getLocation = async () => {
    setMapLoading(true)
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    )
    Geolocation.getCurrentPosition(
      (position) => {
        setPickLocation({ latitude : position.coords.latitude, longitude : position.coords.longitude })
        setMyLocation({ latitude : position.coords.latitude, longitude : position.coords.longitude })
        setMapLoading(false)
      },
      (error) => {
        console.log(error.code, error.message);
        setMapLoading(false)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    
  )};

  //지도 auto 줌
  useEffect (() => {
    if (distance < 130) {
      setZoom(17);
    } else if (distance < 200) {
      setZoom(16);
    } else if (distance < 350) {
      setZoom(15);
    } else if (distance < 600) {
      setZoom(14);
    } else if (distance < 1200) {
      setZoom(13);
    } else if (distance < 2300) {
      setZoom(12);
    } else {
      setZoom(11);
    }
    },[distance])
  


  // 1. 즐겨찾기 조회, 저장
  const getLoc = async () => {
    try {
    const response = await axios({
      method : 'get',
      url : `http://i7d205.p.ssafy.io/api/loc-list/${userId}`,
      headers : {"Authorization" : `Bearer ${accessToken}`}
    });
    setLoc(loc => response.data)
    } catch (error) {
      console.log('전체 조회',error)
    }
  }

  // 즐겨찾기 된 항목인지 검사
  const checkLoc = (item) => {
    let check
    loc.forEach((loc, idx) => {
      if (item.road_address_name === loc.locAddress) {
        check = true
        return
      }
    })
    return (check ? true : false)
  }
  // 즐겨찾기 추가
  const addLoc = async (item) => {
    try {
      if (loc.length >= 10) {
        Alert.alert('알림', '즐겨찾기는 최대 10개 까지 가능합니다.')
      } else {
        const response = await axios({
          method : 'post',
          url : `http://i7d205.p.ssafy.io/api/loc-list/`,
          headers : {"Authorization" : `Bearer ${accessToken}`},
          data : {
            "locName" : item.place_name,
            "locAddress" : item.road_address_name,
            "locLat" : item.y,
            "locLng" : item.x,
            "userId" : userId
          }
        })
      }
    } catch (error) {
      console.log('추가',error)
    }
    getLoc()
  }
  // 즐겨찾기 삭제
  const delLoc = async (item) => {
    loc.forEach((loc, idx) => {
      if (item.road_address_name === loc.locAddress) {
        try {
          const response = axios({
            method : 'delete',
            url : `http://i7d205.p.ssafy.io/api/loc-list/${loc.locId}`,
            headers : {"Authorization" : `Bearer ${accessToken}`},
          })
        } catch (error) {
          console.log('삭제',error)
        }
        getLoc()
        return
      }
    })
  }
  //목록에서의 삭제
  const delLoc2 = async (item) => {
    try {
      const response = axios({
        method : 'delete',
        url : `http://i7d205.p.ssafy.io/api/loc-list/${item.locId}`,
        headers : {"Authorization" : `Bearer ${accessToken}`},
      })
      } catch (error) {
        console.log('목록에서 삭제',error)
      }
      getLoc()
      return
    }
      
      // 창 open or close
      useEffect(() => {
    searchValue ? openSearchBox() : closeSearchBox()
    if (searchValue.length > 1) {searching()}
  }, [searchValue])

  // 최초 즐겨찾기 조회
  useEffect(() => {
    getLoc()
  },[])

  const animationRef = useRef(new Animated.Value(0)).current;
  const translateY = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });
  const closeSearchBox = () => {
              Animated.timing(animationRef, {
                toValue: 4,
                duration: 300,
                useNativeDriver: true,
              }).start();
  } 
  const openSearchBox = () => {
              Animated.timing(animationRef, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
              }).start();
  } 


    return (
      <View style={{ height: SCREEN_HEIGHT}}>
        <View style={styles.topBox}>
          <View style={styles.infoBox}>
            <Text style={{color:'white', fontWeight:"bold"}}> 위치 설정하기</Text>
          </View>
          <Progress.Bar style={{marginHorizontal:4, borderColor: 'rgb(0, 197, 145)'}} progress ={gage} width={constants.width - 10} height={6} unfilledColor={'white'} />
        </View>  


        <View style={{ backgroundColor:'lightgrey', width:constants.width, height:constants.height - 75, flexDirection:"column"}}>
            <NaverMapView style={{width: '100%', height: '95%', zIndex:-2}}
              center={{...pickLocation, zoom: zoom}}
              onCameraChange={e => {setPickLocation({longitude : e.longitude, latitude : e.latitude}); closeSearchBox()}}
              showsMyLocationButton={false}
              compass={false}
              zoomControl={false}
              onTouch={() => {
                Keyboard.dismiss()
                closeSearchBox()
              }}
              mapType={4}>
              <Circle coordinate={pickLocation} color={"rgba(255,0,0,0.3)"} radius={distance} /> 
              {!!mylocation && <Marker coordinate={mylocation} caption={{text:'현재 위치', textSize:13}}/>}
            </NaverMapView>

            <Animated.View 
              style={{  
                position:"absolute",
                marginHorizontal:10,
                transform: [{ translateY: translateY }],
                zIndex:0,
                }}>
              <View>
                <ScrollView style={{width : constants.width-20, maxHeight : 230, paddingTop : 40, paddingBottom:30 }}>
                  {searchingResult.map((item, idx) => (
                      <Pressable onTouchStart={() => {Keyboard.dismiss()}} onPress={() => setPickLocation({latitude: Number(item.y), longitude:Number(item.x)})}  key={idx} style={{flexDirection:'row', backgroundColor:'white', height:45, marginVertical:2, borderRadius:5, paddingHorizontal:5}}>
                        <View style={{flex:7}}>
                          <Text style={{color:'black',fontWeight:"700" , fontSize:17}}>{item.place_name}</Text>
                          <Text style={{marginTop:1,color:'black',fontWeight:"300" , fontSize:13}}>{item.road_address_name}</Text>
                        </View>
                        { checkLoc(item) ?
                        <Ionicons onPress={() => {delLoc(item); delLoc(item);}} style={{flex:1, alignSelf:'center'}} name='star' size={30} color='yellow' />
                        :  
                        <Ionicons onPress={() => addLoc(item)} style={{flex:1, alignSelf:'center'}} name='star-outline' size={30} color='black' />
                        }
                      </Pressable>
                    ))
                  }
                </ScrollView>
              </View>
            </Animated.View>



          <View style={{ flexDirection:'row', alignContent:'stretch', alignItems:"center" ,position:"absolute", paddingHorizontal:10}}>
            <View style={{
              flex : 6,
              alignItems:'stretch'
            }}>
              <SearchBar
                platform="android"
                containerStyle={{borderBottomLeftRadius:15, borderBottomRightRadius:15, top:-1, elevation:8}}
                inputContainerStyle={{height:30}}
                inputStyle={{fontSize:14,}}
                onClear={() => setSearchingResult([])}
                onChangeText={newVal => setSearchValue(newVal)}
                placeholder='원하는 장소를 찾아보세요!'
                placeholderTextColor="#888"
                value={searchValue}
                onSubmitEditing = {searching}
                onFocus={() => openSearchBox()}
              />
            </View>

            <Button onPress={() => {setVisible(!visible)}} color={'warning'} containerStyle={{flex:1, borderBottomLeftRadius:15,borderBottomRightRadius:15, marginLeft:8, elevation:8}}>
              <Ionicons name='star' size={30} color='white' />
            </Button>

          </View>

          {visible && <View style={{position:"absolute", width:SCREEN_WIDTH, height:SCREEN_HEIGHT,backgroundColor:'black', opacity:0.3, zIndex:6}}></View>}
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            >
            <View style={{flexDirection:"column", position:"absolute", width:SCREEN_WIDTH/4*3, height:400, top:SCREEN_HEIGHT/2- 200, backgroundColor:'white', borderRadius:10, alignSelf:'center'}}>
              <View style={{flex:1, flexDirection:'row', alignContent:'center', borderRadius:10, backgroundColor:'white', elevation:8}}>
                <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignSelf:'center'}}>
                  <Text style={{flex:2,color:'black', fontSize:20,fontWeight:'700', textAlign:'center'}}>즐겨찾기 목록</Text>
                  <Text style={{flex:1,color:'black', fontSize:13,fontWeight:'700', alignSelf:'flex-end'}}> {loc.length} / 10 개</Text>
                </View>
                <Button color={"error"} buttonStyle={{flex:1, borderRadius:5,  justifyContent:'center'}} titleStyle={{textAlign:'center',fontSize:15, fontWeight:"700", padding:1}} onPress={() => {setVisible(false)}}  title={'닫기'}></Button>
              </View>
              <View style={{flex:10}}>
                <ScrollView>
                  {loc.map((item, idx)  => (                
                    <Pressable key={idx} style={{alignSelf:'flex-start', padding:10}} onPress={() => {setPickLocation({latitude: Number(item.locLat), longitude:Number(item.locLng)}); setVisible(false)}}>
                      <Text style={{color:'black',fontWeight:"700" , fontSize:17}}>{item.locName}</Text>
                      <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:1, color:'black',fontWeight:"300" , fontSize:13, marginRight:10}}>{item.locAddress}</Text>
                        <Pressable onPress={() => {delLoc2(item)}}><Text style={{color:'red', fontWeight:'600'}}>삭제</Text></Pressable>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>



          <View style={{position: "absolute", flexDirection:'row', marginHorizontal:10, alignContent:"center",justifyContent:'flex-start', bottom:100}}>
            {mapLoading ? 
              <ActivityIndicator style={{flex:1, textAlign:"center",alignSelf:"flex-end" }}  name='locate' size={40} color='red' />
              :
              <Ionicons onPress={() => {getLocation(); setMapLoading(true); setGage(0.33)}} style={{flex:1 ,textAlign:"center",alignSelf:"flex-end" }}  name='locate' size={35} color='red' />
            }
            <Slider
            flex={4}
            backgroundColor='white'
            borderRadius={50}
            paddingHorizontal={10}
            marginHorizontal={5}
            elevation={8}
              value={distance}
              onValueChange={setDistance}
              maximumValue={3000}
              minimumValue={100}
              step={30}
              allowTouchTrack
              trackStyle={{ height: 5, left : 5, backgroundColor: 'transparent' }}
              thumbStyle={{ height: 20, width: 15, backgroundColor: 'transparent' }}
              thumbProps={{
                children: (
                  <Icon
                    name="dot-circle-o"
                    type="font-awesome"
                    size={20}
                    reverse
                    containerStyle={{ bottom: 20, right: 20 }}
                    // color={}
                  />
                ),
              }}
            />
            <Button
              title={ButtonLoading? <ActivityIndicator color='white'></ActivityIndicator> : '완료'}
              onPress={() => {
                setButtonLoading(true)
                dispatch(
                  matchingSlice.actions.setL({ // 이 액션이 dispatch 되면 
                    location : pickLocation,
                    distance : distance
                  }),
                )
                setTimeout(() => {setButtonLoading(false); navigation.navigate('Mate2')}, 100)
                
              }}
              containerStyle={{
                flex:1,
                borderRadius:50,
                alignSelf:"center",
                justifyContent:'center',
                elevation:8,
                zIndex:-1
              }}
            />
          </View>


          <View style={{ flexDirection:"column", position: "absolute", top: SCREEN_HEIGHT/2 - 40,alignSelf:'center' , alignItems:"center" }}>
            <Ionicons name='locate' size={35} color='black' />
            <Text style={{fontWeight:"700", color:'black'}}>{`매칭거리 ${(distance*0.001).toFixed(2)}km`}</Text>
          </View>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  topBox : {
    backgroundColor:'rgb(0, 197, 145)',
    zIndex:1,
    elevation: 8,
    width: constants.width,
    height : 35,
  },
  infoBox : {
    flexDirection : 'row',
    justifyContent : "center",
    textAlign : "center",
    alignItems : 'flex-end',
    marginHorizontal : 0,
    marginBottom : 2,
    width : constants.width - 6,
    height : 20
  },
})

export default Mate1;