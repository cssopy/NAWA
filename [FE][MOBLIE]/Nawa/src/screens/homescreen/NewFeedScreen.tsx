import React, { useCallback, useState } from "react";
import { ScrollView, Dimensions, StyleSheet, Alert, Platform, View } from "react-native";

import { Form, FormItem } from 'react-native-form-component';
import { Button, ScreenHeight } from "@rneui/base";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
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
  const [media, setMedia]: any[] = useState([]);
  const [profileImage, setProfileImage]: any = useState({});
  



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
        data?.map((file) => {
          const callMedia = {
          uri: file.uri,
          type: file.type,
          name: file.fileName,
          }
          setMedia(media.append(callMedia))
        })
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
      } else {
        const data=res.assets
        data?.map((file) => {
          const callMedia = {
          uri: file.uri,
          type: file.type,
          name: file.fileName,
          }
          setMedia(media.append(callMedia))
        })
      }
    })
  }

  const openStorage = async () => {
    const option = {
      mediaType: 'mixed',
      selectionLimit: 0,
    }

    const bring = {
      name: '',
      type: '',
      uri: '',
    }

    await launchImageLibrary(option, (res) => {
      let result = []
      if(res.didCancel) {
        console.log('User Cancelled image picker')
      } else if(res.errorCode) {
        console.log(res.errorMessage)
      } else if(res.assets) {
        setMedia(undefined)
        const data = res.assets
        data.map(file => {
          bring.name = file.fileName;
          bring.type = file.type;
          bring.uri = Platform.OS === 'android' ? file.uri : file.uri.replace('file://', '');
          result.push(bring)
          setProfileImage(bring)
        })
        setMedia(result)
      }
    })
  }
  
  const onSubmit = () => {
    if ( !title ) {
      return Alert.alert('알림', '제목은 필수항목입니다')
    }
    if ( !content ) {
      return Alert.alert('알림', '글을 입력해주세요')
    }
    const formData = new FormData()
    const files: any [] = media
    // console.log(files)
    // formData.append('uploadfile', files.length > 0 ? files : null);
    files.map(file => {
      formData.append('uploadfile', file)
    })

    let inputs = {
      "boardTitle": title,
      "boardContent": content,
      "userId": whoamI,
    };
    const json = JSON.stringify(inputs);
    // const blob = new Blob([json], { type: 'application/json' });

    // formData.append("key", blob);
    // console.log(formData)
    // console.log(json)
    // console.log(typeof(json))

    formData.append('key', inputs)
    console.log(formData)

    try{
      axios.post(
        'http://i7d205.p.ssafy.io:8080/board/',
        // formData,
        json,
        {
          headers : {
            // "Content-Type": "multipart/form-data",
            'Authorization' : `Bearer ${myId}`
          }
        }
      ).then(res => console.log('보냈다 200번인가?', res))
      .catch(err => console.log('일단 보낸거 같긴한데', err))
      } catch (error) {
        console.log('또 못 보내?', error)
      }

    // // 프로필 이미지 전송 => 성공
    // const formData2 = new FormData()

    // console.log(profileImage)
    // formData2.append('profileImg', profileImage)
    // console.log(formData2)

    // await axios.put(
    //   'http://i7d205.p.ssafy.io:8080/user/profile-img/ssafy',
    //   formData2,
    //   {
    //     headers : {
    //       'Content-Type': 'multipart/form-data',
    //       'Authorization' : `Bearer ${myId}`
    //     }
    //   }
    // ).then(res => console.log('보냈다 200번인가?', res))
    // .catch(err => console.log('?', err))
    // 여기까지

    // await axios({
    //   method: 'post',
    //   url: url,
    //   data: formData,
    //   headers: {
    //     'Authorization': `Bearer ${myId}`,
    //     'Content-Type': 'multipart/form-data',
    //     //  boundary=someArbitraryUniqueString',
    //   },
    // })
    // .then(res => { console.log(res)
    // }).catch( async err => {
    //   console.log('왜 또', err)
      // try {
      //   const refreshToken = await EncryptedStorage.getItem('refreshToken')
      //   const response = await axios.post(
      //     'http://i7d205.p.ssafy.io:8080/checktoken',
      //     {
      //       userId: whoamI,
      //       refreshToken: refreshToken
      //     },
      //   );
      //   EncryptedStorage.setItem('accessToken', response.data.accessToken)
      //   dispatch(
      //     userSlice.actions.setUser({
      //       accessToken : response.data.accessToken
      //     }),
      //     )
      //   }
      //   catch (error) {
      //     // EncryptedStorage.removeItem('accessToken')
      //     // EncryptedStorage.removeItem('refreshToken')
          
      //     // dispatch(
      //     //   userSlice.actions.setUser({
      //     //     userId : '',
      //     //     nickname: '',
      //     //     accessToken: '',
      //     //   }),
      //     //   )
      //     //   console.log('두번째 샛길로')
      //     }
            
            


      // console.log(err)
    // })

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
      <View>
        { }
      </View>
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