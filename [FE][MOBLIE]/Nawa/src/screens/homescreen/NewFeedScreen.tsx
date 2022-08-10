import React, { useState } from "react";
import { ScrollView, Dimensions, StyleSheet, Alert, Platform, View } from "react-native";

import { Form, FormItem } from 'react-native-form-component';
import { Button, ScreenHeight } from "@rneui/base";
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


function NewFeedScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false)

  // const whoamI = useSelector((state : RootState) => state.user.userId)
  const whoamI = 'imageupload12'

  let getMedia;

  const formdata = new FormData();

  const onSubmit = async () => {
    console.log(getMedia)
    if (loading) return;
    try {
      formdata.append("key", new Blob([JSON.stringify({
        boardContent: content,
        boardTitle: title,
        userId: whoamI
      })]))
      setLoading(true);
      console.log(formdata)
      await axios.post('http://i7d205.p.ssafy.io:8080/board',{
        formdata,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('오류가 발생했습니다');
      }
    } finally {
      setLoading(false)
    }
    navigation.navigate('Main')
  }

  const openCamera = () => {
    const option = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 1
    }
    
    launchCamera(option, (res) => {
      if(res.didCancel) {
        console.log('User Cancelled image picker')
      } else if(res.errorCode) {
        console.log(res.errorMessage)
      } else {
        const data = res.assets
        const media = {
          uri: data[0].uri,
          type: data[0].type,
          name: data[0].fileName,
        }
        getMedia = media
      }
    })
  }

  const openVideo = () => {
    const option = {
      mediaType: 'video',
      quality: 1
    }
    
    launchCamera(option, (res) => {
      if(res.didCancel) {
        console.log('User Cancelled image picker')
      } else if(res.errorCode) {
        console.log(res.errorMessage)
      } else {
        const data = res.assets
        const media = {
          uri: data[0].uri,
          type: data[0].type,
          name: data[0].fileName,
        }
        getMedia = media
      }
    })
  }

  const openStorage = () => {
    const option = {
      mediaType: 'mixed',
      includeBase64: true,
    }

    launchImageLibrary(option, (res) => {
      if(res.didCancel) {
        console.log('User Cancelled image picker')
      } else if(res.errorCode) {
        console.log(res.errorMessage)
      } else {
        const data = res.assets
        const media = {
          uri: data[0].base64,
          type: data[0].type,
          name: data[0].fileName,
        }
        console.log(media)
        getMedia = media
        formdata.append('uploadfile', media)
      }
    })
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