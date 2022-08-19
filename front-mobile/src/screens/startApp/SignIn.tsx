import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import {RootStackParamList} from '../../../AppInner';
import {useAppDispatch} from '../../store';
import userSlice from '../../slices/user';
import {Form, FormItem} from 'react-native-form-component';
import AsyncStorage from '@react-native-community/async-storage';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;


function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [userId, setuserId] = useState('');
  const [password, setPassword] = useState('');
  const userIdRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  
  const onChangeuserId = useCallback(text => {
    setuserId(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);
  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!userId || !userId.trim()) {
      return Alert.alert('알림', '아이디를 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
//////////////////////////////////////////////////////////////////// 시작//////////////////////////////////////////
    try {
      setLoading(true);
      const nickname = await AsyncStorage.getItem('nickname')

      const response = await axios.post(`http://i7d205.p.ssafy.io/api/token/login`, {
        userId,
        password,
      });

      console.log("login pass")
      dispatch(
        userSlice.actions.setUser({ // 이 액션이 dispatch 되면 
          userId : response.data.userId,
          nickname : response.data.nickname,
          accessToken : response.data.accessToken,
        }),
        );
      Alert.alert('알림', '로그인 되었습니다.');
      await EncryptedStorage.setItem(
        'userId', userId
      );
      await EncryptedStorage.setItem(
        'accessToken', response.data.accessToken
      );
      await EncryptedStorage.setItem(
        'refreshToken', response.data.refreshToken,
      );

    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', '아이디, 비밀번호를 확인해주세요.');
      }
      
    } finally {
      setLoading(false);
    }
  }, [loading, dispatch, userId, password]);
  //////////////////////////////////////////////////////////////////// 끝 //////////////////////////////////////////






  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const toFindinfo = useCallback(() => {
    navigation.navigate('FindInfo');
  }, [navigation]);

  const canGoNext = userId && password;
  return (
    <DismissKeyboardView>
     
     <View style={styles.logoWrap}>
        <Image
          source={require('../../assets/nawa_black.png')}
          style={styles.logoImage}
        />
      </View> 
      <Form
        onButtonPress={onSubmit}
        buttonText = '로그인'
        buttonStyle = {
          canGoNext
            ? StyleSheet.compose(styles.loginButtonForm, styles.loginButtonActiveForm)
            : styles.loginButtonForm
          }
        >
   <FormItem
            style={styles.textInputForm}
            // isRequired  // 넣으면 칸 안이쁘게 깨짐
            onChangeText={onChangeuserId}
            placeholder="아이디"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            autoComplete="username"
            textContentType="username"
            // keyboardType="default"
            value={userId}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={userIdRef}
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
            underneathText= "아이디"
            autoCapitalize= 'none'
            textInputStyle={styles.textinput}         
          />
        <FormItem
          style={styles.textInputForm}
          onChangeText={onChangePassword}
          value = {password}
          placeholder="비밀번호"
          placeholderTextColor="#666"
          importantForAutofill="yes"  
          autoComplete="password"
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
          autoCapitalize= 'none'
          textInputStyle={styles.textinput}         
        />
      </Form>
      <Form 
        onButtonPress={toFindinfo}
        buttonText = '아이디 / 비밀번호 찾기'
        buttonStyle={styles.signUpButtonForm}
        >
      </Form>
      <Form 
        onButtonPress={toSignUp}
        buttonText = '회원가입하기'
        buttonStyle={styles.signUpButtonForm}
        >
      </Form>

    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  logoWrap: {
    flex : 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  logoImage : {
    width : 120,
    height : 60,
    resizeMode : 'contain',
    marginLeft: 120,
    marginTop: 120,
    marginBottom: 20,
  },
  signUpButtonForm: {
    backgroundColor: 'gray',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
    paddingVertical: 1,
    borderRadius: 5,
  },
  loginButtonForm: {
    backgroundColor: '#acd5e8',
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  loginButtonActiveForm: {
    backgroundColor: '#00aeff',
  },
  textInputForm: {
    padding: 5,
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    autoCapitalize: "none",
  },
  textinput : {
    color : 'black'
  }
});

export default SignIn;
