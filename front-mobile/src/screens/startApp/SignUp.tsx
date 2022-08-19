import React, { useCallback, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import {RootStackParamList} from '../../../AppInner';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {useAppDispatch} from '../../store';
import userSlice from '../../slices/user';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>

// 사진파일 저장 필요


function SignUp({navigation} : SignUpScreenProps) {
    const dispatch = useAppDispatch();
    




    // 임시 저장공간 생성
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [nickName, setNickName] = useState('');
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState('');
    const passwordRef = useRef<TextInput | null>(null);
    const emailRef = useRef<TextInput | null>(null);
    const numberRef = useRef<TextInput | null>(null);



    // 아이디 닉네임 중복 / 번호 인증 / 비밀번호 확인test
    const [openId, setOpenId] = useState('');
    const openIdRef = useRef<TextInput | null>(null);
    const [openNickname, setOpenNickname] = useState('');
    const openNicknameRef = useRef<TextInput | null>(null);
    const [authNumber, setAuthNumber] = useState('');
    const authNumberRef = useRef<TextInput | null>(null);
    const [passwordCheck, setPasswordCheck] = useState('')
    const passwordCheckRef = useRef<TextInput | null>(null);
    // 성별 래디오 버튼
    const radio_props = [
      {label: '남성', value: "MAN" },
      {label: '여성', value: "WOMAN" }
    ];

  // 아이디 중복 검사
  const [idCheck, setIdCheck] = useState(false)
  const checkId = async () => {
    // setOpenId(e)
    try {
      console.log(openId, "&", userId)
      const response = await axios.get(`http://i7d205.p.ssafy.io/api/userId/${openId}`, {
      }).then(response => {
        setUserId(openId)
        setIdCheck(true)
        console.log('ID pass', openId, userId)
        Alert.alert('알림', '아이디 사용 가능합니다.')
        console.log(response.data)
      })
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      setUserId('')
      setIdCheck(false)
      if (errorResponse) {
        console.log(errorResponse.data)
        setUserId('')
        setIdCheck(false) 
        console.log("ID fail!")
        Alert.alert('알림', '아이디 중복입니다.')  
      }
    }
  }

  // 닉네임 중복 검사
  const [nicknameCheck, setNicknameCheck] = useState(false)
  const checkNickname = async () => {
    try {
      const response = await axios.get(`http://i7d205.p.ssafy.io/api/nickname/${openNickname}`, {
      }).then(response => {
        setNickName(openNickname)
        setNicknameCheck(true)
        console.log('Nickname pass', nickName)
        Alert.alert('알림', '사용 가능합니다.')
      })
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        console.log(errorResponse.data)
        setNickName('')
        setNicknameCheck(false)
        console.log("Nickname fail!")
        Alert.alert('알림', '닉네임 중복입니다.')  
      }
    }
  }

  // 인증 번호 보내기
  const [sendNumber, setSendNumber] = useState(false)
  const sendAuthNumber = async () => {
    try {
      const response = await axios.post(`http://i7d205.p.ssafy.io/api/sms`, {
        "recipientPhoneNumber": number});
      console.log(number)
      setSendNumber(true)
      Alert.alert('알림', '인증번호가 전송되었습니다.')
    }
    catch {
      console.log('not available')
      Alert.alert('알림', '이미 등록된 번호입니다.')
    }
  }
  
  // 인증 번호
  const [authNumberCheck, setAuthNumberCheck] = useState(false)
  const checkAuthNumber = async () => {
    
    try {
      const response = await axios.post(`http://i7d205.p.ssafy.io/api/sms/check`, {
        "certNumber": authNumber, 
        "recipientPhoneNumber": number});
      console.log("Authentication Pass", "번호인증완료")
      Alert.alert('알림', '번호 인증이 완료되었습니다.')
      setAuthNumberCheck(true)
    } 
    catch{
      console.log("retry")
      Alert.alert('알림', '인증되지 않았습니다.')
      setAuthNumberCheck(false)
    }
  }

    
    // 저장 함수
    const onChangeOpenId = useCallback(text => {
      setOpenId(text.trim());
    }, []);
    const onChangePassword = useCallback(text => {
        setPassword(text.trim());
    }, []);
    const onChangeEmail = useCallback(text => {
        setEmail(text.trim());
    }, []);
    const onChangeOpenNickname = useCallback(text => {
      setOpenNickname(text.trim());
  }, []);
    const onChangeNumber = useCallback(text => {
        setNumber(text.trim());
    }, []);

    const onChangeAuthNumber = useCallback(text => {
      setAuthNumber(text.trim());
    }, []);
    const onChangePasswordCheck = useCallback(text => {
      setPasswordCheck(text.trim());
  }, []);


    // 제출 처리 | 비동기 await | 유효성 검사
    const onSubmit = useCallback(async () => {
      if (loading) {
          return;
      }
      if (!userId || !userId.trim()) {
          return Alert.alert('ID 나와 !', 'ID를 입력해주세요');
      }
      if (!password || !password.trim()) {
          return Alert.alert('passWord 나와 !', 'passWord를 입력해주세요');
      }
      if (!date) {
          return Alert.alert('생일 나와 !', '생일을 입력해주세요');
      }
      if (!email || !email.trim()) {
          return Alert.alert('email 나와 !', 'email을 입력해주세요');
      }
      if (!nickName || !nickName.trim()) {
          return Alert.alert('닉네임 나와 !', '닉네임을 입력해주세요');
      }
      if (!number || !number.trim()) {
          return Alert.alert('번호 나와 !', '번호를 입력해주세요');
      }
      if (!userId || !userId.trim()) {
          return Alert.alert('ID 나와 !', 'ID를 입력해주세요');
      }
      if (!gender || !gender.trim()) {
          return Alert.alert('성별 나와 !', '성별을 입력해주세요');
      }
      if (
          !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
            email,
          )
      ) {
          return Alert.alert('이메일 나와 !', '올바른 이메일 주소가 아닙니다.');
      }
      if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,16}$/.test(password)) {
          return Alert.alert(
              'PassWord 나와 !',
              '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
          );
      }

        // 유효성 검사 추가 필요
  //////////////////////////////////////////////////////////////////// 시작//////////////////////////////////////////
  try {
    setLoading(true);
    console.log(`${date.getFullYear()}${ date.getMonth()+1 >9 ? (date.getMonth()+1) : "0"+(date.getMonth()+1) }${ date.getDate()>9 ? date.getDate() : "0"+date.getDate()}`)
    const response = await axios.post('http://i7d205.p.ssafy.io/api/signup', {
        userId : userId,
        password : password,
        birth : `${date.getFullYear()}${ date.getMonth()+1 >9 ? (date.getMonth()+1) : "0"+(date.getMonth()+1) }${ date.getDate()>9 ? date.getDate() : "0"+date.getDate()}`,
        emailId : email.split('@')[0],
        emailDomain : email.split('@')[1],
        nickname : nickName,
        number : number,
        genderType : gender,
    }).then(() =>console.log(response));
    Alert.alert('Welcome !', '회원가입 되었습니다.')
    await AsyncStorage.setItem(
      'nickname',
      nickName
    );
    dispatch(
      userSlice.actions.setUser({
        nickname : nickName,
      }),
    )
    navigation.navigate('SignIn')
  } catch (error) {
    console.log(error.response.status)
    if (error.response.status === 400) {
      Alert.alert('알림', '등록된 이메일입니다.');
    }
    if (error.response.status === 401) {
      Alert.alert('알림', '인증번호를 다시 확인하세요');
    }
  } finally {
    setLoading(false);
  }
  }, [loading, navigation, userId, password, date, email, nickName, number, gender]);

  const canGoNext = idCheck && password && password === passwordCheck && date && email && nicknameCheck && authNumberCheck && gender;

 
  return (
    <DismissKeyboardView>
    <View style={styles.viewTop}></View>
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>아이디</Text>
      <View style={{flex: 1, flexDirection:'row'}}>
        <View style={{flex: 5}}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeOpenId}
            placeholder="아이디를 입력해주세요"
            placeholderTextColor="#666"
            textContentType="username"
            value={openId}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={openIdRef}
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
            autoCapitalize= 'none'
          />
        </View>
        <View style={{flex: 2}}>
          <Pressable
            style={
              userId ?
              styles.checkButton 
              : StyleSheet.compose(styles.checkButton, styles.checkButtonActive)
            }
            disabled={!!userId}
            onPress={() => {
              setOpenId(openId)
              if (openId) {
                checkId()
              }
            }}>
            <Text style={styles.loginButtonText}>{ idCheck ? '통과완료' : '중복검사'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={styles.textInput}
        placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
        placeholderTextColor="#666"
        onChangeText={onChangePassword}
        value={password}
        keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
        textContentType="password"
        secureTextEntry
        returnKeyType="send"
        clearButtonMode="while-editing"
        ref={passwordRef}
        onSubmitEditing={() => passwordCheckRef.current?.focus()}
        autoCapitalize= 'none'
      />
    </View>
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput
        style={styles.textInput}
        placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
        placeholderTextColor="#666"
        onChangeText={onChangePasswordCheck}
        value={passwordCheck}
        keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
        textContentType="password"
        secureTextEntry
        returnKeyType="send"
        clearButtonMode="while-editing"
        ref={passwordCheckRef}
        onSubmitEditing={() => 
          password === passwordCheck ? 
          emailRef.current?.focus() 
          : Alert.alert('알람', '비밀번호와 다릅니다. \n확인이 필요합니다.')
        }
        autoCapitalize= 'none'
      />
    </View>
    <View style={styles.inputWrapper}>
      {  password && passwordCheck && password === passwordCheck ?
       <Text style={styles.textPassword}>비밀번호가 일치합니다.</Text>
       : <Text style={StyleSheet.compose(styles.textPassword, styles.textPasswordnot)}>비밀번호를 확인해주세요.</Text>}
    </View>
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>생일</Text>
      <View style={{flex: 1, flexDirection: "row"}}>
        <View style={{flex: 5}}>
          <Text style={styles.textBirth}>{date.getFullYear()} / {date.getMonth()+1} / {date.getDate()}</Text>
        </View>
        <View style={{flex: 2}}>
          <Pressable
              style={StyleSheet.compose(styles.checkButton, styles.checkButtonActive) }
              onPress={() => setOpen(true)}>
              <Text style={styles.loginButtonText}>달력 열기</Text>
            </Pressable>
          <DatePicker
              modal
              locale="ko"
              open={open}
              date={date}
              mode="date"
              onConfirm={(date) => {
                  setOpen(false)
                  setDate(date)
                  console.log(`${date.getFullYear()}${ date.getMonth()+1 >9 ? (date.getMonth()+1) : "0" + (date.getMonth()+1) }${ date.getDate()>9 ? date.getDate() : "0"+date.getDate()}`)
              }}
              onCancel={() => {
                  setOpen(false)
              }}
          />
        </View>
      </View>
    </View>
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>이메일</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeEmail}
        placeholder="이메일을 입력해주세요"
        placeholderTextColor="#666"
        textContentType="emailAddress"
        value={email}
        returnKeyType="next"
        clearButtonMode="while-editing"
        ref={emailRef}
        onSubmitEditing={() => openNicknameRef.current?.focus()}
        blurOnSubmit={false}
        autoCapitalize= 'none'
        keyboardType="email-address"
      />
    </View>
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>닉네임</Text>
      <View style={{flex: 1, flexDirection:'row'}}>
        <View style={{flex: 5}}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeOpenNickname}
            placeholder="닉네임을 입력해주세요"
            placeholderTextColor="#666"
            textContentType="username"
            value={openNickname}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={openNicknameRef}
            onSubmitEditing={() => numberRef.current?.focus()}
            blurOnSubmit={false}
            autoCapitalize= 'none'
          />
        </View>
        <View style={{flex: 2}}>
          <Pressable
            style={
              nickName ?
              styles.checkButton 
              : StyleSheet.compose(styles.checkButton, styles.checkButtonActive)
            }
            disabled={!!nickName}
            onPress={() => {
              setOpenNickname(openNickname)
              if (openNickname) {
                checkNickname()
              }
            }}>
            <Text style={styles.loginButtonText}>{ nicknameCheck ? '통과 완료' : '중복 검사'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>전화번호</Text>
      <View style={{flex: 1, flexDirection:'row'}}>
        <View style={{flex: 5}}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeNumber}
            placeholder="전화번호를 입력해주세요"
            placeholderTextColor="#666"
            textContentType="telephoneNumber"
            value={number}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={numberRef}
            // onSubmitEditing={() => genderRef.current?.focus()}
            blurOnSubmit={false}
            autoCapitalize= 'none'
            keyboardType= "number-pad"
          />
        </View>
        <View style={{flex: 2}}>
          <Pressable
            style={
              authNumberCheck ?
              styles.checkButton 
              : StyleSheet.compose(styles.checkButton, styles.checkButtonActive)
            }
            disabled={authNumberCheck}
            onPress={() => {
              if (number) {
                sendAuthNumber()
              }}}>
            <Text style={styles.loginButtonText}>인증 문자</Text>
          </Pressable>
        </View>
      </View>
      <View style={{flex: 1, flexDirection:'row', marginVertical: 12}}>
        <View style={{flex: 5}}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeAuthNumber}
            placeholder="인증번호를 입력해주세요"
            placeholderTextColor="#666"
            textContentType="telephoneNumber"
            value={authNumber}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={authNumberRef}
            blurOnSubmit={false}
            autoCapitalize= 'none'
            keyboardType= "number-pad"
          />
        </View>
        <View style={{flex: 2}}>
          <Pressable
            style={
              authNumberCheck ?
              styles.checkButton 
              : StyleSheet.compose(styles.checkButton, styles.checkButtonActive)
            }
            disabled={authNumberCheck}
            onPress={() => checkAuthNumber()}>
            <Text style={styles.loginButtonText}>{authNumberCheck? "인증 완료" : "번호 인증"}</Text>
          </Pressable>
        </View>
      </View>       
    </View>
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>성별</Text>
      <RadioForm
        formHorizontal={true}
        animation={true}
      >
        {
          radio_props.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i} >
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={gender === obj.value}
                onPress={
                  (value : string) => {setGender(value)
                    console.log("value: ", value)}
                  }
                borderWidth={1}
                buttonInnerColor={'gray'}
                buttonOuterColor={gender === obj.value ? '#2196f3' : '#000'}
                buttonSize={10}
                buttonOuterSize={20}
                buttonStyle={{}}
                buttonWrapStyle={{marginLeft: 10}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={
                  (value : string) => {setGender(value)
                    console.log("value: ", value)}
                  }
                labelStyle={{fontSize: 17, color: 'black', marginRight: 60}}
                labelWrapStyle={{}}
              />
            </RadioButton>
        ))}
      </RadioForm>
    </View>
    <View style={styles.buttonZone}>
      <Pressable
        style={
          canGoNext
            ? StyleSheet.compose(styles.loginButtonForm, styles.loginButtonActiveForm)
            : styles.loginButtonForm
        }
        disabled={!canGoNext || loading}
        onPress={onSubmit}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.loginButtonText}>회원가입</Text>
        )}
      </Pressable>
    </View>
  </DismissKeyboardView>
    );
  }
  
  const styles = StyleSheet.create({
    textInput: {
      padding: 5,
      borderWidth: 1,
      color : 'black'
    },
    textPassword: {
      paddingLeft: 10,
      color: "black",
      fontSize: 15
    },
    textPasswordnot:{
      color: "red"
    },
    textBirth:{
      padding: 5,
      borderWidth: 1,
      height: 40,
      textAlign: "center",
      textAlignVertical: "center",
      color : 'black'
    },
    inputWrapper: {
      paddingLeft: 25,
      paddingRight: 25,
      paddingBottom: 20,
    },
    label: {
      fontWeight: '600',
      fontSize: 16,
      color : 'black',
      marginBottom: 10,
      marginLeft: 10,
    },
    buttonZone: {
      alignItems: 'center',
    },
    checkButton: {
      backgroundColor: '#A0A0A0',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      marginLeft: 5,
    },
    checkButtonActive: {
      backgroundColor: '#00aeff',
    },
    loginButtonText: {
      color: 'white',
      fontSize: 16,
    },
    loginButtonForm: {
      backgroundColor: '#C0C0C0',
      paddingHorizontal: 128,
      paddingVertical: 10,
      borderRadius: 5,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 10,
      marginTop: 10,
      borderWidth: 1,
    },
    loginButtonActiveForm: {
      backgroundColor: '#00aeff',
    },
    viewTop :{
      marginTop: 30,
    }
  });
  
  export default SignUp;
