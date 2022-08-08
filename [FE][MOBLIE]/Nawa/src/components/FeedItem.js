import React from "react";
import { View, Text, StyleSheet } from 'react-native'

import UserIcon from "./UserIcon";



const FeedItem = () => {
    return (
      <View style={ styles.feedItem }>
        <View style={ styles.content }><Text style={{ textAlign:'center'}}>영상 쇼츠</Text></View>
        <View style={ styles.underBar }>
          <View style={styles.userIcon}><UserIcon /></View>
          <View style={styles.textBox}><Text>해당 게시글의 제목입니다.</Text></View>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
    feedItem : {
      flexDirection: 'column',
      backgroundColor : 'lightgrey',
      fontWeight : '900',
      // paddingHorizontal : 10,
      // paddingVertical : 10,
      marginHorizontal : 10,
      marginTop : 10,
      borderRadius : 10,
      height : 400
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
      borderRadius : 10
    }
  })


export default FeedItem;