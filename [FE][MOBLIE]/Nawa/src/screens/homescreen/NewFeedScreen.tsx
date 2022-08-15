import React, { useState } from "react";
import { ScrollView, Dimensions, StyleSheet, Alert, Platform, View, Image } from "react-native";

import { Form, FormItem } from 'react-native-form-component';
import { Button, ScreenHeight } from "@rneui/base";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import EncryptedStorage from 'react-native-encrypted-storage';
import {useAppDispatch} from '../../store';
import userSlice from "../../slices/user";
import { useIsFocused } from "@react-navigation/native";


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


function NewFeedScreen({ navigation }) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [flag, setFlag] = useState<boolean>(false)
  // const [profileImage, setProfileImage]: any = useState({});

  const [file, setFile] = useState({
    name: '',
    type: '',
    uri: '',
    width: 0,
    height: 0,
  })

  const whoamI = useSelector((state : RootState) => state.user.userId)
  const myId = useSelector((state: RootState) => state.user.accessToken)
  const url = 'http://i7d205.p.ssafy.io:8080/board/'
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


  // const openCamera = () => {
  //   const option = {
  //     mediaType: 'photo',
  //   };
    
  //   launchCamera(option, (res) => {
  //     if(res.didCancel) {
  //       console.log('User Cancelled image picker')
  //     } else if(res.errorCode) {
  //       console.log(res.errorMessage)
  //     } else {
  //       const data = res.assets
  //       data?.map((file) => {
  //         const callMedia = {
  //         uri: file.uri,
  //         type: file.type,
  //         name: file.fileName,
  //         }
  //       })
  //     }
  //   })
  // }

  // const openVideo = () => {

  //   const option = {
  //     mediaType: 'video',
  //   };
    
  //   launchCamera(option, (res) => {
  //     if(res.didCancel) {
  //       console.log('User Cancelled image picker')
  //     } else if (res.errorCode) {
  //       console.log(res.errorMessage)
  //     } else {
  //       const data=res.assets
  //       data?.map((file) => {
  //         const callMedia = {
  //         uri: file.uri,
  //         type: file.type,
  //         name: file.fileName,
  //         }
  //         setMedia(media.append(callMedia))
  //       })
  //     }
  //   })
  // }

  const openStorage = () => {

    launchImageLibrary(
      {
        mediaType: 'photo',
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
        const media = res.assets[0]
        console.log(media)
        setFile({
          name: media.fileName as string,
          type: media.type as string,
          uri: Platform.OS === 'android' ? media.uri as string : media.uri?.replace('file://', '') as string,
          width: media.width as number,
          height: media.height as number,
        });
        setFlag(true)
      }
    })
  }
  
  const onSubmit = async () => {
    if ( !title ) {
      return Alert.alert('알림', '제목은 필수항목입니다')
    }
    if ( !content ) {
      return Alert.alert('알림', '글을 입력해주세요')
    }

    let inputs = {
      "boardTitle": title,
      "boardContent": content,
      "userId": whoamI,
    };
    const json = JSON.stringify(inputs);

    await axios.post(
      url,
      json,
      {
        headers : {
          "Content-Type": "application/json",
          'Authorization' : `Bearer ${myId}`
        }
      }
    ).then(res => {
      console.log('보냈다 200번인가?', flag, file)
      if (file.name) {
        console.log('보낸다 미디어')
        const formData = new FormData()
        formData.append('uploadfile', file)
        axios.post(
          url + `files/${res.data}`,
          formData,
          {
            headers : {
              'Content-Type': 'multipart/form-data; boundary=someArbitraryUniqueString',
              'Authorization' : `Bearer ${myId}`
            }
          }
        ).then(res => console.log('받았다', res.data)
        ).catch(err => console.log('지긋지긋한 미디어 오류', err))
      }
    })
    .catch(err => console.log('일단 보낸거 같긴한데', err))


    // // 프로필 이미지 전송 => 성공
    // const formData2 = new FormData()

    // console.log(profileImage)
    // formData2.append('profileImg', profileImage)
    // console.log(formData2)

    // axios.put(
    //   'http://i7d205.p.ssafy.io:8080/user/profile-img/ssafy',
    //   formData,
    //   {
    //     headers : {
    //       'Content-Type': 'multipart/form-data',
    //       'Authorization' : `Bearer ${myId}`
    //     }
    //   }
    // ).then(res => console.log('보냈다 200번인가?', res.data))
    // .catch(err => console.log('?', err))
    // 여기까지

    setFlag(false)
    console.log(flag)
    navigation.navigate('Main')
  }

  return (
    <ScrollView
      style={styles.safe}
    >
      { flag &&
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: SCREEN_HEIGHT * 0.01,
          }}
        >
          <Image
            source={{uri : file.uri}}
            style={{
              width: file.width * 0.2,
              height: file.height * 0.2,
            }}
          />
        </View>
      }
      <View
        style={{
          flexDirection: "row",
          justifyContent: 'space-evenly',
          marginBottom: SCREEN_HEIGHT * 0.05
        }}
      >
      
      {/* <Button
        title="사진"
        onPressIn={openCamera}
        containerStyle={styles.button}
      />

      <Button
        title="동영상"
        onPressIn ={openVideo}
        containerStyle={styles.button}
      /> */}

      <Button
        title="갤러리"
        onPressIn={openStorage}
        containerStyle={styles.button}
      />
      </View>
      <Form
        onButtonPress={onSubmit}
        buttonText = "보내기"
        >
        <FormItem
          label="제목"
          value={title}
          returnKeyType="next"
          placeholder="제목을 입력해주세요"
          onChangeText={setTitle}
        />
        <FormItem
          textArea
          label="내용"
          value={content}
          returnKeyType="send"
          placeholder="내용을 입력해주세요"
          onChangeText={setContent}
        />
      </Form>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  safe: {
    paddingVertical: ScreenHeight * 0.05,
    paddingHorizontal: SCREEN_WIDTH * 0.1,
  },
  button: {
    width: SCREEN_WIDTH * 0.2,
  }
});
export default NewFeedScreen