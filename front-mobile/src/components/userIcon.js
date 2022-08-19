import * as React from "react";
import { Avatar } from "@rneui/themed";
import axios from "axios";

const UserIcon = (props) => {
  // console.log('가져오니', props)

  const url = 'http://i7d205.p.ssafy.io/api/' 
  const profileImg = () => {
    axios.get(
      `${url}user/profile-img/${props.userId}`,
      { headers: { Authorization : `Bearer ${props.myId}` }}
    )
  }

  return (
    <Avatar
      source={{
        uri: `${url}user/profile-img/${props.userId}`,
        headers: { Authorization : `Bearer ${props.myId}`}
      }}
      rounded
    />
  );
}

export default UserIcon;