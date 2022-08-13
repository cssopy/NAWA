import React from "react";
import { Dimensions } from "react-native"
import { FAB } from "@rneui/base";

import MainNavbar from "./MainNavbar";
import MainFeed from "./MainFeed";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


function Main ({ navigation }) {
  return (
    <>
      <MainNavbar />
      <MainFeed />
      <FAB
          visible={true}
          onPress={() => {navigation.navigate('NewFeedScrren')}}
          placement="right"
          icon={{ name: 'add', color: 'white'}}
          color="red"
          style={{
            height:SCREEN_HEIGHT * 0.1
          }}
        />
    </>
  )
}

export default Main