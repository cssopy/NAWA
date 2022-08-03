import {View, StyleSheet} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

const Mate5 = () => {
  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        style={styles.backgroundVideo}
        fullscreen={true}
        resizeMode={'contain'}
        repeat={true}
        controls={true}
      />
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Mate5;