import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import useAuth from '../hooks/useAuth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
const ModelScreen = ({ navigation }) => {
    const { Currentuser } = useAuth();
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);
    const incompleteform = !image || !job || !age;
    const updateUserProfile = () => {
        console.log(job, age, image);
        setDoc(doc(db, 'users', Currentuser.uid), {
            id: Currentuser.uid,
            displayName: Currentuser.displayName,
            job: job,
            age: age,
            photoURL: image,
            timestamp: serverTimestamp(),

        }).then(() => {
            navigation.navigate('Home')
        }).catch((err) => {
            alert(err.message);
        })
    }
    return (
        <View style={tw`flex-1 items-center pt-5 `} >
            <Image style={tw`h-20 w-full`} resizeMode='contain' source={{ uri: "https://links.papareact.com/2pf" }} />
            <Text style={tw`text-xl text-gray-500 p-2 font-bold `}>Welcome {Currentuser.displayName}</Text>
            <Text style={tw`text-center text-red-400 p-4 font-bold `}>Step 1: The Profile Picture</Text>
            <TextInput style={tw`text-center text-xl pb-2`} placeholder="Enter Your Profile Pic URL" value={image} onChangeText={setImage} />
            <Text style={tw`text-center text-red-400 p-4 font-bold `}>Step 2: The Job</Text>
            <TextInput  style={tw`text-center text-xl pb-2`} placeholder="Enter Your Occupation" value={job} onChangeText={setJob} />
            <Text style={tw`text-center text-red-400 p-4 font-bold `}>Step 3: The Age</Text>
            <TextInput maxLength={2} keyboardType="numeric" style={tw`text-center text-xl pb-2`} placeholder="Enter Your Age" value={age} onChangeText={setAge} />
            <TouchableOpacity disabled={incompleteform} onPress={updateUserProfile} activeOpacity={0.6} style={[tw`w-64 p-3 rounded-xl absolute bottom-10  mt-5`, incompleteform ? tw`bg-gray-400` : tw`bg-red-400`]} >
                <Text style={tw`text-center text-white text-xl`}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ModelScreen;
