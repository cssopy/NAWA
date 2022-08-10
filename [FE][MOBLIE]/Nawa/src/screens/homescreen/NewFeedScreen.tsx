import React, { useState } from "react";
import { SafeAreaView, ScrollView, Dimensions, StyleSheet, Image, Platform, Alert } from "react-native";

import { Form, FormItem } from 'react-native-form-component';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button } from "@rneui/base";
import axios, { AxiosError } from "axios";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


function NewFeedScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState([]);
  const [imgVisible, setImgVisible] = useState(false);
  const [loading, setLoading] = useState(false)


  const onSubmit = async () => {
    // const formdata = new FormData();
    if (loading) return;
    try {
      setLoading(true);
      const response = await axios.post('http://i7d205.p.ssafy.io:8080/board',{
        key: {
          boardContent: content,
          boardTitle: title,
          // userId: 
        },
        uploadfile: {

        }
      });
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', 'errorResponse.data.message')
      }
    } finally {
      setLoading(false)
    }
    navigation.navigate('Main')
  }

  const pickLibraryImage = () => {
    launchImageLibrary({
      mediaType: "mixed",
      includeBase64: Platform.OS === 'android',
    }, (res) => {
      console.log(res.assets);
      if (res.didCancel) return;
      setImgVisible(true)
    })
  }

  return (
    <SafeAreaView
      style={styles.safe}
    >
      {/* {true &&
        <Image source={{uri: }}/>
      } */}
      <ScrollView>
        <Form
          onButtonPress={onSubmit}
          buttonText = "보내기"
          >
          <Button
            title="갤러리"
            onPress={() => pickLibraryImage}
            containerStyle={{
              width: SCREEN_WIDTH * 0.8,
              marginBottom: SCREEN_HEIGHT * 0.05,
            }}
          />
          <FormItem
            textArea
            label="내용"
            value={title}
            returnKeyType="send"
            placeholder="내용을 입력해주세요"
            onChangeText={setTitle}
          />
          <FormItem
            textArea
            label="내용"
            value={title}
            returnKeyType="send"
            placeholder="내용을 입력해주세요"
            onChangeText={setTitle}
          />
        </Form>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    marginTop: SCREEN_HEIGHT * 0.1,
    marginHorizontal: SCREEN_WIDTH * 0.1,
  }
});
export default NewFeedScreen