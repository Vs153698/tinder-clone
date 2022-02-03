import { View, Text, Image } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

const ReciverMessage = ({message}) => {
  return (
    <View style={{ alignSelf: "flex-start",backgroundColor:"#E53935", borderRadius:10,paddingHorizontal:20,marginHorizontal:10 ,paddingVertical:10,marginVertical:5,borderTopLeftRadius:0,marginLeft:54 }}>
        <Image style={{height:40,width:40,borderRadius:20, position:"absolute",top:0,left:-50}} source={{uri:message.photoURL}}/>
      <Text style={[tw`text-white`]}>{message.message}</Text>
    </View>
  );
};

export default ReciverMessage;
// {tw`h-12 w-12 rounded-full absolute top-0 -left-14`} 