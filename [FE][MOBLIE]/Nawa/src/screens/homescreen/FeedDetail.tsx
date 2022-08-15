import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TextInput, Dimensions, ScrollView } from 'react-native'
import { Button } from "@rneui/base";
import { Form, FormItem } from "react-native-form-component";

import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import UserIcon from "../../components/userIcon";
import axios from "axios";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

function FeedDetail({ route, navigation }) {
  // console.log(route)

  const [title, setTitle] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [newcomment, setNewComment] = useState<string>('')

  const [hits, setHits] = useState<number>(0)
  const [likes, setLikes] = useState<number>(0)

  const [files, setFiles] = useState<any>([])
  const [comments, setComments] = useState<any>([])

  const whoamI = useSelector((state : RootState) => state.user.userId)
  const myId = useSelector((state: RootState) => state.user.accessToken)
  const { boardId } = route.params;
  const url = 'http://i7d205.p.ssafy.io/api/'

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
      console.log(res.data)
      console.log(comments)
    }).catch(err => 
      console.log('you get error at detail', err))
  }

  const deleteFeed = () => {
    axios.delete(
      `${url}${boardId}`,
      { headers: { Authorization : `Bearer ${myId}` }}
    ).then(res => {
      console.log(res.data)
      navigation.navigate('Main')
    }).catch(err => {
      Alert.alert('오류', err.data)
    })
  }

  useEffect(() => {
    console.log(boardId)
    axios.get(
      `${url}board/${boardId}`,
      { headers: { Authorization : `Bearer ${myId}` }}
    ).then (res => {
      // console.log('call at detail', res.data)
      const datas = res.data
      setTitle(datas.boardtitle)
      setContent(datas.boardContent)
      setHits(datas.boardHit)
      setUserId(datas.userId)
      setComments(datas.comments)
      setFiles(datas.files)
      setLikes(datas.boradLikes)
    }).catch (err => {
      console.log('you get error at detail', err)
    })
  },[createComment])

  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          marginVertical: SCREEN_HEIGHT * 0.025,
        }}
      >
        <View><Text>boardTitle: { title }</Text></View>
        { (files !== []) &&
          files.forEach(element => {
            {element}
          })
        }
        <View><Text>boradContent: { content }</Text></View>
        <View><Text>boardLikes: { likes }</Text></View>
        <View><Text>Hits: { hits }</Text></View>
        <View><Text>Id: { boardId }</Text></View>
      </View>
      {( whoamI === userId ) &&
        <View
          style={{
            flexDirection: "row",
            justifyContent: 'flex-end',
            marginVertical: SCREEN_HEIGHT * 0.025,
          }}
        >
          <Button
            title="수정하기"
            onPress={() => navigation.navigate('ChangeFeedScreen',
              {
                title,
                content,
                files,
              }
            )}
            containerStyle={styles.button}
          />

          <Button
            title="삭제하기"
            onPress={deleteFeed}
            containerStyle={styles.button}
          />
        </View>
        }
        <View>
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
        <ScrollView
          style={comments}
          >
          <Text>Comments</Text>
          { comments && 
            comments.map(comment => {
              // console.log(comment)
              return (<View key={ comment.cmtId }><Text>{ comment.cmtContent }</Text></View>)
            })
          }
      </ScrollView>
      {/* <Text>Here is Feed Detail</Text> */}
    </View>
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
  }
})

export default FeedDetail