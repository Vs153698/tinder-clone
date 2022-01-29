import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import * as Application from 'expo-application';

const Home = ({ navigation }) => {
  console.log(Application.applicationId);
  return (
    <View style={tw`flex-1 justify-center items-center bg-red-500`}>
      <Text style={tw`text-3xl mb-5`}>home page</Text>
      <Button onPress={() => navigation.navigate('chatscreen')} title='Go to Chat Screen' />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
