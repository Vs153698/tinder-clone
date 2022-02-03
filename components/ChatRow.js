import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import useAuth from './../hooks/useAuth'
import tw from 'tailwind-react-native-classnames';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import { onSnapshot, orderBy, query,collection } from 'firebase/firestore';
import { db } from '../firebase';
const ChatRow = ({ item, navigation }) => {
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const { Currentuser } = useAuth();
  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(item.users, Currentuser.uid))
  }, [item, Currentuser]);
  useEffect(() => onSnapshot(query(collection(db, 'matches',item.id, 'messages')),orderBy('timestamp', 'desc'),snapshot => setLastMessage(snapshot.docs[0]?.data()?.message))
    
  , [item,db]);
  
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('messagescreen',{item})} activeOpacity={0.6} style={[tw`flex-row items py-3 px-5 bg-white mx-3 my-1 rounded-lg`,styles.cardShadow]}  >
      <Image style={tw`rounded-full h-16 w-16 mr-4 `} source={{ uri: matchedUserInfo?.photoURL }} />
      <View>
        <Text style={tw`text-lg font-semibold`}>
        { matchedUserInfo?.displayName }
        </Text>
        <Text>{lastMessage || "Say Hi! ❤️"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
})
