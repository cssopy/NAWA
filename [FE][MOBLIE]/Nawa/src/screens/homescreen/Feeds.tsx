import React, { useRef, useEffect, useState, useCallback } from "react";
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View, Image, Button, ActivityIndicator, RefreshControl, Alert, FlatList } from "react-native";

import axios from 'axios';
import { FAB } from "@rneui/base";
import MainNavbar from "./MainNavbar";
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import EncryptedStorage from 'react-native-encrypted-storage';

import Video from "react-native-video";
import userSlice from "../../slices/user";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import UserIcon from "../../components/UserIcon";
import { useAppDispatch } from "../../store";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const HEADER_HEIGHT = SCREEN_HEIGHT * 0.05;

function Feeds ({ navigation }) {
  const [offset, setOffset] = useState(0);
  const [scrollUp, setScrollUp] = useState(true);


  const animationRef = useRef(new Animated.Value(0)).current;
  
  // baseUrl
  const url = 'http://i7d205.p.ssafy.io/api/'
  const isFocused = useIsFocused()
  const dispatch = useAppDispatch(); 
  const myId = useSelector((state: RootState) => state.user.accessToken)
  
  const translateY = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -HEADER_HEIGHT],
  });

  console.log('start')

  const MainFeed = () => {
    const [feeds, setFeeds] = useState<object[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [noMoreFeed, setNoMoreFeed] = useState<boolean>(false);
    const [ticTok, setTicTok] = useState<boolean>(false);
    const [refreshing, setReFreshing] = useState<boolean>(false);

    let fileUrl:string;
    let fileType:string;

    console.log('data count', feeds.length)

    const getfeeds = async() => {
      /////////////////////////// Call pagination board
      const sendUrl = `${url}board/mainFeed/NEW/${page}`
      console.log('sending', sendUrl)
      axios.get(
        sendUrl,
        { headers: { Authorization : `Bearer ${myId}` }}
      ).then(res => {
        if (res.data.length < 10 ) {
          setNoMoreFeed(true)
        }
        setFeeds(feeds.concat(res.data))
        setPage(page + res.data.length)

      }).catch(async (err) =>{
        Alert.alert('알림', `오류 발생 ${err}`)
        if (err.status === 403) {
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
            if (err.response.status === 403) {
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
      })
    }
      
    useFocusEffect(
      useCallback(() => {
        console.log(1111111)
        // console.log(isFocused)
        // console.log('access token', myId)
        // const sendUrl = `${url}board/`
    
        // 현재 피드의 총 갯수 확인
        // axios.get(
        //   'http://i7d205.p.ssafy.io/api/board/count',
        //   { headers: { Authorization : `Bearer ${myId}` }}
        // ).then(res=> setTotalFeeds(res.data))
    
        // refresh 해제
        setLoading(true)
        
        // 초기 10개의 피드 호출
        getfeeds();
        
        setReFreshing(false)
        setNoMoreFeed(false)
        setLoading(false)
    
      },[])
    )
    
    const checkfeed = async () => {
      if (!loading) {
        console.log('더 없나?', page, noMoreFeed)
        if (page >= 10 && !noMoreFeed) {
          setTicTok(!ticTok)
        } else {
          console.log('더 없네')
        }
      }
    }
  
    const refresh = () => {
      setReFreshing(true)
      console.log('refresh')
      setPage(0)
      getfeeds()
      setReFreshing(false)
    }

    const onPressListHandler = (data: object) => {
      navigation.navigate('Main', {screen: 'FeedDetail', params: data})
    };

    const onefeed = ({item}) => one(item)

    const one = (item: object) => {
      // console.log(item, item.files?.length)
      // console.log('누구', item.userId)
      if ( item.files.length > 0 ) {
        const data = item.files[0]
        // console.log(data.fileType, data.fileName)
        fileUrl = `${url}file/${(data.fileType === 'IMAGE') ? 'IMAGE' : 'video'}/${data.fileName}`
        fileType = data.fileType
        // console.log('oneMedia', fileUrl)
        // console.log('oneMedia create', fileUrl)
      }

      return (
          <View style={ styles.feedItem }>
            { item.files.length > 0 ?
            <View
              style={{
                alignItems: 'center',
              }}
            >
              { (fileType === 'IMAGE') ?
                <Image
                  source={{ uri: fileUrl }}
                  style={styles.img}
                />
                :
                <Video
                  source={{ uri: fileUrl }}
                  resizeMode="cover"
                  paused={false}
                  controls={true}
                  muted={true}
                  style={styles.vdo}
                />
              }
            </View>
            :
            <View style={ styles.content }><Text style={{ textAlign:'center'}}>{ item.boardContent }</Text></View>
            }

            <View style={ styles.underBar }>
              {/* <View style={styles.userIcon}><UserIcon userId={item.userId} myId={myId} /></View> */}
              <TouchableWithoutFeedback
                style={styles.feed}
                onPress={() => {
                  onPressListHandler(item)
                }}
                >
                <View
                  style={styles.textBox}>
                    <Text style={styles.text}>{item.boardTitle}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )
      }

    return (
      <>
        {refreshing ? <ActivityIndicator style={{ zIndex: 100 }}/> : null}
        <Animated.FlatList
          data={feeds}
          renderItem={onefeed}
          style={{
            backgroundColor: "white",
            transform: [{ translateY: translateY }],
            elevation: 8,
          }}
          nestedScrollEnabled
          
          onEndReachedThreshold = {0.3}
          onEndReached={ checkfeed }
          keyExtractor={item => item.boardId}

          showsVerticalScrollIndicator={false}
          
          refreshing
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          
          ListEmptyComponent={
            <View
              style={{marginTop: SCREEN_HEIGHT * 0.02}}
            ><Text style={{ textAlign: 'center' }}>새로운 이야기를 채워주세요</Text></View>
          }
          
          // 보통 여기에 로딩(원 도는거 넣는다는데...)
          ListFooterComponent={
            !(noMoreFeed) ? <ActivityIndicator /> :
            <View style={{marginTop: SCREEN_HEIGHT * 0.02}}>
              <Text style={{ textAlign: 'center' }}>새로운 이야기를 채워주세요</Text>
            </View>
          }
        />
      </>
    )
  }

  return (
    <>
      <MainNavbar />
      <MainFeed />
      <FAB

        onPress={() => {navigation.navigate('NewFeedScreen')}}
        placement="right"
        icon={{ name: 'add', color: 'white'}}
        color="red"
        />
    </>
  )
}

const styles = StyleSheet.create({
  feed: {
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  feedItem : {
    backgroundColor : 'white',
    borderRadius : 10,
    elevation: 15,
    flexDirection: 'column',
    height : 'auto',
    // marginHorizontal : 10,
    marginTop : 10,
    shadowColor: "black", //그림자색
    shadowOpacity: 1,//그림자 투명도
    shadowOffset: { width: 0, height: 2 },
    paddingVertical : SCREEN_HEIGHT * 0.005,
  },
  content : {
    alignSelf: 'center',
    backgroundColor : 'white',
    borderRadius : 10,
    flex : 11,
    justifyContent: 'center',
    marginHorizontal : 0,
    marginTop : 5,
    overflow: 'hidden',
    paddingVertical: SCREEN_HEIGHT * 0.005,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.1,
  },
  underBar : {
    flex : 2,
    flexDirection : 'row',
    alignSelf: 'center',

    width: SCREEN_WIDTH * 0.9,
  },
  userIcon : {
    marginHorizontal : 5,
    marginVertical : 5,
  },
  textBox : {
    alignItems: 'center',
    backgroundColor : 'white',
    borderRadius : 10,
    display: 'flex',
    flex : 1,
    justifyContent: 'center',
    marginRight : 5,
    marginVertical : 5,
    
    shadowColor: "black", //그림자색
    shadowOpacity: 1,//그림자 투명도
    shadowOffset: { width: 0, height: 2 },
    elevation: 9,
  },
  text : {
    fontSize: 18,
    textAlign: 'center',
  },
  img : {
    borderRadius: 10,
    marginVertical: SCREEN_HEIGHT * 0.01,
    resizeMode: 'cover',
    
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.3,
  },
  vdo : {
    borderRadius: 10,
    marginVertical: SCREEN_HEIGHT * 0.01,
    
    height: SCREEN_WIDTH * 0.8,
    width: SCREEN_WIDTH * 0.9,
  }
})

export default Feeds