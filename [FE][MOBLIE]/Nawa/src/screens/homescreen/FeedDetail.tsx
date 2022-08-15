import React from "react";
import { View, Text, StyleSheet } from 'react-native'
import { Button } from "@rneui/base";
import { Form, FormItem } from "react-native-form-component";

import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import UserIcon from "../../components/userIcon";

function FeedDetail({ route, navigation }) {
  console.log(route.params)

  const whoamI = useSelector((state : RootState) => state.user.userId)
  const { boardTitle, boardContent, comments, userId, files } = route;

  const createComment = () => {

  }

  return (
    <View>
      <View style={ styles.feedItem }>
        <View style={ styles.content }><Text style={{ textAlign:'center'}}>영상 쇼츠</Text></View>
        <View style={ styles.underBar }>
          <View style={styles.userIcon}><UserIcon /></View>
          <View style={styles.textBox}><Text style={styles.text}>{boardTitle}</Text></View>
        </View>
      </View>
      {/* {( whoamI === userId ) &&
        <Button
          title="수정하기"
          onPress={navigation.navigate('ChangeFeedScreen',
          {
            boardTitle,
            boardContent,
            files,
          })}
        />
      } */}
      <Form
        onButtonPress={createComment}
        buttonText="보내기"
        style={{
          flexDirection: 'row'
        }}
      >
      </Form>
      { comments && 
        comments.map(comment => {
          console.log(comment)
        })
      }
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
})

export default FeedDetail