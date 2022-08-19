import React, { useCallback, useRef, useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable, TextInput } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars';
// import {ProfileCalendarTodo} from "./ProfileCalendarTodo";
import {format} from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import axios, {AxiosError} from 'axios';
import DismissKeyboardView from './DismissKeyboardView';
import { useAppDispatch } from "../store";
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from "../slices/user";

//네비게이션 
LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
    dayNamesShort: ['일', '월','화','수','목','금','토'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';

const ProfileCalendar = () => {
    const dispatch = useAppDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const [todo, setTodo] = useState('');
    const todoRef = useRef<TextInput | null>(null);
    const [date, setDate] = useState('');
    const userId = useSelector((state : RootState) => state.user.userId);
    const accessToken = useSelector((state: RootState) => state.user.accessToken)

    const onChangeTodo = useCallback(text => {
      setTodo(text);
    }, []);

    const todoCreate = async () => {
      const newpost = {contents: todo, date: date}
      setPosts([...posts, newpost])
      try{
        //////////////////////////////////////////////
        const response = await axios.post(`http://i7d205.p.ssafy.io:8080/api/calendar`, {
          "calContent": todo,
          "calDate": date,
          "userId": userId
        });
        console.log("CalTodo Send")
        setModalVisible(!modalVisible)
      } catch (error) {
        if (error.response.status === 403) {
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
            if (error.response.status === 403) {
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
      }
    }

    const [posts, setPosts] = useState([
        {
            contents: "내용입니다.",
            date: "2022-08-10",
          },
          {
            contents: "내용입니다.",
            date: "2022-08-11",
          }
    ]);
    
    const markedDates = posts.reduce((acc, current) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = {marked: true};
        // console.log(formattedDate)
        return acc;
      }, {});
    
    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), "yyyy-MM-dd"),
    );

    const markedSelectedDates = {
        ...markedDates,
        [selectedDate]: {
          selected: true,
          marked: markedDates[selectedDate]?.marked,
        }
      }
    
    return (
      <View>
        <View>
            <Calendar
                onDayPress={ (day) => {   // 날짜 선택
                    console.log('selected day', day.dateString);
                    setDate(day.dateString)
                    setModalVisible(true)
                    console.log(date)
                    console.log(modalVisible)
                }}
                
                markingType={'multi-dot'}
                monthFormat={'yyyy MM'}
                style={ styles.calendar }
                markedDates={{"2022-08-17": {marked: true}}  }
                enableSwipeMonths={true}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#000000',
                    selectedDayBackgroundColor: 'green',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: 'red',
                    dayTextColor: '#2d4150',
                    dotColor: '#00adf5',
                    selectedDotColor: '#000000',
                    arrowColor: 'green',
                    monthTextColor: 'green',
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 16
                }}
                >
                </Calendar>
        </View>
        <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}> Calendar Todo</Text>
              <Text style={styles.modalText}></Text>
              {/* 기기 내부에서  */}
              <TextInput
                  onChangeText={onChangeTodo}
                  placeholder="할 일을 입력해주세요"
                  placeholderTextColor="#666"
                  textContentType="none"
                  value={todo}
                  ref={todoRef}
                  blurOnSubmit={false}
                  autoCapitalize= 'none'/>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setTodo(todo)
                  if(todo) {
                    todoCreate()
                  }
                }}
              >
                <Text style={styles.textStyle}>할 일 추가</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        
      </View>
    </View>    
    );
};

const styles = StyleSheet.create({
    calendar: {
        borderWidth: 1,
        borderColor: 'gray',
        // height: 350,
        // innerWidth: 350
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // marginTop: 22
    },
    modalView: {
      margin: 10,
      width: '90%',
      height: '90%',
      backgroundColor: "white",
      borderRadius: 5,
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 5,
      padding: 10,
      margin: 5,
      // elevation: 2
    },
    buttonOpen: {
      // backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "skyblue",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    profileImage : {
      width : 75,
      height : 75,
      resizeMode : 'contain',
    },
})

export default ProfileCalendar;