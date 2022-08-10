import React, { useRef, useState,  } from "react";
import {Text, View, StyleSheet, StatusBar, Keyboard, Alert, PermissionsAndroid, ActivityIndicator} from 'react-native'

import constants from '../constants';
import {useAppDispatch} from '../store';
import * as Progress from 'react-native-progress';
import { Button, Icon } from "@rneui/themed";
import Ionicons from 'react-native-vector-icons/Ionicons';
import matchingSlice from "../slices/matching";
import { Slider } from "@rneui/themed";

import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
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





const Mate1 = ( {navigation} ) => {
  const dispatch =  useAppDispatch();
  const [mylocation, setMyLocation] = useState({latitude : 0, longitude : 0});
  const [pickLocation, setPickLocation] = useState({latitude : 0, longitude : 0});
  const [visible, setVisible] = useState(false);
  const [distance, setDistance] = useState(300);
  const [zoom, setZoom] = useState(16);
  const [gage, setGage] = useState(0);
  const [searchValue, setSearchValue] = useState('')
  const [mapLoading, setMapLoading] = useState(false)


  const whereI = useSelector((state : RootState) => state.matching.location)

  const searching = async () => {
    try {
      const response = await axios.get(
        `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${searchValue}&coordinate=${pickLocation.longitude},${pickLocation.latitude}`,
        {headers : {
          "X-NCP-APIGW-API-KEY-ID" : "2urxj03koo",
          "X-NCP-APIGW-API-KEY" : "sOCrYsZK9F2vpGrSMhjYsv1dZyJOeVZGCvrfcM5k"
        }}
      );
      console.log(response.data)
    } catch {
      console.log('error!!!!!!!!!!!!!!!!')
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
        console.log(111)
      },
      (error) => {
        console.log(error.code, error.message);
        setMapLoading(false)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    
  )};

  useEffect (() => {
    if (distance < 130) {
      setZoom(17);
    } else if (distance < 320) {
      setZoom(16);
    } else if (distance < 640) {
      setZoom(15);
    } else if (distance < 1300) {
      setZoom(14);
    } else if (distance < 2400) {
      setZoom(13);
    } else if (distance < 2800) {
      setZoom(12);
      }
    },[distance])
  // const storing = (data) => {
  //   dispatch(
  //     matchingSlice.actions.setL({
  //       location : data,
  //     })
  //   )}
  
        // return <NaverMapView style={{width: '100%', height: '100%'}}
        //                     compass={false}
        //                      showsMyLocationButton={true}
        //                      center={{...P0, zoom: 16}}
                             
                            //  onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
            //                  onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
            //                  onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
            // <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')}/>
            {/* <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
            <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/> */}
            {/* <Path coordinates={[P0, P1, P2]} onClick={() => console.warn('onClick! path')} width={10}/> */}
            {/* <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/> */}
            {/* <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={100} onClick={() => console.warn('onClick! circle')}/> */}
            {/* <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/> */}
    
    
   
    return (
      <View style={{ height: SCREEN_HEIGHT}}>
        <View style={styles.topBox}>
          <View style={styles.infoBox}>
            <Text style={{color:'black', fontWeight:"bold"}}> 위치 설정</Text>
          </View>
          <Progress.Bar style={{marginHorizontal:4, borderColor: 'rgb(0, 197, 145)'}} progress ={gage} width={constants.width - 10} height={6} unfilledColor={'white'} />
        </View>  

        <View style={{ backgroundColor:'lightgrey', width:constants.width, height:constants.height - 75, flexDirection:"column"}}>
            <NaverMapView style={{width: '100%', height: '95%', zIndex:-2}}
              center={{...pickLocation, zoom: zoom}}
              onCameraChange={e => {setPickLocation({longitude : e.longitude, latitude : e.latitude}); console.log(pickLocation)}}
              showsMyLocationButton={false}
              compass={false}
              zoomControl={false}
              onTouch={() => {
                Keyboard.dismiss()
              }}
            >
              <Circle coordinate={pickLocation} color={"rgba(255,0,0,0.3)"} radius={distance} /> 
              {!!mylocation && <Marker coordinate={mylocation} caption={{text:'현재 위치', textSize:13}}/>}
              {!!pickLocation && <Marker coordinate={pickLocation} pinColor='blue' caption={{text:`매칭거리 : ${(distance*0.001).toFixed(1)}km`, textSize:17}}/>}
            </NaverMapView>
          <View style={{ flexDirection:'row', alignContent:'stretch', alignItems:"center" ,position:"absolute", marginTop:5, paddingHorizontal:10}}>
            <View style={{
              flex : 6,
              alignItems:'stretch'
            }}>
            <SearchBar
              platform="android"
              containerStyle={{borderRadius:30, elevation:8}}
              inputContainerStyle={{height:20}}
              inputStyle={{fontSize:14,}}
              leftIconContainerStyle={{}}
              rightIconContainerStyle={{}}
              onChangeText={newVal => setSearchValue(newVal)}
              placeholder='원하는 장소를 찾아보세요!'
              placeholderTextColor="#888"
              value={searchValue}
              onSubmitEditing = {searching}
              />
            </View>
              <Ionicons style={{flex:1, textAlign:"center", backgroundColor:'white', borderRadius:50, marginLeft:8, elevation:8 }}  name='menu' size={35} color='black' />
          </View>
          <View style={{position: "absolute", flexDirection:'row', marginHorizontal:10, alignContent:"center",justifyContent:'flex-start', bottom:100}}>
            {mapLoading ? 
              <ActivityIndicator style={{flex:1, textAlign:"center",alignSelf:"flex-end" }}  name='locate' size={40} color='red' />
              :
              <Ionicons onPress={() => {getLocation(); setMapLoading(true)}} style={{flex:1 ,textAlign:"center",alignSelf:"flex-end" }}  name='locate' size={35} color='red' />
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
              title='완료'
              onPress={() => navigation.navigate('Mate2')}
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
            <Ionicons style={{position: "absolute", top: SCREEN_HEIGHT/2 - 40, alignSelf:"center" }}  name='locate' size={35} color='black' />
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  topBox : {
    backgroundColor:'rgb(0, 197, 145)',
    elevation: 8,
    width: constants.width,
    height : 35,
    borderBottomLeftRadius:7,
    borderBottomRightRadius:7,
    
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