import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, Image, Pressable} from 'react-native'
import ProfileAll from "../components/ProfileAll";
import ProfileCalendar from "../components/ProfileCalendar";
import UserImage from "../components/UserImage";
import EncryptedStorage from 'react-native-encrypted-storage';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducer';
import axios from "axios";


const ProfileScreen = () => {
  // 닉네임
  const nickname = useSelector((state : RootState) => state.user.nickname)
  const userId = useSelector((state: RootState) => state.user.userId)
  const accessToken = useSelector((state : RootState) => state.user.accessToken)
  // console.log(nickname, accessToken)
  
  const [show, setShow] = useState('ALL')
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const friend = async () => {
      try {
        const response = await axios({
          method : 'get',
          url : `http://i7d205.p.ssafy.io/api/mate/${userId}`,
          headers : {"Authorization" : `Bearer ${accessToken}`}
        });
        setFriends(response.data.mateList);
      }
      catch (error) {
        console.log(error)
      }
    }
    friend()
  },[])
  
  
  return (
    <View style={[styles.container, {flexDirection: "column"}]}>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', flexDirection: "row", padding: 10,  }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          {/* 프로필 이미지 누르면 모달 띄워서 이미지 변경하도록 해야됨 */}
          <UserImage></UserImage>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', flexDirection:"column", }}>
            <View styles={{ flex: 2 }}/>
            <View styles={{ flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
              <Text style={{fontSize: 25, fontWeight: "bold"}}> { nickname } </Text> 
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
              
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{fontSize:16}}>메이트  {friends.length} 명 </Text>
              </View>
            </View>
        </View>
      </View>
      {/* <View style={{ flex:1, justifyContent:'center', alignItems: 'center', flexDirection: "row"}}>
        <View style={{flex:4, justifyContent:'center', alignItems: 'center', borderWidth: 1,}}>
          <Text>Badges</Text> 
        </View>
      </View> */}
      <View style={{ flex:1, justifyContent:'center', alignItems: 'center', flexDirection: "row"}}>
        <View style={{flex:4, justifyContent:'center', alignItems: 'center', borderWidth: 1,}}>
          {/* 버튼이나 프레서블로 아래 것들 바뀌게 설정 */}
          <Pressable
            onPress={() => { setShow('ALL')}}
          >
            <Text>ALL</Text>
          </Pressable>
        </View>
        <View style={{flex:4, justifyContent:'center', alignItems: 'center', borderWidth: 1,}}>
          <Pressable
              onPress={() => { setShow('CAL')}}
          >
          <Text>CALENDAR</Text>
          </Pressable>
        </View>
      </View>
      
      <View style= {{flex: 8, justifyContent:'center'}}>
        {show === 'ALL' ? (<ProfileAll></ProfileAll>) : (<ProfileCalendar/>)}
        
      </View>  
    </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  profileImage : {
    width : 75,
    height : 75,
    resizeMode : 'contain',
  },
});
export default ProfileScreen;