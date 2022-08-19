import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TextInput, Dimensions, ScrollView, Image } from 'react-native'

import axios from "axios";
import { Button } from "@rneui/base";
import Video from "react-native-video";
import Swiper from 'react-native-swiper';
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
import { Form, FormItem } from "react-native-form-component";
import EncryptedStorage from 'react-native-encrypted-storage';

import userSlice from "../../slices/user";
import { useAppDispatch } from "../../store";
import { RootState } from "../../store/reducer";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

function FeedDetail({ route, navigation }) {
  console.log('detail route', route)

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [newcomment, setNewComment] = useState<string>('')

  const [hits, setHits] = useState<number>(0)
  const [likes, setLikes] = useState<number>(0)
  const [iLike, setILike] = useState<number>(0)

  const [files, setFiles] = useState<object[]>([])
  const [comments, setComments] = useState<any>([])

  const [ticTok, setTicTok] = useState<boolean>(false)

  const isFocused = useIsFocused()
  const dispatch = useAppDispatch();
  const { boardId, userId } = route.params;
  const url = 'http://i7d205.p.ssafy.io/api/'
  const whoamI = useSelector((state : RootState) => state.user.userId)
  const myId = useSelector((state: RootState) => state.user.accessToken)

  // 댓글 생성
  const createComment = () => {
    if (!newcomment) {
      return Alert.alert('알림', '댓글을 1글자 이상 입력해야 합니다')
    }
    const com = JSON.stringify({
      boardId: boardId,
      cmtContent: newcomment,
      userId: whoamI
    })

    console.log('createcomment', newcomment)

    ///////////////// Create Comment
    axios.post(
      `${url}cmt/`,
      com,
      { headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${myId}`
      }}
    ).then(res => {
      console.log('댓글 생성', res.data)
      // console.log(comments)
      setTicTok(!ticTok)
      setNewComment('')
    }).catch(async (err) =>{
      console.log('you get error at detail', err)
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
    
    // 댓글 삭제
    const deleteComment = (id) => {
      /////////////////// Delete Comment
      axios.delete(
        `${url}cmt/${id}`,
        { headers: {
          'Authorization' : `Bearer ${myId}`
        }}
      ).then(res => {
        console.log('댓글 삭제되다', res.data)
        setTicTok(!ticTok)
      }).catch(async (err) =>{
          console.log('you get error at detail', err)
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
  
  // 좋아요 - 좋아요 취소
  const likeBorad = () => {
    /////////////////////// Check like
    axios.post(
      `${url}board/like`,
      JSON.stringify({
        boardId,
        userId,
      }),
      { headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${myId}`
      }}
    ).then(() => {
      setILike(Math.abs(iLike - 1))
      if (iLike) {
        setLikes(likes - 1)
      } else {
        setLikes(likes + 1)
      }
    }
    ).catch(async (err) =>{
      console.log('you get error at detail', err)
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

  // 피드 삭제
  const deleteFeed = () => {
    ////////////////// Delete Feed
    axios.delete(
      `${url}board/${boardId}`,
      { headers: { Authorization : `Bearer ${myId}` }}
    ).then(res => {
      console.log(res.data)
      navigation.navigate('Main', {screen: 'Feeds'})
    }).catch(async (err) =>{
      Alert.alert('오류', err.data)
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

  // 렌더링
  useEffect(() => {
    // console.log(boardId)
    axios.get(
      `${url}board/${boardId}`,
      { headers: { Authorization : `Bearer ${myId}` }}
    ).then (res => {
      console.log('call at detail', res.data)
      const datas = res.data
      setTitle(datas.boardTitle)
      setContent(datas.boardContent)
      setHits(datas.boardHit)
      setComments(datas.comments)
      setFiles(datas.files)
      setLikes(datas.boardLikes)
      // console.log(files)
      console.log(likes)
      axios.get(
        `${url}board/like/${userId}/${boardId}/`,
        { headers: { Authorization : `Bearer ${myId}` }}
      ).then(res => {
        console.log('nice check', res.data)
        setILike(res.data);
      }
      ).catch(async (err) =>{
        console.log('좋아요 체크 오류', err)
        console.log('you get error at detail', err)
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
    }).catch(async (err) =>{
      console.log('you get error at detail', err)
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
  },[ticTok, isFocused])


  return (
    <ScrollView>
      <View
        style={{
          alignItems: 'center',
          marginVertical: SCREEN_HEIGHT * 0.025,
        }}
      >
        <View><Text
          style={styles.title}
        >{ title }</Text></View>
        { files.length > 0 && 
        <Swiper
        style={styles.swiper}
        >
        { files.map(file => {
          if ( file.fileType === 'IMAGE') {
            return (
              <View
              style={styles.mediatool}
              key={file.fileId}
              >
                <Image
                  source={{ uri: `http://i7d205.p.ssafy.io/api/file/${file.fileType}/${file.fileName}` }}
                  resizeMode="cover"
                  style={styles.media}
                  />
              </View>
            )
          } else {
            return(
              <View
              style={styles.mediatool}
              key={file.fileId}
              >
                <Video
                  source={{ uri: `http://i7d205.p.ssafy.io/api/file/${file.fileType}/${file.fileName}` }}
                  style={styles.media}
                  controls={true}
                  muted={true}
                  />
              </View>
              )
            }
          })}
        </Swiper>
        }
        
        <View
          style={{
            flexDirection: 'row',
            paddingRight: SCREEN_WIDTH * 0.05,
            paddingLeft: 'auto',
          }}
        >
          <View
            style={{
              marginHorizontal: SCREEN_WIDTH * 0.02
            }}
          >
            <Text>{ hits }</Text>
          </View>
          { iLike ?
            <View
              style={{
                marginHorizontal: SCREEN_WIDTH * 0.02,
              }}
            >
              <Icon
                name="heart"
                onPress={likeBorad}
                size={20}
                style={{
                  color: 'red',
                  paddingRight: SCREEN_WIDTH * 0.01,
                }}
              />
            </View>
            :
            <View
              style={{
                marginHorizontal: SCREEN_WIDTH * 0.02,
              }}
            >
              <Icon
                name="hearto"
                onPress={likeBorad}
                size={20}
                style={{
                  paddingRight: SCREEN_WIDTH * 0.01,
                }}
              />
            </View>
          }
          <View>
            <Text>{ likes }</Text>
          </View>
        </View>

        <View
          style={styles.content}
          ><Text
          style={styles.text}
          >{ content }</Text></View>

        {/* <View><Text>Id: { boardId }</Text></View> */}
      </View>
      {( whoamI === userId ) &&
        <View
          style={{
            flexDirection: "row",
            justifyContent: 'center',
            marginVertical: SCREEN_HEIGHT * 0.01,
          }}
        >
          <Button
            title="수정하기"
            size="sm"
            color="secondary"
            onPress={() => navigation.navigate('ChangeFeedScreen', boardId)}
            containerStyle={styles.button}
          />

          <Button
            title="삭제하기"
            size="sm"
            color="error"
            onPress={deleteFeed}
            containerStyle={styles.button}
          />
        </View>
      }
        
        <View
        style={{
          marginVertical: SCREEN_HEIGHT * 0.025,
          marginHorizontal: SCREEN_WIDTH * 0.1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <View>
            <TextInput
              onChangeText={setNewComment}
              placeholder="댓글을 입력해주세요"
              value={newcomment}
              style={{
                backgroundColor: 'white',
                width: SCREEN_WIDTH * 0.5,
              }}
            />
          </View>
          <Button
            title="보내기"
            size="md"
            onPress={createComment}
          />
        </View>
      <ScrollView
        style={styles.comments}
        >
          <View><Text
            style={styles.commentTitle}
          >Comments</Text></View>
        { comments && 
          comments.map(comment => {
            console.log(comment, Boolean(whoamI === comment.userId))
            return (<View
              key={ comment.cmtId }
              style={styles.commentTotal}
              >
                <View
                  style={ (userId === comment.userId) ? styles.textBoxMe : styles.textBoxYou }
                ><Text
                  style={ (userId === comment.userId) ? styles.textFontMe :styles.textFontYou }
                >{ comment.cmtContent }</Text></View>
                { (whoamI === comment.userId) &&
                  <Button
                    size="sm"
                    title="X"
                    color="error"
                    style={styles.commentButton}
                    titleStyle={{
                      fontSize: 10,
                    }}
                    onPress={() => deleteComment(comment.cmtId)}
                  />
                }
              </View>)
          })
        }
      </ScrollView>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: SCREEN_WIDTH * 0.01
  },
  content : {
    backgroundColor : 'white',
    marginHorizontal : SCREEN_WIDTH * 0.05,
    marginVertical: SCREEN_HEIGHT * 0.01,
    borderRadius : 10,
    width: SCREEN_WIDTH * 0.8,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingVertical: SCREEN_HEIGHT * 0.02,
  },
  comments: {
    paddingHorizontal: SCREEN_WIDTH * 0.1,
    marginBottom: SCREEN_HEIGHT * 0.2,
  },
  commentButton: {
    flex: 1,
    paddingLeft: SCREEN_WIDTH * 0.005,
    height: 20,
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  commentTotal: {
    flexDirection: 'row',
  },
  feed: {
    marginBottom: 10,
  },
  feedItem : {
    flexDirection: 'column',
    backgroundColor : 'lightgrey',
    fontWeight : '900',
    // paddingHorizontal : 10,
    paddingVertical : 10,
    marginHorizontal : 10,
    marginTop : 10,
    borderRadius : 10,
    height : 'auto'
  },
  media: {
    height: SCREEN_WIDTH * 0.8,
    width: SCREEN_WIDTH * 0.8,
    marginBottom: SCREEN_HEIGHT * 0.01
  },
  mediatool: {
    alignItems: 'center'
  },
  swiper: {
    height: SCREEN_HEIGHT * 0.5,
  },
  text : {
    fontSize: 15
  },
  textBoxMe : {
    flex : 9,
    backgroundColor : 'rgb(0, 197, 145)',
    marginRight : 5,
    marginVertical : 5,
    borderRadius : 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20
  },
  textBoxYou : {
    flex : 9,
    backgroundColor : 'white',
    marginRight : 5,
    marginVertical : 5,
    borderRadius : 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20
  },
  textFontMe: {
    fontSize: 15,
    color: 'white'
  },
  textFontYou: {
    fontSize: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  underBar : {
    flex : 2,
    flexDirection : 'row',
  },
  userIcon : {
    marginHorizontal : 5,
    marginVertical : 5,
  },
})

export default FeedDetail