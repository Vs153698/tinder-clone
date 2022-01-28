import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./Screens/ChatScreen";
import Home from "./Screens/Home";

export default function RootNavigation() {
    const Stack = createStackNavigator();
    const screenOptions = {
        headerShown: false,
    };
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='chatscreen' component={ChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>


    )

}