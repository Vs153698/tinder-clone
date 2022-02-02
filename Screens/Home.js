import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import * as Application from 'expo-application';
import useAuth from '../hooks/useAuth';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper'
import LottieView from 'lottie-react-native';
import { collection, doc, getDocs, onSnapshot, query, setDoc, where, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import generateId from '../lib/generateId';
const Home = ({ navigation }) => {
  const swipeRef = useRef(null);
  const [profiles, setProfiles] = useState([]);
  const [selfUser, setSelfUser] = useState([]);
  console.log(Application.applicationId);
  const { Currentuser, logout } = useAuth();
  const swipeLeft = (CardIndex) => {
    if (!profiles[CardIndex]) return
    const userSwipped = profiles[CardIndex]
    console.log("your swipped passed on", userSwipped.displayName);
    setDoc(doc(db, 'users', Currentuser.uid, 'passes', userSwipped.id), userSwipped)
  }
  const swipeRight = async(CardIndex) => {
    if (!profiles[CardIndex]) return;
    const userSwipped = profiles[CardIndex];
    const loggedinProfile = await(await getDoc(doc(db, 'users', Currentuser.uid))).data()
    // Checked if user swipped on you
    getDoc(doc(db, 'users', userSwipped.id, "swipes", Currentuser.uid)).then((document) => {
      if (document.exists()) {
        // usermatched with you before you swipe on them
        // create a match 
        console.log(` 🍺 Horray ❤️, You Matched with ${userSwipped.displayName}`);
        // Create A match
        setDoc(doc(db, 'users', Currentuser.uid, 'swipes', userSwipped.id), userSwipped)
        setDoc(doc(db, 'matches', generateId(userSwipped.id,Currentuser.uid)),{
          users:{
            [Currentuser.uid]:loggedinProfile,
            [userSwipped.id]:userSwipped
          },
          userMatched:[Currentuser.uid, userSwipped.id],
          timestamp:serverTimestamp()
        })
        navigation.navigate('match',{userSwipped,loggedinProfile})

      } else {
        // user swipped at first interaction
        console.log(`you swiped on ${userSwipped.displayName} (${userSwipped.job})`);
        setDoc(doc(db, 'users', Currentuser.uid, 'swipes', userSwipped.id), userSwipped)
      }
    })




  }
  useLayoutEffect(() => onSnapshot(doc(db, 'users', Currentuser.uid), (snapshot) => {
    if (!snapshot.exists()) {
      navigation.navigate('modalScreen')
    }
  })
    , []);
  useEffect(() => {
    let unsub;
    const fetchcards = async () => {
      const passes = await getDocs(collection(db, "users", Currentuser.uid, "passes")).then((snapshot) => snapshot.docs.map((doc) => doc.id))
      const swipes = await getDocs(collection(db, "users", Currentuser.uid, "swipes")).then((snapshot) => snapshot.docs.map((doc) => doc.id))
      const passedUserIds = passes.length > 0 ? passes : ['test']
      const swipedUserIds = swipes.length > 0 ? swipes : ['test']
      unsub = onSnapshot(query(collection(db, 'users'), where("id", "not-in", [...passedUserIds, ...swipedUserIds])), (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setProfiles(data.filter((profile) => profile.id !== Currentuser.uid))
        setSelfUser(data.filter((profile) => profile.id === Currentuser.uid))
      })
    }
    fetchcards()
    return unsub;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight + 4 }} >
      {/* Header started  */}
      <View style={tw`items-center justify-between px-5 flex-row`}>
        <TouchableOpacity activeOpacity={0.6} onPress={logout}>
          <Image style={tw`h-10 w-10 rounded-full `} source={{ uri: Currentuser?.photoURL }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("modalScreen", { selfUser })} activeOpacity={0.6}>
          <Image source={require("../assets/logo2.png")} style={tw`h-14 w-14 `} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("chatscreen")} >
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* End of header  */}
      {/* Swiper started  */}
      <View style={tw`flex-1 -mt-6 `}>
        <Swiper ref={swipeRef} overlayLabels={{
          left: {
            element: <LottieView source={require('../assets/animations/rejected.json')} autoPlay loop style={{ height: 100, width: 100 }} />,
            style: {
              wrapper: {
                padding: 10,
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start'
              }
            }
          },
          right: {
            element: <LottieView source={require('../assets/animations/accept.json')} autoPlay loop style={{ height: 100, width: 100 }} />,
            style: {
              wrapper: {
                padding: 10,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
              }
            }
          },
        }} onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)} onSwipedRight={(cardIndex) => swipeRight(cardIndex)} stackSize={5} animateCardOpacity cardIndex={0} verticalSwipe={false} containerStyle={{ backgroundColor: "transparent" }} cards={profiles} renderCard={(card) => card ? (
          <View key={card?.id} style={tw` bg-white h-3/4 rounded-xl relative`}>
            <Image source={{ uri: card?.photoURL }} style={tw`absolute top-0 h-full w-full rounded-xl `} />
            <View style={[tw`absolute bottom-0 bg-white w-full flex-row h-20 justify-between items-center px-5 rounded-b-xl`, styles.cardShadow]}>
              <View>
                <Text style={tw`text-xl font-bold`}>{card?.displayName}</Text>
                <Text>{card?.job}</Text>
              </View>
              <Text style={tw`text-2xl font-bold`}>{card?.age}</Text>
            </View>
          </View>
        ) : (
          <View style={[tw`relative bg-white h-3/4 rounded-xl justify-center items-center`, styles.cardShadow]}>
            <Text style={tw`font-bold pb-5 text-2xl`}>No More Profiles !</Text>
            <Image style={tw`h-20 w-20`} height={100} width={100} source={{ uri: "https://links.papareact.com/6gb" }} />
          </View>
        )} />
      </View>
      <View style={tw`flex flex-row justify-evenly mb-6`}>
        <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()} style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`} activeOpacity={0.6}>
          <Entypo name="cross" size={25} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swipeRef.current.swipeRight()} style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`} activeOpacity={0.6}>
          <Entypo name="heart" size={25} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

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

});

// const DUMMY_DATA = [
//   {
//     displayName: 'John Doe',
//     job: 'Full-Stack Developer',
//     photoURL: "https://cdn.pixabay.com/photo/2014/07/09/10/04/man-388104_960_720.jpg",
//     age: 25,
//     id: 123,
//   },
// ]