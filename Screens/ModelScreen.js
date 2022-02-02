import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, Button, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import useAuth from '../hooks/useAuth';
import { Feather, Zocial } from '@expo/vector-icons';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { app, db } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const ModelScreen = ({ navigation, route }) => {

    const selfdata = route?.params?.selfUser[0];
    const { Currentuser } = useAuth();
    const [image, setImage] = useState(selfdata?.photoURL ? selfdata?.photoURL : null);
    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState(selfdata?.job ? selfdata?.job : null);
    const [age, setAge] = useState(selfdata?.age ? selfdata?.age : null);
    const incompleteform = !image || !job || !age;
    const updateUserProfile = async () => {
        setLoading(true)
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
        }).finally(() => setLoading(false))
    }

    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        const fileRef = ref(getStorage(app), Currentuser.uid);
        const result = await uploadBytes(fileRef, blob);
        blob.close();
        return await getDownloadURL(fileRef);
    }




    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setLoading(true)
            const image = await uploadImageAsync(result.uri) // set rules of firebasestorage also
            setImage(image)
            setLoading(false)

        }
    };

    return (
        <>
            <View style={tw`flex-1 items-center`}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={tw`flex-1 items-center pt-5 `} >
                        <View style={tw`flex-row items-center justify-center `}>
                            <Image style={tw`h-20 w-full`} resizeMode='contain' source={{ uri: "https://links.papareact.com/2pf" }} />
                            <TouchableOpacity disabled={incompleteform} onPress={updateUserProfile} style={tw`absolute right-5 top-5`}>
                                <Feather name="save" size={35} color="#FF5864" />
                            </TouchableOpacity>
                        </View>
                        <Text style={tw`text-xl text-gray-500 p-2 font-bold `}>Welcome {Currentuser.displayName}</Text>
                        <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>

                            <Text style={tw`text-center text-red-400 p-4 font-bold `}>Step 1: The Profile Picture</Text>
                            {!image && <TouchableOpacity onPress={pickImage} style={tw`items-center`} >
                                <AntDesign name="clouduploado" size={30} color="black" />
                            </TouchableOpacity>}

                            {image && <View style={tw`relative items-center justify-center`}>
                                <Image source={{ uri: image }} style={[tw`w-full  rounded-2xl`, { objectFit: "cover" }, { height: 300 }]} resizeMode="contain" />
                                <TouchableOpacity activeOpacity={0.6} onPress={() => setImage(null)} style={tw`absolute bottom-5`}>
                                    <View style={tw`bg-white opacity-70 p-2  rounded-full  flex items-center justify-center`}>
                                        <MaterialIcons name="delete" size={35} color="red" />
                                    </View>
                                </TouchableOpacity>
                            </View>}
                            <Text style={tw`text-center text-red-400 p-4 font-bold `}>Step 2: The Job</Text>
                            <TextInput autoComplete style={tw`text-center text-xl pb-2`} placeholder="Enter Your Occupation" value={job} onChangeText={setJob} />
                            <Text style={tw`text-center text-red-400 p-4 font-bold `}>Step 3: The Age</Text>
                            <TextInput maxLength={2} keyboardType="numeric" style={tw`text-center text-xl pb-2`} placeholder="Enter Your Age" value={age} onChangeText={setAge} />
                        </ScrollView>

                    </View>
                </KeyboardAvoidingView>
            </View>
            {loading ? (<View style={styles.loadingcontainer}>
                <LottieView source={require('../assets/animations/spinner.json')} autoPlay loop style={{ height: 200, width: 200 }} />
            </View>) : (<></>)}
        </>
    );
};

export default ModelScreen;
const styles = StyleSheet.create({
    loadingcontainer: {
        position: "absolute",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        opacity: 0.7
    }
})
