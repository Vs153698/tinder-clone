import { View, Text, Button, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import tw from 'tailwind-react-native-classnames';
import useAuth from '../hooks/useAuth';
import LottieView from 'lottie-react-native';


const LoginScreen = ({ navigation }) => {
  const { signInwithGoogle, loading } = useAuth();
  const ref2 = useRef();
  useEffect(() => {
    ref2?.current?.play()
  }, [loading]);

  return (
    <>
    <View style={tw`flex-1`} >
      <ImageBackground source={{ uri: 'https://tinder.com/static/tinder.png' }} resizeMode='cover' style={tw`flex-1`}>
        <TouchableOpacity onPress={signInwithGoogle} activeOpacity={0.6} style={[tw`absolute bottom-40 w-52 bg-white p-4 rounded-2xl`, { marginHorizontal: "25%" }]}>
          <Text style={tw`font-bold text-center`}>Sign in & get swiping</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
      {loading ? (<View style={styles.loadingcontainer}>
        <LottieView ref={ref2} source={require('../assets/animations/spinner.json')} autoplay={true} style={{ height: 200, width: 200 }} />
      </View>) : (<></>)}
    </>
  );
};
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
export default LoginScreen;

