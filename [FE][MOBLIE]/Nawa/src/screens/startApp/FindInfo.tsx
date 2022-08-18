import React, { useCallback, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../AppInner";
import { useAppDispatch } from "../../store";
import { 
    Alert, 
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    View,
    } from "react-native";
import DismissKeyboardView from '../../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';



type FindInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'FindInfo'>

function FindInfo({navigation} : FindInfoScreenProps) {
    const dispatch = useAppDispatch();

    // 아이디 찾기, 비밀번호 찾기
    const [email, setEmail] = useState('');
    const emailRef = useRef<TextInput | null>(null);
    const [userId, setUserId] = useState('');
    const [emailpw, setEmailpw] = useState('');
    const userIdRef = useRef<TextInput | null>(null);
    const emailpwRef = useRef<TextInput | null>(null);
    
    const onChangeEmail = useCallback(text => {
        setEmail(text.trim());
    }, []);

    const [emailCheck, setEmailCheck] = useState(false)

    const onChangeUserId = useCallback(text => {
        setUserId(text.trim());
    }, []);
    const onChangeEmailpw = useCallback(text => {
        setEmailpw(text.trim());
    }, []);

    const [userIdCheck, setUserIdCheck] = useState(false)
    const [emailpwCheck, setEmailpwCheck] = useState(false)

    const onFindId = useCallback(async () => {
        if (!email || !email.trim()) {
            return Alert.alert('email칸이 비워져있습니다!', 'email을 입력해주세요');
        }
        if (
            !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
              email,
            )
        ) {
            return Alert.alert('이메일 나와 !', '올바른 이메일 주소가 아닙니다.');
        }
        try {
            const response = await axios.post(`http://i7d205.p.ssafy.io:8080/api/find-id`, {
                "emailDomain" : email.split('@')[1],
                "emailId" : email.split('@')[0],
            });
            setEmailCheck(true)
            console.log(response.data)
            Alert.alert('아이디 찾기', '아이디: ' + response.data)
        } catch (error) {
            const errorResponse = (error as AxiosError).response;
            if (errorResponse) {
                setEmailCheck(false)
                console.log(errorResponse.data)
                Alert.alert('아이디 찾기', '이메일에 해당하는 아이디가 없습니다.')
            }
        }
    }, [email,]);

    const onFindPw = useCallback(async () => {
        if (!userId || !userId.trim()) {
            return Alert.alert('ID칸이 비워져있습니다!', 'ID를 입력해주세요');
        }
        if (!emailpw || !emailpw.trim()) {
            return Alert.alert('email칸이 비워져있습니다!', 'email을 입력해주세요');
        }
        if (
            !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
              emailpw,
            )
        ) {
            return Alert.alert('이메일 나와 !', '올바른 이메일 주소가 아닙니다.');
        }
        try {
            const response = await axios.post(`http://i7d205.p.ssafy.io:8080/api/give-temp-pw`, {
                "emailDomain" : emailpw.split('@')[1],
                "emailId" : emailpw.split('@')[0],
                "userId": userId
            });
            console.log(response.data)
            if (response.data) {
                setEmailpwCheck(true)
                setUserIdCheck(true)
                Alert.alert('비밀번호 찾기', '임시 비밀번호를 이메일로 발송하였습니다.')
            }
            else {
                setEmailpwCheck(false)
                setUserIdCheck(false)
                Alert.alert('비밀번호 찾기', '아이디와 이메일에 해당하는 정보가 없습니다.')
            }
            
        } catch (error) {
            const errorResponse = (error as AxiosError).response;
            if (errorResponse) {
                console.log(errorResponse.data)
                Alert.alert('비밀번호 찾기', '아이디와 이메일에 해당하는 정보가 없습니다.')
            }
        }
    }, [emailpw, userId]);

    return (
        <DismissKeyboardView>
            <View style={ styles.viewTop }/>
            <View style={styles.inputWrapper}>
                <Text style={styles.mainLabel}>아이디 찾기</Text>
                <Text style={styles.label}>이메일</Text>
                <View style={{flex: 1, flexDirection:'row'}}>
                    <View style={{flex: 5}}>
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
                        // onSubmitEditing={() => nameRef.current?.focus()}
                        blurOnSubmit={false}
                        autoCapitalize= 'none'
                        keyboardType="email-address"
                        />
                    </View>
                    <View style={{flex: 2}}>
                        <Pressable
                            style={styles.checkButton}
                            onPress={onFindId}>
                            <Text style={styles.loginButtonText}>{ emailCheck ? '통과 완료' : '메일 인증'}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={ styles.viewTop }/>
            <View style={styles.inputWrapper}>
                <Text style={styles.mainLabel}>임시비밀번호 발급</Text>
                <Text style={styles.label}>이메일</Text>
                <View>
                    <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeEmailpw}
                    placeholder="이메일을 입력해주세요"
                    placeholderTextColor="#666"
                    textContentType="emailAddress"
                    value={emailpw}
                    returnKeyType="next"
                    clearButtonMode="while-editing"
                    ref={emailpwRef}
                    // onSubmitEditing={() => nameRef.current?.focus()}
                    blurOnSubmit={false}
                    autoCapitalize= 'none'
                    keyboardType="email-address"
                    />
                </View>
                <View style={styles.viewTop}>
                    <Text style={styles.label}>아이디</Text>
                </View>
                <View style={{flex: 1, flexDirection:'row'}}>
                    <View style={{flex: 5}}>
                        <TextInput
                        style={styles.textInput}
                        onChangeText={onChangeUserId}
                        placeholder="아이디를 입력해주세요"
                        placeholderTextColor="#666"
                        textContentType="username"
                        value={userId}
                        returnKeyType="next"
                        clearButtonMode="while-editing"
                        ref={emailRef}
                        // onSubmitEditing={() => nameRef.current?.focus()}
                        blurOnSubmit={false}
                        autoCapitalize= 'none'
                        keyboardType="default"
                        />
                    </View>
                    <View style={{flex: 2}}>
                        <Pressable
                            style={styles.checkButton}
                            onPress={onFindPw}>
                            <Text style={styles.loginButtonText}>{ emailpwCheck && userIdCheck ? '전송 완료' : '메일 전송'}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={ styles.viewTop }/>
            <View style={styles.buttonZone}>
                <Pressable
                    style={styles.loginButtonForm}
                    onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.loginButtonText}>로그인 페이지</Text>
                </Pressable>
            </View>
        </DismissKeyboardView>

    );
}
const styles = StyleSheet.create({
    viewTop: {
        marginTop: 30,
    },
    inputWrapper: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 20,
    },
    mainLabel: {
        fontWeight: '600',
        fontSize: 20,
        color : 'black',
        marginBottom: 10,
        marginLeft: 10,
    },
    label: {
        fontWeight: '600',
        fontSize: 16,
        color : 'black',
        marginBottom: 10,
        marginLeft: 10,
    },
    textInput: {
        padding: 5,
        borderWidth: 1,
      },
    buttonZone: {
        alignItems: 'center',
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
    checkButton: {
        backgroundColor: '#A0A0A0',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 5,
      },
});


export default FindInfo;
