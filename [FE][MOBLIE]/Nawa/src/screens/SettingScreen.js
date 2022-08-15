import React from "react";
import {Alert, Text, View, StyleSheet} from 'react-native'
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import EncryptedStorage from 'react-native-encrypted-storage';
import { useCallback, useEffect } from "react";


import Video from 'react-native-video';


const SettingScreen = () => {
  return (
    <>
      <Video source={{uri: "http://i7d205.p.ssafy.io/api/file/VIDEO/62d27435-e532-485f-a287-5cc42e119641_test.mp4"}}   // Can be a URL or a local file.
                                   // Store reference
        style={styles.backgroundVideo} />
    </>
  );
}



var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default SettingScreen;