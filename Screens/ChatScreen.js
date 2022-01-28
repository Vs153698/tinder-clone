import { View, Text } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
const ChatScreen = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-green-500`}>
    <Text>Chat Screen</Text>
  </View>
  );
};

export default ChatScreen;
