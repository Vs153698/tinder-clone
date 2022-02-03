import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import Header from '../components/Header';
import ChatList from '../components/ChatList';

const ChatScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1,marginTop:StatusBar.currentHeight + 2}}>
      <Header title="Chat" navigation={navigation} />
      <ChatList navigation={navigation}/>
    
  </SafeAreaView>
  );
};

export default ChatScreen;
