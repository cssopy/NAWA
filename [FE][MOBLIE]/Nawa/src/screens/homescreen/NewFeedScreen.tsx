import React, { useCallback, useState } from "react";
import { ScrollView, Dimensions, StyleSheet, Alert, Platform, View } from "react-native";

import { Form, FormItem } from 'react-native-form-component';
import { Button, ScreenHeight } from "@rneui/base";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import EncryptedStorage from 'react-native-encrypted-storage';
import {useAppDispatch} from '../../store';
import userSlice from "../../slices/user";


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


function NewFeedScreen({ navigation }) {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState({});
  const [loading, setLoading] = useState(false)
  



  const whoamI = useSelector((state : RootState) => state.user.userId)

  const myId = useSelector((state: RootState) => state.user.accessToken)

  const url = 'http://i7d205.p.ssafy.io:8080/board/'

  const openCamera = () => {
    const option = {
      mediaType: 'photo',
    };
    
    launchCamera(option, (res) => {
      if(res.didCancel) {
        console.log('User Cancelled image picker')
      } else if(res.errorCode) {
        console.log(res.errorMessage)
      } else {
        const data = res.assets
        const callMedia = {
          uri: data[0].uri,
          type: data[0].type,
          name: data[0].fileName,
        }
        setMedia(callMedia)
      }
    })
  }

  const openVideo = () => {
    const bring = {
      uri: '',
      type: '',
      name: '',
    };

    const option = {
      mediaType: 'video',
    };
    
    launchCamera(option, (res) => {
      if(res.didCancel) {
        console.log('User Cancelled image picker')
      } else if (res.errorCode) {
        console.log(res.errorMessage)
      } else if (res.assets) {
        bring.name = res.assets[0].fileName;
        bring.type = res.assets[0].type;
        bring.uri = Platform.OS === 'android' ? res.assets[0].uri : res.assets[0].uri.replace('file://', '');
        setMedia(bring)
      }
    })
  }

  const openStorage = async () => {
    const bring = {
      uri: '',
      type: '',
      name: '',
    };

    const option = {
      mediaType: 'mixed',
    }

    await launchImageLibrary(option, (res) => {
      if(res.didCancel) {
        console.log('User Cancelled image picker')
      } else if(res.errorCode) {
        console.log(res.errorMessage)
      } else {
        bring.name = res.assets[0].fileName;
        bring.type = res.assets[0].type;
        bring.uri = Platform.OS === 'android' ? res.assets[0].uri : res.assets[0].uri.replace('file://', '');
        setMedia(bring)
        console.log(media)
      }
    })
  }
  
  const onSubmit = async () => {
    // const formdata = new FormData();


    // formdata.append(
    //   "key",
    //   new Blob([JSON.stringify({
    //     boardTitle: title,
    //     boardContent: content,
    //     userId:myId
    //   })],
    //   {
    //     type: 'application/json'
    //   }))

    // formdata.append('uploadfile', media)

    // console.log(formdata)

    // const formData = new FormData();
    // formData.append('uploadfile', media)

    // const requestOptions = {
    //   method: 'post',
    //   body: formData,
    //   redirect: 'follow',
    //   headers: {
    //     Authorization: myId,
    //   }
    // }
    // await fetch(url, requestOptions)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))

    // try {
    //   const response = await fetch('http://i7d205.p.ssafy.io:8080/board/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: myId,
    //   },
    //   body: formdata
    //   })
    //   const json = await response.json();
    //   console.log(json)
    // } catch (err) {
    //   console.log(err)
    // }
    // console.log(formdata)

    const textData = new FormData()
    const imgData = new FormData()
    // textData.append('key', new Blob([JSON.stringify({
    //   boardTitle: title,
    //   boardContent: content,
    //   userId: whoamI,
    //   })]))
    imgData.append('uploadfile', media)

    await axios({
      method: 'post',
      url: url,
      data: {
        key: JSON.stringify({
          boardTitle: title,
          boardContent: content,
          userId: whoamI,
        }),

        // uploadfile: media,
        imgData
      },
      headers: {
        'Authorization': `Bearer ${myId}`,
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'multipart/form-data',
        //  boundary=someArbitraryUniqueString',
      },
    }).then(res => {
    }).catch( async err => {
      console.log('왜 또', err)
      try {
        const refreshToken = await EncryptedStorage.getItem('refreshToken')
        const response = await axios.put(
          'http://i7d205.p.ssafy.io:8080/checktoken',
          {
            userId: whoamI,
            refreshToken: refreshToken
          },
          );
          EncryptedStorage.setItem('accessToken', response.data.accessToken)
          dispatch(
            userSlice.actions.setUser({
              accessToken : response.data.accessToken
            }),
            )
          }
          catch (error) {
            // EncryptedStorage.removeItem('accessToken')
            // EncryptedStorage.removeItem('refreshToken')
            
            // dispatch(
            //   userSlice.actions.setUser({
            //     userId : '',
            //     nickname: '',
            //     accessToken: '',
            //   }),
            //   )
            //   console.log('두번째 샛길로')
            }
            
            


      // console.log(err)
    })

    // axios.post('http://i7d205.p.ssafy.io:8080/board/',
    // {
    //   key: JSON.stringify({
    //     boardTitle: title,
    //     boardContent: content,
    //     userId: whoamI,
    //   }),

    //   uploadfile: media,
    // },
    // { headers: {
    //   // 'Content-Type': 'multipart/form-data',
    //   Authorization: myId,
    //   'Content-Type': 'multipart/form-data',
    // },
    // transformRequest: (data, headers) => {
    //   return data;
    // },
    // }).then(function (res) {
    //     console.log('결과: ', res)
    //   }).catch(function (err) {
    //     console.log('에러: ', err)
    //   });

    // axios.get('http://i7d205.p.ssafy.io:8080/board/')
    // .then(res => {
    //   console.log('결과: ', res)
    // }).catch(err => {
    //   console.log('에러: ',err)
    // })
    navigation.navigate('Main')
  }

  return (
    <ScrollView
      style={styles.safe}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: 'space-evenly',
          marginBottom: SCREEN_HEIGHT * 0.05
        }}
      >
      
      <Button
        title="사진"
        onPressIn={openCamera}
        containerStyle={styles.button}
      />

      <Button
        title="동영상"
        onPressIn ={openVideo}
        containerStyle={styles.button}
      />

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
          textArea
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