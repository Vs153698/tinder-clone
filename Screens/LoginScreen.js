import { View, Text, Button } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
  const { signInwithGoogle } = useAuth();
  return (
    <View style={tw`flex-1 justify-center items-center bg-blue-300`}>
      <Text style={tw`text-3xl`}>Login to tinder</Text>
      <Button onPress={signInwithGoogle} title="Sign In" />
    </View>
  );
};

export default LoginScreen;
