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
    Button,
    
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import {RootStackParamList} from '../../AppInner';
import DatePicker from 'react-native-date-picker';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>

// 사진파일 저장 필요


function SignUp({navigation} : SignUpScreenProps) {
    // 임시 저장공간 생성
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState('');
    const userIdRef = useRef<TextInput | null>(null);
    const passwordRef = useRef<TextInput | null>(null);
    const emailRef = useRef<TextInput | null>(null);
    const nameRef = useRef<TextInput | null>(null);
    const nickNameRef = useRef<TextInput | null>(null);
    const numberRef = useRef<TextInput | null>(null);
    const genderRef = useRef<TextInput | null>(null);


    // 저장 함수
    const onChangeUserId = useCallback(text => {
        setUserId(text.trim());
    }, []);
    const onChangePassword = useCallback(text => {
        setPassword(text.trim());
    }, []);
    const onChangeEmail = useCallback(text => {
        setEmail(text.trim());
    }, []);
    const onChangeName = useCallback(text => {
        setName(text.trim());
    }, []);
    const onChangeNickName = useCallback(text => {
        setNickName(text.trim());
    }, []);
    const onChangeNumber = useCallback(text => {
        setNumber(text.trim());
    }, []);
    const onChangeGender = useCallback(text => {
        setGender(text.trim());
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
        if (!name || !name.trim()) {
            return Alert.alert('이름 나와 !', '이름을 입력해주세요');
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
        if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
            return Alert.alert(
                'PassWord 나와 !',
                '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
            );
        }
        // 유효성 검사 추가 필요

        try {
            setLoading(true);
            console.log(`${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`)
            const response = await axios.post('http://i7d205.p.ssafy.io:8080/user', {
                userId : userId,
                password : password,
                birth : `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`,
                emailId : email.split('@')[0],
                emailDomain : email.split('@')[1],
                name : name,
                nickname : nickName,
                number : number,
                gender : gender,
            });
            Alert.alert('Welcome !', '회원가입 되었습니다.')
            navigation.navigate('SignIn')
        } catch (error) {
            const errorResponse = (error as AxiosError).response;
            if (errorResponse) {
              Alert.alert('알림', errorResponse.data.message);
            }
          } finally {
            setLoading(false);
          }
    }, [loading, navigation, userId, password, date, email, name, nickName, number, gender]);


    const canGoNext = userId && password && date && email && name && nickName && number && gender;
    return (
        <DismissKeyboardView>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>아이디</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeUserId}
              placeholder="아이디를 입력해주세요"
              placeholderTextColor="#666"
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
              onChangeText={onChangePassword}
              value={password}
              keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
              textContentType="password"
              secureTextEntry
              returnKeyType="send"
              clearButtonMode="while-editing"
              ref={passwordRef}
              onSubmitEditing={() => emailRef.current?.focus()}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>생일</Text>
            <Button title='open' onPress={() => setOpen(true)} />
            <DatePicker
                modal
                locale="ko"
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
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
              onSubmitEditing={() => nameRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeName}
              placeholder="이름을 입력해주세요"
              placeholderTextColor="#666"
              textContentType="name"
              value={name}
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={nameRef}
              onSubmitEditing={() => nickNameRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>닉네임</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeNickName}
              placeholder="닉네임을 입력해주세요"
              placeholderTextColor="#666"
              textContentType="username"
              value={nickName}
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={nickNameRef}
              onSubmitEditing={() => numberRef.current?.focus()}////
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>전화번호</Text>
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
              onSubmitEditing={() => genderRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>성별</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeGender}
              placeholder="성별을 입력해주세요"
              placeholderTextColor="#666"
              textContentType="none"
              value={gender}
              returnKeyType="send"
              clearButtonMode="while-editing"
              ref={genderRef}
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
        backgroundColor: 'gray',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      loginButtonActive: {
        backgroundColor: 'blue',
      },
      loginButtonText: {
        color: 'white',
        fontSize: 16,
      },
    });
    
    export default SignUp;
    