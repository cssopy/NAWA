import React, {useState} from "react";
import {Text, View, StyleSheet, Image, Pressable} from 'react-native'
import ProfileAll from "../components/ProfileAll";
import ProfileCalendar from "../components/ProfileCalendar";
import UserImage from "../components/UserImage";
import EncryptedStorage from 'react-native-encrypted-storage';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducer';
// import VideoItem from "../components/VideoItem";


const ProfileScreen = () => {
  // 닉네임
  const nickname = useSelector((state : RootState) => state.user.nickname)
  const userId = useSelector((state: RootState) => state.user.userId)
  const accessToken = useSelector((state : RootState) => state.user.accessToken)
  // console.log(nickname, accessToken)
  // 임시
  const [follow, setFollow] = useState(100)
  const [following, setFollowing] = useState(1000)
  const [rank, setRank] = useState(1)
  const [show, setShow] = useState('ALL')
  
  
  return (
    <View style={[styles.container, {flexDirection: "column"}]}>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', flexDirection: "row", padding: 10, borderWidth: 1, }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          {/* 프로필 이미지 누르면 모달 띄워서 이미지 변경하도록 해야됨 */}
          <UserImage></UserImage>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', flexDirection:"column", borderWidth: 1,}}>
            <View styles={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1, }}>
              <Text> { nickname } </Text> 
            </View>
            <View styles={{ flex: 3, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderWidth: 1,}}>
              <View styles={{ flex: 4, justifyContent: 'center', alignItems: 'center', borderWidth: 1,}}>
                <Text>팔로우  {follow}</Text>
              </View>
              <View styles={{ flex: 4, justifyContent: 'center', alignItems: 'center', borderWidth: 1,}}>
                <Text>팔로잉  {following}</Text>
              </View>
              <View styles={{ flex: 4, justifyContent: 'center', alignItems: 'center', borderWidth: 1,}}>
                <Text>순위  {rank} </Text>
              </View>
            </View>
        </View>
      </View>
      <View style={{ flex:1, justifyContent:'center', alignItems: 'center', flexDirection: "row"}}>
        <View style={{flex:4, justifyContent:'center', alignItems: 'center', borderWidth: 1,}}>
          <Text>Badges</Text> 
        </View>
      </View>
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