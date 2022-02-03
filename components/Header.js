import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, Foundation } from '@expo/vector-icons'

const Header = ({ title, callEnabled, navigation }) => {
  return (
    <View style={tw`p-2 flex-row items-center justify-between`}>
      <View style={tw`flex flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
      <Text style={tw`text-2xl font-bold pl-2`}>{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity style={tw`rounded-full mr-4 w-10 h-10 p-2 bg-red-200 items-center justify-center`}>
          <Foundation name='telephone' size={20} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
