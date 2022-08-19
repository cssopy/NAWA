import React, { useState } from "react";
import { Alert, Modal, Dimensions, StyleSheet, Text, Pressable, View, Image } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import { Form, FormItem } from 'react-native-form-component';
import { Button, ScreenHeight } from "@rneui/base";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// 모달에 이미지 선택하는 기능 넣기
function UserImage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [flag, setFlag] = useState<boolean>(false)
  const [profileImage, setProfileImage]: any = useState([]);

  const [file, setFile] = useState<object[]>([])

  const userId = useSelector((state : RootState) => state.user.userId)
  const accessToken = useSelector((state: RootState) => state.user.accessToken)
  //////////////////////////////////////////////////////////////////////
  // const url = `http://i7d205.p.ssafy.io/api/user/profile-img/`  // {userId} 붙이기
  
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
  //////////////////////////////////////////////////////////////////////
  // const [downProfile, setDownProfile] = useState(`http://i7d205.p.ssafy.io/api/user/profile-img/${userId}`)
  
  
  // const downProfileImg = () => {
  //   //////////////////////////////////////////////////////////////////////
  //   axios.get(`http://i7d205.p.ssafy.io/api/user/profile-img/${userId}`,
  //   {
  //     headers: {
  //       'Authorization' : `Bearer ${accessToken}`
  //     }
  //   }).then(res => {
  //     console.log('downProfileImg 보냈다 200번인가?', res.config.url)
  //     // setDownProfile(res.config.url)
  //     // console.log(downProfile)
  //   })
  //   .catch(err => console.log('?', err))
    
  // }
  const openStorage = () => {

    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 0,
      },
      (res) => {
      if(res.didCancel) {
        console.log('User Cancelled image picker')
        setFlag(false)
      } else if(res.errorCode) {
        console.log(res.errorMessage)
        setFlag(false)
      } else if(res.assets) {
        const medias = res.assets[0]
        console.log(medias)
        const once = {
          name: medias.fileName as string,
          type: medias.type as string,
          uri: Platform.OS === 'android' ? medias.uri as string : medias.uri?.replace('file://', '') as string,
          width: medias.width as number,
          height: medias.height as number,
        }
        console.log('저장소에서 가져옴', once)
        setProfileImage(once);
        }
        setFlag(true)
        console.log(accessToken)
      }
    )
  }

  const onSubmit = async () => {

    // 프로필 이미지 전송 => 성공
    const formData = new FormData()

    console.log('progileimg:', profileImage)
    formData.append('profileImg', profileImage)
    console.log(formData)
    //////////////////////////////////////////////////////////////////////
    await  axios.put(
      `http://i7d205.p.ssafy.io/api/user/profile-img/${userId}`,
      formData,
      {
        headers : {
          'Content-Type': 'multipart/form-data',
          'Authorization' : `Bearer ${accessToken}`
        }
      }
    ).then(res => {
      console.log('보냈다 200번인가?', res.data)
      
    }
    )
    .catch(err => console.log('error?', err))
    // 여기까지
    setFlag(false)
    console.log(flag)
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>프로필 이미지 변경</Text>
            <Image 
              source = {{
              //////////////////////////////////////////////////////////////////////                
              uri: `http://i7d205.p.ssafy.io/api/user/profile-img/${userId}`,
              headers : {
                'Authorization' : `Bearer ${accessToken}`
              },
            }}
            style={styles.profileImageSelect}/>
            {/* 기기 내부에서  */}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={openStorage}
            >
              <Text style={styles.textStyle}>이미지 찾기</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onSubmit}
            >
              <Text style={styles.textStyle}>이미지 변경</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        // style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Image 
            source = {{
              uri: `http://i7d205.p.ssafy.io/api/user/profile-img/${userId}`,
              headers : {
                'Authorization' : `Bearer ${accessToken}`
              },
            }}
            style={styles.profileImage}/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
  },
  modalView: {
    margin: 10,
    width: '90%',
    height: '90%',
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
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
    borderRadius: 5,
    padding: 10,
    margin: 5,
    // elevation: 2
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "skyblue",
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
  profileImage : {
    width : 75,
    height : 75,
    resizeMode : 'contain',
  },
  profileImageSelect : {
    width : 140,
    height : 140,
    resizeMode : 'contain',
  },
});

export default UserImage;