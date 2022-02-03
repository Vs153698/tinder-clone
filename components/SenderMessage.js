import { View, Text } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

const SenderMessage = ({ message }) => {

    return (
        <View style={{ alignSelf: "flex-start", marginLeft: "auto",backgroundColor:"#9C27B0", borderRadius:10,paddingHorizontal:20,marginHorizontal:10 ,paddingVertical:10,marginVertical:5,borderTopRightRadius:0 }}>
            <Text style={[tw`text-white`]}>{message.message}</Text>
        </View>
    );
};

export default SenderMessage;
