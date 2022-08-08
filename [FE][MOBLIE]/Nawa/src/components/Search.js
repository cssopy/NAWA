import * as React from "react";
import { SearchBar } from "@rneui/base";

const Search = () => {
  const [value, setValue] = React.useState("");
  return (
    <SearchBar
      platform="android"
      containerStyle={{borderRadius:30}}
      inputContainerStyle={{height:20 ,width:250}}
      inputStyle={{fontSize:14}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      loadingProps={{}}
      onChangeText={newVal => setValue(newVal)}
      onClearText={() => console.log(onClearText())}
      placeholder="언제 어디서나 나와!"
      placeholderTextColor="#888"
      value={value}
    />
  );
}

export default Search;