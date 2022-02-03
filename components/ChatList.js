import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import tw from 'tailwind-react-native-classnames';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';
import ChatRow from './ChatRow';

const ChatList = ({navigation}) => {
    const { Currentuser } = useAuth();
    const [matches, setMatches] = useState([]);
    useEffect(() => onSnapshot(query(collection(db, 'matches'), where('userMatched', 'array-contains', Currentuser.uid)), (snapshot) => setMatches(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))))
        , [Currentuser]);
    return (
        <View>
            {matches.length > 0 ? <FlatList style={tw`h-full`} data={matches} keyExtractor={item => item.id} renderItem={({item})=><ChatRow item={item} navigation={navigation}/>} /> : (<View style={tw`p-5`}>
                <Text style={tw`text-center text-lg`}>No matches at the moment 😃</Text>
            </View>)}
        </View>
    );
};

export default ChatList;
