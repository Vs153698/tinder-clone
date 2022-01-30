import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import useAuth from "./hooks/useAuth";
import ChatScreen from "./Screens/ChatScreen";
import Home from "./Screens/Home";
import LoginScreen from "./Screens/LoginScreen";

export default function RootNavigation() {
    const Stack = createStackNavigator();
    const screenOptions = {
        headerShown: false,
    };

    const { Currentuser } = useAuth()
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={screenOptions}  >
                {Currentuser ? (
                    <>
                        <Stack.Screen name='Home' component={Home} />
                        <Stack.Screen name='chatscreen' component={ChatScreen} />
                    </>
                ) :
                    (<Stack.Screen name='loginscreen' component={LoginScreen} />)}
            </Stack.Navigator>

        </NavigationContainer>


    )

}