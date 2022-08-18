import React, { useState } from "react";
import { ScrollView, Dimensions, StyleSheet, Alert, Platform, View, Image, Text } from "react-native";

import axios from "axios";
import Video from "react-native-video";
import Swiper from 'react-native-swiper';
import { useSelector } from "react-redux";
import { Button, ScreenHeight } from "@rneui/base";
import { Form, FormItem } from 'react-native-form-component';
import EncryptedStorage from 'react-native-encrypted-storage';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import userSlice from "../../slices/user";
import { useAppDispatch } from "../../store";
import { RootState } from "../../store/reducer";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


function NewFeedScreen({ navigation }) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  // const [profileImage, setProfileImage]: any = useState({});

  const [file, setFile] = useState<object[]>([])

  const dispatch = useAppDispatch();
  const whoamI = useSelector((state : RootState) => state.user.userId)
  const myId = useSelector((state: RootState) => state.user.accessToken)
  
  let files: object[] = []

  const url = 'http://i7d205.p.ssafy.io/api/board/'
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
        mediaType: 'mixed',
        selectionLimit: 0,
      },
      (res) => {
      if(res.didCancel) {
        console.log('User Cancelled image picker')
      } else if(res.errorCode) {
        console.log(res.errorMessage)
      } else if(res.assets) {
        const medias = res.assets
        console.log(medias)
        medias.forEach(media => {
          const once = {
            name: media.fileName as string,
            type: media.type as string,
            uri: Platform.OS === 'android' ? media.uri as string : media.uri?.replace('file://', '') as string,
            width: media.width as number,
            height: media.height as number,
          }
          files.push(once)
        })
        console.log('저장소에서 가져옴', files)
        setFile(files);
        // console.log('또 저장 안되나?', file[0])
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
      console.log('보냈다 200번인가?', file)
      if (file.length > 0) {
        console.log('보낸다 미디어')
        const formData = new FormData()
        file.forEach(f => {
          formData.append('uploadfile', f)
        })
        axios.post(
          url + `files/${res.data}`,
          formData,
          {
            headers : {
              'Content-Type': 'multipart/form-data',
              'Authorization' : `Bearer ${myId}`
            }
          }
        ).then(res => console.log('받았다', res.data)
        ).catch(async (err) =>{
          console.log('지긋지긋한 미디어 오류', err)
        if (err.status === 403) {
          try {
            const userId = await EncryptedStorage.getItem('userId');
            const refreshToken = await EncryptedStorage.getItem('refreshToken');
            const response = await axios({
              method : 'post',
              url : 'http://i7d205.p.ssafy.io/api/checktoken',
              data : {
                userId: userId,
                refreshToken: refreshToken
              }
            });
            // accessToken 신규 발급 > 화면 유지
            await EncryptedStorage.setItem('accessToken', response.data)
            dispatch(
              userSlice.actions.setUser({
                accessToken : response.data
              })
              )
          } 
          catch { //refresh 만료 > 로그인화면
            if (err.response.status === 403) {
              dispatch(
                userSlice.actions.setUser({
                  userId : '',
                  accessToken : '',
                  nickname : ''
                }),
              );
              EncryptedStorage.removeItem('userId')
              EncryptedStorage.removeItem('accessToken')
              EncryptedStorage.removeItem('refreshToken')
            }
          }
        }
        })
      }
    }).catch(async (err) =>{
      console.log('일단 보낸거 같긴한데', err)
    if (err.status === 403) {
      try {
        const userId = await EncryptedStorage.getItem('userId');
        const refreshToken = await EncryptedStorage.getItem('refreshToken');
        const response = await axios({
          method : 'post',
          url : 'http://i7d205.p.ssafy.io/api/checktoken',
          data : {
            userId: userId,
            refreshToken: refreshToken
          }
        });
        // accessToken 신규 발급 > 화면 유지
        await EncryptedStorage.setItem('accessToken', response.data)
        dispatch(
          userSlice.actions.setUser({
            accessToken : response.data
          })
          )
      } 
      catch { //refresh 만료 > 로그인화면
        if (err.response.status === 403) {
          dispatch(
            userSlice.actions.setUser({
              userId : '',
              accessToken : '',
              nickname : ''
            }),
          );
          EncryptedStorage.removeItem('userId')
          EncryptedStorage.removeItem('accessToken')
          EncryptedStorage.removeItem('refreshToken')
        }
      }
    }
    })


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

    navigation.goBack()
  }

  return (
    <ScrollView
      style={styles.safe}
    >
      { (file.length > 0) && 
        <Swiper
          style={styles.swiper}
        >
          { file.map(file => {
            if ( file.type === 'image/jpeg') {
              return (
                <View
                  key={ file.name }
                  style={ styles.media }
                >
                  <Image
                    source={{ uri: file.uri}}
                    resizeMode="cover"
                    style={{
                      width: file.width,
                      height: file.height,
                      maxHeight: SCREEN_WIDTH * 0.8,
                      maxWidth: SCREEN_WIDTH * 0.8,
                    }}
                  />
                </View>
              )
            } else {
              return(
                <View
                  key={ file.name }
                  style={ styles.media }
                ><Video
                    source={{ uri: file.uri }}
                    style={{
                      height: SCREEN_WIDTH * 0.8,
                      width: SCREEN_WIDTH * 0.8,
                    }}
                /></View>
                )
            }
          })}
        </Swiper>
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
      /> */}

      {/* <Button
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
        style={{
          marginBottom: SCREEN_HEIGHT * 0.1
        }}
        >
        <FormItem
          label="제목"
          value={title}
          returnKeyType="next"
          onChangeText={setTitle}
          placeholder="제목을 입력해주세요"
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
    paddingVertical: SCREEN_HEIGHT * 0.05,
    paddingHorizontal: SCREEN_WIDTH * 0.1,
  },
  button: {
    width: SCREEN_WIDTH * 0.2,
  },
  media: {
    alignItems: 'center'
  },
  swiper: {
    height: SCREEN_HEIGHT * 0.5,
  },
});
export default NewFeedScreen