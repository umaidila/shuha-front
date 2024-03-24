import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from "./screens/WelcomeScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import {RootStackParamList} from './types';
import LoginScreen from "./screens/LoginScreen";
import {RecoilRoot} from "recoil";
import LobbyScreen from './screens/LobbyScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <>
            <RecoilRoot>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Welcome">
                        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                        <Stack.Screen name="Register" component={RegistrationScreen}/>
                        <Stack.Screen name="Login" component={LoginScreen}/>
                        <Stack.Screen name="Lobby" component={LobbyScreen}/>
                    </Stack.Navigator>
                </NavigationContainer><StatusBar style="auto"/>
            </RecoilRoot>
        </>
    );
}

