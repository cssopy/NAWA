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
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import {RootStackParamList} from '../../AppInner';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {Form, FormItem} from 'react-native-form-component';

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
      return Alert.alert('알림', '아이디을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    try {
      setLoading(true);
      const response = await axios.post(`http://i7d205.p.ssafy.io:8080/user/login`, {
        userId,
        password,
      });
      Alert.alert('알림', '로그인 되었습니다.');
      dispatch(
        userSlice.actions.setUser({ // 이 액션이 dispatch 되면 
          accessToken: response.data.data.accessToken,
          refreshToken : response.data.data.refreshToken
        }),
      );
      await EncryptedStorage.setItem(
        'accessToken',
        response.data.data.accessToken,
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.data.refreshToken,
      );
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, dispatch, userId, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = userId && password;
  return (
    <DismissKeyboardView>
      {/* <View style={styles.inputWrapper}>
        <Image
                source={require('../assets/nawa_white.png')}
                style={styles.logoImage}
            /> 
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeuserId}
          placeholder="아이디를 입력해주세요"
          placeholderTextColor="#666"
          importantForAutofill="yes"
          autoComplete="username"
          textContentType="username"
          value={userId}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={userIdRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          placeholderTextColor="#666"
          importantForAutofill="yes"
          onChangeText={onChangePassword}
          value={password}
          autoComplete="password"
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            canGoNext
              ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
              : styles.loginButton
          }
          disabled={!canGoNext || loading}
          onPress={onSubmit}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>로그인</Text>
          )}
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입하기</Text>
        </Pressable>
      </View> */}
      <View style={styles.logoWrap}>
        <Image
          source={require('../assets/nawa_black.png')}
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
            // label = "아이디"
            // labelStyle= {styles.labelForm}
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
          />
        <FormItem
          // label = "비밀번호"
          // labelStyle={styles.labelForm}
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
        />
      </Form>
      <Form 
        onButtonPress={toSignUp}
        buttonText = '회원가입하기'
        buttonStyle={styles.signUpButtonForm}
        // style = {styles.inputWrapperForm}
        >
      </Form>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    // backgroundColor: 'gray',
    backgroundColor: '#acd5e8',
    paddingHorizontal: 140,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    // backgroundColor: 'blue',
    backgroundColor: '#00aeff',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
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
    autoCapitalize: "none"
    
  },
  labelForm : {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 30,
  },
  inputWrapperForm: {
    backgroundColor: '#F5F5F5'
  },
  inputWrapperFormPassword: {
    paddingLeft: 20,
    paddingRight: 0,
  },
});

export default SignIn;