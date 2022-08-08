import React from "react";
import { View, Pressable, Text } from "react-native";



const ChattingMain = ( {navigation} ) => {
    return (
        <>
            <View style={{backgroundColor:'lightgrey'}}>
                <Pressable onPress={ () => navigation.navigate('room') }><Text>채팅방</Text></Pressable>
            </View>
        </>
    );
}

export default ChattingMain;