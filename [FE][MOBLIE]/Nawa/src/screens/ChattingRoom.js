import React from "react";
import { View, Text, FlatList, TextInput, Pressable } from "react-native";

const ChattingRoom = () => {

return (
    <View>
      {/* <Text>{room}</Text> */}
      <View
        style={{
          padding: 5,
          flexGrow: 1,
        }}>
        <FlatList
          style={styles.list}
          contentContainerStyle={{paddingBottom: 50}}
          data={serverMessages}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            item.user == userId ? (
              <Text style={styles.myChat}>{item.message}</Text>
            ) : (
              <Text style={styles.otherChat}>{item.message}</Text>
            )
          }
        />
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.input}
          placeholder={'Add Message'}
          onChangeText={text => {
            setMessageText(text);
          }}
          value={messageText}></TextInput>
        <Pressable onPress={sendMessage} disabled={messageText == ''}>
          <Text style={styles.send}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChattingRoom;