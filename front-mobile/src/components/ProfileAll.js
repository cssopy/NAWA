import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native'
import ProfileFeedItem from "./ProfileFeedItem";

const ProfileAll = () => {

    
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center', flexDirection:'column'}}>
            <View>
                <ProfileFeedItem/>
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


export default ProfileAll;