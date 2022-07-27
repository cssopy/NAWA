import * as React from "react";
import { Avatar } from "@rneui/base";

const UserIcon = () => {
  return (
    <Avatar
      activeOpacity={0.2}
      avatarStyle={{}}
      containerStyle={{ 
        backgroundColor: "white", 
        shadowColor: "black", //그림자색
        shadowOpacity: 1,//그림자 투명도
        shadowOffset: { width: 0, height: 2 }, //그림자 위치}} 
        elevation: 10,
      }}
      icon={{}}
      iconStyle={{}}
      imageProps={{}}
      onLongPress={() => alert("onLongPress")}
      onPress={() => alert("onPress")}
      overlayContainerStyle={{}}
      placeholderStyle={{}}
      rounded
      size="medium"
      // source={{ uri: "" }}
      title="P"
      titleStyle={{}}
    />
  );
}

export default UserIcon;