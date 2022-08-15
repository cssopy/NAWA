import React from "react";
import { Text, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import UserIcon from "../../components/userIcon";

const FeedItem = ( props ) => {
  console.log(props)
  // console.log(props)
  return (
    <TouchableWithoutFeedback
      style={styles.feed}
      onPress={() => {
        console.log('get it')
        // navigation.navigate('FeedDetail', {
        //   boardTitle: '',
        //   boardContent: '',
        // })
      }}
    >
      <View style={ styles.feedItem }>
        <View style={ styles.content }><Text style={{ textAlign:'center'}}>영상 쇼츠</Text></View>
        <View style={ styles.underBar }>
          <View style={styles.userIcon}><UserIcon /></View>
          <View style={styles.textBox}><Text style={styles.text}>{props.item.boardTitle}</Text></View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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


export default FeedItem;