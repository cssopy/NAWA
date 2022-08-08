import React, { useRef, useState,  } from "react";
import {Text, View, StyleSheet, StatusBar, Keyboard, Alert, PermissionsAndroid} from 'react-native'

import constants from '../constants';
import {useAppDispatch} from '../store';
import * as Progress from 'react-native-progress';
import { Button, Icon } from "@rneui/themed";
import Ionicons from 'react-native-vector-icons/Ionicons';
import matchingSlice from "../slices/matching";

import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { FAB } from '@rneui/themed';
import NaverMapView,{ NaverMapViewProps, Circle, Marker, Path, Polyline, Polygon } from 'react-native-nmap'
import location from 'react-native-nmap'
import { ScreenHeight, SearchBar } from "@rneui/base";
import { Animated } from "react-native";
import { useEffect } from "react";
import Geolocation from 'react-native-geolocation-service';
import {Dimensions} from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");



const Mate1 = ( {navigation} ) => {
  const dispatch =  useAppDispatch();
  const [mylocation, setmyLocation] = useState< { latitude : number; longitude : number } | object >({latitude :1 , longitude :1 });
  const [visible, setVisible] = useState(false);
  const [gage, setGage] = useState(0);
  const [searchValue, setSearchValue] = useState('')
  const [mapLoading, setMapLoading] = useState(false)

  const whereI = useSelector((state : RootState) => state.matching.location)

  const searching = () => {
    console.log("let's search ", searchValue)
  }

  const getLocation = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    )
    Geolocation.getCurrentPosition(
      (position) => {
        setmyLocation({ latitude : position.coords.latitude, longitude : position.coords.longitude })
        setMapLoading(false)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
        setMapLoading(false)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    
  )};

  useEffect (() => {
    
  },[])
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
      <View style={{ height: SCREEN_HEIGHT }}>
        <View style={styles.topBox}>
          <View style={styles.infoBox}>
            <Text style={{color:'black', fontWeight:"bold"}}> 위치 설정</Text>
          </View>
          <Progress.Bar style={{marginHorizontal:4, borderColor: 'rgb(0, 197, 145)'}} progress ={gage} width={constants.width - 10} height={6} unfilledColor={'white'} />
        </View>  

        <View style={{ backgroundColor:'lightgrey', width:constants.width, height:constants.height, flexDirection:"column"}}>
          <NaverMapView style={{width: '100%', height: '100%'}}
            center={{...mylocation, zoom: 16}}
            
            compass={false}
            showsMyLocationButton={false}
            onTouch={() => {
              Keyboard.dismiss()
            }}
          >
            <Marker coordinate={mylocation}/>
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
          {mapLoading ? 
            <Ionicons style={{position: "absolute", top: SCREEN_HEIGHT - (100 + 35) ,textAlign:"center", backgroundColor:'white', borderRadius:50, elevation:8,  }}  name='locate' size={35} color='black' />
            :
            <Ionicons onPress={() => {getLocation(); setMapLoading(true)}} style={{position: "absolute", top: SCREEN_HEIGHT - (100 + 35) ,textAlign:"center", backgroundColor:'white', borderRadius:50, elevation:8 }}  name='locate' size={35} color='lightblue' />
          }
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