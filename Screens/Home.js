import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import * as Application from 'expo-application';
import useAuth from '../hooks/useAuth';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper'
import LottieView from 'lottie-react-native';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
const DUMMY_DATA = [
  {
    displayName: 'John Doe',
    job: 'Full-Stack Developer',
    photoURL: "https://cdn.pixabay.com/photo/2014/07/09/10/04/man-388104_960_720.jpg",
    age: 25,
    id: 123,
  },
  {
    displayName: 'Rahul Kumar',
    job: 'Full-Stack Developer',
    photoURL: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/04/GettyImages-688402807_header-1024x575.jpg?w=1155&h=1528",
    age: 23,
    id: 124,
  },
  {
    displayName: 'Rakhi Rai',
    job: 'Full-Stack Developer',
    photoURL: "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg&ga=GA1.2.1520330645.1641168000",
    age: 26,
    id: 125,

  },
  {
    displayName: 'Shargun Mehta',
    job: 'Actor',
    photoURL: "https://www.adgully.com/img/800/202104/whatsapp-image-2021-04-15-at-11-32-57-1.jpeg",
    age: 22,
    id: 126,
  },
]
const Home = ({ navigation }) => {
  const swipeRef = useRef(null);
  const [profiles, setProfiles] = useState([]);
  console.log(Application.applicationId);
  const { Currentuser, logout } = useAuth();
  useLayoutEffect(() =>onSnapshot(doc(db, 'users', Currentuser.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate('modalScreen')
      }
    })
 , []);
 useEffect(() => {
   let unsub;
   const fetchcards = async()=>{
     unsub = onSnapshot( collection(db,'users'), (snapshot) => {
       const data = snapshot.docs.map(doc => ({ id: doc.id,...doc.data()}))
       setProfiles(data.filter((profile)=>profile.id !== Currentuser.uid))
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
        <TouchableOpacity onPress={() => navigation.navigate("modalScreen")} activeOpacity={0.6}>
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
        }} onSwipedLeft={() => console.log("rejected ")} onSwipedRight={() => console.log("accept")} stackSize={5} animateCardOpacity cardIndex={0} verticalSwipe={false} containerStyle={{ backgroundColor: "transparent" }} cards={profiles} renderCard={(card) => card ? (
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
