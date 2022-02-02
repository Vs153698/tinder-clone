import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import useAuth from "./hooks/useAuth";
import ChatScreen from "./Screens/ChatScreen";
import Home from "./Screens/Home";
import LoginScreen from "./Screens/LoginScreen";
import MatchedScreen from "./Screens/MatchedScreen";
import ModelScreen from "./Screens/ModelScreen";

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
                    <Stack.Group>
                        <Stack.Screen name='Home' component={Home} />
                        <Stack.Screen name='chatscreen' component={ChatScreen} />
                    </Stack.Group>
                    <Stack.Group screenOptions={{presentation:'modal'}}>
                        <Stack.Screen name='modalScreen' component={ModelScreen} />
                    </Stack.Group>
                    <Stack.Group screenOptions={{presentation:'transparentModal'}}>
                        <Stack.Screen name='match' component={MatchedScreen} />
                    </Stack.Group>
                    </>
                ) :
                    (<Stack.Screen name='loginscreen' component={LoginScreen} />)}
            </Stack.Navigator>

        </NavigationContainer>


    )

}