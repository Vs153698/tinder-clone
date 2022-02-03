import { View, Text, SafeAreaView, StatusBar, TextInput, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import tw from 'tailwind-react-native-classnames';
import SenderMessage from '../components/SenderMessage';
import ReciverMessage from '../components/ReciverMessage';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';


const MessageScreen = ({ route,navigation }) => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState();
    const { item } = route.params;
    const { Currentuser } = useAuth();

    const sendMessage = () => {
        console.log("inside function");
        if (text) {
            addDoc(collection(db, 'matches', item.id, 'messages'), {
                timestamp: serverTimestamp(),
                userId: Currentuser.uid,
                displayName: Currentuser.displayName,
                photoURL: item.users[Currentuser.uid].photoURL,
                message: text
            })
        }
        setText("")
    }
    useEffect(() => onSnapshot(query(collection(db, 'matches', item.id, 'messages'), orderBy('timestamp', 'desc')), (snapshot) => setMessages(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))))

        , [item, db]);
// console.log(messages);
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight + 2 }}>
            <Header title={getMatchedUserInfo(item.users, Currentuser.uid).displayName} callEnabled navigation={navigation}/>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? "height" : "padding"} style={tw`flex-1`} keyboardVerticalOffset={10}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList inverted={-1} data={messages} style={tw`pl-4`} keyExtractor={item => item.id} renderItem={({ item: itemdata }) =>
                        <>
                            {itemdata.userId === Currentuser.uid ? (
                                <SenderMessage key={itemdata.id} message={itemdata} />
                            ) : (
                                <ReciverMessage key={itemdata.id} message={itemdata} />)}
                        </>
                    } />
                </TouchableWithoutFeedback>
                <View style={tw`flex-row bg-white justify-between w-full items-center border-t border-gray-200 px-5 py-2`}>
                    <TextInput style={tw`h-10 w-3/4 text-lg`} placeholder="Send Message" onChangeText={setText} value={text} />
                    <Button title='Send' onPress={sendMessage} color="#FF5864" />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default MessageScreen;
