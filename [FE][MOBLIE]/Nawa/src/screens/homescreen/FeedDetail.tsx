import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TextInput, Dimensions, ScrollView, Image } from 'react-native'
import { Button } from "@rneui/base";
import { Form, FormItem } from "react-native-form-component";

import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import UserIcon from "../../components/userIcon";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Video from "react-native-video";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

function FeedDetail({ route, navigation }) {
  // console.log('detail route', route)

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [newcomment, setNewComment] = useState<string>('')

  const [hits, setHits] = useState<number>(0)
  const [likes, setLikes] = useState<number>(0)
  const [iLike, setILike] = useState<number>(0)

  const [files, setFiles] = useState<object[]>([])
  const [comments, setComments] = useState<any>([])

  const [ticTok, setTicTok] = useState<boolean>(false)

  const whoamI = useSelector((state : RootState) => state.user.userId)
  const myId = useSelector((state: RootState) => state.user.accessToken)
  const { boardId, userId } = route.params;
  const url = 'http://i7d205.p.ssafy.io/api/'
  const isFocused = useIsFocused()

  // 댓글 생성
  const createComment = () => {
    if (!newcomment) {
      return Alert.alert('알림', '댓글을 1글자 이상 입력해야 합니다')
    }
    const com = JSON.stringify({
      boardId: boardId,
      cmtContent: newcomment,
      userId: userId
    })

    console.log('createcomment', newcomment)

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
    }).catch(err => 
      console.log('you get error at detail', err))
    }
    
    // 댓글 삭제
    const deleteComment = (id) => {
      axios.delete(
        `${url}cmt/${id}`,
        { headers: {
          'Authorization' : `Bearer ${myId}`
        }}
      ).then(res => {
        console.log('댓글 삭제되다', res.data)
        setTicTok(!ticTok)
      }).catch(err => 
        console.log('you get error at detail', err))
    }
  
  // 좋아요 - 좋아요 취소
  const likeBorad = () => {
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
      console.log('like?unlike?');
      setTicTok(!ticTok);
    }
    )
  }

  // 피드 삭제
  const deleteFeed = () => {
    axios.delete(
      `${url}board/${boardId}`,
      { headers: { Authorization : `Bearer ${myId}` }}
    ).then(res => {
      console.log(res.data)
      navigation.navigate('Main', {screen: 'Feeds'})
    }).catch(err => {
      Alert.alert('오류', err.data)
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
      console.log(files)
      axios.get(
        `${url}board/like/${userId}/${boardId}/`,
        { headers: { Authorization : `Bearer ${myId}` }}
      ).then(res => {
        console.log('nice check', res.data)
        setILike(res.data);
      }
      ).catch(err => {
        console.log('좋아요 체크 오류', err)
      })
    }).catch (err => {
      console.log('you get error at detail', err)
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
        <View><Text>boardTitle: { title }</Text></View>
        <View>
        { files.map(file => {
          if ( file.fileType === 'IMAGE') {
            return (
              <View
                key={ file.fileId }
                style={ styles.media }
              >
                {/* <Text>{ `http://i7d205.p.ssafy.io/api/file/${file.fileType}/${file.fileName}` }</Text> */}
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
                key={ file.fileId }
                style={ styles.media }
              ><Video
                  source={{ uri: `http://i7d205.p.ssafy.io/api/file/${file.fileType}/${file.fileName}` }}
                  style={styles.media}
                  controls={true}
                  muted={true}
              /></View>
              )
          }
        })}
        </View>
        <View><Text>boradContent: { content }</Text></View>
        <View><Text>boardLikes: { likes }</Text></View>
        <View><Text>Hits: { hits }</Text></View>
        <View><Text>Id: { boardId }</Text></View>
      </View>
      {( whoamI === userId ) ?
        <View
          style={{
            flexDirection: "row",
            justifyContent: 'flex-end',
            marginVertical: SCREEN_HEIGHT * 0.025,
          }}
        >
          <Button
            title="수정하기"
            onPress={() => navigation.navigate('ChangeFeedScreen', boardId)}
            containerStyle={styles.button}
          />

          <Button
            title="삭제하기"
            onPress={deleteFeed}
            containerStyle={styles.button}
          />
        </View>
        :
        <View
          style={{
            flexDirection: "row",
            justifyContent: 'flex-end',
            marginVertical: SCREEN_HEIGHT * 0.025,
          }}
        >
          <Button
            title={ !iLike ? "좋아요" : "좋아요 취소"}
            onPress={likeBorad}
            containerStyle={styles.button}
          />
          <Form
            onButtonPress={createComment}
            buttonText="보내기"
          >
            <FormItem
              value={newcomment}
              onChangeText={setNewComment}
              placeholder="댓글을 입력해주세요"
            />
          </Form>
        </View>
      }
      <ScrollView
        style={comments}
        >
        <Text>Comments</Text>
        { comments && 
          comments.map(comment => {
            // console.log(comment)
            return (<View
              key={ comment.cmtId }
              >
                <View><Text>{ comment.cmtContent }</Text></View>
                { (whoamI === comment.userId) &&
                  <Button
                    title="삭제하기"
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
  content : {
    flex : 11,
    backgroundColor : 'white',
    marginHorizontal : 5,
    marginTop : 5,
    borderRadius : 10,
    height : 200
  },
  underBar : {
    flex : 2,
    flexDirection : 'row',
  },
  userIcon : {
    marginHorizontal : 5,
    marginVertical : 5,
  },
  textBox : {
    flex : 1,
    backgroundColor : 'white',
    marginRight : 5,
    marginVertical : 5,
    borderRadius : 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text : {
    textAlign: 'center',
    fontSize: 15
  },
  button: {
    paddingHorizontal: SCREEN_WIDTH * 0.01
  },
  comments: {
    width: SCREEN_WIDTH * 0.8,
  },
  media: {
    height: SCREEN_WIDTH * 0.8,
    width: SCREEN_WIDTH * 0.8,
    marginBottom: SCREEN_HEIGHT * 0.01
  }
})

export default FeedDetail