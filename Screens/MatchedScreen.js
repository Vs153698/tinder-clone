import { View, Text,Image,TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
const MatchedScreen = ({navigation,route}) => {
    const {loggedinProfile,userSwipped} = route.params
  return (
    <View style={[tw`h-full bg-red-500 pt-20`,{opacity:0.89}]}>
      <View style={tw`justify-center px-10 pt-20`}>
          <Image style={tw`h-32 w-full`}  source={{uri: "https://links.papareact.com/mg9"}} resizeMode='contain'/>
      </View>
      <Text style={tw`text-center text-white`}>
          You and { userSwipped.displayName } have liked each other.
      </Text>
      <View style={tw`flex-row justify-evenly mt-5`}>
          <Image style={tw`h-32 w-32 rounded-full`} source={{uri:loggedinProfile.photoURL}}/>
          <Image style={tw`h-32 w-32 rounded-full`} source={{uri:userSwipped.photoURL}}/>
      </View>
      <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate('chatscreen')} style={tw`bg-white m-5 px-10 py-8 rounded-full mt-20`}>
            <Text style={tw`text-center`}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;
