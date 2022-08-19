import * as React from "react";
import { SearchBar } from "@rneui/base";

const Search = (props) => {
  const [value, setValue] = React.useState("");
  return (
    <SearchBar
      platform="android"
      containerStyle={{borderRadius:30}}
      inputContainerStyle={{height:20 ,width:props.width}}
      inputStyle={{fontSize:14,}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      onChangeText={newVal => setValue(newVal)}
      onClearText={() => console.log(onClearText())}
      placeholder={props.string}
      placeholderTextColor="#888"
      value={value}
      
    />
  );
}

export default Search;