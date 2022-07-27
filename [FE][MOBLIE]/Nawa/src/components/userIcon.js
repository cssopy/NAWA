import * as React from "react";
import { Avatar } from "@rneui/base";

const UserIcon = () => {
  return (
    <Avatar
      activeOpacity={0.2}
      avatarStyle={{}}
      containerStyle={{ 
        backgroundColor: "black", 
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